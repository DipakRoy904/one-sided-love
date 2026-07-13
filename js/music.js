/* ============================================================
   music.js — Background Music
   Auto starts after first user interaction
============================================================ */

(function () {

  const btn = document.querySelector(".music-toggle");
  if (!btn) return;

  const audio = new Audio("assets/audio/Qismat Badal Di Yodha 320 Kbps.mp3");

  audio.loop = true;
  audio.volume = 0.35;

  let playing = localStorage.getItem("osl-music") === "on";

  function updateButton() {
    btn.textContent = playing ? "♫" : "♪";
    btn.setAttribute("aria-pressed", playing);
  }

  updateButton();

  function playMusic() {
    audio.play().then(() => {
      playing = true;
      localStorage.setItem("osl-music", "on");
      updateButton();
    }).catch(() => { });
  }

  function pauseMusic() {
    audio.pause();
    playing = false;
    localStorage.setItem("osl-music", "off");
    updateButton();
  }

  // First click anywhere starts music (only if enabled)
  function firstInteraction() {
    if (localStorage.getItem("osl-music") !== "off") {
      playMusic();
    }
  }

  document.addEventListener("click", firstInteraction, { once: true });

  // Music button
  btn.addEventListener("click", () => {

    if (playing) {
      pauseMusic();
    } else {
      playMusic();
    }

  });

})();