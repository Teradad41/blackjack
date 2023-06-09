import { Card } from 'models/Card'

export class CardView {
  public static render(card: Card): string {
    const suit: string = card.getSuit()
    const rank: string = card.getRank()
    const color: string = suit === 'H' || suit === 'D' ? 'text-red-600' : 'text-black'
    const symbol: string = CardView.getSuitSymbol(suit)

    return `
    <div class="rounded shadow-xl h-[8.8rem] w-28 mx-1 bg-white relative flex justify-center items-center ${color}">
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
    `
  }

  public static renderCardReverse(): string {
    return `
      <div class="rounded shadow-xl h-[8.8rem] w-28 mx-1 bg-gradient-to-br from-red-900 to-red-600
          border-4 border-white flex justify-center items-center">
            <div class="text-3xl text-white opacity-50">♦</div>
      </div>
    `
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
