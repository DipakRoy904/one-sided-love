/* ============================================================
   timeline.js — loads data/blog.json entries into the diary
   timeline (order carries real meaning here: it IS a chronology)
   ============================================================ */

(function(){
  const mount = document.querySelector('[data-timeline]');
  if (!mount) return;

  fetch('data/blog.json')
    .then(r => r.json())
    .then(entries => {
      mount.innerHTML = entries.map((entry, i) => `
        <article class="timeline-entry" data-reveal>
          <div class="timeline-date">${entry.date}</div>
          <h3>${entry.title}</h3>
          <p>${entry.excerpt}</p>
        </article>
      `).join('');

      // hand the freshly-injected elements to the reveal observer
      const io = new IntersectionObserver((entries2) => {
        entries2.forEach(entry => {
          if (entry.isIntersecting){
            entry.target.classList.add('is-visible', 'is-revealed');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      mount.querySelectorAll('.timeline-entry').forEach(el => io.observe(el));
    })
    .catch(() => {
      mount.innerHTML = '<p style="color:var(--ink-dim)">The entries are quiet today — check back later.</p>';
    });
})();
