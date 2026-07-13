/* ============================================================
   app.js — shared boot: nav behavior, mood toggle, active link
   ============================================================ */

(function(){
  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const moodToggle = document.querySelector('.mood-toggle');
  const html = document.documentElement;

  /* ---- scrolled nav state ---- */
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile nav ---- */
  if (navToggle && navLinks){
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  /* ---- active nav link ---- */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('is-active');
  });

  /* ---- mood (day / night) persisted across pages ---- */
  const savedMood = localStorage.getItem('osl-mood');
  if (savedMood) html.setAttribute('data-mood', savedMood);

  if (moodToggle){
    moodToggle.addEventListener('click', () => {
      const next = html.getAttribute('data-mood') === 'paper' ? 'night' : 'paper';
      html.setAttribute('data-mood', next);
      localStorage.setItem('osl-mood', next);
    });
  }

  /* ---- reveal-on-scroll bootstrap lives in scroll.js ---- */
})();
