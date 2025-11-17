import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ParentingReadinessQuestion extends TestQuestion {}
export interface ParentingReadinessAnswer extends TestAnswer {}
export interface ParentingReadinessTestState extends TestState<ParentingReadinessQuestion, ParentingReadinessAnswer> {}

const testConfig = getTestConfig('parenting-readiness');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useParentingReadinessTestStore = createTestStore<ParentingReadinessQuestion, ParentingReadinessAnswer>({
  testId: 'parenting-readiness',
  storageKey: 'parenting-readiness-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

