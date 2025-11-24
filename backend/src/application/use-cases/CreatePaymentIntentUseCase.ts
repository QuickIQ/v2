import { ITestRepository } from '../../domain/repositories/ITestRepository';
import { ITestSessionRepository } from '../../domain/repositories/ITestSessionRepository';
import { IPaymentProvider } from '../ports/IPaymentProvider';
import { TestSlug } from '../../domain/value-objects/TestSlug';
import { LanguageCode } from '../../domain/value-objects/LanguageCode';
import { Money } from '../../domain/value-objects/Money';

export interface CreatePaymentIntentRequest {
  testSlug: string;
  sessionId: number;
  amount?: number; // in cents
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

/**
 * Create Payment Intent Use Case
 * Creates a payment intent for a premium test
 */
export class CreatePaymentIntentUseCase {
  constructor(
    private readonly testRepository: ITestRepository,
    private readonly testSessionRepository: ITestSessionRepository,
    private readonly paymentProvider: IPaymentProvider
  ) {}

  async execute(request: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> {
    const testSlug = new TestSlug(request.testSlug);
    const langCode = new LanguageCode('en'); // Default language for payment

    // Verify test exists and is premium
    const test = await this.testRepository.findBySlug(testSlug, langCode);
    if (!test) {
      throw new Error('Test not found');
    }

    if (!test.isPremium) {
      throw new Error('Test is not premium');
    }

    // Verify session exists
    const session = await this.testSessionRepository.findById(request.sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Determine amount
    const amount = request.amount || test.price.getCents();
    const money = new Money(amount);

    // Create payment intent
    const paymentIntent = await this.paymentProvider.createPaymentIntent({
      amount: money,
      currency: 'usd',
      metadata: {
        testSlug: test.slug.toString(),
        sessionId: request.sessionId.toString(),
      },
    });

    // Update session with payment intent ID
    await this.testSessionRepository.updatePaymentStatus(
      request.sessionId,
      'pending',
      paymentIntent.paymentIntentId
    );

    return paymentIntent;
  }
}

