import { ITestSessionRepository } from '../../domain/repositories/ITestSessionRepository';
import { IResultRepository } from '../../domain/repositories/IResultRepository';
import { ResultResponseDTO } from '../dto/TestDTO';

/**
 * Calculate Result Use Case
 * Returns final result for a completed test session
 */
export class CalculateResultUseCase {
  constructor(
    private readonly testSessionRepository: ITestSessionRepository,
    private readonly resultRepository: IResultRepository
  ) {}

  async execute(sessionId: number): Promise<ResultResponseDTO> {
    const session = await this.testSessionRepository.findById(sessionId);
    
    if (!session) {
      throw new Error('Session not found');
    }

    if (!session.canAccessResult()) {
      throw new Error('Payment required to access result');
    }

    if (!session.resultTierId) {
      throw new Error('Result not calculated for this session');
    }

    const resultTier = await this.resultRepository.findById(session.resultTierId);
    
    if (!resultTier) {
      throw new Error('Result tier not found');
    }

    return {
      id: resultTier.id,
      testId: resultTier.testId,
      minScore: resultTier.minScore.getValue(),
      maxScore: resultTier.maxScore.getValue(),
      tier: resultTier.tier,
      resultTextKey: resultTier.resultTextKey,
      imageRef: resultTier.imageRef,
    };
  }
}

