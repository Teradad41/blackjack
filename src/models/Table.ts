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
  private resultsLog: string[]

  constructor(gameType: string, betDenomination: number[] = [5, 20, 50, 100]) {
    this.gameType = gameType
    this.betDenomination = betDenomination
    this.gamePhase = 'betting'
    this.deck = new Deck(gameType)
    this.deck.shuffle()
    this.turnCorner = 0
    this.resultsLog = []

    this.players = []
    this.house = new Player('house', 'house', this.gameType)
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

  /*
    Player player : テーブルは、Player.promptPlayer()を使用してGameDecisionを取得し、GameDecisionとgameTypeに応じてPlayerの状態を更新します。
    return Null : このメソッドは、プレーヤの状態を更新するだけです。
    例.プレイヤーが「ヒット」し、手札が21以上の場合、gameStatusを「バスト」に設定し、チップからベットを引きます。
  */
  evaluateMove(player: Player): void {
    if (player.getChips() <= 0) player.setGameStatus('broken')
    if (player.getHandScore() > 21) {
      player.setGameStatus('bust')
      player.setChips(player.getChips() - player.getBet())
    }
  }

  /*
    return String: 新しいターンが始まる直前の全プレイヤーの状態を表す文字列。
    NOTE: このメソッドの出力は、各ラウンドの終了時にテーブルのresultsLogメンバを更新するために使用されます。
  */
  blackjackEvaluateAndGetRoundResults(): string {
    return ''
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

  blackjackClearPlayerHandsAndBets(): void {
    for (const player of this.players) {
      player.clearHand()
      player.clearBet()
    }

    this.house.clearHand()
    this.house.clearBet()
  }

  getTurnPlayer(): Player {
    return this.players[this.turnCorner % this.players.length]
  }

  /*
    Number userData: テーブルモデルの外部から渡されるデータです。 
    return null: このメソッドはテーブルの状態を更新するだけで、値を返しません。
  */
  public haveTurn(userData: number): void {
    if (this.gamePhase === 'roundOver') return
    const currentPlayer: Player = this.getTurnPlayer()
    // プレイヤーに行動を促す
    currentPlayer.promptPlayer()
    this.turnCorner++
  }

  onFirstPlayer(): boolean {
    return this.turnCorner % this.players.length === 0
  }

  onLastPlayer(): boolean {
    return this.turnCorner % this.players.length === 2
  }

  // acting フェーズを終了させるために使う
  allPlayerActionsResolved(): boolean {
    const resolvedPlayers = this.players.filter((player: Player) => {
      const status: string = player.getGameStatus().toLowerCase()
      return (
        status === 'broken' ||
        status === 'stand' ||
        status === 'bust' ||
        status === 'surrender' ||
        status === 'blackjack'
      )
    })
    return resolvedPlayers.length === this.players.length
  }
}
