import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useMemoryRetentionTestStore } from '../../../store/memoryRetentionTestStore';

export default function MemoryRetentionUnlockPage() {
  return <UniversalUnlockPage testId="memory-retention" useTestStore={ useMemoryRetentionTestStore } />;
}
