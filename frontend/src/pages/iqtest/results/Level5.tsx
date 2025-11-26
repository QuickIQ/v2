import { useTranslation } from 'react-i18next';
import UniversalUnlockTemplate from '../../../components/TestFlow/UniversalUnlockTemplate';

interface Level5Props {
  score: number;
}

export default function Level5({ score }: Level5Props) {
  const { i18n } = useTranslation();
  const locale = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';
  
  // Level 5 uses 'excellent' for emoji config but loads level5 content from iqtest.json
  // Level 5 Rarity: Top %0.001–0.1
  return (
    <UniversalUnlockTemplate
      testId="iqtest"
      level="excellent"
      locale={locale}
      customLevelKey="level5"
      score={score}
      rarity="Top %0.001–0.1"
    />
  );
}
