import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface SexualChemistryQuestion extends TestQuestion {}
export interface SexualChemistryAnswer extends TestAnswer {}
export interface SexualChemistryTestState extends TestState<SexualChemistryQuestion, SexualChemistryAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('sexual-chemistry');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useSexualChemistryTestStore = createTestStore<SexualChemistryQuestion, SexualChemistryAnswer>({
  testId: 'sexual-chemistry',
  storageKey: 'sexual-chemistry-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

