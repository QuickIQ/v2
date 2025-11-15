import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useMemoryRetentionTestStore } from '../../../store/memoryretentionTestStore';

export default function MemoryRetentionPaymentPage() {
  return <UniversalPaymentPage testId="memory-retention" useTestStore={useMemoryRetentionTestStore} />;
}
