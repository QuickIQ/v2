/**
 * Money Value Object
 * Represents monetary amounts in cents
 */
export class Money {
  private readonly cents: number;

  constructor(cents: number) {
    if (cents < 0) {
      throw new Error('Money amount cannot be negative');
    }
    if (!Number.isInteger(cents)) {
      throw new Error('Money amount must be an integer (cents)');
    }
    this.cents = cents;
  }

  static fromDollars(dollars: number): Money {
    return new Money(Math.round(dollars * 100));
  }

  getCents(): number {
    return this.cents;
  }

  getDollars(): number {
    return this.cents / 100;
  }

  add(other: Money): Money {
    return new Money(this.cents + other.cents);
  }

  equals(other: Money): boolean {
    return this.cents === other.cents;
  }
}

