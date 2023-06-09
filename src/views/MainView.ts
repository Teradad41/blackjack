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
                <div class="text-center text-white flex p-1 justify-between">
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
                <div id="betOrActionDiv"></div>
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
