import { MAINFIELD } from '../config'
import { Table } from '../models/Table'
import { STATUSCOLOR } from '../config'
import { Player } from '../models/Player'
import { CardView } from './CardView'
import { Card } from '../models/Card'

export class MainView {
  public static render(table: Table): void {
    if (MAINFIELD) {
      MainView.displayBlock(MAINFIELD)
      MAINFIELD.innerHTML = `
        <div class="h-screen flex justify-center" style="background: #1D4434; color: white;">            
          <div class="container pt-6">
            <p id="house" class="text-center text-yellow-400 text-3xl">House</p>
            <div class="flex justify-center py-2">
              <button class="bg-white value-circle rounded-full cursor-default" disabled>
                <p id="houseScore" class="text-black mb-1 font-bold text-xl">0</p>
              </button>
            </div>
            <div id="houseStatusDiv" class="flex justify-center pt-1 pb-2">
              <button class="bg-gray-600 shadow-xl rounded-lg w-40 py-1 cursor-default" disabled>
                WAITING
              </button>
            </div>
            <div id="houseCardDiv" class="flex justify-center py-2 relative"></div>
            
            <div id="playersDiv" class="flex justify-center pt-7">
              <div id="userDiv" class="flex w-1/2 flex-col items-center">
                <p id="player" class="text-center text-yellow-400 text-3xl">${table.getPlayers()[0].getName()}</p>
                <div id="playerChipDiv" class="text-center text-white flex p-1 justify-between">
                  <p class="rem1 px-2 text-left">BET: <span id="onBetChips" class="text-xl">${table
                    .getPlayers()[0]
                    .getBet()}</span></p>
                  <p class="rem1 px-2 text-left">CHIP: <span id="ownChips" class="text-xl">${table
                    .getPlayers()[0]
                    .getChips()}</span></p>
                </div>
                <div class="flex justify-center py-2">
                  <button class="bg-white value-circle rounded-full cursor-default" disabled>
                    <p id="playerScore" class="text-black mb-1 font-bold text-xl">0</p>
                  </button>
                </div>
                <div id="playerStatusDiv" class="flex justify-center py-1">
                  <button class="bg-gray-600 shadow-xl rounded-lg w-40 py-1 cursor-default" disabled>
                    WAITING
                  </button>
                </div>
                <div id="userCardDiv" class="flex justify-center pt-4 relative"></div>
                <div id="betOrActionDiv"></div>
              </div>
            </div>
          </div>
          <div id="modalContent" class="text-black"></div>
        </div>
      `

      MainView.renderHand(table)
    }
  }

  // ステータスバーを更新する
  public static setStatusField(status: string, type: string): void {
    if (!MAINFIELD) return

    const houseOrPlayer: string = type === 'house' ? 'houseStatusDiv' : 'playerStatusDiv'
    const statusDiv = MAINFIELD.querySelector(`#${houseOrPlayer}`) as HTMLElement
    if (!statusDiv) return

    const color = STATUSCOLOR[status] || 'bg-gray-600'
    statusDiv.innerHTML = `
      <button class="${color} rounded-lg w-40 py-1 cursor-default" disabled>
        ${status}
      </button>
      `
  }

  // 画面に表示されるハウスのスコアを更新する
  public static setHouseScore(table: Table, status: string = 'notInitial'): void {
    const houseScoreDiv = MAINFIELD?.querySelector('#houseScore') as HTMLElement

    const houseScore =
      status === 'initial'
        ? table.getHouse().getHand()[0].getRankNumber().toString()
        : table.getHouse().getHandScore().toString()

    if (houseScoreDiv) {
      houseScoreDiv.innerHTML = houseScore
    }
  }

  // 画面に表示されるプレイヤーのスコアを更新する
  public static setPlayerScore(table: Table): void {
    const playerScoreDiv = MAINFIELD?.querySelector('#playerScore') as HTMLElement

    if (playerScoreDiv) {
      playerScoreDiv.innerHTML = table.getPlayers()[0].getHandScore().toString()
    }
  }

  // ベット額を更新する
  public static setPlayerBetAmount(player: Player, betAmount: number): void {
    const playerOnBetDiv = MAINFIELD?.querySelector('#onBetChips') as HTMLElement

    if (playerOnBetDiv !== null) {
      playerOnBetDiv.innerHTML = betAmount.toString()
      player.setBet(betAmount)
    }
  }

  // 保有しているチップ額を更新する
  public static setPlayerOwnChips(player: Player, ownChipAmount: number): void {
    const playerOwnChipsDiv = MAINFIELD?.querySelector('#ownChips') as HTMLElement

    if (playerOwnChipsDiv !== null) {
      playerOwnChipsDiv.innerHTML = ownChipAmount.toString()
      player.setChips(ownChipAmount)
    }
  }

  // 手札を画面に描画する (ハウス、プレイヤー)
  private static renderHand(table: Table) {
    const houseCardDiv = MAINFIELD?.querySelector('#houseCardDiv') as HTMLElement
    const playerCardDiv = MAINFIELD?.querySelector('#userCardDiv') as HTMLElement

    if (houseCardDiv) {
      houseCardDiv.innerHTML = ''
      table
        .getHouse()
        .getHand()
        .forEach((card: Card) => {
          houseCardDiv.innerHTML += CardView.renderCard(card)
        })
    }

    if (playerCardDiv) {
      playerCardDiv.innerHTML = ''
      for (const player of table.getPlayers()) {
        player.getHand().forEach((card: Card) => {
          playerCardDiv.innerHTML += CardView.renderCard(card)
        })
      }
    }
  }

  public static displayNone(ele: HTMLElement): void {
    ele.classList.remove('block')
    ele.classList.add('hidden')
  }

  public static displayBlock(ele: HTMLElement): void {
    ele.classList.remove('hidden')
    ele.classList.add('block')
  }
}
