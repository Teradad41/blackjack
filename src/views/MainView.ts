import { MAINFIELD } from '../config'
import { Table } from '../models/Table'
import { STATUSCOLOR } from '../config'
import { Player } from '../models/Player'

export class MainView {
  public static render(table: Table): void {
    if (MAINFIELD) {
      MainView.displayBlock(MAINFIELD)
      MAINFIELD.innerHTML = `
        <div class="h-screen flex justify-center" style="background: #1D4434; color: white;">            
          <div class="container pt-6">
            <p id="house" class="text-center text-red-600 text-3xl">House</p>
            <div class="flex justify-center py-2">
              <button class="bg-white value-circle rounded-full cursor-default" disabled>
                <p id="houseScore" class="text-black mb-1 font-bold text-xl">0</p>
              </button>
            </div>
            <div id="houseStatusDiv" class="flex justify-center pt-1 pb-2">
              <button class="bg-gray-600 rounded-lg w-40 py-1 cursor-default" disabled>
                WAITING
              </button>
            </div>
            <div id="houseCardDiv" class="flex justify-center py-2"></div>

            <div id="playersDiv" class="flex justify-center pt-7">
              <div id="userDiv" class="flex flex-col items-center">
                <p id="player" class="text-center text-red-600 text-3xl">${table.getPlayers()[0].getName()}</p>
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
                  <button class="bg-gray-600 rounded-lg w-40 py-1 cursor-default" disabled>
                    WAITING
                  </button>
                </div>
                <div id="userCardDiv" class="flex justify-center pt-4"></div>
                <div id="betOrActionDiv"></div>
              </div>
            </div>
          </div>
        </div>  
      `
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

  public static setPlayerScore(table: Table): void {
    const playerScoreDiv = MAINFIELD?.querySelector('#playerScore') as HTMLElement
    const playerScore = table.getPlayers()[0].getHandScore().toString()

    if (playerScoreDiv) playerScoreDiv.innerHTML = playerScore
  }

  public static(table: Table, status: string = 'notInitial'): void {
    const houseScoreDiv = MAINFIELD?.querySelector('#houseScore') as HTMLElement
    const playerScoreDiv = MAINFIELD?.querySelector('#playerScore') as HTMLElement

    const houseScore =
      status === 'initial'
        ? table.getHouse().getHand()[0].getRankNumber().toString()
        : table.getHouse().getHandScore().toString()

    const playerScore = table.getPlayers()[0].getHandScore().toString()

    if (houseScoreDiv && playerScoreDiv) {
      houseScoreDiv.innerHTML = houseScore
      playerScoreDiv.innerHTML = playerScore
    }
  }

  // ベット額を更新する
  public static setPlayerBetAmount(player: Player, betAmount: number): void {
    const playerOnBetDiv = MAINFIELD?.querySelector('#onBetChips') as HTMLElement

    if (playerOnBetDiv !== null) playerOnBetDiv.innerHTML = betAmount.toString()
    player.setBet(betAmount)
  }

  // 保有しているチップ額を更新する
  public static setPlayerOwnChips(player: Player, ownChipAmount: number): void {
    const playerOwnChipsDiv = MAINFIELD?.querySelector('#ownChips') as HTMLElement

    if (playerOwnChipsDiv !== null) playerOwnChipsDiv.innerHTML = ownChipAmount.toString()
    player.setChips(ownChipAmount)
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
