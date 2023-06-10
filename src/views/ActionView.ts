import { Table } from '../models/Table'
import { MainView } from './MainView'
import { MAINFIELD } from '../config'
import { CardView } from '../views/CardView'
import { Card } from 'models/Card'
import { DELAY } from '../config'

export class ActionView {
  public static render(table: Table, betOrActionDiv: HTMLElement): void {
    betOrActionDiv.innerHTML = ''
    betOrActionDiv.innerHTML = `
        <div class="flex justify-around items-center pt-[3rem]">
        <div class="flex flex-col items-center justify-center px-6">
            <button id="surrenderBtn" class="btn bg-gradient-to-br from-red-500 to-red-800 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-80">
                <i class="fas fa-flag fa-2xl"></i>
            </button>
            <div class="font-bold text-center pt-2">SURRENDER</div>
        </div>
        <div class="flex flex-col items-center justify-center px-8">
            <button id="standBtn" class="btn bg-gradient-to-br from-green-600 to-green-800 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-80">
                <i class="fas fa-hand fa-2xl"></i>
            </button>
            <div class="font-bold text-center pt-2">STAND</div>
        </div>
        <div class="flex flex-col items-center justify-center px-8">
            <button id="hitBtn" class="btn bg-gradient-to-br from-yellow-300 to-yellow-500 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-80">
                <i class="fa-solid fa-copy fa-2xl"></i>
            </button>
            <div class="font-bold text-center pt-2">HIT</div>
        </div>
        <div class="flex flex-col items-center justify-center px-8">
            <button id="doubleBtn" class="btn bg-gradient-to-br from-blue-500 to-blue-800 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-70">
                <i class="fas fa-coins fa-2xl"></i>
            </button>
            <div class="font-bold text-center pt-2">DOUBLE</div>
        </div>
        </div>
        `
    const actions = [
      { selector: '#surrenderBtn', status: 'SURRENDER' },
      { selector: '#standBtn', status: 'STAND' },
      { selector: '#hitBtn', status: 'HIT' },
      { selector: '#doubleBtn', status: 'DOUBLE' },
    ]

    // Surrender ボタン
    betOrActionDiv.querySelector('#surrenderBtn')?.addEventListener('click', async () => {
      MainView.setPlayerStatus('SURRENDER')
      table.getPlayers()[0].setGameStatus('surrender')
    })

    // STAND ボタン
    betOrActionDiv.querySelector('#standBtn')?.addEventListener('click', () => {
      MainView.setPlayerStatus('STAND')
      table.getPlayers()[0].setGameStatus('stand')
    })

    // Hit ボタン
    betOrActionDiv.querySelector('#hitBtn')?.addEventListener('click', async () => {
      const playerCardDiv = MAINFIELD?.querySelector('#userCardDiv') as HTMLElement
      const newCard: Card | undefined = table.getDeck().drawOne()

      if (!newCard) return

      table.getPlayers()[0].addHand(newCard)
      playerCardDiv.innerHTML += CardView.renderCard(newCard)

      await DELAY(500)
      CardView.rotateCards('userCardDiv')
      MainView.setScore(table)
      MainView.setPlayerStatus('HIT')
    })

    // Double ボタン
    betOrActionDiv.querySelector('#doubleBtn')?.addEventListener('click', async () => {
      const playerCardDiv = MAINFIELD?.querySelector('#userCardDiv') as HTMLElement
      const newCard: Card | undefined = table.getDeck().drawOne()

      if (!newCard) return

      table.getPlayers()[0].addHand(newCard)
      playerCardDiv.innerHTML += CardView.renderCard(newCard)

      await DELAY(500)
      CardView.rotateCards('userCardDiv')
      MainView.setScore(table)

      // ベット額の更新
      const betAmount: number = table.getPlayers()[0].getBet()
      const ownChips: number = table.getPlayers()[0].getChips()
      MainView.setPlayerBetAmount(table, betAmount * 2)
      MainView.setPlayerOwnChips(table, ownChips - betAmount)

      await DELAY(1500)
      const status: string = table.getPlayers()[0].getHandScore() <= 21 ? 'STAND' : 'BUST'
      MainView.setPlayerStatus(status)
      table.getPlayers()[0].setGameStatus(status)
    })

    for (const action of actions) {
      this.bindAction(table, betOrActionDiv, action.selector, action.status)
    }
  }

  private static bindAction(table: Table, betOrActionDiv: HTMLElement, selector: string, status: string): void {
    const button = betOrActionDiv.querySelector(selector) as HTMLButtonElement
    button?.addEventListener('click', () => {
      MainView.setPlayerStatus(status)
      this.disableButtons(betOrActionDiv)
    })
  }

  public static disableButtons(betOrActionDiv: HTMLElement): void {
    const buttons = Array.from(betOrActionDiv.querySelectorAll('.btn')) as HTMLButtonElement[]
    buttons.forEach((button) => {
      button.disabled = true
      button.classList.add('opacity-80')
    })
  }
}
