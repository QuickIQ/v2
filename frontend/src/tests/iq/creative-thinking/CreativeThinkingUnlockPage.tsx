import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useCreativeThinkingTestStore } from '../../../store/creativeThinkingTestStore';

export default function CreativeThinkingUnlockPage() {
  return <UniversalUnlockPage testId="creative-thinking" useTestStore={ useCreativeThinkingTestStore } />;
}
