import { MAINFIELD } from '../config'
import { ActionView } from './ActionView'

export class BetView {
  public static render(): void {
    if (MAINFIELD) {
      const betOrActionDiv: HTMLElement = MAINFIELD.querySelector('#betOrActionDiv') as HTMLElement
      betOrActionDiv.innerHTML = `
            <div class="flex flex-col justify-center items-center mt-7 px-7 py-4" style="box-shadow: 0px -8px 10px rgba(0, 228, 0), 0px 8px 10px rgba(0, 228, 0);">
                <div class="flex justify-center">
                    <p class="px-5 text-3xl pb-1">BET: <span id="userBetAmount" class="text-4xl">0</span></p>
                </div>
                <div class="flex justify-around py-6">
                    <div class="px-2">
                        <div class="chip w-16 h-16 bg-red-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer" data-chips="5">
                        <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">$5</p>
                        </div>
                    </div>
                </div>
                <div class="px-2">
                    <div class="chip w-16 h-16 bg-green-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer" data-chips="20">
                        <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">$20</p>
                        </div>
                    </div>
                </div>
                <div class="px-2">
                    <div class="chip w-16 h-16 bg-blue-700 rounded-full shadow-xl flex justify-center items-center cursor-pointer" data-chips="50">
                        <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">$50</p>
                        </div>
                    </div> 
                </div>
                <div class="px-2">
                    <div class="chip w-16 h-16 bg-gray-800 rounded-full shadow-xl flex justify-center items-center cursor-pointer" data-chips="100">
                        <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">$100</p>
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
      const betChips = betOrActionDiv.querySelectorAll('.chip')

      for (const chip of betChips) {
        chip.addEventListener('click', () => {
          const currentChip: number = parseInt(betAmountDiv?.innerHTML || '0', 10)
          const chipValue: string | null = chip.getAttribute('data-chips')

          if (chipValue !== null) {
            const addedChip: number = parseInt(chipValue, 10)
            betAmountDiv.innerHTML = (currentChip + addedChip).toString()
          }
        })
      }

      betOrActionDiv.querySelector('#clearBtn')?.addEventListener('click', () => {
        betAmountDiv.innerHTML = '0'
      })

      betOrActionDiv.querySelector('#dealBtn')?.addEventListener('click', () => {
        if (betAmountDiv.innerHTML !== '0') ActionView.render(betOrActionDiv)
      })
    }
  }
}
