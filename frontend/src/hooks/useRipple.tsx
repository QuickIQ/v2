import { useState, useCallback, useRef, useEffect } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface UseRippleOptions {
  duration?: number;
  color?: string;
  scale?: number;
  transition?: {
    duration?: number;
    ease?: string;
  };
  buttonRef?: React.RefObject<HTMLElement>;
}

export const useRipple = (options: UseRippleOptions = {}) => {
  const { 
    duration = 600, 
    color,
    scale = 6, // Increased from 4 to 6 for larger ripple effect
    transition = { duration: 0.6, ease: 'easeOut' },
    buttonRef
  } = options;
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [bgColor, setBgColor] = useState<string>(color || 'rgba(255, 255, 255, 0.6)');
  const nextIdRef = useRef(0);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Get parent card background color
  useEffect(() => {
    if (!buttonRef?.current) return;
    
    const btn = buttonRef.current;
    // Kart container'ını bul (1 level yukarı)
    const parent = btn.parentElement as HTMLElement;
    
    if (parent) {
      const style = window.getComputedStyle(parent);
      const cardColor = style.backgroundColor;
      
      // Tamamen transparan olmasını engelle
      const fallback = color || 'rgba(255, 255, 255, 0.35)';
      
      // Convert color to rgba with opacity for better visibility
      let finalColor = cardColor && cardColor !== 'rgba(0, 0, 0, 0)' && cardColor !== 'transparent'
        ? cardColor
        : fallback;
      
      // If color is in rgb format, convert to rgba with opacity
      if (finalColor.startsWith('rgb(') && !finalColor.startsWith('rgba(')) {
        finalColor = finalColor.replace('rgb(', 'rgba(').replace(')', ', 0.4)');
      } else if (finalColor.startsWith('rgba(')) {
        // Extract rgb values and set opacity to 0.4 for better visibility
        const rgbaMatch = finalColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (rgbaMatch) {
          finalColor = `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, 0.4)`;
        }
      }
      
      setBgColor(finalColor);
    } else {
      // Parent yoksa butonun kendi rengini kullan
      const style = window.getComputedStyle(btn);
      const background = style.backgroundColor;
      const fallback = color || 'rgba(255, 255, 255, 0.35)';
      setBgColor(background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent' ? background : fallback);
    }
  }, [buttonRef, color]);

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    // Calculate ripple size based on button size (larger for better visibility)
    const size = Math.max(rect.width, rect.height) * 0.6; // 60% of largest dimension
    // Center the ripple at click position
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ripple: Ripple = {
      id: nextIdRef.current++,
      x,
      y,
      size: Math.max(size, 40), // Minimum 40px, but scale with button size
    };

    setRipples((prev) => [...prev, ripple]);

    // Remove ripple after animation completes
    const animationDuration = transition.duration ? transition.duration * 1000 : duration;
    const timeout = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, animationDuration);

    timeoutRefs.current.push(timeout);
  }, [duration, transition]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return {
    ripples,
    createRipple,
    color: bgColor,
    duration: transition.duration ? transition.duration * 1000 : duration,
    scale,
    transition,
  };
};


