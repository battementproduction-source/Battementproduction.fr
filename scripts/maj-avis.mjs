// =====================================================================
// MISE À JOUR DES AVIS GOOGLE
// Lancé automatiquement chaque semaine par GitHub (.github/workflows/avis-google.yml).
// Google ne renvoie que 5 avis par appel. On fait donc 2 appels :
//   1. les 5 avis « les plus pertinents » (Places API New)
//   2. les 5 avis « les plus récents »   (Places API, ancienne version, seule à proposer ce tri)
// → environ 8 à 10 appels par mois, dans la partie gratuite de Google.
// Les avis déjà connus sont conservés dans assets/data/avis.json : la liste ne fait que s'enrichir.
// =====================================================================
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const KEY = process.env.GOOGLE_PLACES_KEY;
const PLACE_ID = 'ChIJv-06SXz_UicRYQ3QDlrcLRQ';
const FICHIER = 'assets/data/avis.json';

if (!KEY) { console.error('Clé manquante : ajoute le secret GOOGLE_PLACES_KEY dans GitHub.'); process.exit(1); }

// --- Appel 1 : avis les plus pertinents (API New) ---
const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=fr`, {
  headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews' },
});
const d = await res.json();
if (!res.ok) { console.error('Google a refusé la demande :', d.error?.status, d.error?.message); process.exit(1); }
const pertinents = (d.reviews || []).filter(r => r.text?.text).map(r => ({
  nom: r.authorAttribution?.displayName || 'Client',
  photo: r.authorAttribution?.photoUri || '',
  note: r.rating || 5,
  texte: r.text.text,
  date: r.relativePublishTimeDescription || '',
  publie: r.publishTime || '',
}));

// --- Appel 2 : avis les plus récents (ancienne API, facultatif) ---
let recents = [];
try {
  const r2 = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&reviews_sort=newest&reviews_no_translations=true&language=fr&key=${KEY}`);
  const d2 = await r2.json();
  if (d2.status === 'OK') {
    recents = (d2.result?.reviews || []).filter(r => r.text).map(r => ({
      nom: r.author_name || 'Client',
      photo: r.profile_photo_url || '',
      note: r.rating || 5,
      texte: r.text,
      date: r.relative_time_description || '',
      publie: r.time ? new Date(r.time * 1000).toISOString() : '',
    }));
  } else {
    console.warn('Avis récents indisponibles :', d2.status, d2.error_message || '');
  }
} catch (e) { console.warn('Avis récents indisponibles :', e.message); }

// --- Fusion avec les avis déjà enregistrés (un avis par auteur, le plus récent gagne) ---
let ancien = { avis: [] };
try { ancien = JSON.parse(readFileSync(FICHIER, 'utf8')); } catch {}
const parAuteur = new Map((ancien.avis || []).map(a => [a.nom, a]));
[...recents, ...pertinents].forEach(a => parAuteur.set(a.nom, a));
const avis = [...parAuteur.values()].sort((a, b) => (b.publie || '').localeCompare(a.publie || ''));

mkdirSync('assets/data', { recursive: true });
writeFileSync(FICHIER, JSON.stringify({ majLe: new Date().toISOString(), note: d.rating, total: d.userRatingCount, avis }, null, 2) + '\n');
console.log(`OK : note ${d.rating}, ${d.userRatingCount} avis sur Google, ${avis.length} avis avec texte enregistrés (${pertinents.length} pertinents + ${recents.length} récents).`);
