import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface AttachmentStyleQuestion extends TestQuestion {}
export interface AttachmentStyleAnswer extends TestAnswer {}
export interface AttachmentStyleTestState extends TestState<AttachmentStyleQuestion, AttachmentStyleAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('attachment-style');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useAttachmentStyleTestStore = createTestStore<AttachmentStyleQuestion, AttachmentStyleAnswer>({
  testId: 'attachment-style',
  storageKey: 'attachment-style-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

