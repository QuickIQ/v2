import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface CompatibilityFitQuestion extends TestQuestion {}
export interface CompatibilityFitAnswer extends TestAnswer {}
export interface CompatibilityFitTestState extends TestState<CompatibilityFitQuestion, CompatibilityFitAnswer> {}

const testConfig = getTestConfig('compatibility-fit');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useCompatibilityFitTestStore = createTestStore<CompatibilityFitQuestion, CompatibilityFitAnswer>({
  testId: 'compatibility-fit',
  storageKey: 'compatibility-fit-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

