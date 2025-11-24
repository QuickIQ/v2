/**
 * Test DTOs for API responses
 */
export interface TestResponseDTO {
  id: number;
  name: string;
  slug: string;
  category: string | null;
  testType: 'standard' | 'iq' | 'personality' | 'custom';
  isPremium: boolean;
  priceCents: number;
  defaultLanguage: string;
  enabled: boolean;
  orderIndex: number;
}

export interface QuestionResponseDTO {
  id: number;
  testId: number;
  order: number;
  text: string;
  textKey: string;
  options: Array<{
    key: string;
    text: string;
    points: number;
    isCorrect?: boolean;
  }>;
  category: string | null;
  questionType: string | null;
  imageData: string | null;
  correctAnswerKey: string | null;
  difficultyWeight: number;
  scoringRule: Record<string, string> | null;
}

export interface SubmitAnswersRequestDTO {
  answers: Array<{
    question_id: number;
    option_key: string;
  }>;
  email?: string;
}

export interface SubmitAnswersResponseDTO {
  sessionId: number;
  score: number;
  iqScore?: number;
  categoryScores?: Record<string, number>;
  resultId: number | null;
  result: {
    id: number;
    testId: number;
    minScore: number;
    maxScore: number;
    tier: string;
    resultTextKey: string;
    imageRef: string | null;
    score?: number;
    testType: string;
    type?: string; // For personality tests
    dimensions?: Record<string, number>;
  };
  requiresPayment: boolean;
}

export interface ResultResponseDTO {
  id: number;
  testId: number;
  minScore: number;
  maxScore: number;
  tier: string;
  resultTextKey: string;
  imageRef: string | null;
}

