import { TestSession, Answer } from '../entities/TestSession';
import { Score } from '../value-objects/Score';

/**
 * Test Session Repository Interface
 * Defines how to access test session data
 */
export interface ITestSessionRepository {
  create(
    testId: number,
    email: string | null,
    answers: Answer[],
    rawScore: Score | null,
    iqScore: Score | null,
    resultTierId: number | null,
    paymentStatus: TestSession['paymentStatus'],
    userId?: number | null,
    sessionToken?: string | null,
    categoryScores?: Record<string, number> | null
  ): Promise<TestSession>;
  findById(id: number): Promise<TestSession | null>;
  updatePaymentStatus(id: number, paymentStatus: TestSession['paymentStatus'], paymentIntentId?: string | null): Promise<void>;
}

