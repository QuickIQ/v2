import { Request, Response, NextFunction } from 'express';
import { ListTestsUseCase } from '../../application/use-cases/ListTestsUseCase';
import { StartTestUseCase } from '../../application/use-cases/StartTestUseCase';
import { GetQuestionsUseCase } from '../../application/use-cases/GetQuestionsUseCase';
import { SubmitAnswersUseCase } from '../../application/use-cases/SubmitAnswersUseCase';
import { CalculateResultUseCase } from '../../application/use-cases/CalculateResultUseCase';
import { SubmitAnswersRequestDTO } from '../../application/dto/TestDTO';

/**
 * Test Controller
 * Handles HTTP requests for test-related endpoints
 */
export class TestController {
  constructor(
    private readonly listTestsUseCase: ListTestsUseCase,
    private readonly startTestUseCase: StartTestUseCase,
    private readonly getQuestionsUseCase: GetQuestionsUseCase,
    private readonly submitAnswersUseCase: SubmitAnswersUseCase,
    private readonly calculateResultUseCase: CalculateResultUseCase
  ) {}

  listTests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const language = (req.query.lang as string) || 'en';
      const tests = await this.listTestsUseCase.execute(language);
      res.json(tests);
    } catch (error: any) {
      // If database error, return empty array instead of crashing
      if (error.code === 'ECONNREFUSED' || error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        console.warn('Database not connected, returning empty array:', error.message);
        res.json([]);
        return;
      }
      next(error);
    }
  };

  getTestBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { slug } = req.params;
      const language = (req.query.lang as string) || 'en';
      const test = await this.startTestUseCase.execute(slug, language);
      res.json(test);
    } catch (error: any) {
      if (error.message === 'Test not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      next(error);
    }
  };

  getQuestions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { slug } = req.params;
      const language = (req.query.lang as string) || 'en';
      const questions = await this.getQuestionsUseCase.execute(slug, language);
      res.json(questions);
    } catch (error: any) {
      if (error.message === 'Test not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      next(error);
    }
  };

  submitAnswers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { slug } = req.params;
      const request: SubmitAnswersRequestDTO = req.body;
      const language = (req.query.lang as string) || 'en';
      
      const result = await this.submitAnswersUseCase.execute(slug, request, language);
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Test not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      next(error);
    }
  };

  getResult = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const result = await this.calculateResultUseCase.execute(parseInt(sessionId, 10));
      res.json(result);
    } catch (error: any) {
      if (error.message === 'Session not found' || error.message === 'Result tier not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      if (error.message === 'Payment required to access result') {
        res.status(403).json({ error: error.message });
        return;
      }
      next(error);
    }
  };
}

