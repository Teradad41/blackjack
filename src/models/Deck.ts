import { Card } from './Card'

export class Deck {
  private gameType: string
  private deck: Card[]

  constructor(gameType: string) {
    this.gameType = gameType
    this.deck = []

    if (this.gameType === 'blackjack') this.deck = Deck.generateDeck()
  }

  public static generateDeck(): Card[] {
    const newDeck: Card[] = []
    const suits: string[] = ['H', 'D', 'C', 'S']
    const ranks: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

    for (const suit of suits) {
      for (const rank of ranks) {
        newDeck.push(new Card(suit, rank))
      }
    }
    return newDeck
  }

  public shuffle(): void {
    for (let i = this.deck!.length - 1; i >= 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1))
      ;[this.deck![i], this.deck![j]] = [this.deck![j], this.deck![i]]
    }
  }

  public resetDeck(): void {
    this.deck = Deck.generateDeck()
    this.shuffle()
  }

  public drawOne(): Card | undefined {
    return this.deck!.shift()
  }
}
