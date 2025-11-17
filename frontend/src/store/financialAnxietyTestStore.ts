import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface FinancialAnxietyQuestion extends TestQuestion {}
export interface FinancialAnxietyAnswer extends TestAnswer {}
export interface FinancialAnxietyTestState extends TestState<FinancialAnxietyQuestion, FinancialAnxietyAnswer> {}

const testConfig = getTestConfig('financial-anxiety');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useFinancialAnxietyTestStore = createTestStore<FinancialAnxietyQuestion, FinancialAnxietyAnswer>({
  testId: 'financial-anxiety',
  storageKey: 'financial-anxiety-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

