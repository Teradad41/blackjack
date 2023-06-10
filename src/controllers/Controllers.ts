import { StartView } from '../views/StartView'
import { CardView } from '../views/CardView'
import { MainView } from '../views/MainView'
import { BetView } from '../views/BetView'
import { ActionView } from '../views/ActionView'
import { MAINFIELD } from '../config'
import { Table } from '../models/Table'
import { Player } from '../models/Player'

export class Controller {
  public static renderStartPage(): void {
    StartView.render()
  }

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
      playerCardDiv.innerHTML += CardView.renderCard(table.getPlayers()[0].getHand()[0])
      playerCardDiv.innerHTML += CardView.renderCard(table.getPlayers()[0].getHand()[1])
    }

    BetView.render(table)
  }

  public static actingPhase(table: Table, betOrActionDiv: HTMLElement): void {
    // カードを表向きにする
    setTimeout(() => {
      CardView.rotateCards('houseCardDiv')
      CardView.rotateCards('userCardDiv')
      MainView.setScore(table, 'initial')
    }, 400)

    table.setGamePhase('acting')
    ActionView.render(table, betOrActionDiv)
    if (table.allPlayerActionsResolved()) console.log('!')
  }
}
