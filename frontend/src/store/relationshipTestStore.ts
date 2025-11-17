import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface RelationshipTestQuestion extends TestQuestion {}
export interface RelationshipTestAnswer extends TestAnswer {}
export interface RelationshipTestState extends TestState<RelationshipTestQuestion, RelationshipTestAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('relationship-test');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useRelationshipTestStore = createTestStore<RelationshipTestQuestion, RelationshipTestAnswer>({
  testId: 'relationship-test',
  storageKey: 'relationship-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

