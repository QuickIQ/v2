import { Question } from '../entities/Question';
import { Answer } from '../entities/TestSession';
import { Score } from '../value-objects/Score';
import { ResultTier } from '../entities/ResultTier';

export interface ScoringResult {
  rawScore: Score;
  iqScore?: Score;
  categoryScores?: Record<string, number>;
  resultTier: ResultTier | null;
  resultData?: Record<string, any>;
}

/**
 * Scoring Strategy Interface
 * Defines how different test types calculate scores
 */
export interface IScoringStrategy {
  calculateScore(questions: Question[], answers: Answer[]): ScoringResult;
}

