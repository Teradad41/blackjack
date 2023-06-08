import { Card } from 'models/Card'

export class CardView {
  public static render(card: Card) {
    const suit: string = card.getSuit()
    const rank: string = card.getRank()
    const color: string = suit === 'H' || suit === 'D' ? 'text-red-500' : 'text-black'
    const symbol: string = CardView.getSuitSymbol(suit)

    return `
    <div class="rounded h-36 w-28 mx-1 bg-white relative flex justify-center items-center ${color}">
        <div class="w-4 text-center absolute top-0 left-1">
            <div class="h-4 text-2xl">${rank}</div>
            <div class="h-4 mt-3">${symbol}</div>
        </div>
        <div class="text-2xl">${symbol}</div>
        <div class="w-4 text-center absolute bottom-0 right-1 rotate-180">
            <div class="h-4 text-2xl">${rank}</div>
            <div class="h-4 mt-3">${symbol}</div>
        </div>
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
