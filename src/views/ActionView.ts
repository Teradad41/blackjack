import { Table } from '../models/Table'
import { MainView } from './MainView'
import { MAINFIELD } from '../config'
import { CardView } from '../views/CardView'
import { Card } from 'models/Card'
import { DELAY } from '../config'
import { Player } from 'models/Player'

export class ActionView {
  public static async render(table: Table, betOrActionDiv: HTMLElement, callback: Function): Promise<void> {
    const player = table.getPlayers()[1]
    let bot2ActionCalled: boolean = false

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

    const setPlayerActionAndProceed = (actionName: string): void => {
      player.setGameStatus(`${actionName}`)

      if (player.checkFinishedAction() && !bot2ActionCalled) {
        bot2ActionCalled = true
        callback()
      }
    }

    // BlackJackのとき
    if (table.getPlayers()[1].isBlackJack()) {
      await DELAY(500)
      MainView.setStatusField('BLACKJACK', 'player')
      ActionView.disableButtons(betOrActionDiv)

      await DELAY(500)
      setPlayerActionAndProceed('blackjack')
    }

    // Surrender ボタン
    betOrActionDiv.querySelector('#surrenderBtn')?.addEventListener('click', () => {
      setPlayerActionAndProceed('surrender')
    })

    // STAND ボタン
    betOrActionDiv.querySelector('#standBtn')?.addEventListener('click', () => {
      setPlayerActionAndProceed('stand')
    })

    // Hit ボタン
    betOrActionDiv.querySelector('#hitBtn')?.addEventListener('click', async () => {
      ActionView.addNewCardToPlayer(player, table, 'player')

      await DELAY(700)
      CardView.rotateCards('userCardDiv')
      MainView.setPlayerScore(player, 'user')

      const score: number = player.getHandScore()
      let playerStatus: string = 'hit'

      await DELAY(700)
      if (score > 21) {
        MainView.setStatusField('BUST', 'player')
        playerStatus = 'bust'
      } else if (score === 21) {
        MainView.setStatusField('STAND', 'player')
        playerStatus = 'stand'
      } else {
        ActionView.ableButtons(betOrActionDiv)
        return
      }

      await DELAY(500)
      setPlayerActionAndProceed(playerStatus)
    })

    // Double ボタン
    betOrActionDiv.querySelector('#doubleBtn')?.addEventListener('click', async () => {
      ActionView.addNewCardToPlayer(player, table, 'player')

      await DELAY(700)
      CardView.rotateCards('userCardDiv')
      MainView.setPlayerScore(player, 'user')

      // ベット額の更新
      const betAmount: number = player.getBet()
      MainView.setPlayerBetAmount(player, betAmount * 2)
      MainView.setPlayerOwnChips(player, player.getChips() - betAmount)

      await DELAY(1000)
      const status: string = player.getHandScore() <= 21 ? 'DOUBLE' : 'BUST'
      MainView.setStatusField(status, 'player')

      setPlayerActionAndProceed(status.toLowerCase())
    })

    for (const action of actions) {
      this.bindAction(betOrActionDiv, action.selector, action.status)
    }
  }

  private static bindAction(betOrActionDiv: HTMLElement, selector: string, status: string): void {
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
  public static addNewCardToPlayer(player: Player, table: Table, type: string): void {
    const cardDivMap: { [key: string]: string } = {
      house: 'houseCardDiv',
      bot1: 'bot1CardDiv',
      player: 'userCardDiv',
      bot2: 'bot2CardDiv',
    }

    const cardDiv = MAINFIELD?.querySelector(`#${cardDivMap[type]}`)
    const newCard: Card | undefined = table.getDeck().drawOne()

    if (cardDiv && newCard) {
      player.addHand(newCard)
      const cardSize: string = type === 'bot1' || type === 'bot2' ? 'botSize' : 'normal'
      cardDiv.innerHTML += CardView.renderCard(newCard, cardSize)
    }
  }
}
