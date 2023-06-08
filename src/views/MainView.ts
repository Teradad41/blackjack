import { MAINFIELD } from '../config'

export class MainView {
  public static render(): void {
    if (MAINFIELD) {
      MAINFIELD.classList.remove('hidden')
      MAINFIELD.classList.add('block')

      MAINFIELD.innerHTML = `
        <div class="h-screen flex justify-center" style="background: #1D4434; color: white;">
            <div id="gameDiv" class="container flex flex-col justify-center items-center px-4 py-8">
                <div id="houseCardDiv" class="flex justify-center py-3"></div>

                <div class="container flex justify-center">
                    <div class="flex flex-col items-center justify-center px-8" id="surrenderBtn">
                        <button class="bg-gradient-to-br from-red-500 to-red-800 circle-button rounded-full hover:opacity-80">
                            <i class="fas fa-flag fa-2xl"></i>
                        </button>
                        <div class="font-bold text-center pt-2">SURRENDER</div>
                    </div>
                    <div class="flex flex-col items-center justify-center px-8" id="surrenderBtn">
                        <button class="bg-gradient-to-br from-green-600 to-green-800 circle-button rounded-full hover:opacity-80">
                            <i class="fas fa-hand fa-2xl"></i>
                        </button>
                        <div class="font-bold text-center pt-2">STAND</div>
                    </div>
                    <div class="flex flex-col items-center justify-center px-8" id="surrenderBtn">
                        <button class="bg-gradient-to-br from-yellow-300 to-yellow-500 circle-button rounded-full hover:opacity-80">
                            <i class="fa-solid fa-copy fa-2xl"></i>
                        </button>
                        <div class="font-bold text-center pt-2">HIT</div>
                    </div>
                    <div class="flex flex-col items-center justify-center px-8" id="surrenderBtn">
                        <button class="bg-gradient-to-br from-blue-500 to-blue-800 circle-button rounded-full hover:opacity-70">
                            <i class="fas fa-coins fa-2xl"></i>
                        </button>
                        <div class="font-bold text-center pt-2">DOUBLE</div>
                    </div>
                </div>
            </div>
        </div>
      `
    }
  }
}
