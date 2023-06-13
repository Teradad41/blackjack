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
  public static startBlackJack(player: Player): void {
    const table: Table = new Table(player.getGameType())
    table.setPlayers([player])

    table.blackjackAssignPlayerHands()
    MainView.render(table)
    BetView.render(table)
  }

  // acting フェーズ (プレイヤー)
  public static async playerActingPhase(table: Table, betOrActionDiv: HTMLElement): Promise<void> {
    table.setGamePhase('acting')
    MainView.setStatusField('ON TURN', 'player')
    ActionView.render(table, betOrActionDiv)

    await DELAY(500)
    CardView.rotateCards('houseCardDiv', 'initial')
    CardView.rotateCards('userCardDiv')
    MainView.setHouseScore(table, 'initial')
    MainView.setPlayerScore(table)
  }

  public static async houseActionPhase(table: Table): Promise<void> {
    await DELAY(700)
    MainView.setStatusField('ON TURN', 'house')

    await DELAY(1000)
    CardView.rotateCards('houseCardDiv')
    MainView.setHouseScore(table)

    const house: Player = table.getHouse()

    await DELAY(1000)
    while (house.getHandScore() < 17) {
      await DELAY(1000)
      console.log('5')
      // メインの動作 カードを追加する
      ActionView.addNewCardToPlayer(house, table, 'house')
      MainView.setStatusField('HIT', 'house')
      await DELAY(700)
      CardView.rotateCards('houseCardDiv')
      console.log('6')
      await DELAY(1000)
      MainView.setHouseScore(table)
      console.log('7')
      await DELAY(700)
      console.log('8')
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

  // evaluating フェーズ
  public static async evaluatingWinnersPhase(table: Table) {
    table.setGamePhase('evaluatingWinners')

    await DELAY(2000)
    ResultModalView.render(table)
  }

  // roundOver フェーズ
  public static roundOverPhase(table: Table) {
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
}
