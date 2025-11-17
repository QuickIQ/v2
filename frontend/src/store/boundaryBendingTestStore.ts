import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface BoundaryBendingQuestion extends TestQuestion {}
export interface BoundaryBendingAnswer extends TestAnswer {}
export interface BoundaryBendingTestState extends TestState<BoundaryBendingQuestion, BoundaryBendingAnswer> {}

const testConfig = getTestConfig('boundary-bending');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useBoundaryBendingTestStore = createTestStore<BoundaryBendingQuestion, BoundaryBendingAnswer>({
  testId: 'boundary-bending',
  storageKey: 'boundary-bending-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

