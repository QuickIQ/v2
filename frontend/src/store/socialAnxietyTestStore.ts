import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface SocialAnxietyQuestion extends TestQuestion {}
export interface SocialAnxietyAnswer extends TestAnswer {}
export interface SocialAnxietyTestState extends TestState<SocialAnxietyQuestion, SocialAnxietyAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('social-anxiety');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useSocialAnxietyTestStore = createTestStore<SocialAnxietyQuestion, SocialAnxietyAnswer>({
  testId: 'social-anxiety',
  storageKey: 'social-anxiety-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

