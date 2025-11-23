import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface CriticismQuestion extends TestQuestion {}
export interface CriticismAnswer extends TestAnswer {}
export interface CriticismTestState extends TestState<CriticismQuestion, CriticismAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('criticism');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useCriticismTestStore = createTestStore<CriticismQuestion, CriticismAnswer>({
  testId: 'criticism',
  storageKey: 'criticism-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});






