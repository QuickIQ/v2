export interface Test {
  id: number;
  name: string;
  slug: string;
  category?: string;
  enabled: boolean;
  default_language: string;
  is_premium: boolean;
  price_cents: number;
  test_type: 'standard' | 'iq' | 'personality';
  translated_name?: string;
}

export interface Question {
  id: number;
  test_id: number;
  order_index: number;
  text_key: string;
  text: string;
  options: QuestionOption[];
  scoring_rule?: any;
}

export interface QuestionOption {
  key: string;
  points: number;
  text: string;
}

export interface Answer {
  question_id: number;
  option_key: string;
}

export interface TestResult {
  id: number;
  test_id: number;
  min_score: number;
  max_score: number;
  result_text_key: string;
  result_text?: string;
  tier: 'excellent' | 'good' | 'under_development';
  score?: number;
  testType?: string;
  type?: string; // For personality tests
}

export interface TestSubmissionResponse {
  sessionId: number;
  score: number;
  resultId: number;
  result: TestResult;
  requiresPayment: boolean;
}

