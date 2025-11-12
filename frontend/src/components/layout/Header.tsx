import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMobile } from "../../hooks/useMobile";
import { LogoCompact } from "../ui/Logo";

export function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const isHomePage = location.pathname === '/';

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
        <div>
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
            Intelligence Test
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
          <Link
            to="/tests"
            style={{
              color: location.pathname === '/tests' ? '#6C63FF' : '#666',
              textDecoration: 'none',
              fontWeight: location.pathname === '/tests' ? '600' : '400',
              transition: 'color 0.3s ease',
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
          </Link>
        </nav>
      )}
    </motion.header>
  );
}
