import { Card } from './Card'
import { Deck } from './Deck'
import { Player } from './Player'

export class Table {
  private gameType: string
  private betDenomination: number[]
  private deck: Deck
  private players: Player[]
  private house: Player
  private gamePhase: string
  private turnCorner: number
  private round: number

  constructor(gameType: string, betDenomination: number[] = [5, 20, 50, 100]) {
    this.gameType = gameType
    this.betDenomination = betDenomination
    this.gamePhase = 'betting'
    this.deck = new Deck(gameType)
    this.deck.shuffle()
    this.turnCorner = 0
    this.round = 1

    this.players = []
    this.house = new Player('house', 'house', this.gameType)
  }

  public getGameType(): string {
    return this.gameType
  }

  public getPlayers(): Player[] {
    return this.players
  }

  public setPlayers(players: Player[]): void {
    this.players = players
  }

  public getHouse(): Player {
    return this.house
  }

  public getBetDenomation(): number[] {
    return this.betDenomination
  }

  public getGamePhase(): string {
    return this.gamePhase
  }

  public setGamePhase(gamePhase: string): void {
    this.gamePhase = gamePhase
  }

  public getDeck(): Deck {
    return this.deck
  }

  public getRound(): number {
    return this.round
  }

  public incrementRound(): void {
    this.round++
  }

  public blackjackAssignPlayerHands(): void {
    for (const player of this.players) {
      const hand: Card[] | undefined = this.checkNotUndefinedAndGetTwo()
      if (hand !== undefined) player.setHand(hand)
    }

    const houseHand: Card[] | undefined = this.checkNotUndefinedAndGetTwo()
    if (houseHand !== undefined) this.house.setHand(houseHand)
  }

  private checkNotUndefinedAndGetTwo(): Card[] | undefined {
    const card1: Card | undefined = this.deck.drawOne()
    const card2: Card | undefined = this.deck.drawOne()

    if (card1 !== undefined && card2 !== undefined) return [card1, card2]
    else return undefined
  }

  blackjackClearHandsAndBets(): void {
    this.players.forEach((player: Player) => {
      player.clearHand()
      player.clearBet()
    })

    this.house.clearHand()
    this.house.clearBet()
  }

  getTurnPlayer(): Player {
    return this.players[this.turnCorner % this.players.length]
  }

  onFirstPlayer(): boolean {
    return this.turnCorner % this.players.length === 0
  }

  onLastPlayer(): boolean {
    return this.turnCorner % this.players.length === 2
  }

  allPlayerActionsResolved(): boolean {
    const resolvedPlayers = this.players.filter((player: Player) => {
      const status: string = player.getGameStatus().toLowerCase()
      return (
        status === 'broken' ||
        status === 'stand' ||
        status === 'bust' ||
        status === 'surrender' ||
        status === 'blackjack' ||
        status === 'double'
      )
    })
    return resolvedPlayers.length === this.players.length
  }
}
