import express from 'express';
import { TestController } from '../controllers/TestController';

/**
 * Test Routes
 * Defines HTTP endpoints for test operations
 */
export const createTestRoutes = (controller: TestController): express.Router => {
  const router = express.Router();

  router.get('/', controller.listTests);
  router.get('/:slug', controller.getTestBySlug);
  router.get('/:slug/questions', controller.getQuestions);
  router.post('/:slug/submit', controller.submitAnswers);
  router.get('/sessions/:sessionId/result', controller.getResult);

  return router;
};

