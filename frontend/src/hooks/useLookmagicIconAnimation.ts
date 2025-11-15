import { useEffect } from 'react';

/**
 * Custom hook for Lookmagic icon proximity-based pop-out animation
 * Handles DOM manipulation and animation logic
 */
export function useLookmagicIconAnimation(dependencies: any[] = []) {
  useEffect(() => {
    const icon = document.querySelector('.lookmagic-icon') as HTMLElement;
    if (!icon) return;

    let curScale = 1;
    let curShadowIntensity = 0;
    let targetScale = 1;
    let targetShadowIntensity = 0;
    let isHovering = false;
    let rafId: number | null = null;

    // Base shadow that's always present
    const baseShadow = 'drop-shadow(0 8px 24px rgba(108, 99, 255, 0.25))';

    // Smooth easing for fluid animation
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function animate() {
      // Fast on hover (0.3), smooth on leave (0.15)
      const speed = isHovering ? 0.3 : 0.15;
      
      curScale = lerp(curScale, targetScale, speed);
      curShadowIntensity = lerp(curShadowIntensity, targetShadowIntensity, speed);

      // Apply transform directly - use !important to override any CSS transitions
      icon.style.setProperty('transform', `scale(${curScale})`, 'important');
      icon.style.setProperty('-webkit-transform', `scale(${curScale})`, 'important');
      
      // Combine base shadow with additional hover shadow
      const additionalShadowBlur = 35 * curShadowIntensity;
      const additionalShadowOpacity = 0.5 * curShadowIntensity;
      const additionalShadow = curShadowIntensity > 0.01
        ? ` drop-shadow(0 ${12 + curShadowIntensity * 10}px ${additionalShadowBlur}px rgba(108, 99, 255, ${additionalShadowOpacity}))`
        : '';
      
      icon.style.setProperty('filter', baseShadow + additionalShadow, 'important');
      icon.style.setProperty('-webkit-filter', baseShadow + additionalShadow, 'important');

      // Continue animating until fully settled
      if (Math.abs(curScale - targetScale) > 0.001 || Math.abs(curShadowIntensity - targetShadowIntensity) > 0.001) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    }

    function pointerMove(e: MouseEvent) {
      const rect = icon.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const dist = Math.hypot(dx, dy);
      const maxDist = rect.width / 2;

      let intensity = 1 - Math.min(dist / maxDist, 1);
      intensity = Math.pow(intensity, 1.8); // Smoother falloff

      targetScale = 1 + intensity * 0.25; // 1 → 1.25 (more dramatic)
      targetShadowIntensity = intensity;

      if (!rafId) {
        animate();
      }
    }

    const handlePointerEnter = (e: MouseEvent) => {
      isHovering = true;
      pointerMove(e); // Immediately calculate position
      if (!rafId) animate();
    };

    const handlePointerLeave = () => {
      isHovering = false;
      targetScale = 1;
      targetShadowIntensity = 0;
      if (!rafId) animate();
    };

    // Use both mouse and pointer events for better compatibility
    icon.addEventListener('mouseenter', handlePointerEnter as EventListener);
    icon.addEventListener('mousemove', pointerMove);
    icon.addEventListener('mouseleave', handlePointerLeave);
    icon.addEventListener('pointerenter', handlePointerEnter as EventListener);
    icon.addEventListener('pointermove', pointerMove);
    icon.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      icon.removeEventListener('mouseenter', handlePointerEnter as EventListener);
      icon.removeEventListener('mousemove', pointerMove);
      icon.removeEventListener('mouseleave', handlePointerLeave);
      icon.removeEventListener('pointerenter', handlePointerEnter as EventListener);
      icon.removeEventListener('pointermove', pointerMove);
      icon.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
      // Reset styles on cleanup
      icon.style.removeProperty('transform');
      icon.style.removeProperty('-webkit-transform');
      icon.style.removeProperty('filter');
      icon.style.removeProperty('-webkit-filter');
    };
  }, dependencies);
}

