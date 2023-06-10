import { Card } from './Card'
import { GameDecision } from './GameDicision'

export class Player {
  private name: string
  private type: string
  private gameType: string
  private chips: number
  private hand: Card[]
  private bet: number
  private winAmount: number
  private gameStatus: string

  constructor(name: string, type: string, gameType: string, chips: number = 400) {
    this.name = name
    this.type = type
    this.gameType = gameType
    this.chips = chips
    this.hand = []
    this.bet = 0
    this.winAmount = 0
    this.gameStatus = 'betting'
  }

  public getName(): string {
    return this.name
  }

  public getGameStatus(): string {
    return this.gameStatus
  }

  public getGameType(): string {
    return this.gameType
  }

  public getChips(): number {
    return this.chips
  }

  public setChips(chips: number): void {
    this.chips = chips
  }

  public getWinAmount(): number {
    return this.winAmount
  }

  public getBet(): number {
    return this.bet
  }

  public setBet(bet: number): void {
    this.bet = bet
  }

  public getHand(): Card[] {
    return this.hand
  }

  // 手持ち自体を置き換える
  public setHand(hand: Card[]): void {
    this.hand = hand
  }

  // 一枚だけを追加する
  public addHand(card: Card): void {
    this.hand.push(card)
  }

  public setGameStatus(status: string): void {
    this.gameStatus = status
  }

  public clearHand(): void {
    this.hand = []
  }

  public clearBet(): void {
    this.bet = 0
  }

  // 状態を考慮した上で、プレイヤーが行った意思決定を返す
  public promptPlayer(): GameDecision {
    const action: string = this.gameStatus
    const amount: number = this.bet

    return new GameDecision(action, amount)
  }

  // 合計が21を超える場合、手札の各Aを、合計が21以下になるまで10を引く
  public getHandScore(): number {
    let handScore: number = 0
    let aceCount: number = 0

    for (const card of this.hand) {
      handScore += card.getRankNumber()
      if (card.getRank() === 'A') aceCount++
    }

    while (handScore > 21 && aceCount > 0) {
      handScore -= 10
      aceCount--
    }

    return handScore
  }
}
