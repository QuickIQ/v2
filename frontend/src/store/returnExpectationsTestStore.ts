import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ReturnExpectationsQuestion extends TestQuestion {}
export interface ReturnExpectationsAnswer extends TestAnswer {}
export interface ReturnExpectationsTestState extends TestState<ReturnExpectationsQuestion, ReturnExpectationsAnswer> {}

const testConfig = getTestConfig('return-expectations');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useReturnExpectationsTestStore = createTestStore<ReturnExpectationsQuestion, ReturnExpectationsAnswer>({
  testId: 'return-expectations',
  storageKey: 'return-expectations-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

