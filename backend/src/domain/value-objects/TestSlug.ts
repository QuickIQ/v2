/**
 * Test Slug Value Object
 * Represents a unique identifier for a test
 */
export class TestSlug {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Test slug cannot be empty');
    }
    if (!/^[a-z0-9-]+$/.test(value)) {
      throw new Error('Test slug must contain only lowercase letters, numbers, and hyphens');
    }
    this.value = value.trim();
  }

  toString(): string {
    return this.value;
  }

  equals(other: TestSlug): boolean {
    return this.value === other.value;
  }
}

