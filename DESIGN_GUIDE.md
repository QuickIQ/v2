# QuickIQ Logo ve Tasarım Kılavuzu

## Logo Tasarımı

QuickIQ logosu modern, profesyonel ve akıllı bir görünüme sahiptir:

### Logo Bileşenleri
- **İkon**: Gradient arka plan üzerinde beyin simgesi
- **Tipografi**: "QuickIQ" bold, gradient renkli
- **Animasyon**: Hover ve pulse efektleri
- **Renkler**: Mor-mavi gradient (#667eea → #764ba2)

### Kullanım Senaryoları

#### 1. Ana Logo (Header)
```tsx
<Logo size={40} animated={true} showText={true} />
```

#### 2. Landing Page Logo
```tsx
<Logo size={100} animated={true} showText={false} />
```

#### 3. Compact Logo (Küçük alanlar)
```tsx
<LogoCompact size={32} />
```

### Logo Dosyaları

- **React Component**: `frontend/src/components/ui/Logo.tsx`
- **SVG Dosyası**: `frontend/public/logo.svg`
- **Header Component**: `frontend/src/components/layout/Header.tsx`

## Renk Paleti

```css
Primary Gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Primary Purple: #667eea
Primary Violet: #764ba2
Success: #27ae60
Warning: #f39c12
Danger: #e74c3c
Text: #333
Text Light: #666
```

## Tasarım Prensipleri

1. **Modern ve Minimalist**: Temiz, sade tasarım
2. **Gradient Kullanımı**: Derinlik ve modernlik için gradientler
3. **Animasyonlar**: Subtle, performanslı animasyonlar
4. **Responsive**: Tüm cihazlarda mükemmel görünüm
5. **Glassmorphism**: Blur efektleri ile modern görünüm

## Animasyonlar

- Logo hover: Scale ve rotate animasyonu
- Logo pulse: Sürekli pulse efekti
- Page transitions: Framer Motion ile smooth geçişler
- Background orbs: Arka planda yavaş hareket eden gradient toplar

## Logo Variantları

### Full Logo
Beyin ikonu + "QuickIQ" yazısı + "Intelligence Test" alt başlığı

### Icon Only
Sadece gradient daire içinde beyin ikonu

### Compact
Küçük boyutlarda sadece ikon

