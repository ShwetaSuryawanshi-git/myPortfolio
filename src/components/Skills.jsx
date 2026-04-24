import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const skillsData = [
  { name: 'LLM & AI Infra', desc: 'OpenAI API, Gemini, RAG, Prompt Eng', level: 95 },
  { name: 'ML & Data', desc: 'PyTorch, Scikit-learn, Neo4j, Pandas', level: 90 },
  { name: 'Languages & Backend', desc: 'Python, Java, Spring Boot, Node.js, FastAPI', level: 95 },
  { name: 'Performance & Systems', desc: 'Asyncio, Multithreading, Redis, Profiling', level: 85 },
  { name: 'Cloud & DevOps', desc: 'AWS (IAM, S3, EC2), Neo4j, Firebase', level: 80 },
  { name: 'Frontend & DSA', desc: 'React.js, Vite, Trees, Graphs, Sorting', level: 85 }
];

const Skills = ({ id }) => {
  const containerRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    // Animate width from 0% on scroll
    barsRef.current.forEach((bar, i) => {
      gsap.fromTo(bar, 
        { width: 0 },
        { 
          width: `${skillsData[i].level}%`, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%"
          }
        }
      );
    });
  }, []);

  return (
    <section id={id} ref={containerRef} className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Capabilities.</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {skillsData.map((skill, i) => (
            <div key={skill.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: '600' }}>{skill.name}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{skill.level}%</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {skill.desc}
              </div>
              <div style={{ 
                width: '100%', height: '8px', background: 'var(--card-bg)', 
                borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)'
              }}>
                <div 
                  ref={el => barsRef.current[i] = el}
                  style={{ 
                    height: '100%', background: 'var(--accent)', borderRadius: '10px',
                    boxShadow: '0 0 10px var(--accent-light)'
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
