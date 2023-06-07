export class GameDecision {
  private action: string;
  private amount: number;

  constructor(action: string, amount: number) {
    this.action = action;
    this.amount = amount;
  }

  public getAction(): string {
    return this.action;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAction(action: string): void {
    this.action = action;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }
}
