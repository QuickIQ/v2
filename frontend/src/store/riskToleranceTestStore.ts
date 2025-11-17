import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface RiskToleranceQuestion extends TestQuestion {}
export interface RiskToleranceAnswer extends TestAnswer {}
export interface RiskToleranceTestState extends TestState<RiskToleranceQuestion, RiskToleranceAnswer> {}

const testConfig = getTestConfig('risk-tolerance');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useRiskToleranceTestStore = createTestStore<RiskToleranceQuestion, RiskToleranceAnswer>({
  testId: 'risk-tolerance',
  storageKey: 'risk-tolerance-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
