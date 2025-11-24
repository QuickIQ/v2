import { ResultTier } from '../entities/ResultTier';
import { Score } from '../value-objects/Score';

/**
 * Result Repository Interface
 * Defines how to access result tier data
 */
export interface IResultRepository {
  findByTestIdAndScore(testId: number, score: Score): Promise<ResultTier | null>;
  findByTestId(testId: number): Promise<ResultTier[]>;
  findById(id: number): Promise<ResultTier | null>;
}

