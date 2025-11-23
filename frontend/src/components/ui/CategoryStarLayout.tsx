import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import { useTranslation } from 'react-i18next';
import categoriesData from '../../data/shared/categories.json';
import { getAllTestConfigs } from '../../utils/testContentLoader';
import './CategoryStarLayout.css';

interface CategoryStarLayoutProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

// Pentagon positions: 5 points around a circle
// Each point is 72° apart (360° / 5 = 72°)
// Starting from top (0°), going clockwise:
// Top: 0°, Top-right: 72°, Bottom-right: 144°, Bottom-left: 216°, Top-left: 288°
const PENTAGON_POSITIONS = [
  { id: 'business', angle: 0, label: 'Top' },        // 0° - Top
  { id: 'health', angle: 72, label: 'Top-Right' },   // 72° - Top-Right
  { id: 'dark', angle: 144, label: 'Bottom-Right' }, // 144° - Bottom-Right
  { id: 'money', angle: 216, label: 'Bottom-Left' }, // 216° - Bottom-Left
  { id: 'love', angle: 288, label: 'Top-Left' },     // 288° - Top-Left
];

// Distance from center (radius) - increased for better spacing
const RADIUS = 260; // pixels from center (increased from 180px)

export function CategoryStarLayout({ selectedCategory, onCategorySelect }: CategoryStarLayoutProps) {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const language = i18n.language as 'en' | 'tr';

  // Get the 5 main categories in the correct order
  const categories = useMemo(() => {
    const categoryMap = new Map(
      categoriesData.categories
        .filter(cat => ['business', 'health', 'love', 'money', 'dark'].includes(cat.id))
        .map(cat => [cat.id, cat])
    );
    
    // Return in pentagon order: business, health, dark, money, love
    return PENTAGON_POSITIONS.map(pos => categoryMap.get(pos.id)).filter(Boolean);
  }, []);

  // Calculate position for each card in pentagon
  const getCardPosition = (angle: number) => {
    const angleRad = (angle * Math.PI) / 180;
    const x = Math.sin(angleRad) * RADIUS;
    const y = -Math.cos(angleRad) * RADIUS; // Negative because CSS Y increases downward
    return { x, y };
  };

  // Get theme colors for each category
  const getCategoryTheme = (categoryId: string) => {
    const themes: Record<string, { 
      gradient: string; 
      glow: string; 
      border: string;
      titleColor: string;
    }> = {
      business: {
        gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)', // Soft blue
        glow: 'rgba(33, 150, 243, 0.3)',
        border: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#4A6CFF',
      },
      health: {
        gradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 50%, #CE93D8 100%)', // Soft purple
        glow: 'rgba(156, 39, 176, 0.3)',
        border: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#9A63FF',
      },
      love: {
        gradient: 'linear-gradient(135deg, #FFE0E6 0%, #FFB3C1 50%, #FF8FA3 100%)', // Coral/red
        glow: 'rgba(244, 67, 54, 0.3)',
        border: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#FF4D5A',
      },
      money: {
        gradient: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)', // Mint/green
        glow: 'rgba(0, 188, 212, 0.3)',
        border: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#27C07D',
      },
      dark: {
        gradient: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 50%, #0D0D0D 100%)', // Black/silver
        glow: 'rgba(0, 0, 0, 0.4)',
        border: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#EAEAEA',
      },
    };
    return themes[categoryId] || themes.business;
  };

  // Extract title and description from category title
  // Format: "Business – Career, Performance & Leadership Mastery"
  // Returns: { title: "BUSINESS", description: "Career, Performance & Leadership Mastery" }
  const parseCategoryText = (fullTitle: string) => {
    const parts = fullTitle.split('–').map(s => s.trim());
    if (parts.length >= 2) {
      return {
        title: parts[0].toUpperCase(),
        description: parts.slice(1).join('–').trim(),
      };
    }
    // Fallback if no separator found
    return {
      title: fullTitle.toUpperCase(),
      description: '',
    };
  };

  if (isMobile) {
    // Mobile: Simple vertical stacked list
    return (
      <div className="category-star-layout-mobile">
        {categories.map((category) => {
          if (!category) return null;
          const isActive = selectedCategory === category.id;
          const theme = getCategoryTheme(category.id);
          const categoryText = category.title[language] || category.title.en;
          const { title, description } = parseCategoryText(categoryText);
          
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`category-star-card-mobile ${isActive ? 'active' : ''}`}
              style={{
                background: theme.gradient,
                borderColor: theme.border,
                '--card-glow': theme.glow,
                '--title-color': theme.titleColor,
              } as React.CSSProperties}
            >
              <span className="category-star-emoji">{category.emoji}</span>
              <span className="category-star-title-uppercase">{title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCategorySelect(category.id);
                }}
                style={{
                  marginTop: '8px',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  color: category.id === 'dark' ? '#000000' : theme.titleColor,
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Take a Quiz
              </button>
            </button>
          );
        })}
      </div>
    );
  }

  // Desktop: Pentagon/Star layout
  return (
    <div className="category-star-layout">
      {/* Center Lookmagic Icon */}
      <div className="category-star-center">
        <img 
          src="/icons/Lookmagic.svg" 
          alt="Mystery Icon" 
          className="lookmagic-icon-center"
          onClick={() => {
            // Get all available tests
            const allTests = getAllTestConfigs();
            
            // Filter out tests that should be excluded (if any)
            const availableTests = allTests.filter(test => 
              test && test.slug && test.id
            );
            
            if (availableTests.length > 0) {
              // Select a random test
              const randomIndex = Math.floor(Math.random() * availableTests.length);
              const randomTest = availableTests[randomIndex];
              
              // Navigate to the random test
              navigate(`/test/${randomTest.slug}`);
            }
          }}
        />
      </div>

      {/* Category Cards in Pentagon */}
      {categories.map((category, index) => {
        if (!category) return null;
        const position = PENTAGON_POSITIONS.find(p => p.id === category.id);
        if (!position) return null;
        
        const { x, y } = getCardPosition(position.angle);
        const isActive = selectedCategory === category.id;
        const theme = getCategoryTheme(category.id);
        const categoryText = category.title[language] || category.title.en;
        const { title, description } = parseCategoryText(categoryText);
        
        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`category-star-card ${isActive ? 'active' : ''}`}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              background: theme.gradient,
              borderColor: theme.border,
              '--card-glow': theme.glow,
              '--title-color': theme.titleColor,
            } as React.CSSProperties}
          >
            <span className="category-star-emoji">{category.emoji}</span>
            <span className="category-star-title-uppercase">{title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCategorySelect(category.id);
              }}
              style={{
                marginTop: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                color: category.id === 'dark' ? '#000000' : theme.titleColor,
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Take a Quiz
            </button>
          </button>
        );
      })}
    </div>
  );
}

