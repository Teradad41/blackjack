import { StartView } from '../views/StartView'
import { CardView } from '../views/CardView'
import { MainView } from '../views/MainView'
import { BetView } from '../views/BetView'
import { ActionView } from '../views/ActionView'
import { DELAY, MAINFIELD } from '../config'
import { Table } from '../models/Table'
import { Player } from '../models/Player'
import { ResultModalView } from '../views/ResultModalView'

export class Controller {
  public static renderStartPage(): void {
    StartView.render()
  }

  // betting フェーズ
  public static startBlackJack(player: Player): void {
    const table: Table = new Table(player.getGameType())
    table.setPlayers([player])

    MainView.render(table)
    const houseCardDiv = MAINFIELD?.querySelector('#houseCardDiv') as HTMLElement
    const playerCardDiv = MAINFIELD?.querySelector('#userCardDiv') as HTMLElement

    table.blackjackAssignPlayerHands()
    houseCardDiv.innerHTML += CardView.renderCard(table.getHouse().getHand()[0])
    houseCardDiv.innerHTML += CardView.renderCard(table.getHouse().getHand()[1])

    for (const player of table.getPlayers()) {
      playerCardDiv.innerHTML += CardView.renderCard(player.getHand()[0])
      playerCardDiv.innerHTML += CardView.renderCard(player.getHand()[1])
    }

    BetView.render(table)
  }

  // acting フェーズ (プレイヤー)
  public static async playerActingPhase(table: Table, betOrActionDiv: HTMLElement): Promise<void> {
    table.setGamePhase('acting')
    MainView.setStatusField('ON TURN', 'player')
    ActionView.render(table, betOrActionDiv)
    BetView.setTurnColor('player', 'house')

    await DELAY(500)
    CardView.rotateCards('houseCardDiv', 'initial')
    CardView.rotateCards('userCardDiv')
    MainView.setHouseScore(table, 'initial')
    MainView.setPlayerScore(table)
  }

  // action フェーズ （ハウス）
  public static async houseActiongPhase(table: Table): Promise<void> {
    await DELAY(700)
    BetView.setTurnColor('house', 'player')
    MainView.setStatusField('ON TURN', 'house')
    await DELAY(1000)
    CardView.rotateCards('houseCardDiv')
    MainView.setHouseScore(table)

    const house: Player = table.getHouse()
    const houseCardDiv = MAINFIELD?.querySelector('#houseCardDiv') as HTMLElement

    await DELAY(1000)
    while (house.getHandScore() < 17) {
      await DELAY(1000)
      await ActionView.handleNewCard(house, table, houseCardDiv)
      MainView.setStatusField('HIT', 'house')
      await DELAY(700)
      CardView.rotateCards('houseCardDiv')
      await DELAY(1000)
      MainView.setHouseScore(table)
    }

    const houseStatus = () => {
      if (house.getHandScore() === 21 && house.getHand().length === 2) return 'blackjack'
      else if (house.getHandScore() >= 17 && house.getHandScore() <= 21) return 'stand'
      else return 'bust'
    }

    MainView.setStatusField(houseStatus().toUpperCase(), 'house')
    house.setGameStatus(houseStatus())

    Controller.evaluatingWinnersPhase(table)
  }

  // 評価に基づきテーブルを更新する
  public static async evaluatingWinnersPhase(table: Table) {
    table.setGamePhase('evaluatingWinners')

    const house: Player = table.getHouse()
    const player: Player = table.getPlayers()[0]
    const playerBetAmount: number = player.getBet()
    let winAmount: number = 0

    const houseStatus: string = house.getGameStatus()
    const playerStatus: string = player.getGameStatus()

    switch (playerStatus) {
      case 'bust':
        winAmount = 0
        break
      case 'surrender':
        winAmount += playerBetAmount / 2
        break
      case 'blackjack':
        winAmount = houseStatus === 'blackjack' ? playerBetAmount : playerBetAmount * 2.5
        break
      case 'double':
        if (houseStatus === 'bust' || player.getHandScore() > house.getHandScore()) winAmount = playerBetAmount * 2
        if (player.getHandScore() === house.getHandScore()) winAmount = playerBetAmount
        else winAmount = 0
        break
      case 'stand':
        if (player.getHandScore() === house.getHandScore()) winAmount = playerBetAmount
        else
          winAmount = houseStatus === 'bust' || house.getHandScore() < player.getHandScore() ? playerBetAmount * 2 : 0
    }

    table.blackjackClearHandsAndBets()
    const currentChips = player.getChips()
    player.setChips(winAmount + currentChips)

    await DELAY(1500)
    ResultModalView.render(table)
  }

  public static roundOverPhase(table: Table) {
    MainView.setStatusField('WAITING', 'house')
    MainView.setStatusField('WAITING', 'player')

    // プレイヤーとディーラーの手札とベットをクリアする
    table.blackjackAssignPlayerHands()

    // const houseCardDiv = MAINFIELD?.querySelector('#houseCardDiv') as HTMLElement
    // const playerCardDiv = MAINFIELD?.querySelector('#userCardDiv') as HTMLElement
    // houseCardDiv.innerHTML = "";
    // houseCardDiv.innerHTML += CardView.renderCard(table.getHouse().getHand()[0])
    // houseCardDiv.innerHTML += CardView.renderCard(table.getHouse().getHand()[1])

    // playerCardDiv.innerHTML = "";
    // for (const player of table.getPlayers()) {
    //   playerCardDiv.innerHTML += CardView.renderCard(player.getHand()[0])
    //   playerCardDiv.innerHTML += CardView.renderCard(player.getHand()[1])
    // }

    // BetView.render(table)
  }
}
