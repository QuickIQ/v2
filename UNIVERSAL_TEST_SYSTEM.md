# Universal Test System - JSON Tabanlı Yapı

## 🎯 Amaç
Tüm test sayfalarındaki tekrarlayan kodları kaldırıp, JSON config ile çalışan tek bir universal component oluşturmak.

## 📁 Oluşturulan Dosyalar

### 1. `testPageConfig.json`
Her test için gerekli path'leri ve mapping'leri içerir:
```json
{
  "tests": {
    "autism": {
      "storeName": "autismTestStore",
      "storePath": "../store/autismTestStore",
      "questionsPagePath": "../tests/iq/autism/QuestionsPage",
      "resultContentPath": "../tests/iq/autism/resultContent",
      "questionsDataPath": "../data/tests/autism/questions.json",
      "localStorageKey": "autism-test-storage"
    }
  }
}
```

### 2. `testPageFactory.tsx`
Universal test page component'i. Tüm testler için ortak mantığı içerir.

### 3. Yeni Test Sayfaları (Örnek)
- `AutismTestPage.new.tsx` - Sadece 5 satır!
- `CriticismTestPage.new.tsx` - Sadece 5 satır!
- `ProblemSolvingTestPage.new.tsx` - Sadece 5 satır!

## 📊 Karşılaştırma

### ÖNCE (446 satır):
```tsx
// AutismTestPage.tsx - 446 satır
import { useEffect, useState } from 'react';
import UniversalLandingPage from '../components/TestFlow/UniversalLandingPage';
import UniversalAnalyzingPage from '../components/TestFlow/UniversalAnalyzingPage';
import { getTestConfig } from '../utils/testContentLoader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutismTestStore } from '../store/autismTestStore';
import AutismQuestionsPage from '../tests/iq/autism/QuestionsPage';
import PersonalityEmailPage from '../tests/personality/PersonalityEmailPage';
import { resultContent } from '../tests/iq/autism/resultContent';
import questionsData from '../data/tests/autism/questions.json';

function AutismTestPage() {
  // ... 440+ satır kod
}
```

### SONRA (5 satır):
```tsx
// AutismTestPage.new.tsx - 5 satır!
import { UniversalTestPage } from '../utils/testPageFactory';

function AutismTestPage() {
  return <UniversalTestPage testId="autism" />;
}

export default AutismTestPage;
```

## ✅ Avantajlar

1. **Kod Tekrarı Yok**: Her test için aynı 446 satır yerine sadece 5 satır
2. **Kolay Bakım**: Tek bir yerde değişiklik, tüm testlere yansır
3. **JSON Config**: Yeni test eklemek için sadece JSON'a entry eklemek yeterli
4. **Type Safety**: TypeScript desteği korunuyor
5. **Performans**: Factory pattern ile optimize import'lar

## 🔄 Geçiş Adımları

1. ✅ `testPageConfig.json` oluşturuldu
2. ✅ `testPageFactory.tsx` oluşturuldu
3. ✅ 3 test için örnek yeni sayfalar oluşturuldu (.new.tsx)
4. ⏳ Test edilip onay bekleniyor
5. ⏳ Tüm testler için geçiş yapılacak

## 📝 Sonraki Adımlar

1. `.new.tsx` dosyalarını test edin
2. Eğer çalışıyorsa, eski dosyaları `.old.tsx` olarak yedekleyin
3. `.new.tsx` dosyalarını normal isimlere çevirin
4. Diğer tüm testler için aynı işlemi yapın

## 🎨 Örnek Kullanım

```tsx
// Yeni test eklemek için:
// 1. testPageConfig.json'a ekle:
{
  "new-test": {
    "storeName": "newTestStore",
    "storePath": "../store/newTestStore",
    "questionsPagePath": "../tests/iq/new-test/QuestionsPage",
    "resultContentPath": "../tests/iq/new-test/resultContent",
    "questionsDataPath": "../data/tests/new-test/questions.json",
    "localStorageKey": "new-test-storage"
  }
}

// 2. testPageFactory.tsx'e mapping ekle:
const storeMap = {
  'new-test': useNewTestStore,
  // ...
};

// 3. Yeni sayfa oluştur (5 satır):
import { UniversalTestPage } from '../utils/testPageFactory';
export default function NewTestPage() {
  return <UniversalTestPage testId="new-test" />;
}
```

## ⚠️ Notlar

- Factory pattern kullanıldı (dynamic import yerine)
- Tüm store'lar ve component'ler factory'de import ediliyor
- Yeni test eklemek için factory'ye mapping eklemek gerekiyor
- Bu yaklaşım daha güvenilir ve TypeScript-friendly

