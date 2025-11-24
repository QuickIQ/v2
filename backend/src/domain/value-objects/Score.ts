/**
 * Score Value Object
 * Represents a test score
 */
export class Score {
  private readonly value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Score cannot be negative');
    }
    if (!Number.isFinite(value)) {
      throw new Error('Score must be a finite number');
    }
    this.value = Math.round(value);
  }

  getValue(): number {
    return this.value;
  }

  add(other: Score): Score {
    return new Score(this.value + other.getValue());
  }

  equals(other: Score): boolean {
    return this.value === other.getValue();
  }

  isGreaterThan(other: Score): boolean {
    return this.value > other.getValue();
  }

  isLessThan(other: Score): boolean {
    return this.value < other.getValue();
  }
}

