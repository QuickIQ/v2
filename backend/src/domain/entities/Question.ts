/**
 * Question Option
 */
export interface QuestionOption {
  key: string;
  points: number;
  isCorrect?: boolean;
}

/**
 * Scoring Rule for Personality Tests
 */
export interface ScoringRule {
  [optionKey: string]: string; // Maps option key to dimension (E, I, S, N, T, F, J, P)
}

/**
 * Question Entity
 * Represents a question in a test
 */
export class Question {
  constructor(
    public readonly id: number,
    public readonly testId: number,
    public readonly order: number,
    public readonly textKey: string,
    public readonly options: QuestionOption[],
    public readonly category: string | null = null,
    public readonly questionType: string | null = null,
    public readonly imageData: string | null = null,
    public readonly correctAnswerKey: string | null = null,
    public readonly difficultyWeight: number = 1.0,
    public readonly scoringRule: ScoringRule | null = null
  ) {}

  getOptionByKey(key: string): QuestionOption | undefined {
    return this.options.find(opt => opt.key === key);
  }

  getMaxPoints(): number {
    return Math.max(...this.options.map(opt => opt.points), 0);
  }
}

