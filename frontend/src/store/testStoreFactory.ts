import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import { calculateUniversalScore, type AnswerIndex, type ReverseFlag } from '../utils/universalScoring';

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
          
          // Validate we have exactly 20 questions and answers
          if (questions.length !== 20 || answers.length !== 20) {
            console.warn(`Expected 20 questions and 20 answers, got ${questions.length} questions and ${answers.length} answers`);
            // Still try to calculate with available data
          }
          
          // Sort questions by ID to ensure correct order (1-20)
          const sortedQuestions = [...questions].sort((a, b) => a.id - b.id);
          
          // Create a map of question_id to answer for quick lookup
          const answerMap = new Map(answers.map(a => [a.question_id, a]));
          
          // Convert answers to format expected by universal scoring
          // option_index is 0-based (0-6), we need 1-based (1-7)
          const answerIndices: AnswerIndex[] = [];
          const reverseFlags: ReverseFlag[] = [];
          
          // Process questions in order (1-20) to maintain correct positions
          for (let i = 0; i < Math.min(20, sortedQuestions.length); i++) {
            const question = sortedQuestions[i];
            
            if (!question) {
              // Missing question - use default values but maintain position
              answerIndices.push(4 as AnswerIndex); // Default to Neutral
              reverseFlags.push(0);
              continue;
            }
            
            // Find answer for this question
            const answer = answerMap.get(question.id);
            
            // Convert boolean reverse to 0/1 flag (always add this, even if answer is missing)
            const reverseFlag: ReverseFlag = question.reverse === true || question.reverse === 1 ? 1 : 0;
            reverseFlags.push(reverseFlag);
            
            // Process answer if available and valid
            if (answer) {
              // Convert 0-based option_index to 1-based AnswerIndex (1-7)
              const answerIndex = (answer.option_index + 1) as AnswerIndex;
              
              if (answerIndex >= 1 && answerIndex <= 7) {
                answerIndices.push(answerIndex);
              } else {
                // Invalid answer index - use default but maintain position
                console.warn(`Invalid answer index: ${answerIndex} for question ${question.id}, using default (Neutral)`);
                answerIndices.push(4 as AnswerIndex); // Default to Neutral
              }
            } else {
              // Missing answer for this question - use default but maintain position
              console.warn(`Missing answer for question ${question.id}, using default (Neutral)`);
              answerIndices.push(4 as AnswerIndex); // Default to Neutral
            }
          }
          
          // Pad arrays to exactly 20 if needed (shouldn't happen with valid data)
          while (answerIndices.length < 20) {
            answerIndices.push(4 as AnswerIndex); // Default to Neutral
          }
          while (reverseFlags.length < 20) {
            reverseFlags.push(0);
          }
          
          // Use universal scoring function
          try {
            const result = calculateUniversalScore({
              answers: answerIndices.slice(0, 20) as AnswerIndex[],
              reverse: reverseFlags.slice(0, 20) as ReverseFlag[],
            });
            
            // Map result tier to result level
            // Universal scoring already determines tier based on:
            // 0-70 = 'developing'
            // 71-110 = 'good'
            // 111-140 = 'excellent'
            const resultLevel: ResultLevel = result.resultTier;
            
            set({ 
              totalScore: result.totalScore, 
              resultLevel 
            });
          } catch (error) {
            console.error('Error calculating score with universal scoring:', error);
            // Fallback to old calculation method if universal scoring fails
          const totalScore = answers.reduce((sum, answer) => {
            const question = questions.find(q => q.id === answer.question_id);
            if (!question) return sum;
            
            let baseScore = answer.option_index + 1;
            if (question.reverse) {
              baseScore = 8 - baseScore;
            }
            
            return sum + baseScore;
          }, 0);
          
          let resultLevel: ResultLevel = 'developing';
          if (totalScore >= config.scoreThresholds.excellent) {
            resultLevel = 'excellent';
          } else if (totalScore >= config.scoreThresholds.good) {
            resultLevel = 'good';
          }
          
          set({ totalScore, resultLevel });
          }
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

