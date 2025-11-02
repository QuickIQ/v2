import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useMobile } from '../../hooks/useMobile';
import '../../App.css';

export function Header() {
  const location = useLocation();
  const { scrollPosition, scrollDirection } = useScrollPosition();
  const [blurAmount, setBlurAmount] = useState(15);
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrolled = scrollPosition > 50;

  useEffect(() => {
    const newBlur = Math.min(15 + (scrollPosition / 10), 25);
    setBlurAmount(newBlur);
  }, [scrollPosition]);

  // Check if we're on home page for special styling
  const isHomePage = location.pathname === '/';
  
  const headerBackground = isHomePage
    ? scrolled 
      ? 'rgba(255, 255, 255, 0.15)' 
      : 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.1)';

  return (
    <>
    <motion.header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: headerBackground,
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        borderBottom: scrolled 
          ? '1px solid rgba(255, 255, 255, 0.2)' 
          : '1px solid rgba(255, 255, 255, 0.05)',
        padding: scrolled 
          ? (isMobile ? '12px 16px' : '16px 24px')
          : (isMobile ? '16px 16px' : '20px 24px'),
        opacity: 0.9,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: scrollDirection === 'down' && scrollPosition > 100 ? -100 : 0,
        opacity: 1,
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
      }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px',
            }}>
              QuickIQ
            </div>
          </Link>
        </motion.div>
        
        {isMobile ? (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{
              width: '24px',
              height: '2px',
              background: isHomePage ? '#888' : '#333',
              transition: 'all 0.3s',
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              background: isHomePage ? '#888' : '#333',
              transition: 'all 0.3s',
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              background: isHomePage ? '#888' : '#333',
              transition: 'all 0.3s',
            }} />
          </button>
        ) : (
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link 
                to="/" 
                style={{ 
                  textDecoration: 'none', 
                  color: isHomePage ? '#888' : '#333',
                  fontWeight: '500',
                  fontSize: '16px',
                  transition: 'color 0.3s',
                  position: 'relative'
                }}
              >
                {location.pathname === '/' && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: isHomePage 
                        ? '#888'
                        : 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: '2px',
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Ana Sayfa
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link 
                to="/tests" 
                style={{ 
                  textDecoration: 'none', 
                  color: isHomePage ? '#888' : '#333',
                  fontWeight: '500',
                  fontSize: '16px',
                  transition: 'color 0.3s',
                  position: 'relative'
                }}
              >
                {location.pathname === '/tests' && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: isHomePage 
                        ? '#888'
                        : 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: '2px',
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Testler
              </Link>
            </motion.div>
          </nav>
        )}
        
      </div>
    </motion.header>
    
    {isMobile && isMenuOpen && (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        style={{
          position: 'fixed',
          top: scrolled ? '56px' : '64px',
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Link 
          to="/" 
          onClick={() => setIsMenuOpen(false)}
          style={{ 
            textDecoration: 'none', 
            color: '#333',
            fontWeight: '500',
            fontSize: '16px',
          }}
        >
          Ana Sayfa
        </Link>
        <Link 
          to="/tests" 
          onClick={() => setIsMenuOpen(false)}
          style={{ 
            textDecoration: 'none', 
            color: '#333',
            fontWeight: '500',
            fontSize: '16px',
          }}
        >
          Testler
        </Link>
      </motion.nav>
    )}
    </>
  );
}
