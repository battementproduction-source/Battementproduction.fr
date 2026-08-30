/* =====================================================================
   BATTEMENT PRODUCTION — MAIN.JS
===================================================================== */
/* ---------------------------------------------------------------------
   0. MENU BURGER MOBILE
--------------------------------------------------------------------- */
(function mobileNav() {
  const burger = document.querySelector('.toolbar-burger');
  const nav = document.querySelector('.mobile-nav');
  if (!burger || !nav) return;

  function closeNav() {
    burger.classList.remove('is-active');
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.classList.toggle('is-active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeNav();
  });
})();

/* ---------------------------------------------------------------------
   1. VIDÉO HERO RESPONSIVE
   Détecte mobile vs PC et charge le bon fichier. Re-vérifie au resize,
   mais ne recharge la vidéo QUE si on franchit le seuil (pour éviter
   de relancer la vidéo à chaque pixel de redimensionnement).
--------------------------------------------------------------------- */
(function heroVideoResponsive() {
  const video = document.getElementById('hero-video');
  if (!video) return;
  video.loop = true; // garantit la boucle même si l'attribut HTML est ignoré après un changement de src

  const BREAKPOINT = 768;
  let isMobile = window.innerWidth < BREAKPOINT;

  function setSource() {
    const src = isMobile ? 'assets/videos/hero-mobile.mp4' : 'assets/videos/hero-pc.mp4';
    if (video.dataset.currentSrc === src) return; // déjà la bonne source, on ne touche à rien
    video.dataset.currentSrc = src;
    video.src = src;
    video.load();
    video.play().catch(() => {}); // le navigateur peut bloquer l'autoplay, on ignore l'erreur
  }

  setSource();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const nowMobile = window.innerWidth < BREAKPOINT;
      if (nowMobile !== isMobile) {
        isMobile = nowMobile;
        setSource();
      }
    }, 200);
  });
})();

/* ---------------------------------------------------------------------
   2. BOUTON "DÉCOUVRIR L'UNIVERS" — ouvre la modal vidéo plein écran
--------------------------------------------------------------------- */
function openVideoModal() {
  const modal = document.querySelector('[data-video-modal]');
  if (!modal) return;
  const container = modal.querySelector('.video-modal-container');
  if (container && !container.querySelector('video')) {
    const BREAKPOINT = 768;
    const isMobile = window.innerWidth < BREAKPOINT;
    const src = isMobile ? 'assets/videos/hero-mobile.mp4' : 'assets/videos/hero-pc.mp4';
    container.innerHTML = `<video src="${src}" autoplay loop playsinline controls style="width:100%; max-height:90vh; border-radius:12px;"></video>`;
  }
  modal.classList.add('is-open');
}

function closeVideoModal() {
  const modal = document.querySelector('[data-video-modal]');
  if (!modal) return;
  modal.classList.remove('is-open');
  const container = modal.querySelector('.video-modal-container');
  if (container) {
    container.innerHTML = ''; // Vide la vidéo à la fermeture pour réinitialiser sa mémoire
  }
}

document.querySelectorAll('[data-decouvrir]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openVideoModal();
  });
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('video-modal-backdrop') || e.target.classList.contains('video-modal-close')) {
    closeVideoModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoModal();
});

/* ---------------------------------------------------------------------
   3. ANIMATION — Section Activités
   Se déclenche à chaque fois (reset) et prend de l'avance (threshold 0.1)
--------------------------------------------------------------------- */
const activitesSection = document.getElementById('activites');
if (activitesSection) {
  const words = activitesSection.querySelectorAll('.activite-word');
  const grilleImg = document.querySelector('.grille-img');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // --- ON DÉCLENCHE L'ANIMATION ---
        activitesSection.style.setProperty('--grid-reveal', '1');
        
        if (grilleImg) grilleImg.classList.add('is-visible');
        
        setTimeout(() => activitesSection.style.setProperty('--line-reveal', '1'), 150);
        
        words.forEach((word, i) => {
          setTimeout(() => word.classList.add('is-visible'), 400 + i * 200);
        });

      } else {
        // --- ON RÉINITIALISE TOUT QUAND ON QUITTE LA SECTION ---
        activitesSection.style.setProperty('--grid-reveal', '0');
        activitesSection.style.setProperty('--line-reveal', '0');
        
        if (grilleImg) grilleImg.classList.remove('is-visible');
        
        words.forEach(word => {
          word.classList.remove('is-visible');
        });
      }
    },
    // Déclenchement dès que 10% de la section est visible
    { threshold: 0.1 } 
  );
  
  observer.observe(activitesSection);
}

/* ---------------------------------------------------------------------
   4. SERVICE SUR-MESURE — plus besoin de JS : le texte apparaît au
   survol en CSS pur (voir .service-card-hover dans le HTML/CSS).
--------------------------------------------------------------------- */

/* ---------------------------------------------------------------------
   5. FORMULAIRE DE CONTACT — EmailJS
   Voir le README pour la marche à suivre complète (créer un compte,
   récupérer les 3 identifiants, les coller ci-dessous).
--------------------------------------------------------------------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const statusEl = document.getElementById('form-status');

  const EMAILJS_SERVICE_ID = 'battement_contact';
  const EMAILJS_TEMPLATE_ID = 'template_ul7zehh';
  const EMAILJS_PUBLIC_KEY = 'VOJNITXc2n75SAG5m';

  const TELEGRAM_BOT_TOKEN = '8940608062:AAEqoaX8Mc7UfGi-Ps5__d13C0jslHWLi0Q';
  const TELEGRAM_CHAT_ID = '-5206761330';

  function sendTelegramNotification(formData) {
    const text =
      `📩 Nouveau message — Battement Production\n\n` +
      `Nom : ${formData.get('nom')} ${formData.get('prenom')}\n` +
      `Email : ${formData.get('email')}\n` +
      `Téléphone : ${formData.get('telephone')}\n` +
      `Société : ${formData.get('societe') || '-'}\n\n` +
      `Message :\n${formData.get('message')}`;

    return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text })
    });
  }

  let statusTimeout;
  function showStatus(text, type, autoHide) {
    clearTimeout(statusTimeout);
    statusEl.textContent = text;
    statusEl.className = 'form-status is-visible ' + type;
    if (autoHide) {
      statusTimeout = setTimeout(() => {
        statusEl.className = 'form-status ' + type;
      }, 4000);
    }
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showStatus('Envoi en cours...', 'is-pending', false);

    const formData = new FormData(this);

    Promise.all([
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this, EMAILJS_PUBLIC_KEY),
      sendTelegramNotification(formData)
    ])
      .then(() => {
        showStatus('Message envoyé !', 'is-success', true);
        contactForm.reset();
      })
      .catch(() => {
        showStatus('Erreur — contactez-nous par mail', 'is-error', true);
      });
  });
}

/* ---------------------------------------------------------------------
   6. GESTION DES AVIS GOOGLE PLACES (DYNAMIQUE)
--------------------------------------------------------------------- */
function initGoogleReviews() {
  // ⚠️ Quand ta fiche sera validée, tu colleras ton Place ID entre les guillemets ci-dessous :
  const PLACE_ID = 'ChIJv-06SXz_UicRYQ3QDlrcLRQ'; 
  
  const track = document.getElementById('dynamic-reviews-track');
  if (!track || PLACE_ID === 'ChIJv-06SXz_UicRYQ3QDlrcLRQ') return;

  // Création du service Google Places
  const dummyElement = document.createElement('div');
  const service = new google.maps.places.PlacesService(dummyElement);

  service.getDetails({
    placeId: PLACE_ID,
    fields: ['rating', 'user_ratings_total', 'reviews']
  }, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place) {
      
      // 1. Formatage de la note et du nombre d'avis
      const ratingStr = place.rating ? place.rating.toString().replace('.', ',') : '-';
      const totalReviews = place.user_ratings_total || 0;
      
      // Générateur d'étoiles (ex: ★★★★★)
      function setStars(val) {
        if (!val) return '☆☆☆☆☆';
        const fullStars = Math.round(val);
        return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
      }
      const starsText = setStars(place.rating);

      // Injection dans le Hero
      if(document.getElementById('hero-score')) document.getElementById('hero-score').textContent = ratingStr;
      if(document.getElementById('hero-stars')) document.getElementById('hero-stars').textContent = starsText;
      if(document.getElementById('hero-count')) document.getElementById('hero-count').textContent = totalReviews;
      
      // Injection dans le Badge
      if(document.getElementById('badge-score')) document.getElementById('badge-score').textContent = ratingStr;
      if(document.getElementById('badge-stars')) document.getElementById('badge-stars').textContent = starsText;
      if(document.getElementById('badge-count')) document.getElementById('badge-count').textContent = totalReviews;

      // 2. Génération des cartes d'avis si des avis existent
      if (place.reviews && place.reviews.length > 0) {
        let reviewsHTML = '';
        const colors = ['#8b919d', '#0F9D58', '#4285F4', '#DB4437', '#F4B400']; 
        
        place.reviews.forEach((review, index) => {
          const initial = review.author_name ? review.author_name.charAt(0).toUpperCase() : '?';
          const stars = setStars(review.rating);
          const timeStr = review.relative_time_description || '';
          const color = colors[index % colors.length];
          const avatarUrl = review.profile_photo_url || '';
          
          reviewsHTML += `
            <div class="review-card">
              <div class="review-header">
                <img src="${avatarUrl}" alt="${review.author_name}" class="review-avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="review-avatar-text" style="background:${color}; display:none;">${initial}</div>
                <div class="review-author">
                  <strong>${review.author_name}</strong>
                  <span>${timeStr}</span>
                </div>
                <span class="stars">${stars}</span>
              </div>
              <p class="review-text">${review.text ? (review.text.substring(0, 160) + (review.text.length > 160 ? '...' : '')) : ''}</p>
            </div>
          `;
        });

        // Duplication des cartes pour préserver l'effet de carrousel infini en CSS
        track.innerHTML = reviewsHTML + reviewsHTML;
      }
    }
  });
}

// Lancement automatique du chargement des avis dès que la page est prête
window.addEventListener('load', () => {
  if (typeof google !== 'undefined' && google.maps && google.maps.places) {
    initGoogleReviews();
  }
});

/* ---------------------------------------------------------------------
   7. EFFET "SURÉLEVÉ" AU CENTRE DE L'ÉCRAN — équivalent tactile du hover,
   pour les vignettes du portfolio et de la galerie projet sur mobile.
--------------------------------------------------------------------- */
(function centerHoverEffect() {
  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  if (!isTouchDevice) return; // Sur ordinateur, le vrai :hover suffit, on ne fait rien

  const OBSERVER_OPTIONS = {
  threshold: 0.5,
  rootMargin: '-25% 0px -25% 0px'
};
  const STAGGER_MS = 350; // délai entre chaque carte du relais, gauche → droite, ligne par ligne

  // --- Activités + galerie projet : effet immédiat, inchangé ---
  const simpleCards = document.querySelectorAll('.activite-card, .media-item, .btn.hover-lift, .service-card, .profile-photo-frame');
  const simpleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-centered', entry.isIntersecting);
    });
  }, OBSERVER_OPTIONS);
  simpleCards.forEach(card => simpleObserver.observe(card));

  // --- Grille portfolio de la page portfolio.html : décalage simple gauche/droite ---
  const gridCards = document.querySelectorAll('.card.hover-lift');
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      if (entry.isIntersecting) {
        const siblings = Array.from(card.parentElement.children);
        const columnCount = getComputedStyle(card.parentElement).gridTemplateColumns.split(' ').length || 1;
        const column = siblings.indexOf(card) % columnCount;
        setTimeout(() => card.classList.add('is-centered'), column * 100);
      } else {
        card.classList.remove('is-centered');
      }
    });
  }, OBSERVER_OPTIONS);
  gridCards.forEach(card => gridObserver.observe(card));

  // --- Aperçu portfolio de la home page : UNE SEULE carte active à la fois,
  //     avec relais automatique dans l'ordre de lecture (gauche → droite, haut → bas) ---
  const homeCards = document.querySelectorAll('.portfolio-card');
  const homeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;

      if (!entry.isIntersecting) {
        card.classList.remove('is-centered');
        card.dataset.queued = '';
        return;
      }

      if (card.dataset.queued === 'true') return;
      card.dataset.queued = 'true';

      const siblings = Array.from(card.parentElement.children);
      const columnCount = getComputedStyle(card.parentElement).gridTemplateColumns.split(' ').length || 1;
      const index = siblings.indexOf(card);
      const column = index % columnCount;

      setTimeout(() => {
        homeCards.forEach(other => {
          if (other !== card) other.classList.remove('is-centered');
        });
        card.classList.add('is-centered');
      }, column * STAGGER_MS);
    });
  }, OBSERVER_OPTIONS);
  homeCards.forEach(card => homeObserver.observe(card));
})();

/* ---------------------------------------------------------------------
   8. BANDEAU DE CONSENTEMENT COOKIES — Google Analytics ne se charge
   qu'après acceptation explicite du visiteur.
--------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function() {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return; // Sécurité si le bandeau n'existe pas sur cette page

  const acceptBtn = document.getElementById("accept-cookies");
  const declineBtn = document.getElementById("decline-cookies");

  if (!localStorage.getItem("cookieConsent")) {
    banner.style.display = "flex";
  } else if (localStorage.getItem("cookieConsent") === "accepted") {
    loadTracking();
  }

  acceptBtn.addEventListener("click", function() {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
    loadTracking();
  });

  declineBtn.addEventListener("click", function() {
    localStorage.setItem("cookieConsent", "declined");
    banner.style.display = "none";
  });
});

function loadTracking() {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-K60Q6V0DMR";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-K60Q6V0DMR');
}