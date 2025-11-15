# Test Content System

Bu sistem, tüm testlerin içeriklerini JSON formatında organize eder ve ID bazlı bir yapı kullanır.

## Dosya Yapısı

```
frontend/src/data/tests/
├── test-config.json          # Tüm testlerin temel konfigürasyonu (renkler, ikonlar, soru sayıları)
├── contents/                 # Her test için ayrı içerik dosyaları
│   ├── problem-solving.json  # Problem Solving test içeriği
│   ├── creative-thinking.json
│   ├── template.json         # Yeni testler için template
│   └── ...
└── README.md                 # Bu dosya
```

## Kullanım

### 1. Test Config (test-config.json)

Her test için temel bilgiler:
- ID ve slug
- İsimler (EN/TR)
- Kategori
- İkon ve emoji
- Soru sayısı ve süre
- Renkler (kart, buton, gradient vb.)

### 2. Test Content (contents/*.json)

Her test için detaylı içerik:
- Renkler (landing, questions, analyzing sayfaları için)
- Landing sayfası metinleri
- Soru seçenekleri
- Analiz sayfası metinleri
- Email ve ödeme sayfası metinleri

### 3. TestCard Component

`TestCard` component'i test config'i kullanarak otomatik olarak kartları render eder:

```tsx
import { TestCard } from '../components/ui/TestCard';
import { getAllTestConfigs } from '../utils/testContentLoader';

const testConfigs = getAllTestConfigs();

{testConfigs.map((test, index) => (
  <TestCard key={test.id} test={test} index={index} />
))}
```

### 4. Test Content Loader

Test içeriklerini yüklemek için:

```tsx
import { loadTestContent, getTestConfig } from '../utils/testContentLoader';

// Test config al
const config = getTestConfig('problem-solving');

// Test içeriği yükle
const content = await loadTestContent('problem-solving');
```

## Yeni Test Ekleme

1. `test-config.json` dosyasına test bilgilerini ekle
2. `contents/` klasörüne test içerik dosyası oluştur (`template.json`'u kopyala)
3. Test sayfasında `loadTestContent` kullanarak içeriği yükle

## Örnek

Problem Solving testi için:
- Config: `test-config.json` içinde `problem-solving` objesi
- Content: `contents/problem-solving.json`
- Component: `TestCard` component'i otomatik olarak config'i kullanır

