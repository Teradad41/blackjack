import { Controller } from '../controllers/Controllers'
import { MAINFIELD } from '../config'
import { Table } from '../models/Table'
import { MainView } from './MainView'

export class BetView {
  public static render(table: Table): void {
    if (MAINFIELD) {
      const betOrActionDiv: HTMLElement = MAINFIELD.querySelector('#betOrActionDiv') as HTMLElement
      betOrActionDiv.innerHTML = ''
      betOrActionDiv.innerHTML = `
            <div class="flex flex-col justify-center items-center mt-7 px-7 py-4" style="box-shadow: 0px -8px 10px rgba(0, 228, 0), 0px 8px 10px rgba(0, 228, 0);">
                <div class="flex justify-center">
                    <p class="px-5 text-3xl pb-1">BET: <span id="userBetAmount" class="text-4xl">${table
                      .getPlayers()[0]
                      .getBet()
                      .toString()}</span></p>
                </div>
                <div class="flex justify-around py-6">
                    <div class="px-2">
                        <div class="chip w-16 h-16 bg-red-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${table
                          .getBetDenomation()[0]
                          .toString()}">
                        <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">\$${table
                              .getBetDenomation()[0]
                              .toString()}</p>
                        </div>
                    </div>
                </div>
                <div class="px-2">
                    <div class="chip w-16 h-16 bg-green-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${table
                      .getBetDenomation()[1]
                      .toString()}">
                        <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">\$${table
                              .getBetDenomation()[1]
                              .toString()}</p>
                        </div>
                    </div>
                </div>
                <div class="px-2">
                    <div class="chip w-16 h-16 bg-blue-700 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${table
                      .getBetDenomation()[2]
                      .toString()}">
                        <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">\$${table
                              .getBetDenomation()[2]
                              .toString()}</p>
                        </div>
                    </div> 
                </div>
                <div class="px-2">
                    <div class="chip w-16 h-16 bg-gray-800 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${table
                      .getBetDenomation()[3]
                      .toString()}">
                        <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">\$${table
                              .getBetDenomation()[3]
                              .toString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between">
                <button id="clearBtn" class="bg-gradient-to-r from-lime-300 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-bold rounded-lg w-32 py-2.5 mx-3 text-gray-500">
                CLEAR
                </button>
                <button id="dealBtn" class="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4      focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-bold rounded-lg w-32 py-2.5 mx-3 text-gray-600">DEAL
                </button>
            </div>
            `

      const betAmountDiv: HTMLElement | null = betOrActionDiv.querySelector('#userBetAmount') as HTMLElement
      const ownChipsDiv: HTMLElement | null = MAINFIELD.querySelector('#ownChips') as HTMLElement
      const betChips: Element[] = [...betOrActionDiv.querySelectorAll('.chip')]

      // チップ額の追加
      for (const chip of betChips) {
        chip.addEventListener('click', () => {
          const currentChip: number = parseInt(betAmountDiv?.innerHTML || '0', 10)
          const chipValue: string | null = chip.getAttribute('data-chips')

          if (chipValue !== null) {
            const totalChip: number = currentChip + parseInt(chipValue, 10)
            if (totalChip <= table.getPlayers()[0].getChips()) betAmountDiv.innerHTML = totalChip.toString()
          }
        })
      }

      // Clearボタン
      betOrActionDiv.querySelector('#clearBtn')?.addEventListener('click', () => {
        if (betAmountDiv !== null) betAmountDiv.innerHTML = '0'
      })

      // Dealボタン
      betOrActionDiv.querySelector('#dealBtn')?.addEventListener('click', () => {
        const betAmount: number = parseInt(betAmountDiv.innerHTML, 10)
        const ownChips: number = parseInt(ownChipsDiv.innerHTML, 10) - betAmount

        if (betAmount === 0) return

        Controller.actingPhase(table, betOrActionDiv)
        MainView.setPlayerBetAmount(table, betAmount)
        MainView.setPlayerOwnChips(table, ownChips)
      })
    }
  }
}
