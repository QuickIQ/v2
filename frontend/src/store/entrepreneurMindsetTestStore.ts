import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface EntrepreneurMindsetQuestion extends TestQuestion {}
export interface EntrepreneurMindsetAnswer extends TestAnswer {}
export interface EntrepreneurMindsetTestState extends TestState<EntrepreneurMindsetQuestion, EntrepreneurMindsetAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('entrepreneur-mindset');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useEntrepreneurMindsetTestStore = createTestStore<EntrepreneurMindsetQuestion, EntrepreneurMindsetAnswer>({
  testId: 'entrepreneur-mindset',
  storageKey: 'entrepreneur-mindset-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
