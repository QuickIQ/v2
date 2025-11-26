import axios from 'axios';
import { IQQuestion, IQAnswer } from '../store/iqTestStore';

// Use relative path in development to leverage Vite proxy
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateSessionResponse {
  sessionToken: string;
  timeRemaining: number;
  answers: IQAnswer[];
  timeStarted: string;
}

export interface SubmitResponse {
  sessionToken: string;
  score: number;
  categoryScores: { logical: number; verbal: number; spatial: number };
  resultTier: 'exceptional' | 'above_average' | 'developing';
  resultId: number | null;
  resultDetails: any;
  requiresPayment: boolean;
}

export const iqTestApi = {
  createSession: async (): Promise<CreateSessionResponse> => {
    const response = await api.post('/quick-iq-test/session');
    return response.data;
  },

  resumeSession: async (sessionToken: string): Promise<CreateSessionResponse> => {
    const response = await api.post('/quick-iq-test/session', { sessionToken });
    return response.data;
  },

  saveProgress: async (
    sessionToken: string,
    answers: IQAnswer[],
    timeRemaining: number
  ): Promise<void> => {
    await api.post('/quick-iq-test/progress', {
      sessionToken,
      answers,
      timeRemaining,
    });
  },

  getQuestions: async (lang = 'en'): Promise<IQQuestion[]> => {
    const response = await api.get('/tests/quick-iq-test/questions', {
      params: { lang },
    });
    return response.data;
  },

  submitTest: async (
    sessionToken: string,
    answers: IQAnswer[],
    email: string,
    timeRemaining: number
  ): Promise<SubmitResponse> => {
    const response = await api.post('/quick-iq-test/submit', {
      sessionToken,
      answers,
      email,
      timeRemaining,
    });
    return response.data;
  },
};

