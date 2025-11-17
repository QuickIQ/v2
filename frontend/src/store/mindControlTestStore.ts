import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface MindControlQuestion extends TestQuestion {}
export interface MindControlAnswer extends TestAnswer {}
export interface MindControlTestState extends TestState<MindControlQuestion, MindControlAnswer> {}

const testConfig = getTestConfig('mind-control');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useMindControlTestStore = createTestStore<MindControlQuestion, MindControlAnswer>({
  testId: 'mind-control',
  storageKey: 'mind-control-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

