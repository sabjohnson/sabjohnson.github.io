import React, { useEffect, useRef } from 'react';

const ASCIIFluidBackground = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && window.initFluid) {
      window.initFluid(containerRef.current);
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={containerRef}
        id="ascii-container"
        style={{
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default ASCIIFluidBackground;