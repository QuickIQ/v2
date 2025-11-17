import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface MarriageReadinessQuestion extends TestQuestion {}
export interface MarriageReadinessAnswer extends TestAnswer {}
export interface MarriageReadinessTestState extends TestState<MarriageReadinessQuestion, MarriageReadinessAnswer> {}

const testConfig = getTestConfig('marriage-readiness');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useMarriageReadinessTestStore = createTestStore<MarriageReadinessQuestion, MarriageReadinessAnswer>({
  testId: 'marriage-readiness',
  storageKey: 'marriage-readiness-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

