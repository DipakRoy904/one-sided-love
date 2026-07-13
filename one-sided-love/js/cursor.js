/* ============================================================
   cursor.js — small ring + dot cursor that reacts to hoverables
   ============================================================ */

(function(){
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  const tick = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const hoverables = 'a, button, .card, .gallery-item, input, textarea';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverables)) ring.classList.add('is-active');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverables)) ring.classList.remove('is-active');
  });
})();
