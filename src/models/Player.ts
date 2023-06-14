import { Card } from './Card'

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

  public setWinAmount(winAmount: number): void {
    this.winAmount = winAmount
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

  // 一枚だけ追加する
  public addHand(card: Card): void {
    this.hand.push(card)
  }

  // 手持ち自体を置き換える
  public setHand(hand: Card[]): void {
    this.hand = hand
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

  public getType(): string {
    return this.type
  }

  public isBlackJack(): boolean {
    if (this.getHandScore() === 21 && this.hand.length === 2) return true
    else return false
  }

  public checkFinishedAction(): boolean {
    const status: string = this.getGameStatus().toLowerCase()
    return (
      status === 'broken' ||
      status === 'stand' ||
      status === 'bust' ||
      status === 'surrender' ||
      status === 'blackjack' ||
      status === 'double'
    )
  }

  // AIプレイヤーのベットを決める
  public aiPlayerDecideBetAmount(): number {
    if (this.getGameStatus() === 'broke') return 0

    let budgetForOneRound: number = this.getChips() / 5 // 1ラウンドのベット上限
    // AIのベット額をランダムに決定（5で割り切れるようにし、最低でも5をベットする）
    let betAmount: number = Math.floor(Math.random() * (budgetForOneRound / 5 - 5) + 5) * 5
    return betAmount
  }

  // 手札の合計 (合計が21を超える場合、手札の各Aを、合計が21以下になるまで10を引く)
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
