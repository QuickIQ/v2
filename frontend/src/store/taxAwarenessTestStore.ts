import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface TaxAwarenessQuestion extends TestQuestion {}
export interface TaxAwarenessAnswer extends TestAnswer {}
export interface TaxAwarenessTestState extends TestState<TaxAwarenessQuestion, TaxAwarenessAnswer> {}

const testConfig = getTestConfig('tax-awareness');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useTaxAwarenessTestStore = createTestStore<TaxAwarenessQuestion, TaxAwarenessAnswer>({
  testId: 'tax-awareness',
  storageKey: 'tax-awareness-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

