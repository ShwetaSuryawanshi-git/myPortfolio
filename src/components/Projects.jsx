import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ExternalLink, Code2 } from 'lucide-react';

const projectsData = [
  { id: 1, title: 'TypingMaster - AI Typing Analytics', category: 'Web', tags: ['Java', 'Spring Boot', 'MySQL', 'Python', 'PyTorch'], link: 'https://github.com/ShwetaSuryawanshi-git/TypingTest-Master/', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 2, title: 'Early Stage Dyslexia Detection in Children', category: 'AI', tags: ['Python', 'Data', 'ML'], link: 'https://github.com/ShwetaSuryawanshi-git/python-project', gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)' },
  { id: 3, title: 'MediGraph', category: 'Web', tags: ['React', 'Node.js', 'FastAPI', 'OpenAI'], link: 'https://github.com/ShwetaSuryawanshi-git/MediGraph', demo: 'https://medigraph-shweta-2026-demo.netlify.app', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 4, title: 'Graph-Based Social Connection Finder (DSA+DBMS)', category: 'Web', tags: ['Neo4j', 'Node.js', 'React', 'DSA'], link: 'https://github.com/ShwetaSuryawanshi-git/DSADBMS-Project', gradient: 'linear-gradient(135deg, #141E30 0%, #243B55 100%)' },
];

const categories = ['All', 'Web', 'Mobile', 'AI', 'Design'];

const Projects = ({ id }) => {
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [showToast, setShowToast] = useState(false);
  const cardsRef = useRef([]);
  const hasShownToast = useRef(false);

  useEffect(() => {
    // Filter logic
    if (filter === 'All') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(p => p.category === filter));
    }
  }, [filter]);

  useEffect(() => {
    // Scroll Entrance
    gsap.fromTo(cardsRef.current, 
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
        scrollTrigger: {
          trigger: `#${id}`,
          start: "top 70%",
          onEnter: () => {
            if (!hasShownToast.current) {
              hasShownToast.current = true;
              setShowToast(true);
              setTimeout(() => setShowToast(false), 4000);
            }
          }
        }
      }
    );
  }, [id, filteredProjects]);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(card, {
      rotateX, rotateY, transformPerspective: 1000, duration: 0.4, ease: "power2.out"
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <section id={id} className="section-padding">
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Selected Work.</h2>
        
        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.5rem 1.5rem', borderRadius: '50px',
                background: filter === cat ? 'var(--accent)' : 'transparent',
                color: filter === cat ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${filter === cat ? 'var(--accent)' : 'var(--border-color)'}`,
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Project Grid */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem'
        }}>
          {filteredProjects.map((project, i) => (
            <div 
              key={project.id}
              ref={el => cardsRef.current[i] = el}
              className="glass-panel"
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              onClick={() => window.open(project.link || "#", "_blank")}
              style={{
                cursor: 'pointer',
                padding: '1.5rem', minHeight: '400px', display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d'
              }}
            >
              {/* Colorful Banner */}
              <div 
                style={{ 
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '140px', zIndex: 0,
                  background: project.gradient, opacity: 0.9, filter: 'saturate(1.2)'
                }} 
              />
              {/* Solid Background for the rest of the card */}
              <div 
                style={{ 
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1,
                  background: 'var(--card-bg)'
                }} 
              />
              
              <div style={{ 
                flex: 1, zIndex: 1, marginTop: '80px', background: 'var(--bg-primary)', 
                padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 'bold' }}>{project.category}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href={project.link || "#"} aria-label="Code" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      <Code2 size={20} color="var(--text-secondary)" />
                    </a>
                    {project.demo && (
                      <a href={project.demo} aria-label="Live Demo" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={20} color="var(--text-secondary)" />
                      </a>
                    )}
                  </div>
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{project.title}</h3>
                
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ 
                      fontSize: '0.75rem', padding: '0.25rem 0.75rem', 
                      background: 'rgba(255,255,255,0.05)', borderRadius: '20px', color: 'var(--text-secondary)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%',
                background: 'linear-gradient(to top, var(--card-bg) 0%, transparent 100%)',
                zIndex: 0
              }} />
            </div>
          ))}
        </div>
        
        {/* Toast Notification */}
        <div style={{
          position: 'fixed', bottom: '2rem', left: '50%', transform: `translate(-50%, ${showToast ? '0' : '100px'})`,
          opacity: showToast ? 1 : 0, transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          background: 'var(--accent)', color: '#fff', padding: '1rem 2rem', borderRadius: '50px',
          fontWeight: 'bold', zIndex: 9999, boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
           Click cards to go to GitHub
        </div>
      </div>
    </section>
  );
};

export default Projects;
