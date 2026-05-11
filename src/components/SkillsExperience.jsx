import React from 'react';
import { useTilt } from './TiltedCard.jsx';

const useInView = (ref, threshold = 0.2) => {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setSeen(true); });
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen, threshold]);
  return seen;
};

const SkillBar = ({ label, pct, delay, inView }) => (
  <div style={{marginBottom:14}}>
    <div style={{display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:12.5, fontFamily:'"JetBrains Mono", monospace'}}>
      <span style={{color:'rgba(230,237,246,0.82)'}}>{label}</span>
      <span style={{color:'rgba(230,237,246,0.4)'}}>{String(pct).padStart(2,'0')}</span>
    </div>
    <div style={{height:3, borderRadius:2, background:'rgba(255,255,255,0.06)', overflow:'hidden'}}>
      <div style={{
        height:'100%', width: inView ? pct + '%' : '0%',
        background:'linear-gradient(90deg, #22d3ee, #a5f3fc 60%, #f472b6)',
        boxShadow:'0 0 14px rgba(34,211,238,0.5)',
        transition:`width 1.2s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
      }}/>
    </div>
  </div>
);

const SkillCategory = ({ cat, idx }) => {
  const ref = React.useRef(null);
  const tiltRef = React.useRef(null);
  const inView = useInView(ref, 0.15);
  const [hover, setHover] = React.useState(false);
  useTilt(tiltRef, { amplitude: 8, scaleOnHover: 1.03, enabled: inView });
  return (
    <div ref={ref} style={{ perspective: '1200px' }}>
    <div ref={tiltRef}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        position:'relative',
        padding:'32px 30px 26px',
        borderRadius:16,
        background:'linear-gradient(145deg, rgba(20,30,48,0.65), rgba(10,18,32,0.45))',
        backdropFilter:'blur(24px) saturate(1.4)',
        border:`1px solid ${hover?'rgba(34,211,238,0.45)':'rgba(255,255,255,0.08)'}`,
        boxShadow: hover
          ? '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(34,211,238,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        opacity: inView ? 1 : 0,
        transition: `opacity 0.7s cubic-bezier(.2,.7,.3,1) ${idx*120}ms, box-shadow .3s, border-color .3s`,
        overflow:'hidden',
        transformStyle:'preserve-3d',
      }}>
      {/* accent corner */}
      <div style={{position:'absolute', top:0, right:0, width:120, height:120, background:`radial-gradient(circle at 100% 0%, ${cat.accent}33, transparent 60%)`, pointerEvents:'none'}}/>

      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22}}>
        <div style={{
          width:44, height:44, borderRadius:12,
          background:`linear-gradient(135deg, ${cat.accent}, ${cat.accent}44)`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:22, color:'#04131a', fontWeight:600,
          boxShadow:`0 8px 20px ${cat.accent}33`,
          transform: hover ? 'rotate(-6deg) scale(1.1)' : 'none',
          transition:'transform .4s cubic-bezier(.2,.7,.3,1)',
        }}>{cat.glyph}</div>
        <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:2, color:'rgba(230,237,246,0.35)'}}>{String(idx+1).padStart(2,'0')} / 05</span>
      </div>

      <h3 style={{fontSize:22, fontWeight:500, margin:0, marginBottom:6, letterSpacing:-0.4, color:'#e6edf6'}}>{cat.title}</h3>
      <p style={{fontSize:13, color:'rgba(230,237,246,0.55)', margin:0, marginBottom:22, lineHeight:1.5}}>{cat.tag}</p>

      {cat.skills.map((s, i) => (
        <SkillBar key={s.n} label={s.n} pct={s.p} delay={200 + i*80} inView={inView}/>
      ))}

      <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:18, paddingTop:18, borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        {cat.tools.map(t => (
          <span key={t} style={{fontSize:10.5, padding:'4px 9px', borderRadius:999, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(230,237,246,0.7)', fontFamily:'"JetBrains Mono", monospace'}}>{t}</span>
        ))}
      </div>
    </div>
    </div>
  );
};

const FloatingGlyphs = () => {
  // 14 tech glyphs drifting slowly in the background
  const glyphs = ['⚛','▲','TS','◈','☁','⎈','🐍','⚡','🤖','⬢','◎','🐘','〈/〉','∇'];
  const ref = React.useRef(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  return (
    <div ref={ref} style={{position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden'}}>
      {glyphs.map((g, i) => {
        const x = (i * 71 + 13) % 100;
        const y = (i * 37 + 7) % 100;
        const size = 18 + (i % 3) * 8;
        const dur = 14 + (i % 5) * 3;
        const delay = (i * 0.3) % 4;
        return (
          <span key={i} style={{
            position:'absolute', left:x+'%', top:y+'%',
            fontSize:size, fontFamily:'"JetBrains Mono", monospace',
            color: `rgba(${i%3===0?'34,211,238':i%3===1?'244,114,182':'139,92,246'}, 0.12)`,
            animation: mounted ? `sk-drift ${dur}s ease-in-out ${delay}s infinite alternate` : 'none',
            userSelect:'none',
          }}>{g}</span>
        );
      })}
    </div>
  );
};

export const SkillsSection = () => {
  const cats = [
    { title:'Frontend Development', tag:'Interfaces users actually enjoy.', glyph:'⚛', accent:'#22d3ee',
      skills:[{n:'React / Next.js', p:95},{n:'TypeScript', p:92},{n:'Tailwind · CSS', p:90},{n:'Framer Motion', p:82}],
      tools:['React','Next.js','TS','Tailwind','Radix','Zustand'] },
    { title:'Backend Development', tag:'APIs and systems that scale.', glyph:'⚡', accent:'#a5f3fc',
      skills:[{n:'Python · FastAPI', p:93},{n:'Node.js · Express', p:88},{n:'REST / GraphQL', p:86},{n:'Auth · Security', p:84}],
      tools:['FastAPI','Node','Express','Postgres','Redis','Pydantic'] },
    { title:'AI / Machine Learning', tag:'Production LLM systems & eval.', glyph:'🤖', accent:'#f472b6',
      skills:[{n:'LLM orchestration', p:94},{n:'Claude · Gemini · Azure', p:92},{n:'RAG · Embeddings', p:88},{n:'Prompt · Evals', p:90}],
      tools:['Claude','Gemini','LangChain','Vector DB','HF','OpenAI'] },
    { title:'Cloud & DevOps', tag:'Ship it, measure it, keep it up.', glyph:'☁', accent:'#8b5cf6',
      skills:[{n:'GCP · AWS', p:86},{n:'Docker · CI/CD', p:88},{n:'Vercel · Edge', p:90},{n:'Monitoring', p:80}],
      tools:['GCP','AWS','Docker','GitHub Actions','Vercel'] },
    { title:'Databases & Tools', tag:'Data modeling + tooling that holds.', glyph:'🐘', accent:'#67e8f9',
      skills:[{n:'PostgreSQL', p:92},{n:'Prisma · ORMs', p:86},{n:'SSE · WebSockets', p:88},{n:'Git · Testing', p:90}],
      tools:['Postgres','Prisma','SSE','WebSockets','Jest','Playwright'] },
  ];

  const headRef = React.useRef(null);
  const headIn = useInView(headRef, 0.3);

  return (
    <section id="skills" className="skills-section" style={{position:'relative', background:'linear-gradient(180deg, #04060c 0%, #06091a 50%, #04060c 100%)', color:'#e6edf6', overflow:'hidden'}}>
      <style>{`
        @keyframes sk-drift {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(20px,-30px) rotate(12deg); }
          100% { transform: translate(-15px,20px) rotate(-8deg); }
        }
        @keyframes sk-orbit {
          0% { transform: rotate(0deg) translateX(140px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
        }
        .skills-section { padding: 140px 72px 120px; }
        .skills-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 64px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .skills-grid-top { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; }
        .skills-grid-bot { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 66%; margin: 0 auto; }
        .skills-h2 { font-size: 64px; font-weight: 500; letter-spacing: -2px; margin: 0; line-height: 1; }
        .skills-header-right { font-size: 13px; color: rgba(230,237,246,0.5); font-family: "JetBrains Mono", monospace; text-align: right; }

        @media (max-width: 1024px) {
          .skills-section { padding: 80px 40px 80px !important; }
          .skills-grid-top { grid-template-columns: repeat(2, 1fr) !important; }
          .skills-grid-bot { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
          .skills-h2 { font-size: 44px !important; }
        }

        @media (max-width: 768px) {
          .skills-section { padding: 60px 20px 60px !important; }
          .skills-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; margin-bottom: 36px !important; }
          .skills-header-right { display: none !important; }
          .skills-grid-top { grid-template-columns: 1fr !important; }
          .skills-grid-bot { grid-template-columns: 1fr !important; max-width: 100% !important; }
          .skills-h2 { font-size: 32px !important; letter-spacing: -1px !important; }
        }
      `}</style>

      {/* aurora + grid background */}
      <div style={{position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(34,211,238,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.03) 1px,transparent 1px)', backgroundSize:'56px 56px', maskImage:'radial-gradient(ellipse at 50% 50%, #000 30%, transparent 85%)', pointerEvents:'none'}}/>
      <div style={{position:'absolute', top:'-10%', left:'30%', width:700, height:500, background:'radial-gradient(ellipse, rgba(34,211,238,0.15), transparent 60%)', filter:'blur(80px)', pointerEvents:'none'}}/>
      <div style={{position:'absolute', bottom:'-10%', right:'-5%', width:600, height:500, background:'radial-gradient(ellipse, rgba(244,114,182,0.1), transparent 60%)', filter:'blur(80px)', pointerEvents:'none'}}/>
      <FloatingGlyphs/>

      {/* header */}
      <div ref={headRef} className="skills-header" style={{position:'relative', opacity: headIn?1:0, transform: headIn?'translateY(0)':'translateY(24px)', transition:'all .8s cubic-bezier(.2,.7,.3,1)'}}>
        <div>
          <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:3, color:'#22d3ee', marginBottom:14}}>01 / SKILLS</div>
          <h2 className="skills-h2">
            What I'm <span style={{fontStyle:'italic', fontWeight:300, background:'linear-gradient(90deg,#22d3ee,#a5f3fc,#f472b6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>fluent</span> in.
          </h2>
        </div>
        <div className="skills-header-right">
          <div>05 categories</div>
          <div style={{color:'rgba(230,237,246,0.35)', marginTop:4}}>hover to explore ↗</div>
        </div>
      </div>

      {/* grid — 3 cols top, 2 cols bottom (offset) */}
      <div className="skills-grid-top" style={{position:'relative'}}>
        {cats.slice(0,3).map((c, i) => <SkillCategory key={c.title} cat={c} idx={i}/>)}
      </div>
      <div className="skills-grid-bot" style={{position:'relative'}}>
        {cats.slice(3).map((c, i) => <SkillCategory key={c.title} cat={c} idx={i+3}/>)}
      </div>
    </section>
  );
};

// ─────── EXPERIENCE — scroll-stacking sticky cards ───────
export const ExperienceStack = () => {
  const roles = [
    { yr:'06/2025 — now', role:'AI Researcher / Software Engineer', co:'Stanford University', loc:'Palo Alto, CA', logo:'S',
      accent:'#8b0000', accent2:'#dc2626',
      bullets:[
        'Launched and lead full-stack on SAGE — cutting consulting time 70-80% (15min → 2-3min).',
        'Engineered prompt versioning, feedback capture, session tracking in React/TS/Node/Python.',
        'Built Stanford Health Path — "Google Maps for patients" with LLM routing.',
        'Shipped ARISE AI research network site with Next.js + headless WordPress.',
      ],
      stack:['React','TypeScript','Python','FastAPI','Claude','Gemini','PostgreSQL','Next.js'] },
    { yr:'02/2024 — 08/2024', role:'Senior Software Engineer', co:'Vensure Employer Solutions', loc:'Noida, UP', logo:'V',
      accent:'#1e40af', accent2:'#3b82f6',
      bullets:[
        'Led legacy modernization into microservices — 40% technical-debt reduction.',
        'Drove tech selection + implementation, 50% system efficiency gain.',
        'Designed scalable HR management features in React.js + TypeScript.',
        'Mentored junior engineers through structured code review.',
      ],
      stack:['React','TypeScript','Microservices','Node.js','Jest'] },
    { yr:'04/2023 — 12/2023', role:'Senior Software Developer', co:'Ipsator Analytics', loc:'Bengaluru, KA', logo:'I',
      accent:'#065f46', accent2:'#10b981',
      bullets:[
        'Designed intuitive React interfaces for web + mobile experiences.',
        'Optimized UI performance 60% via minification + lazy loading.',
        'Built scalable front-end architecture from scratch.',
      ],
      stack:['React','Next.js','Performance','Mobile Web'] },
    { yr:'07/2021 — 03/2023', role:'Software Developer', co:'Khojdeal', loc:'Gurugram, HR', logo:'K',
      accent:'#7c2d12', accent2:'#f97316',
      bullets:[
        'Shipped multiple content sites with 100% Web Vitals.',
        '25% conversion lift via GTM + GA integration.',
        'GitLab CI/CD + Cloudflare rollout across client sites.',
      ],
      stack:['JavaScript','GTM','GA','GitLab','Cloudflare'] },
    { yr:'09/2019 — 06/2021', role:'Software Developer', co:'SVGS IT Solutions', loc:'Noida, UP', logo:'S',
      accent:'#581c87', accent2:'#a855f7',
      bullets:[
        'Built RESTful web-service clients (JSON/XML) in JavaScript.',
        'Designed complex e-learning simulations in JS + React.',
        'Converted Flash apps to HTML with cross-browser + mobile fixes.',
      ],
      stack:['JavaScript','React','REST','Legacy Migration'] },
  ];

  const headRef = React.useRef(null);
  const headIn = useInView(headRef, 0.3);

  // Each card is its own sticky container; stacked scroll feel
  const CARD_H = 440;
  const OVERLAP = 80;

  return (
    <section id="experience" style={{position:'relative', background:'#04060c', color:'#e6edf6', overflow:'visible'}}>
      <style>{`
        .exp-header-pad { padding: 120px 72px 32px; }
        .exp-cards-pad { padding: 0 72px; }
        .exp-header-row { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .exp-h2 { font-size: 52px; font-weight: 500; letter-spacing: -1.5px; margin: 0; line-height: 1; }
        .exp-header-right { font-size: 13px; color: rgba(230,237,246,0.5); font-family: "JetBrains Mono", monospace; text-align: right; }
        .exp-card-inner { padding: 36px 44px; }
        .exp-bullets { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 32px; }

        @media (max-width: 1024px) {
          .exp-header-pad { padding: 80px 40px 32px !important; }
          .exp-cards-pad { padding: 0 40px !important; }
          .exp-h2 { font-size: 38px !important; }
        }

        @media (max-width: 768px) {
          .exp-header-pad { padding: 60px 20px 24px !important; }
          .exp-cards-pad { padding: 0 20px !important; }
          .exp-header-row { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .exp-header-right { display: none !important; }
          .exp-h2 { font-size: 28px !important; letter-spacing: -0.5px !important; }
          .exp-card-inner { padding: 24px 20px !important; }
          .exp-bullets { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
      <div ref={headRef} className="exp-header-pad" style={{
        opacity: headIn?1:0, transform: headIn?'translateY(0)':'translateY(24px)',
        transition:'all .8s cubic-bezier(.2,.7,.3,1)',
      }}>
        <div className="exp-header-row">
          <div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:3, color:'#22d3ee', marginBottom:14}}>02 / EXPERIENCE</div>
            <h2 className="exp-h2">
              What I've been <span style={{fontStyle:'italic', fontWeight:300, background:'linear-gradient(90deg,#22d3ee,#a5f3fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>building</span>.
            </h2>
          </div>
          <div className="exp-header-right">
            <div>{String(roles.length).padStart(2,'0')} roles · 5+ yrs</div>
            <div style={{color:'rgba(230,237,246,0.35)', marginTop:4}}>scroll to stack ↓</div>
          </div>
        </div>
      </div>

      {/* Stack — each card sticks; as next enters, the previous sits behind it */}
      <div className="exp-cards-pad" style={{position:'relative'}}>
        {roles.map((r, i) => (
          <StackCard key={i} role={r} i={i} total={roles.length} cardH={CARD_H} overlap={OVERLAP}/>
        ))}
        {/* tail spacer so last card has room to rest */}
        <div style={{height: 120}}/>
      </div>
    </section>
  );
};

const StackCard = ({ role, i, total, cardH, overlap }) => {
  const ref = React.useRef(null);
  const [progress, setProgress] = React.useState(0); // 0 = just entered, 1 = fully covered

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    let rafId = 0;
    const compute = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const stickyTop = 90 + i * overlap;
      const distPast = stickyTop - rect.top;
      const p = Math.max(0, Math.min(1, distPast / (cardH * 0.8)));
      setProgress(p);
    };
    const onScroll = () => { if (!rafId) rafId = requestAnimationFrame(compute); };
    compute();
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId); };
  }, [i, cardH, overlap]);

  const scale = 1 - progress * 0.04;
  const translateY = progress * -14;
  const opacity = 1;  // keep fully opaque so stacked cards don't see-through

  const inView = useInView(ref, 0.1);

  return (
    <div style={{
      position:'sticky',
      top: 90 + i * overlap,
      marginBottom: -overlap,
      zIndex: 10 + i,
    }}>
      <div ref={ref} className="exp-card-inner" style={{
        position:'relative',
        minHeight: cardH,
        borderRadius: 18,
        background: 'linear-gradient(155deg, #0f1829 0%, #0a1120 100%)',
        border:'1px solid rgba(255,255,255,0.08)',
        boxShadow:'0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.08)',
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        transformOrigin:'center top',
        willChange:'transform, opacity',
        overflow:'hidden',
      }}>
        {/* accent gradient wash */}
        <div style={{position:'absolute', top:0, right:0, width:'55%', height:'100%',
          background:`radial-gradient(ellipse at 100% 0%, ${role.accent2}22, transparent 65%)`, pointerEvents:'none'}}/>
        <div style={{position:'absolute', top:-100, right:-100, width:300, height:300,
          background:`radial-gradient(circle, ${role.accent}33, transparent 70%)`, filter:'blur(60px)', pointerEvents:'none'}}/>

        {/* header row */}
        <div style={{position:'relative', display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
          <div style={{minWidth:0}}>
            <div style={{fontSize:12, fontFamily:'"JetBrains Mono", monospace', color:'rgba(230,237,246,0.5)', letterSpacing:1, lineHeight:1.4, marginBottom:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
              {role.co} · {role.loc}
            </div>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:2, color:role.accent2, opacity:0.85, lineHeight:1.4}}>
              {role.yr}
            </div>
          </div>
          <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:3, color:'rgba(230,237,246,0.35)'}}>
            {String(i+1).padStart(2,'0')} / {String(total).padStart(2,'0')}
          </div>
        </div>

        {/* title */}
        <h3 style={{position:'relative', fontSize:32, fontWeight:500, letterSpacing:-0.8, margin:0, marginBottom:22, lineHeight:1.1, maxWidth:820}}>
          {role.role}
        </h3>

        {/* bullets — progressive reveal */}
        <ul className="exp-bullets" style={{position:'relative', margin:0, padding:0, listStyle:'none', marginBottom:22, maxWidth:1000}}>
          {role.bullets.map((b,j) => (
            <li key={j} style={{
              fontSize:13.5, lineHeight:1.55, color:'rgba(230,237,246,0.78)',
              paddingLeft:18, position:'relative',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-14px)',
              transition: `all 0.5s cubic-bezier(.2,.7,.3,1) ${180 + j*80}ms`,
            }}>
              <span style={{position:'absolute', left:0, top:8, width:6, height:6, borderRadius:3, background:role.accent2, boxShadow:`0 0 8px ${role.accent2}`}}/>
              {b}
            </li>
          ))}
        </ul>

        {/* stack chips */}
        <div style={{position:'relative', display:'flex', gap:8, flexWrap:'wrap'}}>
          {role.stack.map((s,k) => (
            <span key={s} style={{
              fontSize:12, padding:'6px 12px', borderRadius:999,
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
              color:'rgba(230,237,246,0.85)', fontFamily:'"JetBrains Mono", monospace',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(8px)',
              transition: `all 0.4s cubic-bezier(.2,.7,.3,1) ${380 + k*50}ms`,
            }}>{s}</span>
          ))}
        </div>

        {/* corner index */}
        <div style={{position:'absolute', bottom:20, right:30, fontSize:86, fontWeight:600, letterSpacing:-4, lineHeight:1,
          color:'rgba(255,255,255,0.03)', fontFamily:'"Inter Tight", sans-serif', pointerEvents:'none'}}>
          {String(i+1).padStart(2,'0')}
        </div>
      </div>
    </div>
  );
};

