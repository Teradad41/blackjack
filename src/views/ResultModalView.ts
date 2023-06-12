import { Controller } from '../controllers/Controllers'
import { MAINFIELD } from '../config'
import { Table } from '../models/Table'
import { Player } from '../models/Player'

export class ResultModalView {
  public static render(table: Table): void {
    const modalContentDiv = MAINFIELD?.querySelector('#modalContent')
    if (!modalContentDiv) return

    const winAmount: number = ResultModalView.compareScore(table)
    modalContentDiv.innerHTML = ResultModalView.createModalContent(table, winAmount)

    const modalOverlay = modalContentDiv.querySelector('#modalOverlay') as HTMLElement
    const modalDiv = modalContentDiv.querySelector('#modalDiv') as HTMLElement
    const nextBtn = modalContentDiv.querySelector('#nextBtn') as HTMLButtonElement
    const quitBtn = modalContentDiv.querySelector('#quitBtn') as HTMLButtonElement

    // モーダルの表示
    ResultModalView.showModal(modalOverlay, modalDiv)

    // Next ボタンが押されたとき
    nextBtn?.addEventListener('click', () => {
      ResultModalView.hideModal(modalOverlay, modalDiv)
      Controller.roundOverPhase(table)
    })

    // Quit ボタンが押されたとき
    quitBtn?.addEventListener('click', () => {
      ResultModalView.hideModal(modalOverlay, modalDiv)
      Controller.renderStartPage()
    })
  }

  private static createModalContent(table: Table, winAmount: number): string {
    const playerBetAmount: number = table.getPlayers()[0].getBet()
    const winOrLose: string = ResultModalView.judgeWinOrLose(winAmount, playerBetAmount)
    return `
        <div id="modalOverlay" class="fixed inset-0 bg-black opacity-70 z-10 hidden"></div>
        <div id="modalDiv" class="fixed inset-0 flex items-center justify-center opacity-0 invisible transition-opacity z-20">
            <div class="bg-white shadow-lg rounded-xl w-1/3 p-5">
                <div class="text-3xl font-bold tracking-wider text-center mb-5">
                    Round <span class="text-4xl">${table.getRound()}</span>
                </div>
                <table class="w-full mb-8">
                    <thead class="flex w-full rounded-t-xl bg-zinc-100">
                    <tr class="flex w-full border-b-2">
                        <th class="py-4 w-4/12">NAME</th>
                        <th class="py-4 w-4/12">WIN / LOSE</th>
                        <th class="py-4 w-4/12">EARNINGS</th>
                    </tr>
                    </thead>
                    <tbody class="flex flex-col items-center justify-between w-full rounded-b-xl">
                        <tr class="flex w-full border-b">
                            <td class="text-center py-4 w-4/12">${table.getPlayers()[0].getName()}</td>
                            <td class="text-center py-4 w-4/12">${winOrLose}</td>
                            <td class="text-center py-4 w-4/12">\$${winAmount - playerBetAmount}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-center">
                    <button id="quitBtn" type="button"
                    class="border-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    QUIT
                    </button>
                    <button id="nextBtn" type="button"
                    class="bg-gray-900 hover:bg-gray-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    NEXT
                    </button>
                </div>
            </div>
        </div>
    `
  }

  private static createGameOverContent(): string {
    return `
        <div id="modalOverlay" class="fixed inset-0 bg-black opacity-70 z-10 hidden"></div>
        <div id="modalDiv" class="fixed inset-0 flex items-center justify-center opacity-0 invisible transition-opacity z-20">
            <div class="bg-white shadow-lg rounded-xl w-1/4 p-8">
                <div class="text-3xl font-bold tracking-wider text-center mb-5">
                GAME OVER
                </div>
                <div class="flex justify-between">
                    <div class="w-1/2 pr-2">
                        <button type="button"
                        class="w-full h-full border hover:bg-gray-200 border-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        HOME
                        </button>
                    </div>
                    <div class="w-1/2 pl-2">
                        <button type="button"
                        class="w-full h-full bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        CONTINUE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
  }

  private static compareScore(table: Table): number {
    const house: Player = table.getHouse()
    const player: Player = table.getPlayers()[0]
    const playerBetAmount: number = player.getBet()
    let winAmount: number = 0

    const houseStatus: string = house.getGameStatus()
    const playerStatus: string = player.getGameStatus()

    switch (playerStatus) {
      case 'bust':
        winAmount = 0
        break
      case 'surrender':
        winAmount += playerBetAmount / 2
        break
      case 'blackjack':
        winAmount = houseStatus === 'blackjack' ? playerBetAmount : Math.floor(playerBetAmount * 2.5)
        break
      case 'double':
        if (houseStatus === 'bust') winAmount = playerBetAmount * 2
        else if (player.getHandScore() > house.getHandScore()) winAmount = playerBetAmount * 2
        else if (player.getHandScore() === house.getHandScore()) winAmount = playerBetAmount
        else winAmount = 0
        break
      case 'stand':
        if (player.getHandScore() === house.getHandScore()) winAmount = playerBetAmount
        else
          winAmount = houseStatus === 'bust' || house.getHandScore() < player.getHandScore() ? playerBetAmount * 2 : 0
    }

    const currentChips = player.getChips()
    player.setChips(winAmount + currentChips)

    return winAmount
  }

  private static showModal(modalOverlay: HTMLElement, modalDiv: HTMLElement): void {
    modalOverlay.classList.remove('hidden')
    modalDiv.classList.remove('invisible', 'opacity-0')
    modalDiv.classList.add('opacity-1')
  }

  private static hideModal(modalOverlay: HTMLElement, modalDiv: HTMLElement): void {
    modalOverlay.classList.add('hidden')
    modalDiv.classList.add('invisible', 'opacity-0')
    modalDiv.classList.remove('opacity-1')
  }

  private static judgeWinOrLose(winAmount: number, playerBetAmount: number): string {
    if (winAmount === playerBetAmount) return 'DRAW'
    else return winAmount > playerBetAmount ? 'WIN' : 'LOSE'
  }
}
