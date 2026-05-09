import React from 'react';

export const useTilt = (ref, {
  amplitude = 12,
  scaleOnHover = 1.05,
  perspective = 1000,
  enabled = true,
} = {}) => {
  React.useEffect(() => {
    const el = ref.current; if (!el || !enabled) return;
    let raf = 0;
    let rx = 0, ry = 0, sc = 1;

    const apply = () => {
      raf = 0;
      el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${sc}, ${sc}, ${sc})`;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const ox = e.clientX - r.left - r.width / 2;
      const oy = e.clientY - r.top - r.height / 2;
      rx = (oy / (r.height / 2)) * -amplitude;
      ry = (ox / (r.width / 2)) * amplitude;
      el.style.transition = 'transform .12s ease-out';
      schedule();
    };
    const onEnter = () => {
      sc = scaleOnHover;
      el.style.transition = 'transform .35s cubic-bezier(.2,.7,.3,1)';
      schedule();
    };
    const onLeave = () => {
      rx = 0; ry = 0; sc = 1;
      el.style.transition = 'transform .55s cubic-bezier(.2,.7,.3,1)';
      schedule();
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, amplitude, scaleOnHover, perspective, enabled]);
};

export const TiltedCard = ({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) => {
  const ref = React.useRef(null);
  useTilt(ref, { amplitude: rotateAmplitude, scaleOnHover });
  const [tip, setTip] = React.useState({ x: 0, y: 0, on: false });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };
  return (
    <figure
      ref={ref}
      style={{
        position:'relative', height: containerHeight, width: containerWidth,
        perspective:'800px', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', transformStyle:'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setTip(s => ({ ...s, on:false }))}
    >
      <img src={imageSrc} alt={altText}
        style={{ position:'absolute', top:0, left:0, width:imageWidth, height:imageHeight, objectFit:'cover', borderRadius:15, willChange:'transform', transform:'translateZ(0)' }}/>
      {displayOverlayContent && overlayContent && (
        <div style={{position:'absolute', top:0, left:0, zIndex:2, transform:'translateZ(30px)', willChange:'transform'}}>
          {overlayContent}
        </div>
      )}
      {showTooltip && captionText && (
        <figcaption style={{
          pointerEvents:'none', position:'absolute', left:tip.x, top:tip.y,
          borderRadius:4, background:'#fff', padding:'4px 10px', fontSize:10,
          color:'#2d2d2d', opacity: tip.on ? 1 : 0, zIndex:3,
          transition:'opacity .25s ease-out',
        }}>{captionText}</figcaption>
      )}
    </figure>
  );
};

