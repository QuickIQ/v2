import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface AngerControlQuestion extends TestQuestion {}
export interface AngerControlAnswer extends TestAnswer {}
export interface AngerControlTestState extends TestState<AngerControlQuestion, AngerControlAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('anger-control');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useAngerControlTestStore = createTestStore<AngerControlQuestion, AngerControlAnswer>({
  testId: 'anger-control',
  storageKey: 'anger-control-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

