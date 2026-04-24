import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = ({ id }) => {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Parallax photo effect
    gsap.fromTo(photoRef.current,
      { y: -30 },
      {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // Text entrance
    gsap.fromTo(textRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%"
        }
      }
    );
  }, []);

  return (
    <section id={id} ref={containerRef} className="section-padding">
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>The Narrative.</h2>
        
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Photo */}
          <div style={{ position: 'relative', height: '500px', borderRadius: '16px', overflow: 'hidden', background: 'var(--card-bg)' }}>
            <div 
              ref={photoRef}
              style={{
                position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%',
                backgroundImage: 'url("/profile.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'block'
              }}
            />
          </div>
          
          {/* Text */}
          <div ref={textRef}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              Engineering Aesthetics.
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              I am a digital artisan bridging the gap between design and engineering. With a foundation in architecture and computer science, I build products that are not only fiercely functional but viscerally engaging.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.8 }}>
              When I'm not pushing pixels or writing logic, you can find me analyzing typography specimens, studying motion design curves, or brewing the perfect pour-over coffee.
            </p>
            
            <a href="#contact" className="btn-primary" style={{
              display: 'inline-block', padding: '1rem 2rem', background: 'var(--accent)', color: 'white',
              borderRadius: '50px', fontWeight: 'bold', border: '1px solid var(--accent)'
            }}>
              Let's craft something
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
