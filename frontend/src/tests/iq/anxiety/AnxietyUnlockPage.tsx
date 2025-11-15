import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useAnxietyTestStore } from '../../../store/anxietyTestStore';

export default function AnxietyUnlockPage() {
  return <UniversalUnlockPage testId="anxiety" useTestStore={ useAnxietyTestStore } />;
}
