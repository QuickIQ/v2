import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface FearLeverageQuestion extends TestQuestion {}
export interface FearLeverageAnswer extends TestAnswer {}
export interface FearLeverageTestState extends TestState<FearLeverageQuestion, FearLeverageAnswer> {}

const testConfig = getTestConfig('fear-leverage');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useFearLeverageTestStore = createTestStore<FearLeverageQuestion, FearLeverageAnswer>({
  testId: 'fear-leverage',
  storageKey: 'fear-leverage-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

