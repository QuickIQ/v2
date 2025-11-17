import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface SalesConfidenceQuestion extends TestQuestion {}
export interface SalesConfidenceAnswer extends TestAnswer {}
export interface SalesConfidenceTestState extends TestState<SalesConfidenceQuestion, SalesConfidenceAnswer> {}

const testConfig = getTestConfig('sales-confidence');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useSalesConfidenceTestStore = createTestStore<SalesConfidenceQuestion, SalesConfidenceAnswer>({
  testId: 'sales-confidence',
  storageKey: 'sales-confidence-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

