import React from 'react';

const MB_GLOW = '34, 211, 238';
const MB_SPOT_RADIUS = 380;

const _mbCalc = (radius) => ({ proximity: radius * 0.5, fadeDistance: radius * 0.75 });

const _mbSetGlow = (card, mx, my, intensity, radius) => {
  const r = card.getBoundingClientRect();
  card.style.setProperty('--glow-x', `${((mx - r.left) / r.width) * 100}%`);
  card.style.setProperty('--glow-y', `${((my - r.top) / r.height) * 100}%`);
  card.style.setProperty('--glow-intensity', intensity.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

// Global spotlight overlay — only active when cursor is inside the bento grid section.
const useGlobalSpotlight = (gridRef, glowColor = MB_GLOW, radius = MB_SPOT_RADIUS) => {
  React.useEffect(() => {
    if (!gridRef.current) return;
    const grid = gridRef.current;

    const spot = document.createElement('div');
    spot.style.cssText = `
      position: fixed; width: 800px; height: 800px; border-radius: 50%;
      pointer-events: none; z-index: 200; opacity: 0;
      transform: translate(-50%, -50%); mix-blend-mode: screen;
      transition: opacity .35s ease-out, left .12s ease-out, top .12s ease-out;
      background: radial-gradient(circle,
        rgba(${glowColor},0.18) 0%,
        rgba(${glowColor},0.10) 15%,
        rgba(${glowColor},0.05) 25%,
        rgba(${glowColor},0.02) 40%,
        rgba(${glowColor},0.01) 65%,
        transparent 70%);
    `;
    document.body.appendChild(spot);

    const { proximity, fadeDistance } = _mbCalc(radius);

    const onMove = (e) => {
      const section = grid.closest('.bento-section') || grid;
      const r = section.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      const cards = grid.querySelectorAll('.magic-bento-card');

      if (!inside) {
        spot.style.opacity = '0';
        cards.forEach(c => c.style.setProperty('--glow-intensity', '0'));
        return;
      }

      let minDist = Infinity;
      cards.forEach(card => {
        const cr = card.getBoundingClientRect();
        const cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
        const d = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cr.width, cr.height) / 2);
        minDist = Math.min(minDist, d);
        let g = 0;
        if (d <= proximity) g = 1;
        else if (d <= fadeDistance) g = (fadeDistance - d) / (fadeDistance - proximity);
        _mbSetGlow(card, e.clientX, e.clientY, g, radius);
      });

      spot.style.left = e.clientX + 'px';
      spot.style.top  = e.clientY + 'px';
      const target = minDist <= proximity ? 0.85
                   : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.85
                   : 0;
      spot.style.opacity = target.toString();
    };

    const onLeave = () => {
      spot.style.opacity = '0';
      grid.querySelectorAll('.magic-bento-card').forEach(c => c.style.setProperty('--glow-intensity','0'));
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      spot.parentNode && spot.parentNode.removeChild(spot);
    };
  }, [gridRef, glowColor, radius]);
};

// Per-card tilt + magnetism + click ripple
const useBentoCard = (cardRef, { tilt = true, magnet = true, click = true, glowColor = MB_GLOW } = {}) => {
  React.useEffect(() => {
    const el = cardRef.current; if (!el) return;
    let raf = 0;
    let pendingX = 0, pendingY = 0, pendingRX = 0, pendingRY = 0;

    const apply = () => {
      raf = 0;
      el.style.transform = `perspective(1000px) translate3d(${pendingX}px, ${pendingY}px, 0) rotateX(${pendingRX}deg) rotateY(${pendingRY}deg)`;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };

    const onMove = (e) => {
      if (!tilt && !magnet) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const cx = r.width / 2, cy = r.height / 2;
      if (tilt) {
        pendingRX = ((y - cy) / cy) * -8;
        pendingRY = ((x - cx) / cx) * 8;
      }
      if (magnet) {
        pendingX = (x - cx) * 0.04;
        pendingY = (y - cy) * 0.04;
      }
      el.style.transition = 'transform .12s ease-out';
      schedule();
    };

    const onLeave = () => {
      pendingX = pendingY = pendingRX = pendingRY = 0;
      el.style.transition = 'transform .35s cubic-bezier(.2,.7,.3,1)';
      schedule();
    };

    const onClick = (e) => {
      if (!click) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const max = Math.max(
        Math.hypot(x, y), Math.hypot(x - r.width, y),
        Math.hypot(x, y - r.height), Math.hypot(x - r.width, y - r.height));
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position:absolute; width:${max*2}px; height:${max*2}px; border-radius:50%;
        left:${x-max}px; top:${y-max}px; pointer-events:none; z-index:1000;
        background: radial-gradient(circle, rgba(${glowColor},0.35) 0%, rgba(${glowColor},0.18) 30%, transparent 70%);
        transform: scale(0); opacity:1;
        transition: transform .8s cubic-bezier(.2,.7,.3,1), opacity .8s ease-out;
      `;
      el.appendChild(ripple);
      requestAnimationFrame(() => { ripple.style.transform = 'scale(1)'; ripple.style.opacity = '0'; });
      setTimeout(() => ripple.parentNode && ripple.parentNode.removeChild(ripple), 850);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('click', onClick);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('click', onClick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cardRef, tilt, magnet, click, glowColor]);
};

const BentoCard = ({ project, span = '', className = '' }) => {
  const ref = React.useRef(null);
  useBentoCard(ref);
  const p = project;
  return (
    <div ref={ref} className={`magic-bento-card ${span} ${className}`}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18, position:'relative', zIndex:2}}>
        <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'rgba(230,237,246,0.45)', letterSpacing:2}}>{p.n}</span>
        <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:p.accent, letterSpacing:1.5}}>{p.tag}</span>
      </div>
      <h3 style={{fontSize:30, fontWeight:500, margin:0, marginBottom:6, letterSpacing:-0.6, color:'#fff', position:'relative', zIndex:2}}>{p.name}</h3>
      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, marginBottom:16, color:'rgba(230,237,246,0.55)', position:'relative', zIndex:2}}>→ {p.url}</div>
      <p style={{fontSize:14, lineHeight:1.6, margin:0, marginBottom:14, color:'rgba(230,237,246,0.85)', position:'relative', zIndex:2}}>{p.desc}</p>
      <ul style={{margin:0, padding:0, listStyle:'none', marginBottom:18, position:'relative', zIndex:2}}>
        {p.highlights.map((h,j) => (
          <li key={j} style={{fontSize:13, lineHeight:1.55, marginBottom:6, paddingLeft:14, position:'relative', color:'rgba(230,237,246,0.78)'}}>
            <span style={{position:'absolute', left:0, top:7, width:5, height:5, borderRadius:3, background:p.accent, opacity:0.8}}/>
            {h}
          </li>
        ))}
      </ul>
      <div style={{display:'flex', gap:6, flexWrap:'wrap', position:'relative', zIndex:2}}>
        {p.stack.map(s => (
          <span key={s} style={{fontSize:10.5, padding:'3px 9px', borderRadius:999, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.10)', fontFamily:'"JetBrains Mono", monospace', color:'rgba(230,237,246,0.85)'}}>{s}</span>
        ))}
      </div>
    </div>
  );
};

export const MagicBentoProjects = ({ projects }) => {
  const gridRef = React.useRef(null);
  useGlobalSpotlight(gridRef);
  // 4 projects in an asymmetric bento: big hero card top-left, then three stacked
  return (
    <div ref={gridRef} className="bento-section magic-bento-grid">
      <BentoCard project={projects[0]} span="bento-hero"/>
      <BentoCard project={projects[1]} span="bento-tall"/>
      <BentoCard project={projects[2]} span="bento-wide"/>
      <BentoCard project={projects[3]} span="bento-wide"/>
    </div>
  );
};

