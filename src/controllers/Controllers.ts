import { Card } from '../models/Card'
import { StartView } from '../views/StartView'
import { CardView } from '../views/CardView'
import { MainView } from '../views/MainView'

export class Controller {
  public static renderStartPage(): void {
    StartView.render()
  }

  public static renderMainPage(): void {
    MainView.render()
  }

  public static renderCard(): void {
    CardView.render(new Card('H', '4'))
  }
}
