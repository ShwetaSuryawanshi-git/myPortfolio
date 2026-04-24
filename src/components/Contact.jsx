import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Code2, Briefcase, MessageCircle } from 'lucide-react';

const Contact = ({ id }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Reveal form
    gsap.fromTo(containerRef.current.querySelector('form'),
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      }
    );
    
    // Magnetic social links
    const socials = containerRef.current.querySelectorAll('.magnetic-social');
    socials.forEach(social => {
      social.addEventListener('mousemove', (e) => {
        const rect = social.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(social, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
      });
      
      social.addEventListener('mouseleave', () => {
        gsap.to(social, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }, []);

  return (
    <section id={id} ref={containerRef} className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '4rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Got a vision?</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Let's build something exceptional together. My inbox is always open.
        </p>
        
        <form className="glass-panel" style={{
          padding: '3rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem',
          marginBottom: '4rem'
        }} onSubmit={e => e.preventDefault()}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Name</label>
              <input type="text" placeholder="John Doe" style={{
                padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)',
                background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', outline: 'none'
              }} className="interactive" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Email</label>
              <input type="email" placeholder="john@example.com" style={{
                padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)',
                background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', outline: 'none'
              }} className="interactive" />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Message</label>
            <textarea placeholder="Tell me about your project..." rows={4} style={{
              padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)',
              background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical'
            }} className="interactive" />
          </div>
          
          <button type="submit" className="interactive" style={{
            padding: '1rem 2rem', background: 'var(--text-primary)', color: 'var(--bg-primary)',
            borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '1rem',
            transition: 'transform 0.2s ease'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Send Message
          </button>
        </form>

        {/* Socials Grid */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {[
            { icon: <Mail size={24} />, href: 'mailto:shweta.suryawanshi.work@gmail.com' },
            { icon: <Code2 size={24} />, href: 'https://github.com/ShwetaSuryawanshi-git/' },
            { icon: <Briefcase size={24} />, href: 'https://www.linkedin.com/in/suryawanshi-shweta/' }
          ].map((social, i) => (
            <a key={i} href={social.href} className="magnetic-social interactive" style={{
              width: '60px', height: '60px', borderRadius: '50%', background: 'var(--card-bg)',
              border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-primary)', textDecoration: 'none'
            }}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
