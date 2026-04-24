import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Move cursor wrapper
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // Scale up on interactable elements
    const handleMouseHover = () => {
      gsap.to(cursor, { scale: 3, duration: 0.3 });
    };
    
    const handleMouseOut = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);
    
    const interactables = document.querySelectorAll('a, button, input, textarea, select, .interactive');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseHover);
      el.addEventListener('mouseleave', handleMouseOut);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseHover);
        el.removeEventListener('mouseleave', handleMouseOut);
      });
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <div 
        ref={cursorRef}
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          mixBlendMode: 'var(--cursor-invert)',
          transition: 'transform 0.1s ease'
        }}
      />
    </div>
  );
};

export default Cursor;
