import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { env } from './infrastructure/config/env';
import { pool } from './db/connection';

// Domain
import { ScoringService } from './domain/services/ScoringService';

// Infrastructure
import { PostgresTestRepository } from './infrastructure/db/PostgresTestRepository';
import { PostgresQuestionRepository } from './infrastructure/db/PostgresQuestionRepository';
import { PostgresResultRepository } from './infrastructure/db/PostgresResultRepository';
import { PostgresTestSessionRepository } from './infrastructure/db/PostgresTestSessionRepository';
import { PostgresTranslationRepository } from './infrastructure/db/PostgresTranslationRepository';
import { StripePaymentProvider } from './infrastructure/payments/StripePaymentProvider';

// Application
import { ListTestsUseCase } from './application/use-cases/ListTestsUseCase';
import { StartTestUseCase } from './application/use-cases/StartTestUseCase';
import { GetQuestionsUseCase } from './application/use-cases/GetQuestionsUseCase';
import { SubmitAnswersUseCase } from './application/use-cases/SubmitAnswersUseCase';
import { CalculateResultUseCase } from './application/use-cases/CalculateResultUseCase';
import { CreatePaymentIntentUseCase } from './application/use-cases/CreatePaymentIntentUseCase';
import { ConfirmPaymentUseCase } from './application/use-cases/ConfirmPaymentUseCase';

// Presentation
import { TestController } from './presentation/controllers/TestController';
import { PaymentController } from './presentation/controllers/PaymentController';
import { createTestRoutes } from './presentation/routes/testRoutes';
import { createPaymentRoutes } from './presentation/routes/paymentRoutes';
import { errorHandler } from './presentation/middlewares/errorHandler';

/**
 * Bootstrap Server
 * Sets up dependency injection and starts Express server
 */
export function createApp(): express.Application {
  const app = express();

  // Middleware
  // CORS configuration - support multiple origins
  const allowedOrigins = env.CORS_ORIGIN.split(',').map(origin => origin.trim());
  app.use(cors({ 
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // In development, allow any localhost origin
        if (env.NODE_ENV === 'development' && origin.includes('localhost')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get('/health', async (req, res) => {
    try {
      await pool.query('SELECT 1');
      res.json({ status: 'ok', database: 'connected' });
    } catch (error) {
      res.status(500).json({ status: 'error', database: 'disconnected' });
    }
  });

  // Initialize repositories
  const testRepository = new PostgresTestRepository(pool);
  const questionRepository = new PostgresQuestionRepository(pool);
  const resultRepository = new PostgresResultRepository(pool);
  const testSessionRepository = new PostgresTestSessionRepository(pool);
  const translationRepository = new PostgresTranslationRepository(pool);

  // Initialize services
  const scoringService = new ScoringService(resultRepository);

  // Initialize payment provider
  const paymentProvider = new StripePaymentProvider(
    env.STRIPE_SECRET_KEY,
    '2023-10-16'
  );

  // Initialize use cases
  const listTestsUseCase = new ListTestsUseCase(testRepository, translationRepository);
  const startTestUseCase = new StartTestUseCase(testRepository);
  const getQuestionsUseCase = new GetQuestionsUseCase(
    testRepository,
    questionRepository,
    translationRepository
  );
  const submitAnswersUseCase = new SubmitAnswersUseCase(
    testRepository,
    questionRepository,
    testSessionRepository,
    scoringService
  );
  const calculateResultUseCase = new CalculateResultUseCase(
    testSessionRepository,
    resultRepository
  );
  const createPaymentIntentUseCase = new CreatePaymentIntentUseCase(
    testRepository,
    testSessionRepository,
    paymentProvider
  );
  const confirmPaymentUseCase = new ConfirmPaymentUseCase(testSessionRepository);

  // Initialize controllers
  const testController = new TestController(
    listTestsUseCase,
    startTestUseCase,
    getQuestionsUseCase,
    submitAnswersUseCase,
    calculateResultUseCase
  );
  const paymentController = new PaymentController(
    createPaymentIntentUseCase,
    confirmPaymentUseCase,
    testSessionRepository
  );

  // Setup routes
  app.use('/api/tests', createTestRoutes(testController));
  app.use('/api/payments', createPaymentRoutes(paymentController));

  // Error handling
  app.use(errorHandler);

  return app;
}

// Start server if this file is run directly
if (require.main === module) {
  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
  });
}

