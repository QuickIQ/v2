import { Pool } from 'pg';
import { ITestSessionRepository } from '../../domain/repositories/ITestSessionRepository';
import { TestSession, Answer, PaymentStatus } from '../../domain/entities/TestSession';
import { Score } from '../../domain/value-objects/Score';

/**
 * Postgres Implementation of ITestSessionRepository
 */
export class PostgresTestSessionRepository implements ITestSessionRepository {
  constructor(private readonly pool: Pool) {}

  async create(
    testId: number,
    email: string | null,
    answers: Answer[],
    rawScore: Score | null,
    iqScore: Score | null,
    resultTierId: number | null,
    paymentStatus: PaymentStatus,
    userId?: number | null,
    sessionToken?: string | null,
    categoryScores?: Record<string, number> | null
  ): Promise<TestSession> {
    const result = await this.pool.query(
      `INSERT INTO test_sessions (
        test_id, email, answers, total_score, 
        category_scores, result_id, paid,
        user_id, session_token, payment_intent_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id`,
      [
        testId,
        email,
        JSON.stringify(answers),
        rawScore?.getValue() || null,
        categoryScores ? JSON.stringify(categoryScores) : null,
        resultTierId,
        paymentStatus === 'paid',
        userId || null,
        sessionToken || null,
        null, // payment_intent_id set later
      ]
    );

    const id = result.rows[0].id;

    return new TestSession(
      id,
      testId,
      email,
      answers,
      rawScore,
      iqScore,
      resultTierId,
      paymentStatus,
      null, // paymentIntentId
      userId || null,
      sessionToken || null,
      categoryScores || null
    );
  }

  async findById(id: number): Promise<TestSession | null> {
    const result = await this.pool.query(
      'SELECT * FROM test_sessions WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToTestSession(result.rows[0]);
  }

  async updatePaymentStatus(
    id: number,
    paymentStatus: PaymentStatus,
    paymentIntentId?: string | null
  ): Promise<void> {
    await this.pool.query(
      `UPDATE test_sessions 
       SET paid = $1, payment_intent_id = $2
       WHERE id = $3`,
      [
        paymentStatus === 'paid',
        paymentIntentId || null,
        id,
      ]
    );
  }

  private mapRowToTestSession(row: any): TestSession {
    // Determine payment status from paid boolean and payment_intent_id
    let paymentStatus: PaymentStatus = 'not_required';
    if (row.paid) {
      paymentStatus = 'paid';
    } else if (row.payment_intent_id) {
      paymentStatus = 'pending';
    }

    return new TestSession(
      row.id,
      row.test_id,
      row.email,
      row.answers || [],
      row.total_score ? new Score(row.total_score) : null,
      null, // iqScore not stored separately in current schema
      row.result_id,
      paymentStatus,
      row.payment_intent_id || null,
      row.user_id || null,
      row.session_token || null,
      row.category_scores || null
    );
  }
}

