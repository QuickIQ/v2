import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface SilentDominanceQuestion extends TestQuestion {}
export interface SilentDominanceAnswer extends TestAnswer {}
export interface SilentDominanceTestState extends TestState<SilentDominanceQuestion, SilentDominanceAnswer> {}

const testConfig = getTestConfig('silent-dominance');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useSilentDominanceTestStore = createTestStore<SilentDominanceQuestion, SilentDominanceAnswer>({
  testId: 'silent-dominance',
  storageKey: 'silent-dominance-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

