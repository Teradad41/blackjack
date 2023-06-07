export class Card {
  private suit: string;
  private rank: string;

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  public getRank(): string {
    return this.rank;
  }

  public getRankNumber(): number {
    if (this.rank === "A") return 11;
    else if (this.rank === "J" || this.rank === "Q" || this.rank === "K")
      return 10;
    else return parseInt(this.rank, 10);
  }
}
