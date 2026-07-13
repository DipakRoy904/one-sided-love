/* ============================================================
   gallery.js — simple lightbox for .gallery-item elements
   ============================================================ */

(function(){
  const grid = document.querySelector('[data-gallery]');
  if (!grid) return;

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(8,9,18,.9);
    display:none; align-items:center; justify-content:center;
    z-index:1000; padding:6vw; cursor:zoom-out;
  `;
  const frame = document.createElement('div');
  frame.style.cssText = `
    max-width:640px; width:100%; background:var(--bg-raised);
    border:1px solid var(--line-strong); border-radius:12px;
    padding:2rem; text-align:center; font-family:var(--font-body);
    color:var(--ink);
  `;
  overlay.appendChild(frame);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => overlay.style.display = 'none');

  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.getAttribute('data-caption') || '';
      frame.innerHTML = `
        <p class="eyebrow" style="justify-content:center">Memory</p>
        <p style="margin-top:1rem;font-family:var(--font-display);font-size:1.3rem;font-style:italic;">
          ${caption}
        </p>
      `;
      overlay.style.display = 'flex';
    });
  });
})();
