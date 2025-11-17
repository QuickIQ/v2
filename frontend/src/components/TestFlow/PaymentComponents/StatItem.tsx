interface StatItemProps {
  emoji: string;
  title: string;
  subtitle?: string;
  isMobile?: boolean;
}

export function StatItem({ emoji, title, subtitle, isMobile }: StatItemProps) {
  return (
    <div style={{
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
    }}>
      {isMobile ? (
        // Mobilde: İkon başlığın hemen solunda, birlikte ortalanmış
        <div style={{
          textAlign: 'center',
        }}>
          <p
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#444',
              margin: '0 0 4px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
            {title}
          </p>
          {subtitle && (
            <p
              style={{
                fontSize: '12px',
                fontWeight: '500',
                opacity: 0.55,
                color: '#666',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      ) : (
        // Desktop'ta: Mevcut layout
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '4px',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
            <p
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#444',
                margin: 0,
              }}
            >
              {title}
            </p>
          </div>
          {subtitle && (
            <p
              style={{
                fontSize: '12px',
                fontWeight: '500',
                opacity: 0.55,
                color: '#666',
                margin: 0,
                marginLeft: '28px',
              }}
            >
              {subtitle}
            </p>
          )}
        </>
      )}
    </div>
  );
}

