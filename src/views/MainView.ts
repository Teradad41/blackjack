import { MAINFIELD } from '../config'
import { Table } from '../models/Table'
import { STATUSCOLOR } from '../config'
import { Player } from '../models/Player'
import { CardView } from './CardView'
import { Card } from '../models/Card'

export class MainView {
  public static render(table: Table): void {
    if (MAINFIELD !== null) {
      MainView.displayBlock(MAINFIELD)
      const players: Player[] = table.getPlayers()

      MAINFIELD.innerHTML = `
        <div class="h-screen flex justify-center" style="background: #1D4434; color: white;">            
          <div class="container pt-5">
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
            
            <div id="playersDiv" class="flex justify-center">
              <div id="bot1Div" class="flex w-1/4 flex-col items-center pt-0">
                <p class="text-center text-yellow-400 text-2xl">BOT<span class="text-3xl">1</span></p>
                <div id="bot1ChipDiv" class="text-center text-white flex p-1 justify-between">
                  <p class="rem1 px-2 text-left">BET:<span id="bot1BetAmount" class="text-xl">${players[0].getBet()}</span></p>
                  <p class="rem1 px-2 text-left">CHIP:<span id="bot1OwnChips" class="text-xl">${players[0].getChips()}</span></p>
                </div>
                <div class="flex justify-center py-2">
                  <button class="bg-white value-circle rounded-full cursor-default" disabled>
                    <p id="bot1Score" class="text-black mb-1 font-bold text-xl">0</p>
                  </button>
                </div>
                <div id="bot1StatusDiv" class="flex justify-center py-1">
                  <button class="bg-gray-600 shadow-xl rounded-lg w-40 py-1 cursor-default" disabled>
                  WAITING
                  </button>
                </div>
                <div id="bot1CardDiv" class="flex justify-center pt-4 relative"></div>
              </div>

              <div id="userDiv" class="flex w-1/2 flex-col items-center pt-[7rem]">
                <p class="text-center text-yellow-400 text-3xl">${players[1].getName()}</p>
                <div id="playerChipDiv" class="text-center text-white flex p-1 justify-between">
                  <p class="rem1 px-2 text-left">BET: <span id="onBetChips" class="text-xl">${players[1].getBet()}</span></p>
                  <p class="rem1 px-2 text-left">CHIP: <span id="ownChips" class="text-xl">${players[1].getChips()}</span></p>
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

              <div id="bot2Div" class="flex w-1/4 flex-col items-center pt-0">
                <p id="bot2" class="text-center text-yellow-400 text-2xl">BOT<span class="text-3xl">2</span></p>
                <div id="bot2ChipDiv" class="text-center text-white flex p-1 justify-between">
                  <p class="rem1 px-2 text-left">BET:<span id="bot2BetAmount" class="text-xl">${players[2].getBet()}</span></p>
                  <p class="rem1 px-2 text-left">CHIP:<span id="bot2OwnChips" class="text-xl">${players[2].getChips()}</span></p>
                </div>
                <div class="flex justify-center py-2">
                  <button class="bg-white value-circle rounded-full cursor-default" disabled>
                    <p id="bot2Score" class="text-black mb-1 font-bold text-xl">0</p>
                  </button>
                </div>
                <div id="bot2StatusDiv" class="flex justify-center py-1">
                  <button class="bg-gray-600 shadow-xl rounded-lg w-40 py-1 cursor-default" disabled>
                  WAITING
                  </button>
                </div>
                <div id="bot2CardDiv" class="flex justify-center pt-4 relative"></div>
              </div>
            </div>
          </div>
          <div id="modalContent" class="text-black"></div>
        </div>
      `

      MainView.renderPlayerHand(table)
    }
  }

  // ステータスバーを更新する
  public static setStatusField(status: string, type: string): void {
    if (!MAINFIELD) return

    const statusDivsMap: { [key: string]: string } = {
      house: 'houseStatusDiv',
      bot1: 'bot1StatusDiv',
      player: 'playerStatusDiv',
      bot2: 'bot2StatusDiv',
    }

    const statusDiv = MAINFIELD.querySelector(`#${statusDivsMap[type]}`) as HTMLElement
    if (statusDiv) {
      const color = STATUSCOLOR[status] || 'bg-gray-600'
      statusDiv.innerHTML = `
        <button class="${color} rounded-lg w-40 py-1 cursor-default" disabled>
          ${status}
        </button>
        `
    }
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

  // プレイヤー・ボットのスコアを画面に表示する
  public static setPlayerScore(player: Player, type: string): void {
    const scoreDivMap: { [key: string]: string } = {
      bot1: 'bot1Score',
      user: 'playerScore',
      bot2: 'bot2Score',
    }

    const scoreDiv = MAINFIELD?.querySelector(`#${scoreDivMap[type]}`) as HTMLElement
    if (scoreDiv) {
      scoreDiv.innerHTML = player.getHandScore().toString()
    }
  }

  // プレイヤーのベット額を更新する
  public static setPlayerBetAmount(player: Player, betAmount: number): void {
    const playerOnBetDiv = MAINFIELD?.querySelector('#onBetChips') as HTMLElement

    if (playerOnBetDiv !== null) {
      playerOnBetDiv.innerHTML = betAmount.toString()
      player.setBet(betAmount)
    }
  }

  // プレイヤーの保有しているチップ額を更新する
  public static setPlayerOwnChips(player: Player, ownChipAmount: number): void {
    const playerOwnChipsDiv = MAINFIELD?.querySelector('#ownChips') as HTMLElement

    if (playerOwnChipsDiv !== null) {
      playerOwnChipsDiv.innerHTML = ownChipAmount.toString()
      player.setChips(ownChipAmount)
    }
  }

  // ボットのベット額を更新する
  public static setBotBetAmount(bot: Player, betAmount: number): void {
    const betAmountDivName: string = bot.getName() === 'BOT1' ? 'bot1BetAmount' : 'bot2BetAmount'
    const betAmountDiv = MAINFIELD?.querySelector(`#${betAmountDivName}`) as HTMLElement

    if (betAmountDiv !== null) {
      betAmountDiv.innerHTML = betAmount.toString()
      bot.setBet(betAmount)
    }
  }

  // ボットの保有チップ額を更新する
  public static setBotOwnChips(bot: Player, ownChipAmount: number): void {
    const ownChipsDivName: string = bot.getName() === 'BOT1' ? 'bot1OwnChips' : 'bot2OwnChips'
    const ownChipsDiv = MAINFIELD?.querySelector(`#${ownChipsDivName}`) as HTMLElement

    if (ownChipsDiv !== null) {
      ownChipsDiv.innerHTML = ownChipAmount.toString()
      bot.setChips(ownChipAmount)
    }
  }

  // 手札を画面に追加する (ハウス・プレイヤー・ボット)
  private static renderPlayerHand(table: Table): void {
    const cardDivIds = ['#houseCardDiv', '#bot1CardDiv', '#userCardDiv', '#bot2CardDiv']
    const players = [table.getHouse(), ...table.getPlayers()]

    cardDivIds.forEach((cardDivIds: string, index: number) => {
      const cardDiv = MAINFIELD?.querySelector(cardDivIds) as HTMLElement
      const player: Player = players[index]
      const cardSize: string = index % 2 === 0 ? 'normal' : 'botSize'

      cardDiv.innerHTML = ''
      player.getHand().forEach((card: Card) => {
        cardDiv.innerHTML += CardView.renderCard(card, cardSize)
      })
    })
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
