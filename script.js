const screens = document.querySelectorAll(".screen");
const hearts = document.getElementById("hearts");
const musicBtn = document.getElementById("musicBtn");

let audioCtx;
let musicTimer;
let musicOn = false;

function show(id) {
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function heartRain(count = 28) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");

      heart.className = "heart";
      heart.textContent = ["💗", "💖", "💕", "🌸", "✨"][
        Math.floor(Math.random() * 5)
      ];

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 14 + Math.random() * 18 + "px";
      heart.style.animationDuration = 4 + Math.random() * 4 + "s";

      hearts.appendChild(heart);

      setTimeout(() => heart.remove(), 8500);
    }, i * 120);
  }
}

function confetti() {
  for (let i = 0; i < 90; i++) {
    setTimeout(() => {
      const c = document.createElement("i");

      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.transform = `rotate(${Math.random() * 360}deg)`;

      c.style.background = [
        "#ff72ad",
        "#ffd166",
        "#a78bfa",
        "#7dd3fc",
        "#fb7185"
      ][Math.floor(Math.random() * 5)];

      hearts.appendChild(c);

      setTimeout(() => c.remove(), 4500);
    }, i * 15);
  }
}

function startMusic() {
  if (musicOn) return;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  musicOn = true;
  musicBtn.textContent = "♫ Music: ON";

  const notes = [
    523.25,
    659.25,
    783.99,
    659.25,
    587.33,
    698.46,
    880,
    698.46
  ];

  let i = 0;

  function play() {
    if (!musicOn) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.value = notes[i % notes.length];

    gain.gain.setValueAtTime(0, audioCtx.currentTime);

    gain.gain.linearRampToValueAtTime(
      0.055,
      audioCtx.currentTime + 0.03
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + 0.42
    );

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.45);

    i++;

    musicTimer = setTimeout(play, 520);
  }

  play();
}

function stopMusic() {
  musicOn = false;

  clearTimeout(musicTimer);

  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }

  musicBtn.textContent = "♫ Music: OFF";
}

document.getElementById("openBtn").onclick = () => {
  show("wish");
  heartRain();
  confetti();
  startMusic();
};

document.getElementById("surpriseBtn").onclick = () => {
  show("final");
  heartRain(45);
  confetti();
};

document.getElementById("againBtn").onclick = () => {
  show("welcome");
  stopMusic();
};

musicBtn.onclick = () => {
  if (musicOn) {
    stopMusic();
  } else {
    startMusic();
  }
};
