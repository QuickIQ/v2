import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface PowerBalanceQuestion extends TestQuestion {}
export interface PowerBalanceAnswer extends TestAnswer {}
export interface PowerBalanceTestState extends TestState<PowerBalanceQuestion, PowerBalanceAnswer> {}

const testConfig = getTestConfig('power-balance');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const usePowerBalanceTestStore = createTestStore<PowerBalanceQuestion, PowerBalanceAnswer>({
  testId: 'power-balance',
  storageKey: 'power-balance-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

