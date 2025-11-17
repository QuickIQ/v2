import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface HealthAnxietyQuestion extends TestQuestion {}
export interface HealthAnxietyAnswer extends TestAnswer {}
export interface HealthAnxietyTestState extends TestState<HealthAnxietyQuestion, HealthAnxietyAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('health-anxiety');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useHealthAnxietyTestStore = createTestStore<HealthAnxietyQuestion, HealthAnxietyAnswer>({
  testId: 'health-anxiety',
  storageKey: 'health-anxiety-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

