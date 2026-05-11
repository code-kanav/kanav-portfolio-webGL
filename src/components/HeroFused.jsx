import React from 'react';

const TYPED_TEXT = 'AI researcher & senior software engineer at Stanford. 5+ years building scalable full-stack systems and clinical-grade LLM applications.';

const useTyping = (text, speed = 28) => {
  const [displayed, setDisplayed] = React.useState('');
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    let i = 0;
    setDisplayed('');
    setDone(false);
    const tick = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(tick); setDone(true); }
    }, speed);
    return () => clearInterval(tick);
  }, [text, speed]);
  return { displayed, done };
};

export const HeroFused = () => {
  const heroRef = React.useRef(null);
  const orbRef = React.useRef(null);
  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
  const { displayed, done } = useTyping(TYPED_TEXT);

  const [windows, setWindows] = React.useState([
    { id:'about', x: 710, y: 110, w: 440, h: 300, z: 3, title:'about.md' },
    { id:'stack', x: 970, y: 310, w: 430, h: 340, z: 2, title:'stack.json' },
    { id:'term',  x: 610, y: 560, w: 580, h: 220, z: 1, title:'~/kanav — zsh' },
  ]);

  React.useEffect(() => {
    const el = heroRef.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setMouse({ x:(e.clientX-r.left)/r.width, y:(e.clientY-r.top)/r.height });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  // orb tilt follows mouse
  React.useEffect(() => {
    const el = orbRef.current; if (!el) return;
    el.style.transform = `translate(-50%,-50%) rotateY(${(mouse.x - 0.5) * 28}deg) rotateX(${-(mouse.y - 0.5) * 28}deg)`;
  }, [mouse]);

  const bringFront = (id) => setWindows(ws => {
    const max = Math.max(...ws.map(w => w.z));
    return ws.map(w => w.id === id ? { ...w, z: max + 1 } : w);
  });

  const startDrag = (id, e) => {
    e.preventDefault(); bringFront(id);
    const win = windows.find(w => w.id === id);
    const sx = e.clientX, sy = e.clientY, ox = win.x, oy = win.y;
    const move = (ev) => setWindows(ws => ws.map(w => w.id === id ? { ...w, x: ox+ev.clientX-sx, y: oy+ev.clientY-sy } : w));
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const [resumeOpen, setResumeOpen] = React.useState(false);

  const magnetic = (e) => {
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    t.style.transform = `translate(${x*0.3}px,${y*0.3}px)`;
  };
  const resetMag = (e) => { e.currentTarget.style.transform = ''; };

  return (
    <>
    <style>{`
      .hero-section { min-height: 980px; }
      .hero-constrained { min-height: 980px; }
      .hero-nav { padding: 0 56px; }
      .hero-nav-links { display: flex; gap: 36px; font-size: 13px; letter-spacing: 0.5px; }
      .hero-status { display: block; }
      .hero-content { padding: 140px 0 0 72px; max-width: 680px; }
      .hero-h1 { font-size: 96px; }
      .hero-buttons { display: flex; gap: 14px; flex-wrap: wrap; }
      .hero-stats { display: flex; gap: 48px; margin-top: 56px; }
      .hero-stat-val { font-size: 28px; }
      .hero-backdrop { display: block; }
      .hero-scroll-hint { display: block; }
      .hero-window { display: block; }

      @media (max-width: 1024px) {
        .hero-nav { padding: 0 32px !important; }
        .hero-content { padding: 110px 0 0 40px !important; }
        .hero-h1 { font-size: 68px !important; }
        .hero-window { display: none !important; }
        .hero-backdrop { display: none !important; }
      }

      @media (max-width: 768px) {
        .hero-section { min-height: unset !important; padding-bottom: 60px; }
        .hero-constrained { min-height: unset !important; }
        .hero-nav { padding: 0 20px !important; }
        .hero-nav-links { display: none !important; }
        .hero-status { display: none !important; }
        .hero-content { padding: 100px 20px 0 20px !important; max-width: 100% !important; }
        .hero-h1 { font-size: 48px !important; letter-spacing: -2px !important; line-height: 0.95 !important; }
        .hero-scroll-hint { display: none !important; }
        .hero-stats { gap: 24px !important; margin-top: 36px !important; flex-wrap: wrap; }
        .hero-stat-val { font-size: 22px !important; }
      }

      @media (max-width: 375px) {
        .hero-h1 { font-size: 40px !important; }
      }
    `}</style>
    {resumeOpen && (
      <div onClick={()=>setResumeOpen(false)} style={{position:'fixed',inset:0,zIndex:9999,background:'rgba(2,4,12,0.85)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',gap:12}}>
        <div onClick={e=>e.stopPropagation()} style={{width:'min(860px,88vw)',height:'88vh',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',boxShadow:'0 40px 100px rgba(0,0,0,0.7)',flexShrink:0}}>
          <iframe src="/Kanav_Resume.pdf" style={{width:'100%',height:'100%',border:'none'}} title="Kanav Chopra Resume"/>
        </div>
        <div onClick={e=>e.stopPropagation()} style={{display:'flex',flexDirection:'column',gap:10,flexShrink:0,alignSelf:'flex-start',marginTop:'3rem'}}>
          <button onClick={()=>setResumeOpen(false)} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.12)',color:'rgba(230,237,246,0.7)',borderRadius:10,width:44,height:44,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
          <a href="/Kanav_Resume.pdf" download style={{background:'rgba(34,211,238,0.12)',border:'1px solid rgba(34,211,238,0.3)',color:'#22d3ee',borderRadius:10,width:44,height:44,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
        </div>
      </div>
    )}
    <div ref={heroRef} className="hero-section" style={{
      position:'relative', width:'100%', overflow:'hidden',
      background:'radial-gradient(ellipse at 70% 20%, #0f1a2e 0%, #070812 55%, #04050a 100%)',
      fontFamily:"'Inter Tight', system-ui, sans-serif", color:'#e6edf6',
    }}>
      {/* subtle grid */}
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(34,211,238,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.04) 1px,transparent 1px)',backgroundSize:'64px 64px',maskImage:'radial-gradient(ellipse at 50% 40%, #000 30%, transparent 80%)',pointerEvents:'none'}}/>

      {/* aurora blobs */}
      <div style={{position:'absolute', top:'-20%', left:'-10%', width:'60%', height:'60%', background:'radial-gradient(ellipse, rgba(34,211,238,0.22), transparent 60%)', filter:'blur(80px)', pointerEvents:'none'}}/>
      <div style={{position:'absolute', bottom:'-15%', right:'-5%', width:'55%', height:'55%', background:'radial-gradient(ellipse, rgba(99,102,241,0.2), transparent 60%)', filter:'blur(80px)', pointerEvents:'none'}}/>

      {/* orb removed */}

      {/* nav */}
      <nav className="hero-nav" style={{position:'absolute', top:28, left:0, right:0, display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:50}}>
        <div>
          <img src="/logo-dark.png" alt="Kanav Chopra" style={{height:36, display:'block'}} />
        </div>
        <div className="hero-nav-links">
          {[['Skills','#skills'],['Experience','#experience'],['Projects','#projects'],['Publications','#publications'],['Contact','#contact']].map(([l,h]) => (
            <a key={l} href={h} style={{color:'rgba(230,237,246,0.65)', textDecoration:'none', transition:'color .2s'}}
              onMouseEnter={e=>e.currentTarget.style.color='#22d3ee'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(230,237,246,0.65)'}>{l}</a>
          ))}
        </div>
        <div className="hero-status" style={{fontSize:12, fontFamily:'"JetBrains Mono", monospace', color:'rgba(230,237,246,0.5)'}}>
          <span style={{display:'inline-block',width:6,height:6,borderRadius:3,background:'#22d3ee',boxShadow:'0 0 8px #22d3ee',marginRight:8,verticalAlign:'middle'}}/>
          available · q2 '26
        </div>
      </nav>

      {/* constrained content wrapper */}
      <div className="hero-constrained" style={{position:'relative', maxWidth:1400, margin:'0 auto'}}>

      {/* LEFT — main identity copy */}
      <div className="hero-content" style={{position:'relative', zIndex:4}}>
        <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:12, letterSpacing:2, color:'#22d3ee', marginBottom:22, display:'flex', alignItems:'center', gap:12}}>
          <span style={{width:28, height:1, background:'#22d3ee'}}/>
          PORTFOLIO / 2026 · STANFORD
        </div>
        <h1 className="hero-h1" style={{fontWeight:500, letterSpacing:-3, lineHeight:0.92, margin:0, marginBottom:22}}>
          Kanav<br/>
          <span style={{fontStyle:'italic', fontWeight:300, background:'linear-gradient(90deg,#22d3ee,#a5f3fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Chopra</span>
        </h1>
        <p style={{fontSize:18, lineHeight:1.55, maxWidth:500, margin:0, marginBottom:36, position:'relative'}}>
          <span style={{visibility:'hidden', userSelect:'none'}} aria-hidden="true">{TYPED_TEXT}</span>
          <span style={{position:'absolute', top:0, left:0, color:'rgba(230,237,246,0.72)'}}>
            {displayed}<span style={{
              display: done ? 'none' : 'inline-block',
              width: 2, height: '1.1em', background: '#22d3ee',
              marginLeft: 2, verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite',
            }}/>
          </span>
        </p>
        <div className="hero-buttons">
          <button onClick={()=>document.querySelector('#projects').scrollIntoView({behavior:'smooth'})} onMouseMove={magnetic} onMouseLeave={resetMag} style={{
            background:'rgba(34,211,238,0.95)', color:'#04131a', border:'none', padding:'16px 28px',
            borderRadius:999, fontSize:14, fontWeight:600, letterSpacing:0.3, cursor:'pointer',
            boxShadow:'0 0 40px rgba(34,211,238,0.35)', transition:'transform 0.3s cubic-bezier(.2,.7,.3,1)',
            display:'flex', alignItems:'center', gap:10, fontFamily:'inherit'}}>
            View selected work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h8M8 3l4 4-4 4"/></svg>
          </button>
          <button onClick={()=>setResumeOpen(true)} onMouseMove={magnetic} onMouseLeave={resetMag} style={{
            background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)', color:'#e6edf6',
            border:'1px solid rgba(255,255,255,0.12)', padding:'16px 28px',
            borderRadius:999, fontSize:14, fontWeight:500, cursor:'pointer',
            transition:'transform 0.3s cubic-bezier(.2,.7,.3,1)', fontFamily:'inherit'}}>
            Read résumé
          </button>
        </div>

        <div className="hero-stats" style={{fontFamily:'"JetBrains Mono", monospace'}}>
          {[['05+','years shipping'],['04','publications'],['∞','coffee']].map(([k,v]) => (
            <div key={k}>
              <div className="hero-stat-val" style={{fontWeight:500, color:'#e6edf6', letterSpacing:-1}}>{k}</div>
              <div style={{fontSize:11, color:'rgba(230,237,246,0.45)', letterSpacing:1.5, marginTop:4, textTransform:'uppercase'}}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ghosted giant backdrop name */}
      <div className="hero-backdrop" style={{position:'absolute', left:0, right:0, bottom:30, textAlign:'center', zIndex:1, pointerEvents:'none'}}>
        <div style={{fontSize:120, fontWeight:600, letterSpacing:-3, lineHeight:0.9,
          background:'linear-gradient(180deg, rgba(34,211,238,0.1), rgba(34,211,238,0.02))',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Creative. Curious. Capable.</div>
        <div style={{fontSize:12, fontFamily:'"JetBrains Mono", monospace', color:'rgba(230,237,246,0.35)', letterSpacing:4, marginTop:-20}}>
          AI · FULL-STACK · STANFORD · SINCE 2019
        </div>
      </div>

      {/* floating draggable windows — hidden on tablet/mobile */}
      <div className="hero-window"><HWindow win={windows[0]} onDragStart={(e)=>startDrag('about',e)} onFocus={()=>bringFront('about')}>
        <div style={{padding:22, fontSize:14, lineHeight:1.6}}>
          <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#22d3ee', marginBottom:14, letterSpacing:1.5}}># WHOAMI</div>
          <h2 style={{fontSize:24, margin:0, marginBottom:10, letterSpacing:-0.6, fontWeight:500}}>The long version.</h2>
          <p style={{margin:0, marginBottom:10, color:'rgba(230,237,246,0.8)'}}>Leading full-stack on <b style={{color:'#a5f3fc'}}>SAGE</b> — a clinical decision-support tool cutting consulting time 70-80%.</p>
          <p style={{margin:0, color:'rgba(230,237,246,0.6)', fontSize:13}}>4 peer-reviewed papers on LLM eval · Ex Vensure, Ipsator, Khojdeal · MS Cybersecurity & AI.</p>
          <div style={{marginTop:14, display:'flex', gap:6, flexWrap:'wrap'}}>
            {['AI','Full-stack','LLM','Clinical'].map(t => (
              <span key={t} style={{fontSize:11, padding:'4px 10px', borderRadius:999, background:'rgba(34,211,238,0.1)', border:'1px solid rgba(34,211,238,0.25)', color:'#67e8f9', fontFamily:'"JetBrains Mono", monospace'}}>{t}</span>
            ))}
          </div>
        </div>
      </HWindow></div>

      <div className="hero-window"><HWindow win={windows[1]} onDragStart={(e)=>startDrag('stack',e)} onFocus={()=>bringFront('stack')}>
        <div style={{padding:0, fontFamily:'"JetBrains Mono", monospace', fontSize:12.5, lineHeight:1.9}}>
          <div style={{padding:'16px 20px 10px', color:'rgba(230,237,246,0.4)', fontSize:11}}>// stack.json · 9 items</div>
          <pre style={{margin:0, padding:'0 20px 20px', color:'rgba(230,237,246,0.8)'}}>{`{
  "frontend": ["React", "Next.js", "TS"],
  "backend":  ["Python", "FastAPI", "Node"],
  "database": "PostgreSQL",
  "ai":       ["LLM", "RAG", "Evals", "Embeddings"],
  "realtime": ["SSE", "WebSockets"],
  "infra":    ["GCP", "AWS", "Docker"]
}`}</pre>
        </div>
      </HWindow></div>

      <div className="hero-window"><HWindow win={windows[2]} onDragStart={(e)=>startDrag('term',e)} onFocus={()=>bringFront('term')}>
        <div style={{padding:'14px 18px', fontFamily:'"JetBrains Mono", monospace', fontSize:12.5, lineHeight:1.75}}>
          <div><span style={{color:'#22d3ee'}}>kanav@stanford</span> <span style={{color:'rgba(230,237,246,0.5)'}}>~</span> <span style={{color:'#a5f3fc'}}>%</span> cat projects.md</div>
          <div style={{color:'rgba(230,237,246,0.7)'}}>→ sage.arise-ai.org &nbsp;&nbsp; clinical decision support · 70-80% faster</div>
          <div style={{color:'rgba(230,237,246,0.7)'}}>→ stanford-healthpath &nbsp;&nbsp; patient routing via LLM</div>
          <div style={{color:'rgba(230,237,246,0.7)'}}>→ arise-ai.org &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; research network site</div>
          <div style={{marginTop:6}}><span style={{color:'#22d3ee'}}>kanav@stanford</span> <span style={{color:'#a5f3fc'}}>%</span> <span className="blink" style={{borderLeft:'6px solid #22d3ee', marginLeft:6}}/></div>
        </div>
      </HWindow></div>

      {/* scroll hint */}
      <div className="hero-scroll-hint" style={{position:'absolute', bottom:24, left:72, fontSize:11, fontFamily:'"JetBrains Mono", monospace', color:'rgba(230,237,246,0.45)', letterSpacing:2, zIndex:4}}>
        ↓ SCROLL
      </div>
      </div>{/* end constrained wrapper */}
    </div>
    </>
  );
};

const HWindow = ({ win, onDragStart, onFocus, children }) => (
  <div onMouseDown={onFocus} style={{
    position:'absolute', left:win.x, top:win.y, width:win.w, height:win.h, zIndex:10+win.z,
    background:'rgba(15,23,38,0.78)', backdropFilter:'blur(30px) saturate(1.4)',
    border:'1px solid rgba(255,255,255,0.08)', borderRadius:12,
    boxShadow:'0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
    overflow:'hidden',
  }}>
    <div onMouseDown={onDragStart} style={{
      height:36, display:'flex', alignItems:'center', padding:'0 14px', gap:6,
      borderBottom:'1px solid rgba(255,255,255,0.06)', cursor:'grab',
      background:'linear-gradient(180deg, rgba(255,255,255,0.03), transparent)'}}>
      <span style={{width:11, height:11, borderRadius:6, background:'#ff5f57'}}/>
      <span style={{width:11, height:11, borderRadius:6, background:'#febc2e'}}/>
      <span style={{width:11, height:11, borderRadius:6, background:'#28c840'}}/>
      <div style={{flex:1, textAlign:'center', fontSize:12, color:'rgba(230,237,246,0.55)', fontFamily:'"JetBrains Mono", monospace'}}>{win.title}</div>
    </div>
    <div style={{height: win.h - 36, overflow:'auto'}}>{children}</div>
  </div>
);

