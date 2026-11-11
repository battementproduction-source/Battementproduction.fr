/* =====================================================================
   BATTEMENT PRODUCTION — V2 (maquette)
===================================================================== */

// ⚠️ MAQUETTE : les vidéos sont lues directement depuis le dossier du site actuel
const VID = 'assets/images/projects/';
const IMG = 'assets/img/projets/';

/* ---------- Types de projets (couleur = identité du type) ---------- */
const TYPES = {
  clip:       { label: 'Clip',             c: '#FF4D8D' },
  court:      { label: 'Court-métrage',    c: '#A78BFA' },
  scene:      { label: 'Vidéos de scène',  c: '#34D399' },
  captation:  { label: 'Captation',        c: '#F3CD44' },
  aftermovie: { label: 'Aftermovie',       c: '#FF8A3D' },
  promo:      { label: 'Teaser & promo',   c: '#FF5A4E' },
  social:     { label: 'Réseaux sociaux',  c: '#38BDF8' },
  coulisses:  { label: 'Making-of',        c: '#B8F05A' },
  da:         { label: 'Direction artistique', c: '#E879F9' },
  assist:     { label: 'Assistant tournage', c: '#94A3B8' },
};

/* ---------- Projets (à déplacer ensuite dans projects-data.json) ---------- */
const PROJETS = [
  // Ordre d'affichage (validé par Elias)
  { id: 'cetras', title: 'Cetras', client: 'Publicité produit · lunettes de luminothérapie', types: ['promo'], img: 'cetras', video: 'cetras/pub-cetras.mp4' },
  { id: 'pape-lourdes', title: 'La venue du Pape à Lourdes', client: 'Bernadette de Lourdes · France TV', types: ['scene', 'captation'], img: 'pape', video: 'pape-lourdes/intro.mp4' },
  { id: 'grands-discours', title: 'Aux Grands Maux les Grands Discours', client: 'Agents Doubles Productions France', types: ['promo', 'social'], img: 'grands-discours' },
  { id: 'festival-europe2', title: 'Festival Europe 2', client: 'Europe 2 · CSTAR', types: ['scene'], img: 'europe2', video: 'festival-europe2/INTRO-FINAL.mp4' },
  { id: 'viva-fuego', title: 'Viva Fuego Festival', client: 'Radio Fuego', types: ['scene', 'aftermovie'], img: 'viva-fuego-trailer', video: 'viva-fuego-festival/INTRO DU SHOW.mp4' },
  { id: 'pieces-jaunes', title: "Pièces Jaunes : Les P'tits Soleils", client: 'Opération Pièces Jaunes', types: ['coulisses'], img: 'pieces-jaunes', video: 'pieces-jaunes/PJ-makingof.mp4', v: true },
  { id: 'radio-fuego', title: 'Radio Fuego', client: 'Radio Fuego', types: ['da', 'social'], img: 'radio-fuego', video: 'radio-fuego/presentation.mp4' },
  { id: 'david-ban', title: 'David Bán Big Party', client: 'Tournée en Chine', types: ['scene', 'aftermovie'], img: 'david-ban' },
  { id: 'bernadette-lourdes', title: 'Bernadette de Lourdes Italie', client: 'Comédie musicale', types: ['coulisses', 'promo'], img: 'bernadette', video: 'bernadette-de-lourdes-IT/Making-of-Trailer(VostFR).mp4' },
  { id: 'pop-session-europe2', title: 'Pop Sessions', client: 'Europe 2 · CSTAR', types: ['captation'], img: 'pop-session', video: 'pop-session/Bestof-PopSession.mp4' },
  { id: 'Loop', title: 'Loop', client: "Court-métrage d'Elias Ban", types: ['court'], img: 'loop' },
  { id: 'les-mots-bleus', title: 'Les mots bleus', client: 'David Bán', types: ['clip'], img: 'mots-bleus' },
  { id: 'bonjour-ivresse', title: 'Bonjour Ivresse', client: 'Théâtre · diffusé sur M6', types: ['promo'], img: 'bonjour-ivresse', video: 'bonjour-ivresse/M6-matin.mp4' },
  { id: 'little-italy-festival', title: 'Little Italy Festival', client: 'Festival', types: ['promo'], img: 'little-italy', video: 'little-italy-festival/LIF teaser JVT.mp4' },
  { id: 'wereal', title: 'Restaurant Goguette', client: 'pour WeReal Production', types: ['assist'], img: 'wereal', v: true },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const enc = p => p.split('/').map(encodeURIComponent).join('/');

/* ---------- Carte projet (partagée accueil + portfolio) ---------- */
function cardHTML(p, cls = '') {
  const tags = p.types.map(t => `<span class="tag" style="--c:${TYPES[t].c}"><i></i>${TYPES[t].label}</span>`).join('');
  return `
  <a class="p-card ${cls}" href="projet.html?id=${p.id}" data-cursor ${p.video ? `data-video="${VID + enc(p.video)}"` : ''}>
    <img src="${IMG + p.img}.jpg" alt="${p.title}" loading="lazy" draggable="false">
    <div class="p-tags">${tags}</div>
    <span class="p-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
    <div class="p-info"><h3>${p.title}</h3><p>${p.client}</p></div>
  </a>`;
}

/* Lecture vidéo au survol (chargée seulement au premier survol) */
function bindHoverVideo(root = document) {
  $$('.p-card[data-video]', root).forEach(card => {
    let v;
    card.addEventListener('mouseenter', () => {
      if (!v) {
        v = document.createElement('video');
        Object.assign(v, { muted: true, loop: true, playsInline: true, preload: 'auto', src: card.dataset.video });
        card.insertBefore(v, card.children[1]);
      }
      v.currentTime = Math.max(v.currentTime, 0);
      v.play().then(() => card.classList.add('playing')).catch(() => {});
    });
    card.addEventListener('mouseleave', () => { if (v) { v.pause(); card.classList.remove('playing'); } });
  });
}

/* ---------- Navigation ---------- */
const nav = $('.nav');
addEventListener('scroll', () => nav && nav.classList.toggle('scrolled', scrollY > 30), { passive: true });
$('.nav-burger')?.addEventListener('click', () => document.body.classList.toggle('menu-open'));
$$('.mobile-menu a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

/* ---------- Apparitions ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
function observeReveal(root = document) { $$('[data-reveal]', root).forEach(el => io.observe(el)); }

/* ---------- Titre du hero : mots qui montent ---------- */
const title = $('.hero-title');
if (title) {
  let i = 0;
  $$('.split', title).forEach(node => {
    node.innerHTML = node.textContent.trim().split(/\s+/).map(w => `<span class="w" style="animation-delay:${.15 + i++ * .07}s">${w}</span>`).join(' ');
  });
  $$('.w-solo', title).forEach(el => { el.classList.add('w'); el.style.animationDelay = `${.15 + i++ * .07}s`; });
}

/* ---------- Vidéo de présentation : lecture automatique fiable (Safari iPhone compris) ---------- */
(() => {
  const v = $('#hero-video');
  if (!v) return;
  const bg = $('.hero-bg');                       // fond flouté (téléphone seulement)
  const mq = matchMedia('(max-width: 760px)');
  let userPaused = false;                         // vrai seulement si le visiteur a cliqué sur pause
  v.addEventListener('pause', () => { if (v.dataset.byUser) userPaused = true; delete v.dataset.byUser; });
  v.addEventListener('play', () => { userPaused = false; if (bg && mq.matches) bg.play().catch(() => {}); });
  v.addEventListener('pause', () => bg && bg.pause());
  const tryPlay = () => { if (!userPaused && v.paused) { v.muted = v.muted; v.play().catch(() => {}); } };
  const prep = el => { el.muted = true; el.defaultMuted = true; el.playsInline = true; el.setAttribute('muted', ''); };
  prep(v); if (bg) prep(bg);
  const pick = () => {
    const src = (mq.matches && v.dataset.mobile) || v.dataset.pc; // même vidéo horizontale partout (data-mobile facultatif)
    if (v.getAttribute('src') !== src) { v.setAttribute('src', src); v.load(); }
    if (bg) {
      if (mq.matches && !bg.getAttribute('src')) { bg.setAttribute('src', bg.dataset.mobile); bg.load(); }
      if (!mq.matches) bg.pause();
    }
    tryPlay();
  };
  pick();
  mq.addEventListener('change', pick);
  // Safari peut refuser le premier démarrage : on réessaie dès que la vidéo est prête…
  ['loadeddata', 'canplay'].forEach(ev => v.addEventListener(ev, tryPlay));
  // …et au premier geste du visiteur (toucher, défilement), si elle est encore à l'arrêt
  const kick = () => { tryPlay(); if (!v.paused) ['touchstart', 'scroll', 'click'].forEach(ev => removeEventListener(ev, kick)); };
  ['touchstart', 'scroll', 'click'].forEach(ev => addEventListener(ev, kick, { passive: true }));
  // fond flouté calé sur la vidéo principale
  if (bg) v.addEventListener('timeupdate', () => { if (mq.matches && Math.abs(bg.currentTime - v.currentTime) > .3) bg.currentTime = v.currentTime; });
})();

/* ---------- Mini vidéo dans le titre : démarrage fiable sur iPhone ---------- */
(() => {
  const c = $('.chip-video video');
  if (!c) return;
  c.muted = true; c.defaultMuted = true; c.playsInline = true;
  const go = () => { if (c.paused) c.play().catch(() => {}); };
  go();
  ['loadeddata', 'canplay'].forEach(ev => c.addEventListener(ev, go));
  const kick = () => { go(); if (!c.paused) ['touchstart', 'scroll', 'click'].forEach(ev => removeEventListener(ev, kick)); };
  ['touchstart', 'scroll', 'click'].forEach(ev => addEventListener(ev, kick, { passive: true }));
})();

/* ---------- Pilules du hero : chacune change de métier à tour de rôle ---------- */
(() => {
  const pills = $$('.hero-stage .float-tag');
  if (!pills.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Liste des métiers affichés dans les pilules (indépendante du portfolio)
  const METIERS = [
    ['Clip', '#FF4D8D'], ['Captation', '#F3CD44'], ['Réseaux sociaux', '#38BDF8'],
    ['Court-métrage', '#A78BFA'], ['Aftermovie', '#FF8A3D'], ['Vidéos de scène', '#34D399'],
    ['Teaser & promo', '#FF5A4E'], ['Making-of', '#B8F05A'], ['Direction artistique', '#E879F9'],
    ['Réalisation', '#2DD4BF'],
  ];
  const shown = pills.map(p => p.textContent.replace('●', '').trim());
  let next = 0;
  const swap = k => {
    const p = pills[k];
    let m; do { m = METIERS[next++ % METIERS.length]; } while (shown.includes(m[0]));
    p.classList.add('swap');
    setTimeout(() => {
      shown[k] = m[0];
      p.textContent = '● ' + m[0];
      p.style.setProperty('--c', m[1]);
      p.classList.remove('swap');
    }, 350);
  };
  let k = 0;
  setInterval(() => { if (!document.hidden) { swap(k); k = (k + 1) % pills.length; } }, 1800); // une pilule à la fois
})();

/* ---------- Cadre vidéo du hero : zoom au scroll + tags en parallaxe ---------- */
const frame = $('.hero-frame');
const tags = $$('.float-tag');
function onScrollHero() {
  if (!frame) return;
  const r = frame.getBoundingClientRect();
  const p = Math.min(Math.max(1 - r.top / innerHeight, 0), 1);
  frame.style.setProperty('--s', (0.88 + p * 0.12).toFixed(3));
  tags.forEach((t, k) => t.style.setProperty('--py', `${-(p * (40 + k * 25)).toFixed(1)}px`));
}
if (!reduce) { addEventListener('scroll', onScrollHero, { passive: true }); onScrollHero(); }

/* Timecode qui défile */
const tc = $('#timecode');
if (tc) {
  const t0 = performance.now();
  const pad = n => String(n).padStart(2, '0');
  setInterval(() => {
    const s = (performance.now() - t0) / 1000;
    const fmt = x => `${pad(Math.floor(x / 3600))}:${pad(Math.floor(x / 60) % 60)}:${pad(Math.floor(x) % 60)}:${pad(Math.floor((x % 1) * 25))}`;
    tc.textContent = fmt(s);
    const tc2 = $('#tc2'); if (tc2) tc2.textContent = fmt(s + 763); // timecode du viseur (méthode)
  }, 40);
}

/* ---------- Marquee : duplique le contenu pour une boucle continue ---------- */
$$('.marquee-track').forEach(t => { t.innerHTML += t.innerHTML; });

/* ---------- Carrousel projets (accueil) ---------- */
const track = $('#track');
if (track) {
  const pick = PROJETS.slice(0, 8).map(p => p.id);
  track.innerHTML = pick.map(id => PROJETS.find(p => p.id === id)).map(p => cardHTML(p, p.v ? 'v' : 'h')).join('') +
    `<a class="p-card more" href="portfolio.html"><h3>Tous nos <em>projets</em></h3><span class="btn btn-gold btn-sm">Voir le portfolio <span class="arr">→</span></span></a>`;
  bindHoverVideo(track);

  // glisser à la souris
  let down = false, sx = 0, sl = 0, moved = 0;
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; sx = e.clientX; sl = track.scrollLeft; });
  addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - sx; moved = Math.abs(dx);
    if (moved > 6) track.classList.add('dragging');
    track.scrollLeft = sl - dx;
  });
  addEventListener('pointerup', () => { down = false; setTimeout(() => track.classList.remove('dragging'), 0); });
  const step = () => Math.min(track.clientWidth * .7, 700);
  $('#prev')?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('#next')?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}

/* ---------- Curseur "Voir" ---------- */
const cursor = $('.cursor');
if (cursor && matchMedia('(hover: hover)').matches) {
  let cx = -200, cy = -200;
  const check = () => { const el = document.elementFromPoint(cx, cy); cursor.classList.toggle('on', !!(el && el.closest('[data-cursor]'))); };
  addEventListener('pointermove', e => {
    cx = e.clientX; cy = e.clientY;
    cursor.style.setProperty('--x', cx + 'px');
    cursor.style.setProperty('--y', cy + 'px');
    check();
  }, { passive: true });
  addEventListener('scroll', check, { passive: true });
  document.addEventListener('mouseleave', () => cursor.classList.remove('on'));
}

/* =====================================================================
   DEVIS À LA CARTE
===================================================================== */
// Images du devis : photos libres de droits (Unsplash), pas nos créations — dossier assets/img/devis/
const DEVIS_IMG = 'assets/img/devis/';
const DEVIS_TYPES = [
  { id: 'clip',   label: 'Clip musical',            sub: 'Réalisation, tournage, montage',      img: 'clip',   acc: '#FF4D8D', acc2: '#8B5CF6' },
  { id: 'court',  label: 'Court-métrage',           sub: 'Fiction, de l’écriture au final cut', img: 'court',  acc: '#A78BFA', acc2: '#38BDF8' },
  { id: 'event',  label: 'Captation & aftermovie',  sub: 'Concerts, festivals, spectacles',     img: 'event',  acc: '#F3CD44', acc2: '#FF8A3D' },
  { id: 'promo',  label: 'Film promo & teaser',     sub: 'Marque, spectacle, lancement',        img: 'promo',  acc: '#FF5A4E', acc2: '#F3CD44' },
  { id: 'social', label: 'Contenus réseaux',        sub: 'Reels, TikTok, formats courts',       img: 'social', acc: '#38BDF8', acc2: '#34D399' },
  { id: 'scene',  label: 'Vidéos de scène',         sub: 'Écrans live, intros de show, motion', img: 'scene',  acc: '#34D399', acc2: '#F3CD44' },
];
const OPTIONS = ['Déclinaisons Reels 9:16', 'Format carré 1:1', 'Sous-titres', 'Musique sous licence', 'Livraison express'];
const DUREES = ['< 1 min', '1 – 3 min', '3 – 10 min', '10 min +'];
const EFFETS = ['Aucun', 'Motion 2D', 'Effets 3D', '2D + 3D'];
const NB_MAX = 20; // au-delà : « 20+ »
const NEUTRE = { acc: '#F3CD44', acc2: '#D8AD48' }; // couleurs tant que rien n'est choisi

const devis = $('#devis');
if (devis) {
  const state = { type: null, nb: 1, duree: null, jours: 1, fx: null, opts: new Set() };
  const nbTxt = () => state.nb >= NB_MAX ? `${NB_MAX}+ vidéos` : `${state.nb} vidéo${state.nb > 1 ? 's' : ''}`;
  const typesEl = $('#types'), dureeEl = $('#duree'), optsEl = $('#opts'), fxEl = $('#fx');

  typesEl.innerHTML = DEVIS_TYPES.map(t => `
    <button class="type" data-id="${t.id}" style="--c:${t.acc}">
      <div class="thumb"><img src="${DEVIS_IMG + t.img}.jpg" alt=""></div>
      <span class="radio"></span>
      <b>${t.label}</b><small>${t.sub}</small>
    </button>`).join('');
  dureeEl.innerHTML = DUREES.map(d => `<button>${d}</button>`).join('');
  fxEl.innerHTML = EFFETS.map(d => `<button>${d}</button>`).join('');
  optsEl.innerHTML = OPTIONS.map(o => `<button>${o}</button>`).join('');

  const sumImgs = $('#sum-media');
  const placeholder = $('.sum-placeholder', sumImgs);
  let currentImg = null;

  function render() {
    const t = DEVIS_TYPES.find(x => x.id === state.type);
    const c = t || NEUTRE;
    devis.style.setProperty('--acc', c.acc);
    devis.style.setProperty('--acc2', c.acc2);
    $$('.type', typesEl).forEach(b => b.classList.toggle('on', b.dataset.id === state.type));
    $$('button', dureeEl).forEach(b => b.classList.toggle('on', b.textContent === state.duree));
    $$('button', fxEl).forEach(b => b.classList.toggle('on', b.textContent === state.fx));
    $$('button', optsEl).forEach(b => b.classList.toggle('on', state.opts.has(b.textContent)));
    $('#nb').textContent = state.nb >= NB_MAX ? NB_MAX + '+' : state.nb;
    $('#nb-note').textContent = state.nb >= NB_MAX ? `${NB_MAX} vidéos ou plus.` : `${state.nb} vidéo${state.nb > 1 ? 's' : ''} à livrer.`;
    $('#jours').textContent = state.jours === 0 ? 'Aucun' : state.jours;
    $('#jours-note').textContent = state.jours === 0 ? 'Images déjà tournées : post-production seule.' : `${state.jours} jour${state.jours > 1 ? 's' : ''} avec l’équipe sur place.`;

    // Visuel du récap : neutre au départ, puis l'exemple du type choisi (fondu enchaîné)
    placeholder.classList.toggle('out', !!t);
    if (t) {
      const src = DEVIS_IMG + t.img + '.jpg';
      if (!currentImg || !currentImg.src.endsWith(src)) {
        const n = new Image(); n.src = src; n.alt = ''; n.className = 'sum-img out';
        sumImgs.insertBefore(n, $('#sum-tag'));
        void n.offsetWidth; // applique l'état de départ avant le fondu
        n.classList.remove('out');
        if (currentImg) { const old = currentImg; old.classList.add('out'); setTimeout(() => old.remove(), 900); }
        currentImg = n;
      }
    }
    $('#sum-tag').hidden = !t;
    $('#sum-tag').innerHTML = `<i style="--c:${c.acc}"></i>Exemple de rendu`;
    $('#sum-title').textContent = t ? t.label : 'Votre projet vidéo';
    $('#sum-list').innerHTML = `
      <li><span>Type</span><span>${t ? t.label : '—'}</span></li>
      <li><span>Vidéos</span><span>${nbTxt()}</span></li>
      <li><span>Durée par vidéo</span><span>${state.duree || '—'}</span></li>
      <li><span>Tournage</span><span>${state.jours === 0 ? 'Post-prod seule' : state.jours + ' jour' + (state.jours > 1 ? 's' : '')}</span></li>
      <li><span>Effets</span><span>${state.fx || '—'}</span></li>
      <li><span>Options</span><span>${state.opts.size ? [...state.opts].join(', ') : '—'}</span></li>`;
    const done = [!!t, !!t, !!state.duree, !!t, !!state.fx, state.opts.size > 0];
    $$('.progress i').forEach((i, k) => i.classList.toggle('on', done[k]));
    $$('.cfg-step').forEach((s, k) => s.classList.toggle('done', !!done[k]));
    $('#sum-steps').textContent = `${done.filter(Boolean).length} sur 6`;
  }

  fxEl.addEventListener('click', e => { if (e.target.matches('button')) { state.fx = e.target.textContent; render(); } });
  typesEl.addEventListener('click', e => { const b = e.target.closest('.type'); if (b) { state.type = b.dataset.id; render(); } });
  dureeEl.addEventListener('click', e => { if (e.target.matches('button')) { state.duree = e.target.textContent; render(); } });
  optsEl.addEventListener('click', e => { if (e.target.matches('button')) { const o = e.target.textContent; state.opts.has(o) ? state.opts.delete(o) : state.opts.add(o); render(); } });
  $('#nb-minus').addEventListener('click', () => { state.nb = Math.max(1, state.nb - 1); render(); });
  $('#nb-plus').addEventListener('click', () => { state.nb = Math.min(NB_MAX, state.nb + 1); render(); });
  $('#minus').addEventListener('click', () => { state.jours = Math.max(0, state.jours - 1); render(); });
  $('#plus').addEventListener('click', () => { state.jours = Math.min(10, state.jours + 1); render(); });

  // Barre collante sur téléphone : visible pendant qu'on remplit le configurateur
  const bar = $('#devis-bar');
  const origRender = render;
  render = () => { origRender(); const t = DEVIS_TYPES.find(x => x.id === state.type); $('#bar-label').textContent = t ? t.label : 'Choisissez un type'; };
  const panel = $('.cfg-panel'), summary = $('.summary');
  const updBar = () => {
    const p = panel.getBoundingClientRect(), s = summary.getBoundingClientRect();
    bar.classList.toggle('show', p.top < innerHeight * .6 && p.bottom > 0 && s.top > innerHeight * .75);
  };
  addEventListener('scroll', updBar, { passive: true });
  bar.querySelector('a').addEventListener('click', e => { e.preventDefault(); summary.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  render();

  // Modale de demande + envoi par EmailJS
  const modal = $('#modal'), form = $('#devis-form'), msg = $('#form-msg'), send = $('#devis-send');
  const open = () => { modal.classList.add('open'); setTimeout(() => $('input', form).focus(), 300); };
  const close = () => modal.classList.remove('open');
  $('#ask').addEventListener('click', open);
  $$('[data-close]', modal).forEach(b => b.addEventListener('click', close));
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  const say = (txt, kind) => { msg.textContent = txt; msg.className = 'form-msg ' + (kind || ''); };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    if (!f.prenom.trim() || !f.nom.trim()) return say('Merci d’indiquer votre prénom et votre nom.', 'err');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim())) return say('Merci d’indiquer une adresse email valide.', 'err');
    const t = DEVIS_TYPES.find(x => x.id === state.type);
    const recap = [
      'DEMANDE DE DEVIS — site Battement Production',
      '',
      `Type de projet : ${t ? t.label : 'non précisé'}`,
      `Nombre de vidéos : ${nbTxt()}`,
      `Durée de chaque vidéo : ${state.duree || 'non précisée'}`,
      `Tournage : ${state.jours === 0 ? 'aucun (post-production seule)' : state.jours + ' jour(s)'}`,
      `Effets visuels : ${state.fx || 'non précisé'}`,
      `Options : ${state.opts.size ? [...state.opts].join(', ') : 'aucune'}`,
      '',
      'Message du client :',
      f.projet.trim() || '(aucun message)',
    ].join('\n');
    const cfg = window.BATTEMENT_EMAILJS;
    if (!window.emailjs || !cfg) return say('L’envoi est indisponible pour le moment. Écrivez-nous à battementproduction@gmail.com.', 'err');
    send.disabled = true; say('Envoi en cours…');
    try {
      await emailjs.send(cfg.service, cfg.template, {
        nom: f.nom.trim(), prenom: f.prenom.trim(), email: f.email.trim(),
        telephone: f.telephone.trim() || 'non renseigné', societe: f.societe.trim() || '-', message: recap,
      }, { publicKey: cfg.publicKey });
      say('Merci ! Votre demande est bien partie. On vous répond sous 24 h ouvrées.', 'ok');
      form.reset();
      setTimeout(close, 3500);
    } catch (err) {
      say('Oups, l’envoi a échoué. Écrivez-nous directement à battementproduction@gmail.com.', 'err');
    } finally { send.disabled = false; }
  });
}

/* =====================================================================
   PAGE PORTFOLIO — filtres + recherche
===================================================================== */
const grid = $('#pf-grid');
if (grid) {
  const chips = $('#f-chips');
  const counts = {};
  PROJETS.forEach(p => p.types.forEach(t => counts[t] = (counts[t] || 0) + 1));
  chips.innerHTML = `<button class="f-chip on" data-t="all">Tout <sup>${PROJETS.length}</sup></button>` +
    Object.entries(TYPES).filter(([k]) => counts[k]).map(([k, t]) => `<button class="f-chip" data-t="${k}" style="--c:${t.c}"><i></i>${t.label} <sup>${counts[k]}</sup></button>`).join('');
  let filter = 'all', q = '';
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  function draw() {
    const list = PROJETS.filter(p => (filter === 'all' || p.types.includes(filter)) &&
      (!q || norm(p.title + ' ' + p.client + ' ' + p.types.map(t => TYPES[t].label).join(' ')).includes(norm(q))));
    $('#pf-count').textContent = `${list.length} projet${list.length > 1 ? 's' : ''} affiché${list.length > 1 ? 's' : ''}`;
    // Carte "Votre projet" en fin de grille : elle comble la dernière ligne, donc jamais de trou
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const free = cols - (list.length % cols);
    const cta = `<a class="p-card cta-card" href="index.html#devis" style="grid-column: span ${free}">
        <span class="eyebrow">Votre tour</span>
        <h3>Un projet <em>en tête ?</em></h3>
        <span class="btn btn-gold btn-sm">Construire mon devis <span class="arr">→</span></span>
      </a>`;
    grid.innerHTML = list.length
      ? list.map((p, i) => cardHTML(p).replace('class="p-card', `style="animation-delay:${i * 40}ms" class="p-card`)).join('') + cta
      : '<p class="pf-empty">Aucun projet ne correspond. Essayez un autre mot-clé.</p>';
    bindHoverVideo(grid);
  }
  let lastCols = 0;
  addEventListener('resize', () => {
    const c = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    if (c !== lastCols) { lastCols = c; draw(); }
  });
  chips.addEventListener('click', e => {
    const b = e.target.closest('.f-chip'); if (!b) return;
    filter = b.dataset.t; $$('.f-chip', chips).forEach(c => c.classList.toggle('on', c === b)); draw();
  });
  $('#q').addEventListener('input', e => { q = e.target.value.trim(); draw(); });
  draw();

  // vidéos du bandeau : lecture seulement quand visibles
  const vio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()), { threshold: .2 });
  $$('.mosaic video, .sig video').forEach(v => vio.observe(v));
}

observeReveal();

/* ---------- Illustrations de la méthode : dessinées à 560 px, mises à l'échelle de la carte ---------- */
$$('.viz').forEach(v => {
  const stage = document.createElement('div');
  stage.className = 'viz-stage';
  while (v.firstChild) stage.appendChild(v.firstChild);
  v.appendChild(stage);
  new ResizeObserver(([e]) => { stage.style.transform = `scale(${e.contentRect.width / 560})`; }).observe(v);
});

/* ---------- Vidéos signatures : lecteur plein écran avec le son ---------- */
const player = $('#player');
if (player) {
  const pv = $('#player-video');
  const close = () => { player.classList.remove('open'); pv.pause(); pv.removeAttribute('src'); pv.load(); };
  $$('.sig[data-full]').forEach(b => b.addEventListener('click', () => {
    $('#player-title').textContent = b.dataset.title;
    $('#player-insta').href = b.dataset.insta;
    pv.src = b.dataset.full;
    player.classList.add('open');
    pv.play().catch(() => {});
  }));
  $('.player-close').addEventListener('click', close);
  player.addEventListener('click', e => { if (e.target === player) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && player.classList.contains('open')) close(); });
}

/* ---------- Vidéo de présentation : son + pause ---------- */
const soundBtn = $('#sound-btn'), pauseBtn = $('#pause-btn'), heroVid = $('#hero-video');
if (soundBtn && heroVid) {
  soundBtn.addEventListener('click', () => {
    heroVid.muted = !heroVid.muted;
    if (!heroVid.muted) { heroVid.currentTime = 0; heroVid.volume = 1; heroVid.play().catch(() => {}); }
    soundBtn.classList.toggle('on', !heroVid.muted);
    $('.lbl', soundBtn).textContent = heroVid.muted ? 'Activer le son' : 'Couper le son';
    syncPause();
  });
  const syncPause = () => { pauseBtn.classList.toggle('paused', heroVid.paused); pauseBtn.setAttribute('aria-label', heroVid.paused ? 'Lecture' : 'Mettre en pause'); };
  pauseBtn.addEventListener('click', () => { if (heroVid.paused) heroVid.play().catch(() => {}); else { heroVid.dataset.byUser = '1'; heroVid.pause(); } });
  heroVid.addEventListener('play', syncPause); heroVid.addEventListener('pause', syncPause);
}

/* =====================================================================
   AVIS CLIENTS — cartes façon Ere (3 par 3, celle du milieu mise en avant)
   Les avis viennent de assets/data/avis.json, mis à jour chaque semaine par GitHub
   (scripts/maj-avis.mjs). Le site n'appelle jamais Google directement : aucune clé dans le code.
   Secours : window.BATTEMENT_AVIS dans assets/js/config.js (avis recopiés à la main).
===================================================================== */
const GOOGLE_PLACE_ID = 'ChIJv-06SXz_UicRYQ3QDlrcLRQ';
async function initAvis() {
  const box = $('#t-cards');
  if (!box) return;
  const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
  let list = [], page = 0;
  const pages = () => Math.ceil(list.length / 3);

  const card = (r, featured) => `
    <article class="t-card ${featured ? 'featured' : ''}">
      <div class="t-stars">${stars(r.note || 5)}</div>
      <p class="t-quote">${esc(r.texte)}</p>
      <div class="t-author">
        ${r.photo ? `<img src="${esc(r.photo)}" alt="" referrerpolicy="no-referrer">` : `<span class="avatar">${esc((r.nom || '?').trim()[0])}</span>`}
        <div><b>${esc(r.nom)}</b><small>Avis Google${r.date ? ' · ' + esc(r.date) : ''}</small></div>
      </div>
    </article>`;

  function draw() {
    if (!list.length) {
      box.innerHTML = `<article class="t-card featured t-empty">
        <div class="t-stars">★★★★★</div>
        <p class="t-quote">Vous avez travaillé avec nous ? Votre avis aide d'autres porteurs de projet à nous faire confiance.</p>
        <a class="btn btn-sm t-empty-btn" href="https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}" target="_blank" rel="noopener">Laisser un avis Google <span class="arr">→</span></a>
      </article>`;
      return;
    }
    const n = Math.min(3, list.length);
    const shown = Array.from({ length: n }, (_, k) => list[(page * 3 + k) % list.length]);
    box.innerHTML = shown.map((r, k) => card(r, n === 3 ? k === 1 : k === 0)).join('');
    $('#t-nav').hidden = list.length <= 3;
  }
  $('#t-prev')?.addEventListener('click', () => { page = (page - 1 + pages()) % pages(); draw(); });
  $('#t-next')?.addEventListener('click', () => { page = (page + 1) % pages(); draw(); });

  try {
    const d = await fetch('assets/data/avis.json', { cache: 'no-cache' }).then(r => r.json());
    if (d.note) {
      $('#g-score').textContent = `${String(Number(d.note).toFixed(1)).replace('.', ',')} / 5`;
      $('#g-stars').textContent = stars(d.note);
      $('#g-count').textContent = `${d.total} avis Google`;
    }
    list = d.avis || [];
  } catch (e) {}
  if (!list.length && Array.isArray(window.BATTEMENT_AVIS)) list = window.BATTEMENT_AVIS;
  draw();
}
initAvis();

/* =====================================================================
   PRISE DE RDV — notre calendrier, avec les VRAIES disponibilités Cal.com
   - les créneaux libres viennent de Cal.com (publics, aucune clé nécessaire)
   - « Confirmer » ouvre la réservation Cal.com avec le créneau déjà choisi
   Réglage : window.BATTEMENT_CAL dans assets/js/config.js (ex. 'elias-ban-edgxhz/30min')
===================================================================== */
(function initRdv() {
  const grid = $('#cal-grid');
  if (!grid) return;
  const link = (window.BATTEMENT_CAL || '').trim();
  const [user, slug] = link.split('/');
  const TZ = 'Europe/Paris';
  const slotsBox = $('#cal-slots'), monthLbl = $('#cal-month'), confirm = $('#cal-confirm');
  const pad = n => String(n).padStart(2, '0');
  const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  let slots = {}, selDay = null, selSlot = null;

  // Popup de réservation Cal.com (script officiel, chargé une seule fois)
  function loadCal() {
    if (window.Cal) return;
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, 'https://app.cal.com/embed/embed.js', 'init');
    Cal('init', 'rdv', { origin: 'https://cal.com' });
    Cal.ns.rdv('ui', { theme: 'dark', cssVarsPerTheme: { dark: { 'cal-brand': '#F3CD44', 'cal-brand-text': '#120d05' } } });
  }

  async function fetchMonth() {
    if (!link) return {};
    const first = new Date(view), last = new Date(view.getFullYear(), view.getMonth() + 1, 0);
    const start = ymd(first < today ? today : first), end = ymd(last);
    try {
      const r = await fetch(`https://api.cal.com/v2/slots?username=${encodeURIComponent(user)}&eventTypeSlug=${encodeURIComponent(slug)}&start=${start}&end=${end}&timeZone=${TZ}`, { headers: { 'cal-api-version': '2024-09-04' } });
      const d = await r.json();
      return d.data || {};
    } catch (e) { return {}; }
  }

  function drawSlots() {
    selSlot = null; confirm.classList.add('disabled');
    if (!selDay) { slotsBox.innerHTML = `<p>Choisissez un jour</p>`; return; }
    const label = new Date(selDay + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const list = (slots[selDay] || []).map(s => s.start);
    slotsBox.innerHTML = `<p>${label}</p><div class="slot-list">` +
      list.map(iso => `<button class="slot" data-iso="${iso}">${new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: TZ })}</button>`).join('') + '</div>';
  }

  async function drawMonth() {
    monthLbl.textContent = view.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    grid.classList.add('loading');
    slots = await fetchMonth();
    grid.classList.remove('loading');
    const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const offset = (view.getDay() + 6) % 7;
    let html = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => `<span class="dow">${d}</span>`).join('') + '<span></span>'.repeat(offset);
    for (let d = 1; d <= days; d++) {
      const key = ymd(new Date(view.getFullYear(), view.getMonth(), d));
      const av = !!(slots[key] && slots[key].length);
      html += `<button class="${av ? 'av' : ''}" data-d="${key}" ${av ? '' : 'disabled'}>${d}</button>`;
    }
    grid.innerHTML = html;
    const firstAv = Object.keys(slots).sort()[0];
    selDay = firstAv || null;
    if (selDay) $(`button[data-d="${selDay}"]`, grid)?.classList.add('sel');
    drawSlots();
    $('#cal-prev').disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
  }

  grid.addEventListener('click', e => {
    const b = e.target.closest('button.av'); if (!b) return;
    $$('button', grid).forEach(x => x.classList.remove('sel')); b.classList.add('sel');
    selDay = b.dataset.d; drawSlots();
  });
  slotsBox.addEventListener('click', e => {
    const b = e.target.closest('.slot'); if (!b) return;
    $$('.slot', slotsBox).forEach(x => x.classList.remove('sel')); b.classList.add('sel');
    selSlot = b.dataset.iso; confirm.classList.remove('disabled');
    loadCal();
  });
  confirm.addEventListener('click', e => {
    e.preventDefault();
    if (!link) return;
    const q = selSlot ? `?date=${selDay}&month=${selDay.slice(0, 7)}&slot=${encodeURIComponent(new Date(selSlot).toISOString())}` : '';
    loadCal();
    try { Cal.ns.rdv('modal', { calLink: link + q, config: { theme: 'dark', layout: 'month_view' } }); }
    catch (err) { window.open(`https://cal.com/${link}${q}`, '_blank', 'noopener'); }
  });
  $('#cal-prev').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); drawMonth(); });
  $('#cal-next').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); drawMonth(); });
  drawMonth();
})();
