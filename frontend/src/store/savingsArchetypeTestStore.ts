import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface SavingsArchetypeQuestion extends TestQuestion {}
export interface SavingsArchetypeAnswer extends TestAnswer {}
export interface SavingsArchetypeTestState extends TestState<SavingsArchetypeQuestion, SavingsArchetypeAnswer> {}

const testConfig = getTestConfig('savings-archetype');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useSavingsArchetypeTestStore = createTestStore<SavingsArchetypeQuestion, SavingsArchetypeAnswer>({
  testId: 'savings-archetype',
  storageKey: 'savings-archetype-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

