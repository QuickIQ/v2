import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IQQuestion {
  id: number;
  order_index: number;
  text_key: string;
  text?: string;
  category: 'logical' | 'verbal' | 'spatial';
  question_type: 'matrix' | 'numerical' | 'verbal';
  image_data?: string;
  options: Array<{
    key: string;
    points: number;
    isCorrect?: boolean;
    text?: string;
    value?: number;
  }>;
  correct_answer_key: string;
}

export interface IQAnswer {
  question_id: number;
  option_key: string;
}

export interface IQTestState {
  // Session
  sessionToken: string | null;
  timeRemaining: number; // seconds
  timeStarted: Date | null;
  
  // Test data
  questions: IQQuestion[];
  answers: IQAnswer[];
  currentQuestionIndex: number;
  
  // Results
  score: number | null;
  categoryScores: { logical: number; verbal: number; spatial: number } | null;
  resultTier: 'exceptional' | 'above_average' | 'developing' | null;
  email: string;
  
  // Flow state
  step: 'landing' | 'notice' | 'test' | 'calculating' | 'email' | 'payment' | 'results';
  
  // Actions
  setSessionToken: (token: string) => void;
  setTimeRemaining: (seconds: number) => void;
  setQuestions: (questions: IQQuestion[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addAnswer: (answer: IQAnswer) => void;
  setEmail: (email: string) => void;
  setResults: (score: number, categoryScores: { logical: number; verbal: number; spatial: number }, tier: string) => void;
  setStep: (step: IQTestState['step']) => void;
  reset: () => void;
}

const initialState = {
  sessionToken: null,
  timeRemaining: 20 * 60, // 20 minutes
  timeStarted: null,
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  score: null,
  categoryScores: null,
  resultTier: null,
  email: '',
  step: 'landing' as const,
};

export const useIQTestStore = create<IQTestState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSessionToken: (token) => set({ sessionToken: token }),
      setTimeRemaining: (seconds) => set({ timeRemaining: seconds }),
      setQuestions: (questions) => set({ questions, currentQuestionIndex: 0 }),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      addAnswer: (answer) =>
        set((state) => {
          const filtered = state.answers.filter((a) => a.question_id !== answer.question_id);
          return { answers: [...filtered, answer] };
        }),
      setEmail: (email) => set({ email }),
      setResults: (score, categoryScores, tier) =>
        set({
          score,
          categoryScores,
          resultTier: tier as IQTestState['resultTier'],
        }),
      setStep: (step) => set({ step }),
      reset: () => set(initialState),
    }),
    {
      name: 'iq-test-storage',
      partialize: (state) => ({
        sessionToken: state.sessionToken,
        timeRemaining: state.timeRemaining,
        answers: state.answers,
        currentQuestionIndex: state.currentQuestionIndex,
        questions: state.questions,
      }),
    }
  )
);

