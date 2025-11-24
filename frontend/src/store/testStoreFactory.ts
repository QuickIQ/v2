import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { testApi, SubmitAnswersResponse } from '../features/tests';

// Generic interfaces for all tests
export interface TestQuestion {
  id: number;
  text: string;
  options: string[];
  reverse?: boolean;
}

export interface TestAnswer {
  question_id: number;
  option_index: number;
  option_key?: string; // Optional: backend format
  score: number;
}

export type ResultLevel = 'excellent' | 'good' | 'developing';
export type TestStep = 'landing' | 'questions' | 'analyzing' | 'email' | 'payment' | 'unlock' | 'results';

export interface TestState<TQuestion extends TestQuestion = TestQuestion, TAnswer extends TestAnswer = TestAnswer> {
  // Session
  sessionToken: string | null;
  timeRemaining: number;
  timeStarted: Date | null;
  
  // Test data
  questions: TQuestion[];
  answers: TAnswer[];
  currentQuestionIndex: number;
  
  // Score (from backend)
  totalScore: number;
  resultLevel: ResultLevel | null;
  sessionId: number | null;
  
  // Results
  resultData: any | null;
  email: string;
  
  // Flow state
  step: TestStep;
  
  // Actions
  setSessionToken: (token: string) => void;
  setTimeRemaining: (seconds: number) => void;
  setQuestions: (questions: TQuestion[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addAnswer: (answer: TAnswer) => void;
  /**
   * @deprecated Scoring is now done on the backend. Use submitAnswers instead.
   */
  calculateScore: () => void;
  submitAnswers: (testSlug: string, lang?: string) => Promise<SubmitAnswersResponse>;
  setResultData: (data: any) => void;
  setEmail: (email: string) => void;
  setStep: (step: TestStep) => void;
  reset: () => void;
}

export interface TestStoreConfig {
  testId: string;
  storageKey: string;
  timeLimit: number; // in seconds
  scoreThresholds: {
    excellent: number;
    good: number;
    developing: number;
  };
}

const createInitialState = (timeLimit: number) => ({
  sessionToken: null,
  timeRemaining: timeLimit,
  timeStarted: null,
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  totalScore: 0,
  resultLevel: null,
  sessionId: null,
  resultData: null,
  email: '',
  step: 'landing' as const,
});

export function createTestStore<TQuestion extends TestQuestion, TAnswer extends TestAnswer>(
  config: TestStoreConfig
) {
  const initialState = createInitialState(config.timeLimit);
  
  return create<TestState<TQuestion, TAnswer>>()(
    persist(
      (set, get) => ({
        ...initialState,
        
        setSessionToken: (token: string) => set({ sessionToken: token }),
        
        setTimeRemaining: (seconds: number) => set({ timeRemaining: seconds }),
        
        setQuestions: (questions: TQuestion[]) => set({ questions }),
        
        setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),
        
        addAnswer: (answer: TAnswer) => {
          const currentAnswers = get().answers;
          const filteredAnswers = currentAnswers.filter(a => a.question_id !== answer.question_id);
          const newAnswers = [...filteredAnswers, answer];
          
          set({ answers: newAnswers });
          
          // Note: Scoring is now done on the backend when submitAnswers is called
          // We no longer calculate score locally
        },
        
        /**
         * @deprecated Scoring is now done on the backend. Use submitAnswers instead.
         * This is kept for backward compatibility during migration.
         */
        calculateScore: () => {
          console.warn('calculateScore is deprecated. Scoring is now done on the backend via submitAnswers.');
          // No-op: scoring is done on backend
        },
        
        /**
         * Submit answers to backend and get scoring results
         * This replaces the old calculateScore method
         */
        submitAnswers: async (testSlug: string, lang?: string): Promise<SubmitAnswersResponse> => {
          const answers = get().answers;
          const email = get().email;
          
          // Convert answers to backend format
          // Need to get option_key from questions
          const questions = get().questions;
          const backendAnswers = answers.map(answer => {
            const question = questions.find(q => q.id === answer.question_id);
            // Try to get option_key from question options, or use fallback
            let option_key = answer.option_key;
            if (!option_key && question && question.options && question.options[answer.option_index]) {
              // If question has options array, try to extract key
              // This is a fallback - ideally option_key should be set when answer is added
              option_key = `option_${answer.option_index + 1}`;
            }
            return {
              question_id: answer.question_id,
              option_key: option_key || `option_${answer.option_index + 1}`,
            };
          });
          
          // Submit to backend
          const response = await testApi.submitAnswers(testSlug, {
            answers: backendAnswers,
            email: email || undefined,
          }, lang);
          
          // Map backend tier to frontend resultLevel
          let resultLevel: ResultLevel = 'developing';
          const tier = response.result.tier?.toLowerCase();
          if (tier === 'excellent' || tier === 'exceptional') {
            resultLevel = 'excellent';
          } else if (tier === 'good' || tier === 'above_average') {
            resultLevel = 'good';
          } else {
            resultLevel = 'developing';
          }
          
          // Update store with results
          set({
            sessionId: response.sessionId,
            totalScore: response.score,
            resultLevel,
            resultData: response.result,
          });
          
          return response;
        },
        
        setResultData: (data: any) => set({ resultData: data }),
        
        setEmail: (email: string) => set({ email }),
        
        setStep: (step: TestStep) => set({ step }),
        
        reset: () => set(initialState),
      }),
      {
        name: config.storageKey,
        partialize: (state) => ({
          sessionToken: state.sessionToken,
          timeRemaining: state.timeRemaining,
          answers: state.answers,
          currentQuestionIndex: state.currentQuestionIndex,
          totalScore: state.totalScore,
          resultLevel: state.resultLevel,
          sessionId: state.sessionId,
          email: state.email,
          step: state.step,
        }),
      }
    )
  );
}

