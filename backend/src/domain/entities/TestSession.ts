import { Score } from '../value-objects/Score';

export type PaymentStatus = 'not_required' | 'pending' | 'paid' | 'failed';

export interface Answer {
  question_id: number;
  option_key: string;
}

/**
 * TestSession Entity
 * Represents a test session (user taking a test)
 */
export class TestSession {
  constructor(
    public readonly id: number,
    public readonly testId: number,
    public readonly email: string | null,
    public readonly answers: Answer[],
    public readonly rawScore: Score | null = null,
    public readonly iqScore: Score | null = null,
    public readonly resultTierId: number | null = null,
    public readonly paymentStatus: PaymentStatus = 'not_required',
    public readonly paymentIntentId: string | null = null,
    public readonly userId: number | null = null,
    public readonly sessionToken: string | null = null,
    public readonly categoryScores: Record<string, number> | null = null
  ) {}

  canAccessResult(): boolean {
    return this.paymentStatus === 'paid' || this.paymentStatus === 'not_required';
  }

  requiresPayment(): boolean {
    return this.paymentStatus === 'pending';
  }
}

