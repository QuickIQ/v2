import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import '../../App.css';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if we're on home page for special styling
  const isHomePage = location.pathname === '/';

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      
      const headerContainer = document.querySelector('.header-container');
      if (headerContainer) {
        headerContainer.classList.toggle('sticky-scrolled', scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="header-container">
        <div className="header-content">
          {/* Logo - Left aligned */}
          <motion.div
            className="header-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              onClick={() => {
                if (isHomePage) {
                  // On homepage, scroll to tests section
                  const testsSection = document.getElementById('tests-section');
                  if (testsSection) {
                    testsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // On other pages, navigate to homepage
                  navigate('/');
                }
              }}
              style={{ 
                cursor: 'pointer',
                textDecoration: 'none' 
              }}
            >
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
            </div>
          </motion.div>
          
          {/* Navigation - Centered */}
          {!isMobile && (
            <nav className="header-nav">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link 
                  to="/" 
                  className={`header-link ${isHomePage ? 'homepage' : ''}`}
                  style={{ 
                    textDecoration: 'none', 
                    color: isHomePage && !isScrolled ? '#888' : '#333',
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
                        background: isHomePage && !isScrolled
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
                  className={`header-link ${isHomePage ? 'homepage' : ''}`}
                  style={{ 
                    textDecoration: 'none', 
                    color: isHomePage && !isScrolled ? '#888' : '#333',
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
                        background: isHomePage && !isScrolled
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

          {/* Right side - Hamburger on mobile */}
          {isMobile ? (
            <button
              className="header-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div style={{
                width: '24px',
                height: '2px',
                background: isHomePage && !isScrolled ? '#888' : '#333',
                transition: 'all 0.3s',
              }} />
              <div style={{
                width: '24px',
                height: '2px',
                background: isHomePage && !isScrolled ? '#888' : '#333',
                transition: 'all 0.3s',
              }} />
              <div style={{
                width: '24px',
                height: '2px',
                background: isHomePage && !isScrolled ? '#888' : '#333',
                transition: 'all 0.3s',
              }} />
            </button>
          ) : (
            <div className="header-right">
              {/* Placeholder for future language/login/cart items */}
            </div>
          )}
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <motion.nav
          className="mobile-menu"
          style={{
            top: isScrolled ? '95px' : '115px',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
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
