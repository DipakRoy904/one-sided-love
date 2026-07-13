/* ============================================================
   particles.js — ambient drifting light motes on a canvas
   ============================================================ */

(function(){
  const mount = document.getElementById('particle-field');
  if (!mount) return;

  const canvas = document.createElement('canvas');
  mount.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let w, h, particles;
  const COUNT = Math.round((window.innerWidth * window.innerHeight) / 26000);

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeParticles(){
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.15 + 0.03,
      vx: (Math.random() - 0.5) * 0.08,
      a: Math.random() * 0.5 + 0.15,
      flicker: Math.random() * 0.02 + 0.005
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#d4af7a';
    particles.forEach(p => {
      p.y -= p.vy;
      p.x += p.vx;
      p.a += (Math.random() - 0.5) * p.flicker;
      p.a = Math.max(0.05, Math.min(0.65, p.a));
      if (p.y < -10){ p.y = h + 10; p.x = Math.random() * w; }

      ctx.beginPath();
      ctx.fillStyle = hexToRgba(accent, p.a);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  function hexToRgba(hex, alpha){
    hex = hex.replace('#','');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  window.addEventListener('resize', () => { resize(); makeParticles(); });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    resize();
    makeParticles();
    requestAnimationFrame(draw);
  }
})();
