import { ITestSessionRepository } from '../../domain/repositories/ITestSessionRepository';

/**
 * Confirm Payment Use Case
 * Updates session payment status after webhook confirmation
 */
export class ConfirmPaymentUseCase {
  constructor(private readonly testSessionRepository: ITestSessionRepository) {}

  async execute(sessionId: number, success: boolean): Promise<void> {
    const session = await this.testSessionRepository.findById(sessionId);
    
    if (!session) {
      throw new Error('Session not found');
    }

    const paymentStatus = success ? 'paid' : 'failed';
    await this.testSessionRepository.updatePaymentStatus(
      sessionId,
      paymentStatus,
      session.paymentIntentId
    );
  }
}

