import apiClient from '../../../lib/apiClient';

/**
 * Test API Types
 */
export interface Test {
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

export interface Question {
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

export interface SubmitAnswersRequest {
  answers: Array<{
    question_id: number;
    option_key: string;
  }>;
  email?: string;
}

export interface SubmitAnswersResponse {
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

/**
 * Test API Client
 * Handles all test-related API calls
 */
export const testApi = {
  /**
   * Get all enabled tests
   */
  getAll: async (lang?: string): Promise<Test[]> => {
    const response = await apiClient.get('/tests', { params: { lang } });
    return response.data;
  },

  /**
   * Get test by slug
   */
  getBySlug: async (slug: string, lang?: string): Promise<Test> => {
    const response = await apiClient.get(`/tests/${slug}`, { params: { lang } });
    return response.data;
  },

  /**
   * Get questions for a test
   */
  getQuestions: async (slug: string, lang?: string): Promise<Question[]> => {
    const response = await apiClient.get(`/tests/${slug}/questions`, { params: { lang } });
    return response.data;
  },

  /**
   * Submit test answers and get results
   * Scoring is done on the backend
   */
  submitAnswers: async (
    slug: string,
    request: SubmitAnswersRequest,
    lang?: string
  ): Promise<SubmitAnswersResponse> => {
    const response = await apiClient.post(`/tests/${slug}/submit`, request, {
      params: { lang },
    });
    return response.data;
  },

  /**
   * Get result for a session
   */
  getResult: async (sessionId: number): Promise<any> => {
    const response = await apiClient.get(`/tests/sessions/${sessionId}/result`);
    return response.data;
  },
};

