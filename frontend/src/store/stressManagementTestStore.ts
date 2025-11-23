import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface StressManagementQuestion extends TestQuestion {}
export interface StressManagementAnswer extends TestAnswer {}
export interface StressManagementTestState extends TestState<StressManagementQuestion, StressManagementAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('stress-management');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useStressManagementTestStore = createTestStore<StressManagementQuestion, StressManagementAnswer>({
  testId: 'stress-management',
  storageKey: 'stress-management-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});






