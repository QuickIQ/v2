import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ProfitInstinctQuestion extends TestQuestion {}
export interface ProfitInstinctAnswer extends TestAnswer {}
export interface ProfitInstinctTestState extends TestState<ProfitInstinctQuestion, ProfitInstinctAnswer> {}

const testConfig = getTestConfig('profit-instinct');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useProfitInstinctTestStore = createTestStore<ProfitInstinctQuestion, ProfitInstinctAnswer>({
  testId: 'profit-instinct',
  storageKey: 'profit-instinct-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

