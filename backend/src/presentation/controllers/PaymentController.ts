import { Request, Response, NextFunction } from 'express';
import { CreatePaymentIntentUseCase } from '../../application/use-cases/CreatePaymentIntentUseCase';
import { ConfirmPaymentUseCase } from '../../application/use-cases/ConfirmPaymentUseCase';
import { ITestSessionRepository } from '../../domain/repositories/ITestSessionRepository';

/**
 * Payment Controller
 * Handles HTTP requests for payment-related endpoints
 */
export class PaymentController {
  constructor(
    private readonly createPaymentIntentUseCase: CreatePaymentIntentUseCase,
    private readonly confirmPaymentUseCase: ConfirmPaymentUseCase,
    private readonly testSessionRepository: ITestSessionRepository
  ) {}

  createPaymentIntent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { testSlug, sessionId, amount } = req.body;
      const result = await this.createPaymentIntentUseCase.execute({
        testSlug,
        sessionId,
        amount,
      });
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Test not found' || error.message === 'Session not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      if (error.message === 'Test is not premium') {
        res.status(400).json({ error: error.message });
        return;
      }
      next(error);
    }
  };

  handleWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const event = (req as any).stripeEvent; // Attached by middleware
      
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const { sessionId } = paymentIntent.metadata;
        if (sessionId) {
          await this.confirmPaymentUseCase.execute(parseInt(sessionId, 10), true);
        }
      }

      res.json({ received: true });
    } catch (error) {
      next(error);
    }
  };

  getPaymentStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const session = await this.testSessionRepository.findById(parseInt(sessionId, 10));
      
      if (!session) {
        res.status(404).json({ error: 'Session not found' });
        return;
      }

      res.json({ 
        paid: session.paymentStatus === 'paid',
        paymentStatus: session.paymentStatus,
      });
    } catch (error) {
      next(error);
    }
  };
}

