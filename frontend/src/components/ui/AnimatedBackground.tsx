import { useEffect, useState, useRef } from 'react';

// Renk geçişleri: açık mor -> mordan maviye -> maviden açık maviye -> açık maviden açık yeşile -> açık yeşilden açık sarıya -> açık sarıdan açık turuncuya -> açık turuncudan açık kırmızıya
// Daha soft ve pastel tonlar - contrast düşürüldü
const colorStops = [
  '#F5EDFF', // 1. Çok açık mor (en üst) - daha soft
  '#F0E5FF', // Açık mor (geçiş)
  '#E8D9FF', // Mor (geçiş) - daha soft
  '#E5F0FF', // 2. Mordan maviye geçiş - daha soft
  '#D9E8FF', // Açık mavi (geçiş) - daha soft
  '#E0F2FF', // 3. Maviden açık maviye geçiş - daha soft
  '#E0F5F0', // Açık mavi-yeşil geçiş - daha soft
  '#E5F5E5', // 4. Açık maviden açık yeşile geçiş - daha soft
  '#F0F8E8', // Açık yeşil (geçiş) - daha soft
  '#F5F8E5', // Yeşil-sarı geçiş - daha soft
  '#FFF8E5', // 5. Açık yeşilden açık sarıya geçiş - daha soft
  '#FFF8ED', // Açık sarı (geçiş) - daha soft
  '#FFF5E5', // 6. Açık sarıdan açık turuncuya geçiş - daha soft
  '#FFEFE0', // Açık turuncu (geçiş) - daha soft
  '#FFEBE5', // 7. Açık turuncudan açık kırmızıya geçiş - daha soft
  '#FFE8E5', // Çok açık kırmızı (en alt) - daha soft
];

export function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      setPageHeight(height);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // MutationObserver'ı throttle et - her değişiklikte değil, debounce ile
    let timeoutId: NodeJS.Timeout;
    const observer = new MutationObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100); // 100ms debounce
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false, // Sadece DOM yapısı değişikliklerini izle
    });

    return () => {
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    let rafId: number | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Sadece önemli scroll değişikliklerinde güncelle (20px threshold - performans optimizasyonu)
      if (scrollDelta < 20 && ticking) {
        return;
      }
      
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          setScrollY(currentScrollY);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Tüm renk geçişlerini içeren uzun bir gradient oluştur
  const gradient = colorStops.map((color, index) => {
    const position = (index / (colorStops.length - 1)) * 100;
    return `${color} ${position}%`;
  }).join(', ');

  const fullGradient = `linear-gradient(180deg, ${gradient})`;

  // Scroll pozisyonuna göre background position hesapla
  const getBackgroundPosition = () => {
    if (pageHeight === 0 || pageHeight <= window.innerHeight) {
      return '0% 0%';
    }
    
    // Gradient'in toplam yüksekliği (sayfa yüksekliğinin 2 katı - tüm renk geçişlerini kapsamak için)
    const gradientHeight = pageHeight * 2;
    
    // Scroll progress'i (0-1 arası)
    const maxScroll = pageHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
    
    // Background position'ı hesapla
    // Gradient'in üstten ne kadar aşağıda başlayacağı
    const maxOffset = gradientHeight - window.innerHeight;
    const backgroundY = (scrollProgress * maxOffset / gradientHeight) * 100;
    
    return `0% ${Math.max(0, Math.min(100, backgroundY))}%`;
  };

  const backgroundPosition = getBackgroundPosition();
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Direct DOM manipulation for better performance - no Framer Motion overhead
  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.backgroundPosition = backgroundPosition;
    }
  }, [backgroundPosition]);

  return (
    <>
      <div
        ref={backgroundRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: fullGradient,
          backgroundSize: '100% 200%',
          backgroundPosition: backgroundPosition,
          backgroundRepeat: 'no-repeat',
          willChange: 'background-position',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transition: 'background-position 0.3s linear',
        }}
      />
      {/* Additional overlay for extra softness and depth - opacity artırıldı */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: 'radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
