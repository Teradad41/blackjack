import { StartView } from '../views/StartView'
import { CardView } from '../views/CardView'
import { MainView } from '../views/MainView'
import { BetView } from '../views/BetView'
import { ActionView } from '../views/ActionView'
import { DELAY, MAINFIELD } from '../config'
import { Table } from '../models/Table'
import { Player } from '../models/Player'

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

  // acting フェーズ
  public static async actingPhase(table: Table, betOrActionDiv: HTMLElement): Promise<void> {
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

  // evaluating フェーズ
  public static async evaluatingPhase(table: Table): Promise<void> {
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
      await DELAY(700)
      await ActionView.handleNewCard(house, table, houseCardDiv)
      MainView.setStatusField('HIT', 'house')
      await DELAY(500)
      CardView.rotateCards('houseCardDiv')
      await DELAY(1000)
      MainView.setHouseScore(table)
    }

    const houseStatus = () => {
      if (house.getHandScore() === 21 && house.getHand().length === 2) return 'blackjack'
      else if (house.getHandScore() >= 17) return 'stand'
      else return 'bust'
    }
    MainView.setStatusField(houseStatus().toUpperCase(), 'house')
    house.setGameStatus(houseStatus())
  }
}
