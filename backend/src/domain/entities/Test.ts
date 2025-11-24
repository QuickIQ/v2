import { TestSlug } from '../value-objects/TestSlug';
import { Money } from '../value-objects/Money';

export type TestType = 'standard' | 'iq' | 'personality' | 'custom';

/**
 * Test Entity
 * Represents a test in the system
 */
export class Test {
  constructor(
    public readonly id: number,
    public readonly slug: TestSlug,
    public readonly name: string,
    public readonly category: string | null,
    public readonly testType: TestType,
    public readonly isPremium: boolean,
    public readonly price: Money,
    public readonly defaultLanguage: string,
    public readonly enabled: boolean = true,
    public readonly orderIndex: number = 0
  ) {}

  static create(
    id: number,
    slug: string,
    name: string,
    category: string | null,
    testType: TestType,
    isPremium: boolean,
    priceCents: number,
    defaultLanguage: string,
    enabled: boolean = true,
    orderIndex: number = 0
  ): Test {
    return new Test(
      id,
      new TestSlug(slug),
      name,
      category,
      testType,
      isPremium,
      new Money(priceCents),
      defaultLanguage,
      enabled,
      orderIndex
    );
  }

  requiresPayment(): boolean {
    return this.isPremium;
  }
}

