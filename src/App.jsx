import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const progressRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Scroll progress bar
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });

    // Setup section indicators
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onToggle: self => {
          if (self.isActive) {
            setActiveSection(sec.id);
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = ['hero', 'projects', 'achievements', 'education', 'skills', 'about', 'contact'];

  return (
    <>
      <div className="grain-overlay"></div>
      
      {/* Top Progress Bar */}
      <div 
        ref={progressRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '4px',
          background: 'var(--accent)', transformOrigin: '0% 50%', transform: 'scaleX(0)',
          zIndex: 1000
        }}
      />

      <Header />

      {/* Side Dot Navigation */}
      <div className="side-nav" style={{
        position: 'fixed', right: '2rem', top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 100
      }}>
        {sections.map(sec => (
          <a key={sec} href={`#${sec}`} className="dot-link" aria-label={`Go to ${sec}`}>
            <span className="dot-tooltip">{sec}</span>
            <div style={{
              width: activeSection === sec ? '12px' : '8px',
              height: activeSection === sec ? '12px' : '8px',
              borderRadius: '50%',
              background: activeSection === sec ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'all 0.3s ease'
            }} />
          </a>
        ))}
      </div>

      <main>
        <Hero id="hero" />
        <Projects id="projects" />
        <Achievements id="achievements" />
        <Education id="education" />
        <Skills id="skills" />
        <About id="about" />
        <Contact id="contact" />
      </main>

      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: '50px', height: '50px', borderRadius: '50%',
          background: 'var(--card-bg)', border: '1px solid var(--border-color)',
          color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)', zIndex: 100, transition: 'all 0.3s ease',
          opacity: activeSection === 'hero' ? 0 : 1,
          pointerEvents: activeSection === 'hero' ? 'none' : 'auto'
        }}
      >
        ↑
      </button>
    </>
  );
}

export default App;
