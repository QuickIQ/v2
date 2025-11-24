import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { useTranslation } from 'react-i18next';
import { useRipple } from '../../hooks/useRipple';
import categoriesData from '../../data/shared/categories.json';
import './CategoryButtons.css';

interface CategoryButtonsProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

interface CategoryButtonProps {
  category: typeof categoriesData.categories[0];
  isActive: boolean;
  language: 'en' | 'tr';
  onSelect: (categoryId: string) => void;
}

function CategoryButton({ category, isActive, language, onSelect }: CategoryButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { ripples, createRipple, color, scale, transition } = useRipple({
    buttonRef,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    onSelect(category.id);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`category-button ripple-container ${isActive ? 'active' : ''}`}
      style={{
        '--category-color': category.color,
      } as React.CSSProperties}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale, opacity: 0 }}
          transition={transition}
          style={{
            position: 'absolute',
            top: ripple.y - ripple.size / 2,
            left: ripple.x - ripple.size / 2,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            borderRadius: '50%',
            backgroundColor: color,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      ))}
      <span className="category-emoji">{category.emoji}</span>
      <span className="category-title">
        {category.title[language] || category.title.en}
      </span>
    </button>
  );
}

export function CategoryButtons({ selectedCategory, onCategorySelect }: CategoryButtonsProps) {
  const isMobile = useMobile();
  const { i18n } = useTranslation();
  const language = i18n.language as 'en' | 'tr';

  // Filter to only show the 5 main categories
  const mainCategories = useMemo(() => {
    return categoriesData.categories.filter(cat => 
      ['business', 'health', 'love', 'money', 'dark'].includes(cat.id)
    );
  }, []);

  return (
    <div className="category-buttons-container">
      {mainCategories.map((category) => {
        const isActive = selectedCategory === category.id;
        return (
          <CategoryButton
            key={category.id}
            category={category}
            isActive={isActive}
            language={language}
            onSelect={onCategorySelect}
          />
        );
      })}
    </div>
  );
}

