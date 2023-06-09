import { MAINFIELD } from '../config'

export class MainView {
  public static render(userName: string, gameType: string): void {
    if (MAINFIELD) {
      MainView.displayBlock(MAINFIELD)
      MAINFIELD.innerHTML = `
        <div class="h-screen flex justify-center" style="background: #1D4434; color: white;">            
          <div class="container pt-10">
            <p class="text-center text-yellow-300 text-3xl">House</p>
            <div class="flex justify-center py-2">
              <button class="bg-white value-circle rounded-full cursor-default" disabled>
                <p id="houseScore" class="text-black mb-1 font-bold text-xl">0</p>
              </button>
            </div>

            <div id="houseCardDiv" class="flex justify-center py-3"></div>

            <div id="playersDiv" class="flex justify-center pt-[3.2rem]">
              <div id="userDiv" class="flex flex-col items-center">
                <p class="text-center text-yellow-300 text-3xl">${userName}</p>
                <div class="text-center text-white flex m-0 p-1 justify-between">
                  <p class="rem1 px-2 text-left">BET: <span class="text-xl">0</span></p>
                  <p class="rem1 px-2 text-left">CHIP: <span class="text-xl">400</span></p>
                </div>
                <div class="flex justify-center py-2">
                  <button class="bg-white value-circle rounded-full cursor-default" disabled>
                    <p id="userScore" class="text-black mb-1 font-bold text-xl">0</p>
                  </button>
                </div>
                <div class="flex justify-center py-1">
                  <button class="bg-gray-500 rounded-lg w-40 py-1 cursor-default" disabled>
                    <p class="">WAITING</p>
                  </button>
                </div>

                <div id="userCardDiv" class="flex justify-center pt-5"></div>

                <div class="flex flex-col justify-center items-center mt-7 px-7 py-4" style="box-shadow: 0px -8px 10px rgba(0, 228, 0), 0px 8px 10px rgba(0, 228, 0);">
                  <div class="flex justify-center">
                    <p class="px-5 text-3xl pb-1">BET: <span id="userBetAmount" class="text-4xl">0</span></p>
                    <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-3 py-2">
                    CLEAR
                    </button>
                  </div>
                  <div class="flex justify-around py-6">
                    <div class="px-2">
                      <div id="fiveChip" class="w-16 h-16 bg-red-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer">
                          <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">$5</p>
                          </div>
                      </div>
                    </div>                        
                    <div class="px-2">
                      <div id="twentyChip" class="w-16 h-16 bg-green-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer">
                          <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">$20</p>
                          </div>
                      </div>
                    </div>                        
                    <div class="px-2">
                      <div id="fiftyChip" class="w-16 h-16 bg-blue-700 rounded-full shadow-xl flex justify-center items-center cursor-pointer">
                          <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">$50</p>
                          </div>
                      </div>
                    </div>                        
                    <div class="px-2">
                      <div id="oneHundredChip" class="w-16 h-16 bg-gray-800 rounded-full shadow-xl flex justify-center items-center cursor-pointer">
                          <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                            <p class="text-gray-800 text-lg font-bold pb-1">$100</p>
                          </div>
                      </div>
                    </div>                        
                  </div>
                  <button type="button" class="bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4      focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 font-bold rounded-lg w-40 py-2.5">DEAL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>  
      `
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
