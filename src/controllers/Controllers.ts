import { Card } from '../models/Card'
import { StartView } from '../views/StartView'
import { CardView } from '../views/CardView'
import { MainView } from '../views/MainView'
import { BetView } from '..//views/BetView'
import { MAINFIELD } from '../config'
import { Table } from '../models/Table'

export class Controller {
  public static renderStartPage(): void {
    StartView.render()
  }

  public static startBlackJack(userName: string, gameType: string): void {
    MainView.render(userName, gameType)

    const table: Table = new Table(gameType)

    // ここに追加する
    const houseCardDiv = MAINFIELD?.querySelector('#houseCardDiv') as HTMLElement
    houseCardDiv.innerHTML += CardView.render(new Card('C', '9'))
    houseCardDiv.innerHTML += CardView.renderCardReverse()

    const playerCardDiv = MAINFIELD?.querySelector('#userCardDiv') as HTMLElement
    playerCardDiv.innerHTML += CardView.render(new Card('C', '9'))
    playerCardDiv.innerHTML += CardView.render(new Card('H', 'J'))

    BetView.render()
  }
}
