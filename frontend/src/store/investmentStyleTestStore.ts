import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface InvestmentStyleQuestion extends TestQuestion {}
export interface InvestmentStyleAnswer extends TestAnswer {}
export interface InvestmentStyleTestState extends TestState<InvestmentStyleQuestion, InvestmentStyleAnswer> {}

const testConfig = getTestConfig('investment-style');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useInvestmentStyleTestStore = createTestStore<InvestmentStyleQuestion, InvestmentStyleAnswer>({
  testId: 'investment-style',
  storageKey: 'investment-style-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

