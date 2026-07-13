/* ============================================================
   typing.js — types out unsent lines, then erases them
   The signature moment: a confession that never quite gets sent.
   ============================================================ */

(function () {
  const el = document.querySelector('[data-typing]');
  if (!el) return;

  let lines;
  try {
    lines = JSON.parse(el.getAttribute('data-typing'));
  } catch (e) {
    lines = ['I keep starting this sentence and never finishing it.'];
  }

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  const textNode = document.createElement('span');
  el.append(textNode, cursor);

  let lineIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const full = lines[lineIndex];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      textNode.textContent = full;
      return;
    }

    if (!deleting) {
      charIndex++;
      textNode.textContent = full.slice(0, charIndex);
      if (charIndex === full.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 45 + Math.random() * 55);
    } else {
      charIndex--;
      textNode.textContent = full.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        setTimeout(tick, 500);
        return;
      }
      setTimeout(tick, 22);
    }
  }

  tick();
})();
