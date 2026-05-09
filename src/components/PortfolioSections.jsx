import React from 'react';
import { MagicBentoProjects } from './MagicBento.jsx';

const SectionHeader = ({ index, kicker, title, right }) =>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
    <div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 3, color: '#22d3ee', marginBottom: 14 }}>
        {index} / {kicker}
      </div>
      <h2 style={{ fontSize: 56, fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1 }}>{title}</h2>
    </div>
    {right && <div style={{ fontSize: 13, color: 'rgba(230,237,246,0.5)', fontFamily: '"JetBrains Mono", monospace' }}>{right}</div>}
  </div>;


// ─────── ABOUT — desktop with draggable floating windows ───────

// ─────── EXPERIENCE ───────
const ExperienceSection = () => {
  const roles = [
  { yr: '06/2025 — now', role: 'AI Researcher / Software Engineer', co: 'Stanford University', loc: 'Palo Alto, CA',
    bullets: ['Launched and lead full-stack development on SAGE — cutting consulting time 70-80% (15min → 2-3min).', 'Engineered prompt versioning, feedback capture, session tracking in React/TS/Node/Python.', 'Built Stanford Health Path — "Google Maps for patients" with LLM routing.', 'Shipped ARISE AI research network site with Next.js + headless WordPress.'] },
  { yr: '02/2024 — 08/2024', role: 'Senior Software Engineer', co: 'Vensure Employer Solutions', loc: 'Noida, UP',
    bullets: ['Led legacy modernization into microservices — 40% technical-debt reduction.', 'Drove tech selection + implementation, 50% system efficiency gain.', 'Designed scalable HR management features in React.js + TypeScript.'] },
  { yr: '04/2023 — 12/2023', role: 'Senior Software Developer', co: 'Ipsator Analytics', loc: 'Bengaluru, KA',
    bullets: ['Designed intuitive React interfaces for web + mobile.', 'Optimized UI performance 60% via minification + lazy loading.', 'Built scalable front-end architecture from scratch.'] },
  { yr: '07/2021 — 03/2023', role: 'Software Developer', co: 'Khojdeal', loc: 'Gurugram, HR',
    bullets: ['Shipped multiple content sites with 100% Web Vitals.', '25% conversion lift via GTM + GA integration.', 'GitLab CI/CD + Cloudflare rollout across client sites.'] },
  { yr: '09/2019 — 06/2021', role: 'Software Developer', co: 'SVGS IT Solutions', loc: 'Noida, UP',
    bullets: ['Built RESTful web-service clients (JSON/XML) in JavaScript.', 'Designed complex e-learning simulations in JS + React.', 'Converted Flash apps to HTML with cross-browser + mobile fixes.'] }];

  return (
    <section style={{ padding: '120px 72px', background: '#04060c', color: '#e6edf6' }}>
      <SectionHeader index="__REMOVED" kicker="EXPERIENCE" title="What I've been building." right="05 roles · 5+ yrs" />
      <div>
        {roles.map((r, i) =>
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1.3fr', gap: 32, padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.06)', alignItems: 'start' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#22d3ee', letterSpacing: 1, paddingTop: 4 }}>{r.yr}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 4, letterSpacing: -0.3 }}>{r.role}</div>
              <div style={{ fontSize: 13, color: 'rgba(230,237,246,0.55)', fontFamily: '"JetBrains Mono", monospace' }}>{r.co} · {r.loc}</div>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {r.bullets.map((b, j) =>
            <li key={j} style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(230,237,246,0.72)', marginBottom: 8, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 1, background: '#22d3ee' }} />
                  {b}
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
    </section>);

};

// ─────── PROJECTS ───────
const ProjectsSection = () => {
  const projects = [
  { n: '01', name: 'SAGE', tag: 'clinical decision support', url: 'sage.arise-ai.org',
    desc: 'Secure, full-stack medical consultation + referral system with real-time multi-model AI orchestration.',
    highlights: ['Multi-model (Claude + Gemini + Azure) over FastAPI with dynamic switching.', 'SSE pipeline + vector embeddings for clinical context matching.', 'Postgres session management, strict CORS, Pydantic validators.'],
    stack: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Claude', 'Gemini'], accent: '#22d3ee' },
  { n: '02', name: 'Stanford Health Path', tag: 'patient routing', url: 'stanford-healthpath.vercel.app',
    desc: '"Google Maps for patients" — suggests healthcare routes using an LLM to plan care journeys.',
    highlights: ['LLM-planned routing across provider networks.', 'Patient-first UI focused on clarity and next-step confidence.'],
    stack: ['Next.js', 'TypeScript', 'LLM'], accent: '#a5f3fc' },
  { n: '03', name: 'ARISE AI Research Network', tag: 'research site', url: 'arise-ai.org',
    desc: 'Public home for the ARISE clinical-AI research network — Next.js + headless WordPress.',
    highlights: ['Headless CMS architecture, fast editorial loop.', 'Server-rendered, content-first pages for SEO + accessibility.'],
    stack: ['Next.js', 'Headless WP', 'Vercel'], accent: '#67e8f9' },
  { n: '04', name: 'HR Management Platform', tag: 'enterprise modernization', url: 'vensure · internal',
    desc: 'Legacy-to-microservices transition for an HR platform — 40% less debt, 50% efficiency gain.',
    highlights: ['Led architectural transition + tech selection.', 'Refactored large legacy codebases; sharply reduced crashes.', 'Mentored juniors via code review.'],
    stack: ['React', 'TypeScript', 'Microservices'], accent: '#0891b2' }];

  return (
    <section style={{ padding: '120px 72px', background: '#05080f', color: "rgb(255, 255, 255)" }}>
      <style>{`
        .magic-bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          position: relative;
          user-select: none;
        }
        @media (max-width: 900px) {
          .magic-bento-grid { grid-template-columns: 1fr; }
        }
        .magic-bento-card {
          position: relative;
          padding: 32px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(145deg, rgba(15,24,41,0.85), rgba(8,14,26,0.95));
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          --glow-x: 50%; --glow-y: 50%; --glow-intensity: 0; --glow-radius: 380px;
        }
        .magic-bento-card::after {
          content: '';
          position: absolute; inset: 0;
          padding: 1.5px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(34,211,238, calc(var(--glow-intensity) * 0.9)) 0%,
            rgba(165,243,252, calc(var(--glow-intensity) * 0.45)) 30%,
            transparent 60%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        @media (min-width: 901px) {
          .magic-bento-card.bento-hero { grid-column: span 2; grid-row: span 2; }
          .magic-bento-card.bento-tall { grid-column: span 2; grid-row: span 1; }
          .magic-bento-card.bento-wide { grid-column: span 2; }
        }
      `}</style>
      <SectionHeader index="03" kicker="SELECTED WORK" title="Projects I'm proud of." right="04 shipped" />
      <MagicBentoProjects projects={projects}/>
    </section>);

};

// ─────── PUBLICATIONS ───────
const PublicationsSection = () => {
  const papers = [
  { yr: '2026', title: 'LLM-assisted Clinical Decision Support: Evaluation in Production', venue: 'PSB / Pacific Symposium on Biocomputing' },
  { yr: '2025', title: 'Evaluating Multi-Model Orchestration for Medical Consultation', venue: 'AMIA 2025 — peer reviewed' },
  { yr: '2025', title: 'Context-Aware Retrieval for Clinical LLM Workflows', venue: 'AMIA 2025 — peer reviewed' },
  { yr: '2025', title: 'Reducing Hallucination in Clinical LLM Systems', venue: 'AMIA 2025 — peer reviewed' }];

  return (
    <section style={{ padding: '120px 72px', background: '#04060c', color: '#e6edf6' }}>
      <SectionHeader index="04" kicker="PUBLICATIONS" title="Research + writing." right="04 peer-reviewed" />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 80, alignItems: 'start' }}>
        <div>
          {papers.map((p, i) =>
          <a key={i} href="https://scholar.google.com/citations?user=iJg_oFkAAAAJ" target="_blank" rel="noopener"
          style={{ display: 'grid', gridTemplateColumns: '80px 1fr 40px', gap: 24, padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', alignItems: 'start', transition: 'padding .2s', color: '#e6edf6' }}
          onMouseEnter={(e) => e.currentTarget.style.paddingLeft = '12px'}
          onMouseLeave={(e) => e.currentTarget.style.paddingLeft = ''}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#22d3ee' }}>{p.yr}</div>
              <div>
                <div style={{ fontSize: 18, marginBottom: 4, letterSpacing: -0.2, lineHeight: 1.3, color: '#e6edf6' }}>{p.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(230,237,246,0.5)', fontFamily: '"JetBrains Mono", monospace' }}>{p.venue}</div>
              </div>
              <div style={{ textAlign: 'right', color: 'rgba(230,237,246,0.45)' }}>↗</div>
            </a>
          )}
        </div>
        <div style={{ padding: 28, borderRadius: 14, background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.15)' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 2, color: '#22d3ee', marginBottom: 14 }}>SCHOLAR</div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(230,237,246,0.8)', margin: 0, marginBottom: 18 }}>
            Four peer-reviewed publications on LLM evaluation and AI-assisted clinical decision support — AMIA 2025 and PSB 2026.
          </p>
          <a href="https://scholar.google.com/citations?user=iJg_oFkAAAAJ" target="_blank" rel="noopener"
          style={{ display: 'inline-block', padding: '10px 18px', background: '#22d3ee', color: '#04131a', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', fontFamily: 'inherit' }}>
            Open Google Scholar ↗
          </a>
        </div>
      </div>
    </section>);

};

// ─────── STACK ───────
const StackTile = ({ glyph, label, preview }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{ position: 'relative', background: '#0a0f1a', border: `1px solid ${hover ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 10, padding: '40px 20px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: 210, cursor: 'pointer', transition: 'border-color .25s, transform .25s', transform: hover ? 'translateY(-2px)' : 'none', overflow: 'hidden' }}>
      {hover && preview ?
      <div style={{ alignSelf: 'stretch', flex: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#a5f3fc', lineHeight: 1.5, padding: '4px 4px', whiteSpace: 'pre-wrap' }}>{preview}</div> :

      <div style={{ fontSize: 64, lineHeight: 1, userSelect: 'none' }}>{glyph}</div>
      }
      <div style={{ width: '100%', marginTop: 18, textAlign: 'center' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, letterSpacing: 3, color: 'rgba(230,237,246,0.85)', marginBottom: 10, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #22d3ee 0%, #22d3ee 55%, #f472b6 55%, #f472b6 100%)', width: hover ? '85%' : '65%', margin: '0 auto', transition: 'width .3s' }} />
      </div>
    </div>);

};

const StackSection = () => {
  const tiles = [
  { glyph: '⚛︎', label: 'React' }, { glyph: '▲', label: 'Next.js' },
  { glyph: 'TS', label: 'TypeScript' }, { glyph: '🐍', label: 'Python' },
  { glyph: '⚡', label: 'FastAPI' },
  { glyph: '🤖', label: 'LLM / AI', preview: 'model: claude-sonnet\npipeline: RAG + reRank\n# Multi-model orchestration' },
  { glyph: '⬢', label: 'Node.js' }, { glyph: '🐘', label: 'PostgreSQL' },
  { glyph: '◎', label: 'Tailwind' }, { glyph: '◈', label: 'GraphQL' },
  { glyph: '☁︎', label: 'AWS / GCP' }, { glyph: '⎈', label: 'Docker' }];

  return (
    <section style={{ padding: '120px 72px', background: '#030508', color: '#e6edf6', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(244,114,182,0.12), transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(34,211,238,0.1), transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', marginBottom: 56 }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, letterSpacing: 3, color: '#f472b6', marginBottom: 14 }}>// TECH_STACK.JSON</div>
        <h2 style={{ fontSize: 64, fontWeight: 500, letterSpacing: -2, margin: 0 }}>
          My <span style={{ fontStyle: 'italic', fontWeight: 300, background: 'linear-gradient(90deg,#22d3ee,#a5f3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>arsenal.</span>
        </h2>
      </div>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {tiles.map((t) => <StackTile key={t.label} {...t} />)}
      </div>
    </section>);

};

// ─────── CONTACT — "I build with intent" + letter keyboard (icons removed on keyboard face, labels underneath) ───────
const ContactKey = ({ k, isActive, isPressed, onEnter, onLeave, onPress }) =>
<button onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onPress}
style={{
  position: 'relative', width: 64, height: 64, borderRadius: 10,
  border: `1px solid ${isActive ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.06)'}`,
  background: isActive ? 'linear-gradient(180deg, rgba(34,211,238,0.25), rgba(8,145,178,0.15))' : 'linear-gradient(180deg, #232e44, #131b2e)',
  color: isActive ? '#a5f3fc' : 'rgba(230,237,246,0.9)',
  cursor: 'pointer',
  transform: isPressed ? 'translateY(2px)' : 'translateY(0)',
  boxShadow: isPressed ?
  'inset 0 2px 4px rgba(0,0,0,0.4)' :
  isActive ?
  '0 0 24px rgba(34,211,238,0.4), inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 0 rgba(0,0,0,0.4)' :
  'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 0 rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.3)',
  transition: isPressed ? 'all .05s' : 'all .15s cubic-bezier(.2,.7,.3,1)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4,
  fontFamily: '"JetBrains Mono", monospace'
}}>
    <div style={{ lineHeight: 0 }}>{k.icon}</div>
    <span style={{ fontSize: 8, letterSpacing: 1.5, opacity: 0.55, fontWeight: 400 }}>{k.label.toUpperCase()}</span>
  </button>;


const ContactSection = () => {
  const heroRef = React.useRef(null);
  const [active, setActive] = React.useState(null);
  const [pressed, setPressed] = React.useState({});
  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });

  React.useEffect(() => {
    const el = heroRef.current;if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const playTone = (freq) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(),g = ctx.createGain();
      o.type = 'triangle';o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      o.connect(g);g.connect(ctx.destination);
      o.start();o.stop(ctx.currentTime + 0.16);
    } catch {}
  };

  const press = (k) => {
    setPressed((p) => ({ ...p, [k.id]: true }));
    playTone(k.freq);
    setTimeout(() => setPressed((p) => ({ ...p, [k.id]: false })), 180);
    if (k.href) window.open(k.href, '_blank', 'noopener');
  };

  const I = {
    mail: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
    linkedin: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>,
    github: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg>,
    scholar: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L2 9l10 6 10-6-10-6z" /><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" /></svg>,
    web: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>,
    cv: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>,
    phone: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" /></svg>,
    meet: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
    twitter: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.3 8.3L23 22h-6.7l-5.2-6.9L5 22H1.9l7.8-8.9L1 2h6.8l4.7 6.3L18.9 2zm-2.4 18h2L7.6 4H5.5L16.5 20z" /></svg>
  };

  // 3 rows × 3 = 9 keys, matching reference layout; action-shift rows
  const rows = [
  [
  { id: 'email', label: 'email', sub: 'kanavchopra8@gmail.com', icon: I.mail, freq: 330, href: 'mailto:kanavchopra8@gmail.com' },
  { id: 'linkedin', label: 'linkedin', sub: '/in/kanavchopra', icon: I.linkedin, freq: 392, href: 'https://www.linkedin.com/in/kanavchopra' },
  { id: 'github', label: 'github', sub: '/kanavchopra', icon: I.github, freq: 440, href: 'https://github.com/' }],

  [
  { id: 'twitter', label: 'twitter', sub: '@kanavchopra', icon: I.twitter, freq: 293, href: 'https://twitter.com/' },
  { id: 'cv', label: 'cv', sub: 'resume.pdf', icon: I.cv, freq: 261, href: '#' },
  { id: 'scholar', label: 'scholar', sub: 'Google Scholar', icon: I.scholar, freq: 349, href: 'https://scholar.google.com/citations?user=iJg_oFkAAAAJ' }],

  [
  { id: 'web', label: 'website', sub: 'kanavchopra.com', icon: I.web, freq: 233, href: 'https://www.kanavchopra.com' },
  { id: 'phone', label: 'phone', sub: '+1 (314) 709 4679', icon: I.phone, freq: 220, href: 'tel:+13147094679' },
  { id: 'meet', label: 'meet', sub: 'schedule a call', icon: I.meet, freq: 196, href: '#' }]];


  const flat = rows.flat();

  return (
    <section ref={heroRef} style={{
      position: 'relative', minHeight: 820, overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #0e1a2e 0%, #060912 60%, #02040a 100%)',
      color: '#e6edf6', fontFamily: "'Inter Tight', system-ui, sans-serif"
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(34,211,238,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.05) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse at 50% 60%, #000 20%, transparent 80%)' }} />
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(34,211,238,0.18), transparent 60%)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', left: mouse.x * 100 + '%', top: mouse.y * 100 + '%', width: 600, height: 600, transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent 60%)', pointerEvents: 'none', mixBlendMode: 'screen' }} />

      {/* top header */}
      <div style={{ position: 'absolute', top: 32, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 56px', zIndex: 5, alignItems: 'center' }}>
        <div style={{ fontSize: 13, fontFamily: '"JetBrains Mono", monospace', color: 'rgba(230,237,246,0.55)', letterSpacing: 1.5 }}>
          KANAV.CHOPRA<span style={{ color: '#22d3ee' }}>/</span>CONTACT
        </div>
        <div style={{ fontSize: 12, fontFamily: '"JetBrains Mono", monospace', color: 'rgba(230,237,246,0.4)' }}>
          PRESS · ANY · KEY ·
        </div>
      </div>

      {/* headline */}
      <div style={{ position: 'relative', paddingTop: 100, textAlign: 'center', zIndex: 4 }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#22d3ee', letterSpacing: 3, marginBottom: 14 }}>
          /* 05 · CONTACT · LET'S BUILD */
        </div>
        <h1 style={{ fontSize: 84, fontWeight: 500, letterSpacing: -3, lineHeight: 0.95, margin: 0 }}>
          I build with <span style={{ fontStyle: 'italic', fontWeight: 300, background: 'linear-gradient(90deg,#22d3ee,#a5f3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>intent</span>.
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(230,237,246,0.6)', maxWidth: 560, margin: '18px auto 0', lineHeight: 1.55 }}>
          Open to collaborations on clinical AI, research engineering, and senior full-stack work. Currently at Stanford, shipping from Palo Alto.
        </p>
      </div>

      {/* keyboard */}
      <div style={{ position: 'relative', marginTop: 56, display: 'flex', justifyContent: 'center', zIndex: 5, paddingBottom: 100 }}>
        <div>
          <div style={{ padding: '26px 28px 22px', borderRadius: 20, background: 'linear-gradient(180deg, rgba(20,28,42,0.8), rgba(8,14,24,0.8))', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 4px' }}>
              <span style={{ fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: 'rgba(230,237,246,0.4)', letterSpacing: 2 }}>◉ CONTACT · v2.6</span>
              <span style={{ fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: 'rgba(34,211,238,0.7)', letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: 3, background: '#22d3ee', boxShadow: '0 0 8px #22d3ee' }} />
                ONLINE
              </span>
            </div>
            {rows.map((row, ri) =>
            <div key={ri} style={{ display: 'flex', gap: 10, marginBottom: 10, marginLeft: ri * 14 }}>
                {row.map((k) =>
              <ContactKey key={k.id} k={k}
              isActive={active === k.id} isPressed={pressed[k.id]}
              onEnter={() => setActive(k.id)} onLeave={() => setActive(null)}
              onPress={() => press(k)} />
              )}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 10, marginLeft: 40, alignItems: 'center' }}>
              <div style={{ width: 390, height: 38, borderRadius: 8, background: 'linear-gradient(180deg, #1a2338, #0f172a)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 0 rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(230,237,246,0.3)', fontFamily: '"JetBrains Mono", monospace', letterSpacing: 3 }}>
                — — — — — — — — — — — — — — —
              </div>
            </div>
          </div>
          <div style={{ marginTop: 22, textAlign: 'center', fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: 'rgba(230,237,246,0.6)', height: 20 }}>
            {active ?
            <><span style={{ color: '#22d3ee' }}>{'>'}</span> {flat.find((r) => r.id === active).label}<span style={{ color: 'rgba(230,237,246,0.4)', marginLeft: 12 }}>{flat.find((r) => r.id === active).sub}</span></> :

            <span style={{ color: 'rgba(230,237,246,0.35)' }}>◦ hover a key to preview · click to open</span>
            }
          </div>
        </div>
      </div>
    </section>);

};

// ─────── FOOTER ───────
const FooterSection = () =>
<footer style={{ padding: '64px 72px 40px', background: '#02030a', color: 'rgba(230,237,246,0.6)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
      <div>
        <div style={{ fontSize: 72, fontWeight: 500, letterSpacing: -3, color: 'rgba(230,237,246,0.9)', lineHeight: 0.9, marginBottom: 12 }}>Kanav <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Chopra</span>.</div>
        <div style={{ fontSize: 13, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1.5, color: 'rgba(230,237,246,0.4)' }}>AI RESEARCHER · FULL-STACK · STANFORD</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 48, textAlign: 'right' }}>
        {[
      ['SOCIAL', ['GitHub ↗', 'LinkedIn ↗', 'Scholar ↗']],
      ['LINKS', ['Work', 'Research', 'Résumé']],
      ['EDUCATION', ['MS · Webster', 'BS · UPES']]].
      map(([k, items]) =>
      <div key={k}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(230,237,246,0.35)', fontFamily: '"JetBrains Mono", monospace', marginBottom: 14 }}>{k}</div>
            {items.map((i) => <div key={i} style={{ fontSize: 13, padding: '3px 0' }}>{i}</div>)}
          </div>
      )}
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: '"JetBrains Mono", monospace', color: 'rgba(230,237,246,0.35)', letterSpacing: 1.5, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div>© 2026 KANAV CHOPRA · ALL RIGHTS RESERVED</div>
      <div>BUILT WITH CARE · PALO ALTO</div>
    </div>
  </footer>;


export { ExperienceSection, ProjectsSection, PublicationsSection, StackSection, ContactSection, FooterSection };