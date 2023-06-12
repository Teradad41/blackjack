import { Table } from '../models/Table'
import { MainView } from './MainView'
import { MAINFIELD } from '../config'
import { CardView } from '../views/CardView'
import { Card } from 'models/Card'
import { DELAY } from '../config'
import { Player } from 'models/Player'
import { Controller } from '../controllers/Controllers'

export class ActionView {
  public static async render(table: Table, betOrActionDiv: HTMLElement): Promise<void> {
    const player = table.getPlayers()[0]
    betOrActionDiv.innerHTML = `
        <div class="flex justify-around items-center pt-[3rem]">
            <div class="flex flex-col items-center justify-center px-6">
                <button id="surrenderBtn" class="btn bg-gradient-to-br from-red-500 to-red-800 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-60">
                    <i class="fas fa-flag fa-2xl"></i>
                </button>
                <div class="font-bold text-center pt-2">SURRENDER</div>
            </div>
            <div class="flex flex-col items-center justify-center px-8">
                <button id="standBtn" class="btn btn-sp bg-gradient-to-br from-green-600 to-green-800 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-60">
                    <i class="fas fa-hand fa-2xl"></i>
                </button>
                <div class="font-bold text-center pt-2">STAND</div>
            </div>
            <div class="flex flex-col items-center justify-center px-8">
                <button id="hitBtn" class="btn btn-sp bg-gradient-to-br from-yellow-300 to-yellow-500 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-60">
                    <i class="fa-solid fa-copy fa-2xl"></i>
                </button>
                <div class="font-bold text-center pt-2">HIT</div>
            </div>
            <div class="flex flex-col items-center justify-center px-8">
                <button id="doubleBtn" class="btn bg-gradient-to-br from-blue-500 to-blue-800 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-60">
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

    if (table.getPlayers()[0].isBlackJack()) {
      MainView.setStatusField('BLACKJACK', 'player')
      player.setGameStatus('blackjack')
      ActionView.disableButtons(betOrActionDiv)

      await DELAY(1000)
      if (table.allPlayerActionsResolved()) Controller.houseActiongPhase(table)
    }

    // Surrender ボタン
    betOrActionDiv.querySelector('#surrenderBtn')?.addEventListener('click', () => {
      MainView.setStatusField('SURRENDER', 'player')
      player.setGameStatus('surrender')

      if (table.allPlayerActionsResolved()) Controller.houseActiongPhase(table)
    })

    // STAND ボタン
    betOrActionDiv.querySelector('#standBtn')?.addEventListener('click', () => {
      MainView.setStatusField('STAND', 'player')
      player.setGameStatus('stand')

      if (table.allPlayerActionsResolved()) Controller.houseActiongPhase(table)
    })

    // Hit ボタン
    betOrActionDiv.querySelector('#hitBtn')?.addEventListener('click', async () => {
      const playerCardDiv = MAINFIELD?.querySelector('#userCardDiv') as HTMLElement

      await ActionView.handleNewCard(player, table, playerCardDiv)

      await DELAY(500)
      CardView.rotateCards('userCardDiv')
      MainView.setPlayerScore(table)
      MainView.setStatusField('HIT', 'player')
      player.setGameStatus('hit')
      // 追加終了

      const score: number = player.getHandScore()
      const status: string = score < 21 ? 'HIT' : score === 21 ? 'STAND' : 'BUST'

      // スコアが 21 未満のとき HIT & STAND ボタンを有効化する
      if (status === 'HIT') {
        ActionView.ableButtons(betOrActionDiv)
      }

      await DELAY(1500)
      MainView.setStatusField(status, 'player')
      player.setGameStatus(status.toLowerCase())

      if (table.allPlayerActionsResolved()) Controller.houseActiongPhase(table)
    })

    // Double ボタン
    betOrActionDiv.querySelector('#doubleBtn')?.addEventListener('click', async () => {
      const playerCardDiv = MAINFIELD?.querySelector('#userCardDiv') as HTMLElement

      await ActionView.handleNewCard(player, table, playerCardDiv)

      await DELAY(500)
      CardView.rotateCards('userCardDiv')
      MainView.setPlayerScore(table)

      // ベット額の更新
      const betAmount: number = player.getBet()
      const ownChips: number = player.getChips()
      MainView.setPlayerBetAmount(player, betAmount * 2)
      MainView.setPlayerOwnChips(player, ownChips - betAmount)

      await DELAY(1500)
      const status: string = player.getHandScore() <= 21 ? 'DOUBLE' : 'BUST'
      MainView.setStatusField(status, 'player')
      player.setGameStatus(status.toLowerCase())

      if (table.allPlayerActionsResolved()) Controller.houseActiongPhase(table)
    })

    for (const action of actions) {
      this.bindAction(table, betOrActionDiv, action.selector, action.status)
    }
  }

  private static bindAction(table: Table, betOrActionDiv: HTMLElement, selector: string, status: string): void {
    const button = betOrActionDiv.querySelector(selector) as HTMLButtonElement
    button?.addEventListener('click', () => {
      MainView.setStatusField(status, 'player')
      this.disableButtons(betOrActionDiv)
    })
  }

  // ボタン要素を disabled に設定する
  public static disableButtons(betOrActionDiv: HTMLElement): void {
    const buttons = Array.from(betOrActionDiv.querySelectorAll('.btn')) as HTMLButtonElement[]
    buttons.forEach((button) => {
      button.disabled = true
      button.classList.add('opacity-60')
    })
  }

  // ボタン要素の disabled を解除する
  public static ableButtons(betOrActionDiv: HTMLElement): void {
    const buttons = Array.from(betOrActionDiv.querySelectorAll('.btn-sp')) as HTMLButtonElement[]
    buttons.forEach((button) => {
      button.disabled = false
      button.classList.remove('opacity-60')
    })
  }

  // カードを一枚追加する
  public static async handleNewCard(player: Player, table: Table, cardDiv: HTMLElement): Promise<void> {
    const newCard: Card | undefined = table.getDeck().drawOne()
    if (!newCard) return

    player.addHand(newCard)
    cardDiv.innerHTML += CardView.renderCard(newCard)
  }
}
