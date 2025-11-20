import { useMemo } from 'react';
import { useMobile } from '../../hooks/useMobile';
import { useTranslation } from 'react-i18next';
import categoriesData from '../../data/shared/categories.json';
import './CategoryButtons.css';

interface CategoryButtonsProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
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
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`category-button ${isActive ? 'active' : ''}`}
            style={{
              '--category-color': category.color,
            } as React.CSSProperties}
          >
            <span className="category-emoji">{category.emoji}</span>
            <span className="category-title">
              {category.title[language] || category.title.en}
            </span>
          </button>
        );
      })}
    </div>
  );
}

