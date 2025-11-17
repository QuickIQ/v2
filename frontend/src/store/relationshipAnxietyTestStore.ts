import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface RelationshipAnxietyQuestion extends TestQuestion {}
export interface RelationshipAnxietyAnswer extends TestAnswer {}
export interface RelationshipAnxietyTestState extends TestState<RelationshipAnxietyQuestion, RelationshipAnxietyAnswer> {}

const testConfig = getTestConfig('relationship-anxiety');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useRelationshipAnxietyTestStore = createTestStore<RelationshipAnxietyQuestion, RelationshipAnxietyAnswer>({
  testId: 'relationship-anxiety',
  storageKey: 'relationship-anxiety-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

