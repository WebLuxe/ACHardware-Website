/* AC HARDWARE site script. Shop details and products come from config.js (window.SITE). */
(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const html = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
  const ss = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch {} }, del(k) { try { sessionStorage.removeItem(k); } catch {} } };
  const money = n => `${S.currency} ${n.toLocaleString('en')}`;
  const byId = Object.fromEntries(S.products.map(p => [p[0], p]));
  const cat = Object.fromEntries(S.categories.map((c, i) => [c[0], { name: c[1], img: c[2], line: c[3], no: String(i + 1).padStart(2, '0') }]));

  const I = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 7h3l2 11h9l2-8H8"/><circle cx="10" cy="21" r="1"/><circle cx="17" cy="21" r="1"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.1-2.8V9.1a6.3 6.3 0 1 0 5.5 6.3V8.6a8 8 0 0 0 4.4 1.3V6.5a4.5 4.5 0 0 1-4.4-4.5Z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z"/></svg>'
  };

  /* ---------- header / menu / footer ---------- */
  const page = html.dataset.page;
  const links = [['index.html', 'Home', 'home'], ['shop.html', 'Shop tools', 'shop'], ['visit.html', 'Visit us', 'visit']];
  const logo = `<a class="logo" href="index.html" aria-label="${S.name} home"><span class="badge" aria-hidden="true"></span><span><b>${S.name}</b><small>${S.slogan}</small></span></a>`;
  $('#bar').innerHTML = `<div class="wrap"><span><span class="hide-xs">Authorised </span>${S.brand} tools dealer<span class="hide-s"> · Trade & DIY</span></span><span>Call <a href="tel:${S.phoneIntl}">${S.phone}</a></span></div>`;
  $('#top').innerHTML = `<div class="wrap">${logo}
    <form class="hsearch" action="shop.html" role="search"><input name="q" placeholder="Search tools..." aria-label="Search tools" autocomplete="off"><button aria-label="Search">${I.search}</button></form>
    <nav class="nav" aria-label="Main">${links.map(([h, t, k]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
    <button class="listbtn" type="button" aria-haspopup="dialog">${I.list}<span class="t">My list</span><span class="n">0</span></button>
    <button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button></div>`;
  $('#mnav').innerHTML = links.map(([h, t], i) => `<a class="big" href="${h}"><span>0${i + 1}</span>${t}</a>`).join('') +
    `<div class="btns"><a class="btn y" href="tel:${S.phoneIntl}">${I.phone}Call ${S.phone}</a></div>`;
  const burger = $('.burger');
  burger.addEventListener('click', () => { const o = html.classList.toggle('menu-open'); burger.setAttribute('aria-expanded', o); });
  $('#foot').innerHTML = `<div class="wrap"><div class="foot">
      <div>${logo}<p>Power tools, hand tools, garden, plumbing and electrical. The ${S.brand} range, with advice from people who use the tools.</p></div>
      <div><p class="fh">Aisles</p>${S.categories.slice(0, 6).map(c => `<a href="shop.html?cat=${c[0]}">${c[1]}</a>`).join('')}</div>
      <div><p class="fh">Talk to us</p><a href="tel:${S.phoneIntl}">Call ${S.phone}</a>${S.whatsapp ? `<a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>` : ''}<a href="${S.tiktok}" target="_blank" rel="noopener">TikTok ${S.tiktokHandle}</a><a href="visit.html">Visit the shop</a></div>
    </div><div class="legal"><span>© ${new Date().getFullYear()} ${S.name}. All rights reserved.</span><span>${S.demoPrices ? 'Prices shown are examples. Call to confirm price and stock.' : 'Prices may change. Call to confirm stock.'}</span></div></div>`;

  $$('[data-s]').forEach(el => { const v = S[el.dataset.s]; if (v != null && v !== '') el.textContent = v; });
  $$('[data-tel]').forEach(a => a.href = 'tel:' + S.phoneIntl);
  $$('[data-tt]').forEach(a => { a.href = S.tiktok; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-i]').forEach(el => el.insertAdjacentHTML('afterbegin', I[el.dataset.i] || ''));
  $$('[data-demo]').forEach(el => { if (!S.demoPrices) el.remove(); });
  $$('[data-hours]').forEach(el => el.innerHTML = S.hours.length ? S.hours.map(([d, h]) => `<div><span>${d}</span><span>${h}</span></div>`).join('') : `<div><span>Opening hours</span><span>Call ${S.phone}</span></div>`);
  $$('[data-address]').forEach(el => el.textContent = S.address || `Call ${S.phone} for directions`);
  $$('[data-map]').forEach(box => { if (S.mapQuery) box.innerHTML = `<iframe title="Map" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(S.mapQuery)}&z=15&output=embed"></iframe>`; });
  $$('[data-count]').forEach(el => el.textContent = (S.stats[el.dataset.count] / 1000).toFixed(1).replace(/\.0$/, '') + 'K');

  /* ---------- aisles and product cards ---------- */
  $$('[data-aisles]').forEach(el => {
    el.innerHTML = S.categories.map(([k], i) => { const c = cat[k]; return `<a class="aisle rv${i % 4 ? ' d' + (i % 4) : ''}" href="shop.html?cat=${k}">
      <img src="${c.img}" alt="" loading="lazy" decoding="async"><span class="sign"><small>AISLE</small><b>${c.no}</b></span>
      <span class="txt"><h3>${c.name}</h3><span>${c.line}</span></span><span class="go">${I.arrow}</span></a>`; }).join('');
  });
  const card = p => `<article class="pc">
      <div class="pic"><img src="${p[3]}" alt="${p[1]}" loading="lazy" decoding="async"><span class="brand">${S.brand}</span>${p[6] ? `<span class="flag">${p[6]}</span>` : ''}</div>
      <div class="body"><h3>${p[1]}</h3><div class="spec">${p[5]}</div></div>
      <div class="shelf"><span class="price"><small>${S.currency}</small>${p[4].toLocaleString('en')}</span><button class="add" data-add="${p[0]}" type="button"></button></div>
    </article>`;
  $$('[data-products]').forEach(el => el.innerHTML = el.dataset.products.split(',').map(id => card(byId[id])).join(''));

  /* ---------- the list (kept in this browser only) ---------- */
  let list = store.get('ac-list', {});
  for (const k in list) if (!byId[k]) delete list[k];
  document.body.insertAdjacentHTML('beforeend', `<div class="scrim"></div>
    <div class="drawer" role="dialog" aria-modal="true" aria-label="My list">
      <header><h3>My list</h3><button class="x" aria-label="Close">×</button></header>
      <div class="items"></div>
      <div class="dfoot">
        <div class="total"><span>Estimated total</span><b>${S.currency} 0</b></div>
        ${S.demoPrices ? '<p class="note" style="margin:0">Example prices. The counter confirms price and stock when you call.</p>' : ''}
        <div class="btns"><a class="btn" href="tel:${S.phoneIntl}">${I.phone}Call to order</a>${S.whatsapp ? `<a class="btn" id="waList" target="_blank" rel="noopener">${I.wa}WhatsApp</a>` : ''}<button class="btn dark" id="shareList" type="button">Share list</button></div>
      </div>
    </div><div class="toast" role="status"></div>`);
  const toast = t => { const el = $('.toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 2000); };
  const listText = () => `Hello ${S.name}, I'd like these, please:\n` + Object.entries(list).map(([id, q]) => `• ${q} × ${byId[id][1]}`).join('\n') + '\n\nAre they in stock?';
  function renderList(bump) {
    const ids = Object.keys(list), n = ids.reduce((a, k) => a + list[k], 0);
    $$('.listbtn .n').forEach(el => { el.textContent = n; if (bump) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); } });
    $('.items').innerHTML = ids.length ? ids.map(id => { const p = byId[id]; return `<div class="item" data-id="${id}"><img src="${p[3]}" alt="" loading="lazy" decoding="async"><div><b>${p[1]}</b><small>${money(p[4])} each</small></div><div class="qty"><button data-q="-1" aria-label="One less">−</button><span>${list[id]}</span><button data-q="1" aria-label="One more">+</button></div></div>`; }).join('')
      : `<div class="empty"><b>Your list is empty</b><p>Tap “Add” on any tool. Then call the counter or share the list.</p><a class="btn dark" href="shop.html">Browse tools</a></div>`;
    $('.total b').textContent = money(ids.reduce((a, k) => a + byId[k][4] * list[k], 0));
    $$('.add[data-add]').forEach(b => { const on = !!list[b.dataset.add]; b.classList.toggle('on', on); b.innerHTML = (on ? I.check : I.plus) + `<span>${on ? 'Added' : 'Add'}</span>`; b.setAttribute('aria-label', (on ? 'In your list: ' : 'Add to list: ') + byId[b.dataset.add][1]); });
    const wa = $('#waList'); if (wa) wa.href = `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(listText())}`;
    $('#shareList').disabled = !ids.length;
    store.set('ac-list', list);
  }
  const openList = () => { html.classList.add('list-open'); setTimeout(() => $('.drawer .x').focus(), 50); };
  const closeList = () => html.classList.remove('list-open');
  document.addEventListener('click', e => {
    const a = e.target.closest('.add[data-add]');
    if (a) { const id = a.dataset.add; if (list[id]) { delete list[id]; renderList(); toast('Removed from your list'); } else { list[id] = 1; renderList(true); toast(`Added: ${byId[id][1]}`); } return; }
    if (e.target.closest('.listbtn')) return openList();
    if (e.target.closest('.scrim, .drawer .x')) return closeList();
    const q = e.target.closest('[data-q]');
    if (q) { const id = q.closest('.item').dataset.id; list[id] += +q.dataset.q; if (list[id] < 1) delete list[id]; renderList(); }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeList(); html.classList.remove('menu-open'); } });
  $('#shareList').addEventListener('click', async () => {
    if (navigator.share) { try { await navigator.share({ title: `My ${S.name} list`, text: listText() }); } catch {} }
    else { try { await navigator.clipboard.writeText(listText()); toast('List copied. Paste it in a message.'); } catch { toast('Could not copy'); } }
  });

  /* ---------- shop page ---------- */
  const grid = $('#grid');
  if (grid) {
    const params = new URLSearchParams(location.search);
    let c = cat[params.get('cat')] ? params.get('cat') : 'all', q = params.get('q') || '', sort = 'pop';
    const qIn = $('#q'), sortIn = $('#sort');
    qIn.value = q;
    $('.side').innerHTML = `<button data-cat="all" aria-pressed="false"><span class="all"></span>All tools<small>${S.products.length}</small></button>` +
      S.categories.map(([k]) => `<button data-cat="${k}" aria-pressed="false"><img src="${cat[k].img}" alt="" loading="lazy" decoding="async">${cat[k].name}<small>${S.products.filter(p => p[2] === k).length}</small></button>`).join('');
    $('.catchips').innerHTML = [['all', 'All']].concat(S.categories.map(x => [x[0], x[1]])).map(([k, t]) => `<button data-cat="${k}" aria-pressed="false">${t}</button>`).join('');
    const norm = s => s.toLowerCase().normalize('NFD').replace(/[^\w ]/g, '');
    function draw() {
      const words = norm(q).split(/\s+/).filter(Boolean);
      let items = S.products.filter(p => (c === 'all' || p[2] === c) && words.every(w => norm(`${p[1]} ${p[5]} ${cat[p[2]].name}`).includes(w)));
      if (sort === 'low') items.sort((a, b) => a[4] - b[4]); else if (sort === 'high') items.sort((a, b) => b[4] - a[4]);
      else items.sort((a, b) => (b[6] === 'Best seller') - (a[6] === 'Best seller'));
      grid.innerHTML = items.map(card).join('');
      $('#none').hidden = !!items.length;
      $('#count').textContent = `${items.length} tool${items.length === 1 ? '' : 's'}${q ? ` matching “${q}”` : ''}`;
      $('#ttl').textContent = c === 'all' ? 'All tools' : cat[c].name;
      $('#aisleNo').innerHTML = `<small>AISLE</small>${c === 'all' ? '01–08' : cat[c].no}`;
      $$('[data-cat]').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === c));
      renderList();
      const u = new URL(location); u.search = ''; if (c !== 'all') u.searchParams.set('cat', c); if (q) u.searchParams.set('q', q); history.replaceState(null, '', u);
    }
    document.addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) { c = b.dataset.cat; draw(); } });
    qIn.addEventListener('input', () => { q = qIn.value.trim(); draw(); });
    $('#searchForm').addEventListener('submit', e => { e.preventDefault(); qIn.blur(); });
    sortIn.addEventListener('change', () => { sort = sortIn.value; draw(); });
    draw();
  }
  renderList();

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' });
  const watch = () => $$('.rv').forEach(el => io.observe(el));

  /* ---------- intro: toolbox opens (home, once per visit) ---------- */
  const op = $('.opening');
  if (op && html.classList.contains('intro-on')) {
    let done = false;
    const finish = () => { if (done) return; done = true; ss.set('ac-intro', '1'); op.classList.add('open'); watch(); setTimeout(() => { html.classList.remove('intro-on'); op.remove(); }, 1000); };
    requestAnimationFrame(() => op.classList.add('play'));
    setTimeout(finish, 1700);
    op.addEventListener('click', finish);
    addEventListener('keydown', e => e.key === 'Escape' && finish(), { once: true });
  } else { op?.remove(); watch(); }

  /* ---------- page change: roller shutter ---------- */
  const tx = $('.tx'), plate = tx && $('.plate', tx);
  const setPlate = t => plate.innerHTML = `<small>${S.name}</small><b>${t}</b>`;
  if (tx && html.classList.contains('tx-wait')) {
    const n = ss.get('ac-tx'); ss.del('ac-tx'); if (n) setPlate(n);
    html.classList.remove('tx-wait'); tx.classList.add('arrive'); setTimeout(() => tx.classList.remove('arrive'), 900);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || !tx || reduce || e.ctrlKey || e.metaKey || e.shiftKey || a.target === '_blank') return;
    const href = a.getAttribute('href');
    if (!/^[\w-]+\.html(\?[\w=&%-]*)?(#[\w-]+)?$/.test(href)) return;
    const file = href.split(/[?#]/)[0], here = location.pathname.split('/').pop() || 'index.html';
    if (file === here && !href.includes('?')) { html.classList.remove('menu-open'); return; }
    e.preventDefault();
    const k = new URLSearchParams(href.split('?')[1] || '').get('cat');
    const label = k ? cat[k].name : ({ 'index.html': 'Home', 'shop.html': 'Shop tools', 'visit.html': 'Visit us' }[file] || S.name);
    ss.set('ac-tx', label); setPlate(label);
    tx.classList.add('go');
    setTimeout(() => location.href = href, 520);
  });
  addEventListener('pageshow', e => { if (e.persisted && tx) { tx.classList.remove('go', 'arrive'); html.classList.remove('menu-open'); } });
})();
