import { Controller } from '../controllers/Controllers'
import { MAINFIELD } from '../config'
import { Table } from '../models/Table'

export class ResultModalView {
  public static render(table: Table): void {
    const modalContentDiv = MAINFIELD?.querySelector('#modalContent')
    if (!modalContentDiv) return

    modalContentDiv.innerHTML = ResultModalView.createModalContent(table)

    const modalOverlay = modalContentDiv.querySelector('#modalOverlay') as HTMLElement
    const modalDiv = modalContentDiv.querySelector('#modalDiv') as HTMLElement
    const nextRoundBtn = modalContentDiv.querySelector('#nextRoundBtn') as HTMLButtonElement

    ResultModalView.showModal(modalOverlay, modalDiv)

    nextRoundBtn.addEventListener('click', () => {
      ResultModalView.hideModal(modalOverlay, modalDiv)
      Controller.roundOverPhase(table)
    })
  }

  private static createModalContent(table: Table): string {
    return `
        <div id="modalOverlay" class="fixed inset-0 bg-black opacity-50 z-10 hidden"></div>
        <div id="modalDiv" class="fixed inset-0 flex items-center justify-center opacity-0 invisible transition-opacity z-20">
            <div class="bg-white shadow-lg rounded-xl w-1/2 p-5">
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
                            <td class="text-center py-4 w-4/12">WIN</td>
                            <td class="text-center py-4 w-4/12">$100</td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-around">
                    <button id="nextRoundBtn" type="button"
                    class="border hover:text-white border-gray-900 hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    NEXT ROUND
                    </button>
                </div>
            </div>
        </div>
    `
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
}
