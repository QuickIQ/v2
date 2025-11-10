import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalityQuestion {
  id: number;
  text: string;
  options: Array<{
    text: string;
    axis: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  }>;
}

export interface PersonalityAnswer {
  question_id: number;
  option_index: number;
  axis: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

export interface MBTIScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface PersonalityTestState {
  // Session
  sessionToken: string | null;
  timeRemaining: number; // seconds
  timeStarted: Date | null;
  
  // Test data
  questions: PersonalityQuestion[];
  answers: PersonalityAnswer[];
  currentQuestionIndex: number;
  
  // Scores
  mbtiScores: MBTIScores;
  personalityType: string | null; // e.g., "INFP", "ENTJ"
  
  // Results
  resultData: any | null;
  email: string;
  
  // Flow state
  step: 'landing' | 'questions' | 'analyzing' | 'email' | 'payment' | 'results';
  
  // Actions
  setSessionToken: (token: string) => void;
  setTimeRemaining: (seconds: number) => void;
  setQuestions: (questions: PersonalityQuestion[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addAnswer: (answer: PersonalityAnswer) => void;
  updateScores: (scores: MBTIScores) => void;
  calculatePersonalityType: () => void;
  setResultData: (data: any) => void;
  setEmail: (email: string) => void;
  setStep: (step: PersonalityTestState['step']) => void;
  reset: () => void;
}

const initialState = {
  sessionToken: null,
  timeRemaining: 15 * 60, // 15 minutes
  timeStarted: null,
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  mbtiScores: {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  },
  personalityType: null,
  resultData: null,
  email: '',
  step: 'landing' as const,
};

export const usePersonalityTestStore = create<PersonalityTestState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setSessionToken: (token: string) => set({ sessionToken: token }),
      
      setTimeRemaining: (seconds: number) => set({ timeRemaining: seconds }),
      
      setQuestions: (questions: PersonalityQuestion[]) => set({ questions }),
      
      setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),
      
      addAnswer: (answer: PersonalityAnswer) => {
        const currentAnswers = get().answers;
        const filteredAnswers = currentAnswers.filter(a => a.question_id !== answer.question_id);
        const newAnswers = [...filteredAnswers, answer];
        
        // Update scores
        const scores = { ...get().mbtiScores };
        scores[answer.axis] = (scores[answer.axis] || 0) + 1;
        
        set({ 
          answers: newAnswers,
          mbtiScores: scores 
        });
        
        // Recalculate personality type
        get().calculatePersonalityType();
      },
      
      updateScores: (scores: MBTIScores) => set({ mbtiScores: scores }),
      
      calculatePersonalityType: () => {
        const scores = get().mbtiScores;
        let type = '';
        
        // E vs I
        type += scores.E >= scores.I ? 'E' : 'I';
        // S vs N
        type += scores.S >= scores.N ? 'S' : 'N';
        // T vs F
        type += scores.T >= scores.F ? 'T' : 'F';
        // J vs P
        type += scores.J >= scores.P ? 'J' : 'P';
        
        set({ personalityType: type });
      },
      
      setResultData: (data: any) => set({ resultData: data }),
      
      setEmail: (email: string) => set({ email }),
      
      setStep: (step: PersonalityTestState['step']) => set({ step }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'personality-test-storage',
      partialize: (state) => ({
        sessionToken: state.sessionToken,
        timeRemaining: state.timeRemaining,
        answers: state.answers,
        currentQuestionIndex: state.currentQuestionIndex,
        mbtiScores: state.mbtiScores,
        personalityType: state.personalityType,
        email: state.email,
        step: state.step,
      }),
    }
  )
);

