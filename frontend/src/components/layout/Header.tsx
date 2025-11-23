import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMobile } from "../../hooks/useMobile";
import { LogoCompact } from "../ui/Logo";
import categoriesData from "../../data/shared/categories.json";

export function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [testsMenuOpen, setTestsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const isHomePage = location.pathname === '/';
  const { i18n } = useTranslation();
  const language = i18n.language as 'en' | 'tr';

  // Get 5 main categories from categories.json
  const testCategories = useMemo(() => {
    return categoriesData.categories
      .filter(cat => ['business', 'health', 'love', 'money', 'dark'].includes(cat.id))
      .map(cat => ({
        id: cat.id,
        label: cat.title[language] || cat.title.en,
        emoji: cat.emoji,
        color: cat.color,
      }));
  }, [language]);

  const handleTestCategoryClick = (categoryId: string) => {
    setTestsMenuOpen(false);
    if (isHomePage) {
      // Dispatch custom event to trigger category selection in Home.tsx
      window.dispatchEvent(new CustomEvent('selectCategory', { detail: { categoryId } }));
      
      // Scroll to category section after a short delay
      setTimeout(() => {
        const categorySection = document.querySelector('[data-category-section]');
        if (categorySection) {
          categorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } else {
      navigate('/');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('selectCategory', { detail: { categoryId } }));
        setTimeout(() => {
          const categorySection = document.querySelector('[data-category-section]');
          if (categorySection) {
            categorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      }, 100);
    }
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentY > lastScrollY + 0.1) {
            setVisible(false); // hide on scroll down (ultra sensitive)
          } else if (currentY < lastScrollY - 0.1) {
            setVisible(true); // show on scroll up (ultra sensitive)
          }

          setLastScrollY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!testsMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-tests-menu]')) {
        setTestsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [testsMenuOpen]);

  return (
    <motion.header
      initial={{ y: 0, opacity: 1, x: '-50%' }}
      animate={{
        y: visible ? 0 : -80,
        opacity: visible ? 1 : 0,
        x: '-50%',
        boxShadow: visible
          ? "0 4px 25px rgba(108,99,255,0.15)"
          : "0 0 0 rgba(0,0,0,0)",
        transition: { duration: 0.45, ease: "easeInOut" },
      }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        zIndex: 50,
        width: isMobile ? '53%' : '50%',
        maxWidth: '1280px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '12px 20px' : '16px 24px',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
          <motion.div
              onClick={() => {
                if (isHomePage) {
                  const testsSection = document.getElementById('tests-section');
                  if (testsSection) {
                    testsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  navigate('/');
                }
              }}
          style={{ cursor: 'pointer' }}
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 10 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
          <LogoCompact size={32} />
        </motion.div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            margin: 0,
            background: 'linear-gradient(135deg, #6C63FF 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                QuickIQ
          </h1>
          <p style={{
            fontSize: '10px',
            color: '#666',
            margin: '-2px 0 0 0',
            fontWeight: '400',
          }}>
            Intelligence & Mental Health
          </p>
              </div>
            </div>
          
          {!isMobile && (
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          fontSize: '14px',
        }}>
                <Link 
                  to="/" 
                  style={{ 
              color: location.pathname === '/' ? '#6C63FF' : '#666',
                    textDecoration: 'none', 
              fontWeight: location.pathname === '/' ? '600' : '400',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/') {
                e.currentTarget.style.color = '#6C63FF';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/') {
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            Ana Sayfa
          </Link>
          <div style={{ position: 'relative' }} data-tests-menu>
            <button
              onClick={() => setTestsMenuOpen(!testsMenuOpen)}
            style={{ 
                background: 'transparent',
                border: 'none',
              color: location.pathname === '/tests' ? '#6C63FF' : '#666',
              textDecoration: 'none', 
              fontWeight: location.pathname === '/tests' ? '600' : '400',
              transition: 'color 0.3s ease',
                cursor: 'pointer',
                fontSize: '14px',
                padding: 0,
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/tests') {
                e.currentTarget.style.color = '#6C63FF';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/tests') {
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            Testler
            </button>
            
            {testsMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '12px',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(108, 99, 255, 0.2)',
                  minWidth: '200px',
                  zIndex: 1000,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
                onMouseLeave={() => setTestsMenuOpen(false)}
              >
                {testCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    onClick={() => handleTestCategoryClick(category.id)}
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${category.color}33`,
                      borderRadius: '10px',
                      color: category.color,
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 4px 12px ${category.color}33`;
                      e.currentTarget.style.background = `${category.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{category.emoji}</span>
                    <span>{category.label.split('–')[0].trim()}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </nav>
      )}
    </motion.header>
  );
}
