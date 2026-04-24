import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = ({ id }) => {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Basic canvas setup for particles
  const canvasRef = useRef(null);

  useEffect(() => {
    // Reveal animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.fromTo([title1Ref.current, title2Ref.current], 
      { y: 100, opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { y: 0, opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2, stagger: 0.2 }
    )
    .fromTo(descRef.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    );

    // Particle field implementation
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let animationFrameId;
      
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', resize);
      resize();

      const particles = [];
      const particleCount = window.innerWidth < 768 ? 30 : 70;
      
      for(let i=0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          
          if(p.x < 0) p.x = canvas.width;
          if(p.x > canvas.width) p.x = 0;
          if(p.y < 0) p.y = canvas.height;
          if(p.y > canvas.height) p.y = 0;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
        
        animationFrameId = requestAnimationFrame(draw);
      };
      
      draw();
      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <section id={id} ref={containerRef} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.5 }} 
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, marginBottom: '1rem' }}>
          <div ref={title1Ref} style={{ opacity: 0 }}>AI Engineer &</div>
          <div ref={title2Ref} style={{ opacity: 0, color: 'var(--accent)' }}>Full-Stack Developer.</div>
        </h1>
        
        <p ref={descRef} style={{ maxWidth: '600px', fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', opacity: 0 }}>
          Strong hands-on foundations in LLM systems, RAG-style pipelines, and backend development. Passionate about building reliable, scalable AI systems with production-aware code.
        </p>
        
        <div ref={ctaRef} style={{ opacity: 0, display: 'flex', gap: '1rem' }}>
          <a href="#projects" className="btn-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '1rem 2rem', background: 'var(--accent)', color: 'white',
            borderRadius: '50px', fontWeight: 'bold', border: '1px solid var(--accent)'
          }}>
            Explore Work <ArrowRight size={20} />
          </a>
          <a href="#contact" className="btn-secondary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '1rem 2rem', background: 'transparent', color: 'var(--text-primary)',
            borderRadius: '50px', fontWeight: 'bold', border: '1px solid var(--border-color)'
          }}>
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
