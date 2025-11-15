import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useSuccessTestStore } from '../../../store/successTestStore';

export default function SuccessUnlockPage() {
  return <UniversalUnlockPage testId="success" useTestStore={ useSuccessTestStore } />;
}
