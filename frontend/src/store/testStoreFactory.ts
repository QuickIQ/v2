import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';

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
  
  // Score
  totalScore: number;
  resultLevel: ResultLevel | null;
  
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
  calculateScore: () => void;
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
          
          // Recalculate score
          get().calculateScore();
        },
        
        calculateScore: () => {
          const answers = get().answers;
          const questions = get().questions;
          
          // Calculate total score with reverse scoring logic
          const totalScore = answers.reduce((sum, answer) => {
            const question = questions.find(q => q.id === answer.question_id);
            if (!question) return sum;
            
            // Base score: Never=1, Rarely=2, ..., Always=7 (optionIndex + 1)
            let baseScore = answer.option_index + 1;
            
            // Apply reverse scoring if needed
            if (question.reverse) {
              baseScore = 8 - baseScore;
            }
            
            return sum + baseScore;
          }, 0);
          
          // Determine result level based on thresholds
          let resultLevel: ResultLevel = 'developing';
          if (totalScore >= config.scoreThresholds.excellent) {
            resultLevel = 'excellent';
          } else if (totalScore >= config.scoreThresholds.good) {
            resultLevel = 'good';
          } else {
            resultLevel = 'developing';
          }
          
          set({ totalScore, resultLevel });
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
          email: state.email,
          step: state.step,
        }),
      }
    )
  );
}

