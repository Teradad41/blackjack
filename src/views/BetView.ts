import { Controller } from '../controllers/Controllers'
import { MAINFIELD } from '../config'
import { Table } from '../models/Table'
import { Player } from '../models/Player'

export class BetView {
  public static render(table: Table): void {
    if (!MAINFIELD) return

    const players: Player[] = table.getPlayers()
    const betOrActionDiv = MAINFIELD.querySelector('#betOrActionDiv') as HTMLElement
    betOrActionDiv.innerHTML = `
    <div class="flex flex-col justify-center items-center px-7 py-3">
        <div class="flex justify-around py-6">
            <div class="px-2">
                <div class="chip w-16 h-16 bg-red-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${table
                  .getBetDenomation()[0]
                  .toString()}">
                <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                    <p class="text-gray-800 text-lg font-bold pb-1">\$${table.getBetDenomation()[0].toString()}</p>
                </div>
            </div>
        </div>
        <div class="px-2">
            <div class="chip w-16 h-16 bg-green-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${table
              .getBetDenomation()[1]
              .toString()}">
                <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                    <p class="text-gray-800 text-lg font-bold pb-1">\$${table.getBetDenomation()[1].toString()}</p>
                </div>
            </div>
        </div>
        <div class="px-2">
            <div class="chip w-16 h-16 bg-blue-700 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${table
              .getBetDenomation()[2]
              .toString()}">
                <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                    <p class="text-gray-800 text-lg font-bold pb-1">\$${table.getBetDenomation()[2].toString()}</p>
                </div>
            </div> 
        </div>
        <div class="px-2">
            <div class="chip w-16 h-16 bg-gray-800 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${table
              .getBetDenomation()[3]
              .toString()}">
                <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                    <p class="text-gray-800 text-lg font-bold pb-1">\$${table.getBetDenomation()[3].toString()}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-between">
        <button id="clearBtn" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-700 shadow-lg shadow-red-600/50 font-bold rounded-lg w-32 py-2.5 mx-3">
        CLEAR
        </button>
        <button id="dealBtn" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:opacity-80 focus:ring-2 focus:outline-none focus: ring-green-600 shadow-lg shadow-green-600/50 font-bold rounded-lg w-32 py-2.5 mx-3">DEAL
        </button>
    </div>
    `

    const betAmountDiv: HTMLElement | null = MAINFIELD.querySelector('#onBetChips') as HTMLElement
    const ownChipsDiv: HTMLElement | null = MAINFIELD.querySelector('#ownChips') as HTMLElement
    const betChips: Element[] = [...betOrActionDiv.querySelectorAll('.chip')] as Element[]

    // チップ額の追加
    betChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const currentBetChips: number = parseInt(betAmountDiv.innerHTML || '0', 10)
        const chipValue: string | null = chip.getAttribute('data-chips')

        if (chipValue !== null) {
          const totalChip: number = currentBetChips + parseInt(chipValue, 10)
          const ownChips: number = players[1].getChips()

          if (totalChip <= ownChips) {
            betAmountDiv.innerHTML = totalChip.toString()
            ownChipsDiv.innerHTML = (ownChips - totalChip).toString()
          }
        }
      })
    })

    // Clearボタン
    betOrActionDiv.querySelector('#clearBtn')?.addEventListener('click', () => {
      if (betAmountDiv.innerHTML !== null) {
        betAmountDiv.innerHTML = '0'
        ownChipsDiv.innerHTML = players[1].getChips().toString()
      }
    })

    // Dealボタン
    betOrActionDiv.querySelector('#dealBtn')?.addEventListener('click', () => {
      const betAmount: number = parseInt(betAmountDiv.innerHTML, 10)
      const ownChips: number = parseInt(ownChipsDiv.innerHTML, 10)

      if (betAmount === 0) return

      players[1].setBet(betAmount)
      players[1].setChips(ownChips)

      Controller.playerActingPhase(table, betOrActionDiv)
    })
  }
}
