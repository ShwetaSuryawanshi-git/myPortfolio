import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Sun, Moon } from 'lucide-react';

const Header = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Animate toggle
    gsap.to('.theme-icon', {
      rotation: '+=180',
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setTheme(newTheme);
        gsap.to('.theme-icon', { opacity: 1, duration: 0.2 });
      }
    });
  };

  const navLinks = ['Projects', 'About', 'Contact'];

  return (
    <header className="glass-panel" style={{
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', padding: '1rem 2rem', zIndex: 1000
    }}>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'bold', fontSize: '1.2rem' }}>
        SHWETA SURYAWANSHI
      </div>
      
      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navLinks.map(link => (
          <a 
            key={link} 
            href={`#${link.toLowerCase()}`}
            style={{ position: 'relative', overflow: 'hidden' }}
            className="nav-link"
            onMouseEnter={e => gsap.to(e.currentTarget.querySelector('.underline'), { scaleX: 1, duration: 0.3, transformOrigin: 'left' })}
            onMouseLeave={e => gsap.to(e.currentTarget.querySelector('.underline'), { scaleX: 0, duration: 0.3, transformOrigin: 'right' })}
          >
            {link}
            <div className="underline" style={{
              position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
              background: 'var(--accent)', transform: 'scaleX(0)', transformOrigin: 'left'
            }} />
          </a>
        ))}
        
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex' }}>
          <div className="theme-icon">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </button>
      </nav>
    </header>
  );
};

export default Header;
