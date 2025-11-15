import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface RiskToleranceQuestion extends TestQuestion {}
export interface RiskToleranceAnswer extends TestAnswer {}
export interface RiskToleranceTestState extends TestState<RiskToleranceQuestion, RiskToleranceAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('risk-tolerance');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useRiskToleranceTestStore = createTestStore<RiskToleranceQuestion, RiskToleranceAnswer>({
  testId: 'risk-tolerance',
  storageKey: 'risk-tolerance-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
