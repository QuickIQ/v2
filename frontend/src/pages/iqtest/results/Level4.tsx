import { useTranslation } from 'react-i18next';
import UniversalUnlockTemplate from '../../../components/TestFlow/UniversalUnlockTemplate';

interface Level4Props {
  score: number;
}

export default function Level4({ score }: Level4Props) {
  const { i18n } = useTranslation();
  const locale = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';
  
  // Level 4 uses 'excellent' for emoji config but loads level4 content from iqtest.json
  // Level 4 Rarity: Top %3–10
  return (
    <UniversalUnlockTemplate
      testId="iqtest"
      level="excellent"
      locale={locale}
      customLevelKey="level4"
      score={score}
      rarity="Top %3–10"
    />
  );
}
