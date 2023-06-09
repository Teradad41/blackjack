export class ActionView {
  public static render(betOrActionDiv: HTMLElement): void {
    betOrActionDiv.innerHTML = ''
    betOrActionDiv.innerHTML = `
        <div class="flex justify-around items-center pt-11">
        <div id="surrenderBtn" class="flex flex-col items-center justify-center px-8">
            <button class="bg-gradient-to-br from-red-500 to-red-800 circle-button rounded-full hover:opacity-80">
                <i class="fas fa-flag fa-2xl"></i>
            </button>
            <div class="font-bold text-center pt-2">SURRENDER</div>
        </div>
        <div class="flex flex-col items-center justify-center px-8" id="standBtn">
            <button class="bg-gradient-to-br from-green-600 to-green-800 circle-button rounded-full hover:opacity-80">
                <i class="fas fa-hand fa-2xl"></i>
            </button>
            <div class="font-bold text-center pt-2">STAND</div>
        </div>
        <div class="flex flex-col items-center justify-center px-8" id="hitBtn">
            <button class="bg-gradient-to-br from-yellow-300 to-yellow-500 circle-button rounded-full hover:opacity-80">
                <i class="fa-solid fa-copy fa-2xl"></i>
            </button>
            <div class="font-bold text-center pt-2">HIT</div>
        </div>
        <div class="flex flex-col items-center justify-center px-8" id="doubleBtn">
            <button class="bg-gradient-to-br from-blue-500 to-blue-800 circle-button rounded-full hover:opacity-70">
                <i class="fas fa-coins fa-2xl"></i>
            </button>
            <div class="font-bold text-center pt-2">DOUBLE</div>
        </div>
        </div>
        `
  }
}
