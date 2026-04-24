import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BookOpen } from 'lucide-react';

const educationData = [
  { id: 1, year: '2025 – 2027', degree: 'Master of Computer Applications (MCA)', institution: 'Vellore Institute of Technology, Chennai', desc: 'CGPA: 8.85' },
  { id: 2, year: '2021 – 2024', degree: 'BBA (Computer Applications)', institution: 'Ness Wadia College, Pune', desc: 'CGPA: 8.90' },
  { id: 3, year: '2019 – 2021', degree: '12th CBSE', institution: 'Doon International School, Dehradun', desc: 'Score: 86.33%' }
];

const Education = ({ id }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll('.edu-item');
    gsap.fromTo(items, 
      { x: -50, opacity: 0 },
      { 
        x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    );
  }, []);

  return (
    <section id={id} className="section-padding">
      <div className="container" ref={containerRef}>
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Credentials.</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: '24px', width: '2px',
            background: 'var(--border-color)', zIndex: 0
          }} />
          
          {educationData.map(edu => (
            <div key={edu.id} className="edu-item" style={{ 
              display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 
            }}>
              <div style={{
                width: '50px', height: '50px', borderRadius: '50%', background: 'var(--bg-primary)',
                border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <BookOpen size={20} color="var(--accent)" />
              </div>
              
              <div className="glass-panel" style={{ padding: '2rem', width: '100%' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.875rem' }}>{edu.year}</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>{edu.degree}</h3>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{edu.institution}</div>
                <p style={{ color: 'var(--text-secondary)' }}>{edu.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
