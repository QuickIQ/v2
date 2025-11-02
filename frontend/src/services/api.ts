import axios from 'axios';
import { Test, Question, TestSubmissionResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const testApi = {
  getAll: async (lang?: string): Promise<Test[]> => {
    const response = await api.get('/tests', { params: { lang } });
    return response.data;
  },

  getBySlug: async (slug: string, lang?: string): Promise<Test> => {
    const response = await api.get(`/tests/${slug}`, { params: { lang } });
    return response.data;
  },

  getQuestions: async (slug: string, lang?: string): Promise<Question[]> => {
    const response = await api.get(`/tests/${slug}/questions`, { params: { lang } });
    return response.data;
  },

  submitAnswers: async (
    slug: string,
    answers: any[],
    email?: string
  ): Promise<TestSubmissionResponse> => {
    const response = await api.post(`/tests/${slug}/submit`, { answers, email });
    return response.data;
  },
};

export const paymentApi = {
  createIntent: async (testSlug: string, sessionId: number, amount?: number) => {
    const response = await api.post('/payments/create-intent', {
      testSlug,
      sessionId,
      amount,
    });
    return response.data;
  },

  checkStatus: async (sessionId: number) => {
    const response = await api.get(`/payments/status/${sessionId}`);
    return response.data;
  },
};

export const translationApi = {
  getTranslations: async (language: string): Promise<Record<string, string>> => {
    const response = await api.get(`/translations/${language}`);
    return response.data;
  },
};

export default api;

