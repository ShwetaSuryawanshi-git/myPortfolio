import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Award, Trophy, Star } from 'lucide-react';

const stats = [
  { id: 1, label: '1st Place Hackathon', value: '1st', desc: 'One Person, One Vision Hackathon', icon: <Trophy size={24} /> },
  { id: 2, label: 'Certifications', value: '2+', desc: 'IIT Guwahati & AWS', icon: <Award size={24} /> },
  { id: 3, label: 'Leadership', value: 'CR', desc: 'Class Representative, MCA VIT', icon: <Star size={24} /> },
];

const Achievements = ({ id }) => {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.achievement-card');
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      }
    );
  }, []);

  return (
    <section id={id} ref={sectionRef} className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>Achievements.</h2>
        
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'
        }}>
          {stats.map((stat, i) => (
            <div key={stat.id} className="glass-panel achievement-card" style={{
              padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '1rem', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ 
                width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                marginBottom: '1rem'
              }}>
                {stat.icon}
              </div>
              
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 'bold' }}>{stat.label}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
