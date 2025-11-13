import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EntrepreneurMindsetQuestion {
  id: number;
  text: string;
  options: string[]; // ["Never", "Rarely", "Sometimes", "Neutral", "Often", "Usually", "Always"]
  reverse?: boolean; // If true, invert the score (8 - baseScore)
}

export interface EntrepreneurMindsetAnswer {
  question_id: number;
  option_index: number;
  score: number; // 1-7 based on option index
}

export interface EntrepreneurMindsetTestState {
  // Session
  sessionToken: string | null;
  timeRemaining: number; // seconds
  timeStarted: Date | null;
  
  // Test data
  questions: EntrepreneurMindsetQuestion[];
  answers: EntrepreneurMindsetAnswer[];
  currentQuestionIndex: number;
  
  // Score
  totalScore: number;
  resultLevel: 'excellent' | 'good' | 'developing' | null;
  
  // Results
  resultData: any | null;
  email: string;
  
  // Flow state
  step: 'landing' | 'questions' | 'analyzing' | 'email' | 'payment' | 'unlock' | 'results';
  
  // Actions
  setSessionToken: (token: string) => void;
  setTimeRemaining: (seconds: number) => void;
  setQuestions: (questions: EntrepreneurMindsetQuestion[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addAnswer: (answer: EntrepreneurMindsetAnswer) => void;
  calculateScore: () => void;
  setResultData: (data: any) => void;
  setEmail: (email: string) => void;
  setStep: (step: EntrepreneurMindsetTestState['step']) => void;
  reset: () => void;
}

const initialState = {
  sessionToken: null,
  timeRemaining: 10 * 60, // 10 minutes
  timeStarted: null,
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  totalScore: 0,
  resultLevel: null,
  resultData: null,
  email: '',
  step: 'landing' as const,
};

export const useEntrepreneurMindsetTestStore = create<EntrepreneurMindsetTestState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setSessionToken: (token: string) => set({ sessionToken: token }),
      
      setTimeRemaining: (seconds: number) => set({ timeRemaining: seconds }),
      
      setQuestions: (questions: EntrepreneurMindsetQuestion[]) => set({ questions }),
      
      setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),
      
      addAnswer: (answer: EntrepreneurMindsetAnswer) => {
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
        
        // Determine result level: 0-49 → Developing, 50-100 → Good, 101-140 → Excellent
        let resultLevel: 'excellent' | 'good' | 'developing' = 'developing';
        if (totalScore >= 101) {
          resultLevel = 'excellent';
        } else if (totalScore >= 50) {
          resultLevel = 'good';
        } else {
          resultLevel = 'developing';
        }
        
        set({ totalScore, resultLevel });
      },
      
      setResultData: (data: any) => set({ resultData: data }),
      
      setEmail: (email: string) => set({ email }),
      
      setStep: (step: EntrepreneurMindsetTestState['step']) => set({ step }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'entrepreneur-mindset-test-storage',
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



