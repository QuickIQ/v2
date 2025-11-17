import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface PerceptionControlQuestion extends TestQuestion {}
export interface PerceptionControlAnswer extends TestAnswer {}
export interface PerceptionControlTestState extends TestState<PerceptionControlQuestion, PerceptionControlAnswer> {}

const testConfig = getTestConfig('perception-control');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const usePerceptionControlTestStore = createTestStore<PerceptionControlQuestion, PerceptionControlAnswer>({
  testId: 'perception-control',
  storageKey: 'perception-control-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

