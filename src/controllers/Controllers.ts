import { StartView } from '../views/StartView'
import { CardView } from '../views/CardView'
import { MainView } from '../views/MainView'
import { BetView } from '../views/BetView'
import { ActionView } from '../views/ActionView'
import { DELAY } from '../config'
import { Table } from '../models/Table'
import { Player } from '../models/Player'
import { ResultModalView } from '../views/ResultModalView'

export class Controller {
  public static renderStartPage(): void {
    StartView.render()
  }

  // betting フェーズ
  public static startBlackJack(players: Player[]): void {
    const table: Table = new Table(players[1].getGameType())
    table.setPlayers(players)
    table.setGamePhase('betting')

    table.blackjackAssignPlayerHands()
    MainView.render(table)
    BetView.render(table)
  }

  // acting フェーズ (ボット・プレイヤー)
  public static async playerActingPhase(table: Table, betOrActionDiv: HTMLElement): Promise<void> {
    table.setGamePhase('acting')
    betOrActionDiv.innerHTML = ''

    await DELAY(500)

    const cardDivIds = ['houseCardDiv', 'bot1CardDiv', 'userCardDiv', 'bot2CardDiv']
    cardDivIds.forEach((cardDivId: string, index: number) => {
      const times: string | undefined = cardDivId === 'houseCardDiv' ? 'initial' : undefined
      // カードを表向きにする
      CardView.rotateCards(cardDivId, times)
      // ハウスと全プレイヤーのスコアを更新する
      if (index === 0) MainView.setHouseScore(table, 'initial')
      if (index > 0) MainView.setPlayerScore(table.getPlayers()[index - 1], cardDivId.replace('CardDiv', ''))
    })

    // AIプレイヤーのベットに関する操作
    table
      .getPlayers()
      .filter((player: Player) => player.getType() === 'ai')
      .forEach((bot: Player) => {
        const betAmount: number = bot.aiPlayerDecideBetAmount()
        MainView.setBotBetAmount(bot, betAmount)
        MainView.setBotOwnChips(bot, bot.getChips() - betAmount)
      })

    await DELAY(700)
    const players: Player[] = table.getPlayers()
    const playerDivId: string[] = ['bot1', 'player', 'bot2']

    // プレイヤー・ボットのターン
    for (let i = 0; i < players.length; i++) {
      await this.handlePlayerTurn(table, players[i], playerDivId[i], betOrActionDiv)
    }

    //　ハウスのターン
    await Controller.processPlayerActionPhase(table, table.getHouse(), 'house')
    Controller.evaluatingWinnersPhase(table)
  }

  // evaluating フェーズ
  public static async evaluatingWinnersPhase(table: Table): Promise<void> {
    table.setGamePhase('evaluatingWinners')

    await DELAY(2000)
    ResultModalView.render(table)
  }

  // roundOver フェーズ
  public static roundOverPhase(table: Table): void {
    table.setGamePhase('roundOver')
    table.incrementRound()

    MainView.setStatusField('WAITING', 'house')
    MainView.setStatusField('WAITING', 'player')

    // 手札とベットをクリアし、新しく手札を追加する
    table.blackjackClearHandsAndBets()
    table.blackjackAssignPlayerHands()

    //　デッキを新しくしてシャッフル
    table.getDeck().resetDeck()

    MainView.render(table)
    BetView.render(table)
  }

  // ハウス・ボットの actionPhase を管理する
  public static async processPlayerActionPhase(table: Table, player: Player, playerDivId: string): Promise<void> {
    await DELAY(500)
    MainView.setStatusField('ON TURN', playerDivId)

    if (playerDivId === 'house') {
      await DELAY(500)
      CardView.rotateCards(`${playerDivId}CardDiv`)
      MainView.setHouseScore(table)
    }

    await DELAY(1000)
    while (player.getHandScore() < 17) {
      await DELAY(500)
      // メインの動作 カードを追加する
      ActionView.addNewCardToPlayer(player, table, playerDivId)
      MainView.setStatusField('HIT', playerDivId)
      await DELAY(700)
      CardView.rotateCards(`${playerDivId}CardDiv`)
      await DELAY(1000)
      if (playerDivId === 'house') {
        MainView.setHouseScore(table)
      } else {
        MainView.setPlayerScore(player, playerDivId)
      }

      await DELAY(700)
    }

    const playerStatus = () => {
      if (player.getHandScore() === 21 && player.getHand().length === 2) return 'blackjack'
      else if (player.getHandScore() >= 17 && player.getHandScore() <= 21) return 'stand'
      else return 'bust'
    }

    MainView.setStatusField(playerStatus().toUpperCase(), playerDivId)
    player.setGameStatus(playerStatus())
  }

  // ヘルパー関数
  private static async handlePlayerTurn(
    table: Table,
    player: Player,
    playerDivId: string,
    betOrActionDiv: HTMLElement
  ): Promise<void> {
    if (player.getType() === 'user') {
      MainView.setStatusField('ON TURN', playerDivId)
      return new Promise((resolve) => ActionView.render(table, betOrActionDiv, resolve))
    } else {
      return Controller.processPlayerActionPhase(table, player, playerDivId)
    }
  }
}
