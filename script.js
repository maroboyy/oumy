'use strict';

const CONFIG = {
  birthDate: new Date('2002-06-15T00:00:00'),
  letterText: `Happy Birthday, Oumaima! 🎉

Yep, it's officially the day of the year where everything is about YOU — and honestly? It should be.

24 years of being absolutely amazing. 24 years of that smile that lights up rooms. 24 years of laughing too loud, staying up too late, and somehow managing to be the best person everyone knows.

You make the world around you warmer just by being in it. And today, we just want to make sure you feel every ounce of that love coming right back to you.

So here's to 24: may it be filled with everything you deserve — adventures, joy, good food, and all the love in the world.

We love you more than words. Now go celebrate — you've earned it! 🥂✨`,

  qualities: [
    { icon: '🌸', title: 'Walks into a room and lights it up', desc: 'Without even trying' },
    { icon: '💬', title: 'Makes everyone feel heard', desc: 'Her words have weight' },
    { icon: '✨', title: 'Finds magic in small things', desc: 'That\'s a rare gift' },
    { icon: '🤣', title: 'The funniest person around', desc: 'Genuinely, no competition' },
    { icon: '💜', title: 'Loves harder than anyone', desc: 'Her heart is huge' },
    { icon: '🌙', title: 'Stronger than she thinks', desc: 'Always has been' },
  ],

  quotes: [
    { text: 'You are braver than you believe, stronger than you seem, and more loved than you know.', attr: '— A. A. Milne' },
    { text: 'She is clothed in strength and dignity, and she laughs without fear of the future.', attr: '— Proverbs 31:25' },
    { text: 'A girl should be two things: who and what she wants.', attr: '— Coco Chanel' },
    { text: 'Be your own kind of beautiful.', attr: '— Unknown' },
    { text: 'Life is short, make every hair flip count.', attr: '— Unknown' },
  ],

  seedMessages: [
    { name: 'Your Best Friend 🌸', text: 'Oumaima!! Happy birthday!! You deserve ALL the good things today and every day. I love you so much!!! 💜🎉', date: 'June 15, 2025' },
    { name: 'Your Family ❤️', text: 'Happy 24th our beautiful girl! Every day with you is a gift. We love you to the moon and back! 🌙', date: 'June 15, 2025' },
    { name: 'Someone Who Cares 💌', text: 'Wishing you the most magical birthday ever! You deserve every single candle on that cake! ✨🎂', date: 'June 15, 2025' },
  ],
};

/* ── SPARKLES ── */
function initSparkles() {
  const c = document.getElementById('sparkles');
  const items = ['✨','💜','🌸','⭐','💫','🎀','💕'];
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = items[Math.floor(Math.random() * items.length)];
    s.style.cssText = `left:${Math.random()*90+5}%;top:${Math.random()*85+5}%;animation-delay:${Math.random()*4}s;animation-duration:${Math.random()*3+3}s;font-size:${Math.random()*1+0.8}rem`;
    c.appendChild(s);
  }
}

/* ── CONFETTI ── */
function initConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  const colors = ['#c9b8f5','#f7c5df','#f0a3c8','#e8d5ff','#b896e8','#fce4f0','#d4a0e8','#ffcce0'];
  let pieces = [];
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  function create() {
    pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 4, h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 1.2 + 0.4, rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08, drift: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.6 + 0.3, shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speed; p.x += p.drift; p.rot += p.rotSpeed;
      if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
      ctx.save(); ctx.globalAlpha = p.opacity; ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color;
      if (p.shape === 'rect') { ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h); }
      else { ctx.beginPath(); ctx.arc(0, 0, p.w/2, 0, Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  resize(); create(); draw();
  window.addEventListener('resize', () => { resize(); create(); });
}


/* ── COUNTER ── */
function initCounter() {
  function update() {
    const now = new Date(), birth = CONFIG.birthDate;
    let y = now.getFullYear() - birth.getFullYear();
    let m = now.getMonth() - birth.getMonth();
    let d = now.getDate() - birth.getDate();
    if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    document.getElementById('cdY').textContent = y;
    document.getElementById('cdM').textContent = m;
    document.getElementById('cdD').textContent = d;
    document.getElementById('cdH').textContent = now.getHours();
  }
  update(); setInterval(update, 60000);
}

/* ── QUOTES ── */
function initQuotes() {
  const textEl = document.getElementById('quoteText');
  const attrEl = document.getElementById('quoteAttr');
  const dotsEl = document.getElementById('quoteDots');
  const qs = CONFIG.quotes;
  let cur = 0, timer;
  qs.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'q-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Quote ${i+1}`);
    d.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsEl.appendChild(d);
  });
  function goTo(i) {
    textEl.style.opacity = '0'; attrEl.style.opacity = '0';
    setTimeout(() => {
      cur = (i + qs.length) % qs.length;
      textEl.textContent = `"${qs[cur].text}"`;
      attrEl.textContent = qs[cur].attr;
      textEl.style.opacity = '1'; attrEl.style.opacity = '1';
      dotsEl.querySelectorAll('.q-dot').forEach((d, j) => d.classList.toggle('active', j === cur));
    }, 350);
  }
  function resetTimer() { clearInterval(timer); timer = setInterval(() => goTo(cur + 1), 5000); }
  resetTimer();
}

/* ── LETTER ── */
function initLetter() {
  const container = document.getElementById('letterText');
  const paras = CONFIG.letterText.split('\n\n').map(p => p.trim()).filter(Boolean);
  let done = false;
  function start() {
    if (done) return; done = true;
    const els = paras.map(() => { const p = document.createElement('p'); container.appendChild(p); return p; });
    const cursor = document.createElement('span'); cursor.className = 'cursor'; container.appendChild(cursor);
    let pi = 0, ci = 0;
    function next() {
      if (pi >= paras.length) { cursor.remove(); return; }
      if (ci < paras[pi].length) { els[pi].textContent += paras[pi][ci]; els[pi].after(cursor); ci++; setTimeout(next, 20); }
      else { pi++; ci = 0; setTimeout(next, 180); }
    }
    next();
  }
  const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { start(); obs.disconnect(); } }, { threshold: 0.3 });
  obs.observe(document.querySelector('.letter-card'));
}

/* ── QUALITIES ── */
function initQualities() {
  const g = document.getElementById('qualGrid');
  CONFIG.qualities.forEach(q => {
    const c = document.createElement('div');
    c.className = 'qual-card fade-in';
    c.innerHTML = `<span class="qual-icon">${q.icon}</span><p class="qual-title">${q.title}</p><p class="qual-desc">${q.desc}</p>`;
    g.appendChild(c);
  });
}

/* ── WALL ── */
function initWall() {
  const KEY = 'oumaima_bday_v1';
  const grid = document.getElementById('messagesGrid');
  const nameEl = document.getElementById('wName');
  const msgEl = document.getElementById('wMsg');
  const btn = document.getElementById('wSubmit');
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || [...CONFIG.seedMessages]; } catch { return [...CONFIG.seedMessages]; } }
  function save(m) { try { localStorage.setItem(KEY, JSON.stringify(m)); } catch {} }
  function render(msgs) {
    grid.innerHTML = '';
    if (!msgs.length) { grid.innerHTML = '<p class="no-msgs">Be the first to wish her! 🌸</p>'; return; }
    [...msgs].reverse().forEach(m => {
      const c = document.createElement('div'); c.className = 'msg-card glass-card';
      c.innerHTML = `<p class="msg-name">${esc(m.name)}</p><p class="msg-text">${esc(m.text)}</p><p class="msg-date">${esc(m.date)}</p>`;
      grid.appendChild(c);
    });
  }
  btn.addEventListener('click', () => {
    const n = nameEl.value.trim(), t = msgEl.value.trim();
    if (!n || !t) { shake(btn); return; }
    const msgs = load();
    msgs.push({ name: n, text: t, date: new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) });
    save(msgs); render(msgs);
    nameEl.value = ''; msgEl.value = '';
    grid.scrollIntoView({ behavior:'smooth', block:'nearest' });
    toast('Wish sent! 💜');
  });
  render(load());
}

function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function shake(el) {
  el.style.animation='none'; el.offsetHeight;
  el.style.animation='shk .4s ease';
  el.addEventListener('animationend', () => el.style.animation='', { once:true });
}
const ss = document.createElement('style');
ss.textContent = '@keyframes shk{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}';
document.head.appendChild(ss);

/* ── CANDLE ── */
function initCandle() {
  const KEY = 'oumaima_candle_v1';
  const wrap = document.getElementById('candleWrap');
  const btn = document.getElementById('candleBtn');
  const num = document.getElementById('candleNum');
  let count = parseInt(localStorage.getItem(KEY) || '24', 10);
  let lit = false;
  num.textContent = count;
  btn.addEventListener('click', () => {
    if (lit) return;
    lit = true; wrap.classList.add('lit'); btn.classList.add('lit');
    btn.textContent = '✨ Candle Lit!';
    count++; try { localStorage.setItem(KEY, count); } catch {}
    num.textContent = count;
    toast('Your candle is glowing! 🕯️ Make a wish!');
  });
}

/* ── SCROLL ANIM ── */
function initScrollAnim() {
  const obs = new IntersectionObserver(e => {
    e.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
  document.querySelectorAll('.section-title, .section-sub, .eyebrow').forEach(el => {
    el.classList.add('fade-in'); obs.observe(el);
  });
}

/* ── TOAST ── */
function toast(msg) {
  const ex = document.querySelector('.toast'); if (ex) ex.remove();
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 3200);
}

/* ── SHARE ── */
function shareIt(p) {
  const url = encodeURIComponent(window.location.href);
  const txt = encodeURIComponent('🎀 Happy Birthday Oumaima! Check out this birthday surprise 💜');
}

document.addEventListener('DOMContentLoaded', () => {

  const audio = document.getElementById("bgAudio");

  function startAudio() {
    audio.play().catch(err => {
      console.log("Autoplay blocked:", err);
    });

    document.removeEventListener("click", startAudio);
    document.removeEventListener("touchstart", startAudio);
  }

  document.addEventListener("click", startAudio);
  document.addEventListener("touchstart", startAudio);

});

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initConfetti();
  initSparkles();
  initCounter();
  initQuotes();
  initLetter();
  initQualities();
  initWall();
  initCandle();
  initScrollAnim();
});
