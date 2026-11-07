/* =====================================================================
   PAGE PROJET — construite à partir de PROJETS (v2.js) + DETAILS (projets-data.js)
===================================================================== */
(() => {
  const id = new URLSearchParams(location.search).get('id');
  const idx = PROJETS.findIndex(p => p.id === id);
  if (idx < 0) { location.replace('portfolio.html'); return; }
  const p = PROJETS[idx];
  const d = DETAILS[id] || { intro: '', role: [], media: [] };
  const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ytThumb = v => `https://i.ytimg.com/vi/${v}/hqdefault.jpg`;
  const host = u => { try { return new URL(u).hostname.replace('www.', ''); } catch (e) { return 'lien'; } };
  const isInsta = u => /instagram\.com/.test(u);

  document.title = `${p.title} — Battement Production`;

  /* --- En-tête --- */
  $('#pj-meta').innerHTML = (d.year ? `<span class="pj-year">${d.year}</span>` : '') +
    p.types.map(t => `<span class="tag" style="--c:${TYPES[t].c}"><i></i>${TYPES[t].label}</span>`).join('');
  $('#pj-title').textContent = p.title;
  $('#pj-client').textContent = p.client;
  $('#pj-intro').textContent = d.intro;
  $('#pj-role').innerHTML = d.role.map(r => `
    <div class="role-block"><b>${esc(r.title)}</b><ul>${r.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('');

  /* --- Vidéo principale --- */
  const main = $('#pj-main');
  function showMain(m, scroll) {
    $('#pj-main-title').textContent = m.title;
    if (m.t === 'video') {
      main.innerHTML = `<video src="${encodeURI(m.src)}" poster="${encodeURI(m.thumb || '')}" controls playsinline preload="metadata"></video>
        <button class="pj-bigplay" aria-label="Lire la vidéo">▶</button>`;
      const v = $('video', main), b = $('.pj-bigplay', main);
      b.addEventListener('click', () => { v.play(); });
      v.addEventListener('play', () => main.classList.add('playing'));
      if (scroll) { v.play().catch(() => {}); }
    } else if (m.t === 'yt') {
      main.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${m.id}?rel=0${scroll ? '&autoplay=1' : ''}" title="${esc(m.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    } else if (m.t === 'link') {
      main.innerHTML = `<a class="pj-ext" href="${esc(m.url)}" target="_blank" rel="noopener">
          ${m.thumb ? `<img src="${encodeURI(m.thumb)}" alt="">` : ''}
          <span class="pj-ext-cta">${isInsta(m.url) ? 'Voir sur Instagram' : 'Ouvrir ' + host(m.url)} ↗</span></a>`;
    } else if (m.t === 'image') {
      main.innerHTML = `<img class="pj-img" src="${encodeURI(m.src)}" alt="${esc(m.title)}">`;
    }
    $$('.pj-item').forEach(el => el.classList.toggle('current', el.dataset.i == d.media.indexOf(m)));
    if (scroll) main.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  if (d.media.length) showMain(d.media[0]);
  else main.innerHTML = `<img class="pj-img" src="${IMG + p.img}.jpg" alt="">`;

  /* --- Autres vidéos, en plus petit --- */
  const grid = $('#pj-grid');
  if (d.media.length > 1) {
    grid.innerHTML = d.media.map((m, i) => {
      const thumb = m.t === 'yt' ? ytThumb(m.id) : (m.thumb || m.src || '');
      const badge = m.t === 'video' || m.t === 'yt' ? '▶ Lire ici' : m.t === 'image' ? 'Agrandir' : (isInsta(m.url) ? 'Instagram ↗' : host(m.url) + ' ↗');
      return `<button class="pj-item ${i === 0 ? 'current' : ''}" data-i="${i}">
        <span class="pj-thumb">${thumb ? `<img src="${encodeURI(thumb)}" alt="" loading="lazy">` : `<span class="pj-noimg">${esc(host(m.url))}</span>`}
          <span class="pj-badge">${badge}</span><span class="pj-now">En lecture</span></span>
        <span class="pj-item-title">${esc(m.title)}</span>
      </button>`;
    }).join('');
    grid.addEventListener('click', e => {
      const b = e.target.closest('.pj-item'); if (!b) return;
      const m = d.media[+b.dataset.i];
      if (m.t === 'link') { window.open(m.url, '_blank', 'noopener'); return; }
      if (m.t === 'image') { openLightbox(m); return; }
      $$('video', main).forEach(v => v.pause());
      showMain(m, true);
    });
  } else {
    $('#pj-more-wrap').hidden = true;
  }

  /* --- Agrandissement d'un visuel --- */
  const lb = $('#lightbox');
  function openLightbox(m) { $('#lb-title').textContent = m.title; $('#lb-img').src = m.src; lb.classList.add('open'); }
  $('.player-close', lb).addEventListener('click', () => lb.classList.remove('open'));
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
  addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });

  /* --- Précédent / suivant --- */
  const prev = PROJETS[(idx - 1 + PROJETS.length) % PROJETS.length], next = PROJETS[(idx + 1) % PROJETS.length];
  $('#pj-nav').innerHTML = `
    <a href="projet.html?id=${prev.id}"><small>← Projet précédent</small><b>${esc(prev.title)}</b></a>
    <a href="projet.html?id=${next.id}" class="next"><small>Projet suivant →</small><b>${esc(next.title)}</b></a>`;

  /* --- Projets associés (types en commun) --- */
  const score = q => q.types.filter(t => p.types.includes(t)).length;
  const related = PROJETS.filter(q => q.id !== id).sort((a, b) => score(b) - score(a)).slice(0, 3);
  $('#pj-related').innerHTML = related.map(q => cardHTML(q)).join('');
  bindHoverVideo($('#pj-related'));
})();
