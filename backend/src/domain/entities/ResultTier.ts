import { Score } from '../value-objects/Score';

export type Tier = 'excellent' | 'good' | 'under_development' | 'exceptional' | 'above_average';

/**
 * ResultTier Entity
 * Represents a result tier for a test score range
 */
export class ResultTier {
  constructor(
    public readonly id: number,
    public readonly testId: number,
    public readonly minScore: Score,
    public readonly maxScore: Score,
    public readonly tier: Tier,
    public readonly resultTextKey: string,
    public readonly imageRef: string | null = null
  ) {}

  matchesScore(score: Score): boolean {
    return (
      (score.equals(this.minScore) || score.isGreaterThan(this.minScore)) &&
      (score.equals(this.maxScore) || score.isLessThan(this.maxScore))
    );
  }
}

