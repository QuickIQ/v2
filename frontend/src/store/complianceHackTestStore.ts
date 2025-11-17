import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ComplianceHackQuestion extends TestQuestion {}
export interface ComplianceHackAnswer extends TestAnswer {}
export interface ComplianceHackTestState extends TestState<ComplianceHackQuestion, ComplianceHackAnswer> {}

const testConfig = getTestConfig('compliance-hack');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useComplianceHackTestStore = createTestStore<ComplianceHackQuestion, ComplianceHackAnswer>({
  testId: 'compliance-hack',
  storageKey: 'compliance-hack-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

