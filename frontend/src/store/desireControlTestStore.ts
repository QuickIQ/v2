import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface DesireControlQuestion extends TestQuestion {}
export interface DesireControlAnswer extends TestAnswer {}
export interface DesireControlTestState extends TestState<DesireControlQuestion, DesireControlAnswer> {}

const testConfig = getTestConfig('desire-control');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useDesireControlTestStore = createTestStore<DesireControlQuestion, DesireControlAnswer>({
  testId: 'desire-control',
  storageKey: 'desire-control-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

