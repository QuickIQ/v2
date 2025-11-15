import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface TimeManagementQuestion extends TestQuestion {}
export interface TimeManagementAnswer extends TestAnswer {}
export interface TimeManagementTestState extends TestState<TimeManagementQuestion, TimeManagementAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('time-management');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useTimeManagementTestStore = createTestStore<TimeManagementQuestion, TimeManagementAnswer>({
  testId: 'time-management',
  storageKey: 'time-management-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
