/* AC Hardware motion layer: video playback manager + hero parallax. */
(() => {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const conn = navigator.connection || {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
  const touch = matchMedia('(hover: none)').matches;
  const vids = $$('video[data-src]'), seen = new Map(), MAX = touch ? 2 : 3;
  const tall = () => matchMedia('(max-aspect-ratio: 4/5)').matches;
  const load = v => { if (v.dataset.on) return; v.dataset.on = '1'; v.src = (tall() && v.dataset.srcTall) || v.dataset.src; };
  vids.forEach(v => { v.muted = true; v.playsInline = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.loop = true; v.preload = 'none'; v.disablePictureInPicture = true; });
  let ready = false;
  const go = () => { ready = true; schedule(); };
  if (document.readyState === 'complete') setTimeout(go, 600); else addEventListener('load', () => (window.requestIdleCallback || setTimeout)(go, { timeout: 1500 }), { once: true });
  function schedule() {
    if (!ready) return;
    if (document.hidden) { vids.forEach(v => v.paused || v.pause()); return; }
    const top = [...seen].filter(([, r]) => r > .18).sort((a, b) => b[1] - a[1]).slice(0, MAX).map(x => x[0]);
    for (const v of vids) { if (top.includes(v) && !reduce && !saveData) { load(v); if (v.paused) v.play().catch(() => {}); } else if (!v.paused) v.pause(); }
  }
  const io = new IntersectionObserver(es => { es.forEach(e => seen.set(e.target, e.isIntersecting ? e.intersectionRatio : 0)); schedule(); }, { threshold: [0, .2, .4, .6, .8, 1] });
  vids.forEach(v => io.observe(v));
  document.addEventListener('visibilitychange', schedule);
  const hero = document.querySelector('.hero');
  if (hero && !reduce) {
    let t = false;
    const up = () => { t = false; const p = Math.min(1, Math.max(0, scrollY / hero.offsetHeight)); hero.style.setProperty('--p', p.toFixed(4)); };
    addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(up); } }, { passive: true });
  }
})();
