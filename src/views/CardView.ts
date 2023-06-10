import { MAINFIELD } from '../config'
import { Card } from '../models/Card'

export class CardView {
  public static renderCard(card: Card): string {
    const suit: string = card.getSuit()
    const rank: string = card.getRank()
    const color: string = suit === 'H' || suit === 'D' ? 'text-red-600' : 'text-black'
    const symbol: string = CardView.getSuitSymbol(suit)

    return `
    <div class="card h-36 w-28 relative mx-1 cursor-pointer">
      <div class="back rounded shadow-xl absolute bg-gradient-to-br from-red-900 to-red-600 border-4 border-white flex justify-center items-center ${color}">
        <div class="text-3xl text-white opacity-50">♦</div>
      </div>
      <div class="front rounded shadow-xl bg-white absolute flex justify-center items-center text-red-500">
        <div class="w-4 text-center absolute top-0 left-1">
          <div class="h-4 text-l">${rank}</div>
          <div class="h-4 mt-1">${symbol}</div>
        </div>
        <div class="text-2xl">${symbol}</div>
        <div class="w-4 text-center absolute bottom-0 right-1 rotate-180">
          <div class="h-4 text-l">${rank}</div>
          <div class="h-4 mt-1">${symbol}</div>
        </div>
      </div>
    </div>
    `
  }

  public static rotateCards(divName: string): void {
    const cardDiv: HTMLElement = MAINFIELD?.querySelector(`#${divName}`) as HTMLElement
    if (!cardDiv) return

    const cards = Array.from(cardDiv.querySelectorAll('.card'))
    // House は一枚だけを表にする
    if (divName === 'houseCardDiv') {
      const card: Element = cards[0]
      if (card) {
        this.addRotateClass(card, '.front', 'rotate-front')
        this.addRotateClass(card, '.back', 'rotate-back')
      }
    } else {
      // user ai は 2枚とも表にする
      cards.forEach((card) => {
        this.addRotateClass(card, '.front', 'rotate-front')
        this.addRotateClass(card, '.back', 'rotate-back')
      })
    }
  }

  private static addRotateClass(card: Element, selector: string, className: string): void {
    const element: HTMLElement = card.querySelector(selector) as HTMLElement
    if (element) element.classList.add(className)
  }

  private static getSuitSymbol(suit: string): string {
    switch (suit) {
      case 'H':
        return '♥'
      case 'D':
        return '♦︎'
      case 'C':
        return '♣'
      default:
        return '♠'
    }
  }
}
