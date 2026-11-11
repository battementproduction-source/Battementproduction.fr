/* =====================================================================
   CONTENU DES PAGES PROJET
   - intro : présentation du projet (2-3 phrases)
   - role  : ce que j'ai fait, regroupé par grandes étapes
   - media : la 1re entrée est la vidéo principale, les suivantes s'affichent en plus petit
       { t: 'video', title, src, thumb }   → vidéo hébergée sur le site
       { t: 'yt',    title, id }           → vidéo YouTube (lue directement sur la page)
       { t: 'link',  title, url, thumb }   → lien externe (Instagram, site…)
       { t: 'image', title, src }          → visuel / affiche
===================================================================== */
const V = 'assets/images/projects/'; // vidéos des projets
const G = 'assets/img/galerie/';

const DETAILS = {
  'cetras': {
    year: '2026',
    intro: "Une publicité pour les lunettes de luminothérapie Cetras, autour d'une promesse simple : bien dormir, ça commence le matin. J'ai tourné et monté le film, en y intégrant de la 3D et du motion design pour mettre le produit en valeur.",
    role: [
      { title: 'Tournage', items: ['Tournage de la publicité.', 'Conseils sur la mise en scène de la vidéo.'] },
      { title: 'Post-production', items: ['Montage du film.', 'Intégration du produit en 3D et motion design.', 'Choix de la direction musicale.'] },
      { title: 'Identité', items: ['Animation du logo Cetras.'] },
    ],
    media: [
      { t: 'video', title: 'La publicité Cetras', src: V + 'cetras/pub-cetras.mp4', thumb: G + 'cetras/pub-thumb.jpg' },
      { t: 'video', title: 'Animation du logo', src: V + 'cetras/animation-logo.mp4', thumb: G + 'cetras/logo-cetras.jpg' },
    ],
  },

  'pape-lourdes': {
    year: '2026',
    intro: "À l'occasion de la venue du Pape en France, la comédie musicale Bernadette de Lourdes s'est jouée à Lourdes devant un public exceptionnel. J'ai conçu les vidéos projetées pendant le show, diffusées sur France TV, et filmé l'événement de l'intérieur.",
    role: [
      { title: 'Vidéos de scène', items: ['Réalisation des vidéos diffusées pendant le spectacle, reprises sur France TV.'] },
      { title: 'Captation sur site', items: ['Captation de la représentation de Bernadette de Lourdes.', "Captation de la venue du Pape et d'Eva Molenmaker chantant devant lui : des millions de vues dans le monde."] },
      { title: 'Post-production', items: ['Montage de l’ensemble des vidéos.'] },
    ],
    media: [
      { t: 'video', title: "Vidéo d'introduction du show", src: V + 'pape-lourdes/intro.mp4', thumb: G + 'pape-lourdes/intro-thumb.jpg' },
      { t: 'video', title: 'Vidéo jouée pendant le show', src: V + 'pape-lourdes/voir.mp4', thumb: G + 'pape-lourdes/voir-thumb.jpg' },
      { t: 'link', title: 'Eva Molenmaker chante devant le Pape', url: 'https://www.instagram.com/reel/DdzGP6nsPl9/', thumb: G + 'pape-lourdes/eva-pape1-thumb.jpg' },
      { t: 'link', title: 'Eva Molenmaker — 2e chanson', url: 'https://www.instagram.com/reel/DeHlF2is9K-/', thumb: G + 'pape-lourdes/eva-pape2-thumb.jpg' },
    ],
  },

  'grands-discours': {
    intro: "Grand succès au Canada, la pièce Aux Grands Maux les Grands Discours arrive à Paris, au théâtre de la Gaîté Rive Gauche. J'accompagne sa promotion et sa communication, avec toute la création de contenus.",
    role: [
      { title: 'Création de contenus', items: ['Tournage et montage de capsules pour les réseaux sociaux.', 'Réalisation de la bande-annonce de la pièce.'] },
      { title: 'Captation', items: ['Captation de la pièce pour sa diffusion.'] },
    ],
    media: [
      { t: 'yt', title: 'Bande-annonce', id: 'XiRATaeJBCY' },
    ],
  },

  'festival-europe2': {
    year: '2025',
    intro: "En juin 2025, pendant 3 jours, Europe 2 a célébré son nouveau format Pop avec les artistes emblématiques de la scène : Bob Sinclar, Santa, Superbus, Lucky Love, Marine… J'ai conçu les vidéos qui ont rythmé le show sur les écrans de scène.",
    role: [
      { title: 'Production vidéo', items: ["Vidéo d'introduction du show, pensée pour immerger le public dès l'ouverture.", 'Capsules vidéo diffusées entre chaque prestation.', 'Montage, habillage graphique et exports aux formats des écrans de scène.'] },
      { title: 'Scénographie', items: ["Participation à la conception de la scénographie de l'événement."] },
    ],
    media: [
      { t: 'video', title: "Vidéo d'introduction du show", src: V + 'festival-europe2/INTRO-FINAL.mp4', thumb: G + 'festival-europe2/INTRO-FINAL-thumb.jpg' },
      { t: 'video', title: "L'introduction vue depuis la salle", src: V + 'festival-europe2/vidéo-intro-salle.mp4', thumb: G + 'festival-europe2/intro-salle-thumb.jpg' },
      { t: 'video', title: 'Playlist récap de fin', src: V + 'festival-europe2/Playlist Recap.mp4', thumb: G + 'festival-europe2/Playlist-Recap-thumb.jpg' },
    ],
  },

  'viva-fuego': {
    year: '2026',
    intro: "Le 17 juin 2026, Radio Fuego a fêté son lancement officiel devant plus de 3 000 personnes à la Fiducial Asteria (Lyon-Décines), avec artistes, danseurs et animations. J'ai co-construit la soirée et créé tout son univers visuel, de l'affiche aux écrans géants.",
    role: [
      { title: 'Conception & mise en scène', items: ['Co-conception et organisation du festival en 3 mois.', 'Mise en scène globale et fil conducteur de la soirée.'] },
      { title: 'Vidéos de scène & motion design', items: ['Création des vidéos de scène pour chaque artiste et chaque interlude.', 'Vidéos scénarisées diffusées sur les écrans géants.', 'Logo du festival et son animation, affiches et supports de communication.', "Supervision de l'équipe de création le jour J."] },
      { title: 'Contenus & communication', items: ["Aftermovie de la soirée et montage des interviews d'artistes.", "Supervision de l'équipe communication et du plan de promotion de l'événement."] },
    ],
    media: [
      { t: 'link', title: 'Trailer du festival', url: 'https://www.instagram.com/p/DZDSA0DN05a/', thumb: G + 'viva-fuego/trailer-thumb.jpg' },
      { t: 'video', title: "Vidéo d'ouverture — 1re partie", src: V + 'viva-fuego-festival/INTRO DU SHOW.mp4', thumb: G + 'viva-fuego/intro1-thumb.jpg' },
      { t: 'video', title: "Vidéo d'ouverture — 2e partie", src: V + 'viva-fuego-festival/Intro Partie 2.mp4', thumb: G + 'viva-fuego/intro2-thumb.jpg' },
      { t: 'video', title: 'Hommage à Willy William', src: V + 'viva-fuego-festival/Willy William Hommage.mp4', thumb: G + 'viva-fuego/WW-thumb.jpg' },
      { t: 'video', title: 'Interlude promo DAB+', src: V + 'viva-fuego-festival/Vidéo Promo DAB+.mp4', thumb: G + 'viva-fuego/DAB+-thumb.jpg' },
      { t: 'video', title: "Vidéo d'entrée d'un artiste", src: V + 'viva-fuego-festival/DR.Yaro Intro.mp4', thumb: G + 'viva-fuego/thumb-video-artiste.jpg' },
      { t: 'link', title: 'Aftermovie', url: 'https://www.instagram.com/p/DZvKd7ZNVnV/', thumb: G + 'viva-fuego/aftermovie-thumb.jpg' },
      { t: 'image', title: 'Affiche du festival', src: G + 'viva-fuego/afficheVVF.jpg' },
      { t: 'image', title: 'Affiche avec les artistes', src: G + 'viva-fuego/Fresque-VVF-artistes.jpg' },
      { t: 'image', title: "Visuel individuel d'artiste", src: G + 'viva-fuego/DR Yaro.jpg' },
    ],
  },

  'pieces-jaunes': {
    year: '2025',
    intro: "« Les P'tits Soleils » est l'hymne officiel des Pièces Jaunes 2025. Le morceau réunit 28 jeunes artistes, dont Joseph Kamel, Héléna, Mentissa et Calema, au profit des enfants et adolescents hospitalisés. J'ai filmé les coulisses du tournage du clip.",
    role: [
      { title: 'Pré-production', items: ['Réunions préparatoires avec les artistes pour définir les besoins et le déroulé.'] },
      { title: 'Régie', items: ['Accompagnement des équipes le jour J pour une journée de tournage fluide.'] },
      { title: 'Making-of', items: ["Captation en immersion dans les coulisses et l'ambiance du plateau.", "Des images authentiques qui montrent l'engagement des artistes et des équipes."] },
    ],
    media: [
      { t: 'video', title: 'Making-of du clip', src: V + 'pieces-jaunes/PJ-makingof.mp4', thumb: G + 'pieces-jaunes/pj-thumb.jpg' },
      { t: 'yt', title: "Les P'tits Soleils — clip officiel", id: 'mT8PNX4RL_w' },
    ],
  },

  'radio-fuego': {
    intro: "Radio Fuego est une nouvelle radio nationale et internationale portée par de grands noms du secteur. Présent depuis le premier jour, j'en assure la direction artistique : univers visuel, contenus réseaux sociaux et vidéos B2B.",
    role: [
      { title: 'Direction artistique & identité', items: ["Conception de l'identité visuelle de la marque et de ses émissions (chartes, logos, systèmes visuels).", 'Animation du logo Radio Fuego.', 'Visuels PLV, street marketing et supports imprimés ou digitaux.'] },
      { title: 'Contenus réseaux sociaux', items: ['Tous les visuels et vidéos des réseaux : Reels, TikTok, Shorts, posts, stories.', 'Contenus UGC, incarnés ou en voix off.', 'Mécaniques et visuels des jeux-concours.'] },
      { title: 'Vidéos B2B', items: ['Présentations institutionnelles, démos commerciales et pitchs partenaires.', 'Vidéos événementielles et capsules éditoriales.'] },
      { title: 'Stratégie', items: ['Pilotage de la stratégie de contenu et management de l’équipe communication.'] },
    ],
    media: [
      { t: 'video', title: 'Vidéo de présentation', src: V + 'radio-fuego/presentation.mp4', thumb: G + 'radio-fuego/presentation-thumb.jpg' },
      { t: 'video', title: 'Récap séminaire corporate', src: V + 'radio-fuego/convention-fuego.mp4', thumb: G + 'radio-fuego/thumb-convention-fuego.jpg' },
      { t: 'link', title: 'Application Radio Fuego', url: 'https://www.instagram.com/p/DXaBWvTAiNv/', thumb: G + 'radio-fuego/appliRF-thumb.jpg' },
      { t: 'link', title: 'Publicité Radio Player', url: 'https://www.instagram.com/reels/DWOXwUWgVDh/', thumb: G + 'radio-fuego/radioplayer.jpg' },
      { t: 'link', title: 'Vidéo incarnée pour les auditeurs', url: 'https://www.instagram.com/reels/DVapYsbABc9/', thumb: G + 'radio-fuego/auditeurs-thumb.jpg' },
      { t: 'link', title: 'Concours Bad Bunny', url: 'https://www.instagram.com/reel/DWOfoaiNQB3/', thumb: G + 'radio-fuego/badbunny.jpg' },
      { t: 'link', title: 'Concours Romeo Santos & Prince Royce', url: 'https://www.instagram.com/reel/DVprQ_-k2yT/', thumb: G + 'radio-fuego/RS-PR.jpg' },
      { t: 'link', title: 'Concours Little Italy Festival', url: 'https://www.instagram.com/reel/DVFoHitDiA-/', thumb: G + 'radio-fuego/LIF.jpg' },
      { t: 'link', title: 'Présentation Barcelona Mix', url: 'https://www.instagram.com/reel/DU30EkHiSuG/', thumb: G + 'radio-fuego/Barcelona-Mix.jpg' },
      { t: 'link', title: 'Concours Rosalía', url: 'https://www.instagram.com/reel/DUh9Am6gU3I/', thumb: G + 'radio-fuego/rosalia.jpg' },
      { t: 'link', title: 'Concours Calema', url: 'https://www.instagram.com/reel/DUPtqTkDd5r/', thumb: G + 'radio-fuego/calema.jpg' },
      { t: 'link', title: 'Fuego Zap', url: 'https://www.instagram.com/reel/DTpW6l8DdCc/', thumb: G + 'radio-fuego/Fuego-Zap.jpg' },
      { t: 'link', title: 'Le site de Radio Fuego', url: 'https://radiofuego.fr' },
    ],
  },

  'david-ban': {
    year: '2025',
    intro: "Chanteur et comédien, David Bán a défendu son album Big Party (2025) lors d'une tournée en Chine, notamment à Shanghai et Chongqing. J'ai créé toutes les vidéos qui habillent la scène du concert.",
    role: [
      { title: 'Vidéos de scène', items: ["Réalisation et montage des séquences d'ouverture du concert.", "Toutes les vidéos diffusées pendant le show, aux formats de plusieurs écrans géants."] },
      { title: 'Motion design', items: ["Animations graphiques diffusées pendant l'entrée du public."] },
    ],
    media: [
      { t: 'link', title: 'Aftermovie — concert à Chongqing', url: 'https://www.instagram.com/reels/DS9PNnTiqkC/', thumb: G + 'david-ban/thumb-aftermovie.jpg' },
    ],
  },

  'bernadette-lourdes': {
    year: '2025',
    intro: "Après son succès en France, la comédie musicale Bernadette de Lourdes s'exporte en Italie : la tournée a débuté à Rome le 16 janvier 2025, à l'Auditorium Conciliazione, près du Vatican. J'ai suivi la première et produit les contenus pour le marché italien.",
    role: [
      { title: 'Captation sur site', items: ['Tournage du spectacle en conditions réelles.', "Micro-trottoir en italien à la sortie de la première pour capter l'émotion du public."] },
      { title: 'Post-production', items: ['Teasers et vidéos promo en français et en italien.', 'Film promotionnel diffusé sur la Rai, la télévision italienne.'] },
    ],
    media: [
      { t: 'video', title: 'Récap de la première italienne', src: V + 'bernadette-de-lourdes-IT/Premiere-BDL-Italie(VF).mp4', thumb: G + 'bernadette-lourdes/thumb-premiere.jpg' },
      { t: 'video', title: 'Making-of du trailer', src: V + 'bernadette-de-lourdes-IT/Making-of-Trailer(VostFR).mp4', thumb: G + 'bernadette-lourdes/makingof-trailer-thumb.jpg' },
      { t: 'video', title: 'Micro-trottoir de la première', src: V + 'bernadette-de-lourdes-IT/Avis-spectateurs(VostFr).mp4', thumb: G + 'bernadette-lourdes/microtrottoir.jpg' },
      { t: 'video', title: 'Teaser artistes', src: V + 'bernadette-de-lourdes-IT/Videos-artistes.mp4', thumb: G + 'bernadette-lourdes/teaser-artistes.jpg' },
      { t: 'video', title: 'Avant la première', src: V + 'bernadette-de-lourdes-IT/Vlog-BDL-Italy.mp4', thumb: G + 'bernadette-lourdes/pre-premiere.jpg' },
    ],
  },

  'pop-session-europe2': {
    intro: "Pop Sessions est une émission musicale d'Europe 2 et CSTAR : des concerts privés réservés à un petit groupe d'auditeurs. J'ai participé à sa conception et filmé ses coulisses.",
    role: [
      { title: 'Conception & communication', items: ["Participation à la scénographie de l'émission.", 'Stratégie de communication pour promouvoir le programme.'] },
      { title: 'Making-of', items: ['Tournage et montage de vidéos immersives dans les coulisses de plusieurs sessions.'] },
    ],
    media: [
      { t: 'video', title: "Best of de l'émission", src: V + 'pop-session/Bestof-PopSession.mp4', thumb: G + 'pop-session-europe2/bestof-popsession-thumb.jpg' },
      { t: 'video', title: 'Dans les coulisses', src: V + 'pop-session/Pop-Session2.mp4', thumb: G + 'pop-session-europe2/popsession-thumb.jpg' },
    ],
  },

  'Loop': {
    intro: "Après le prix du public du Festival du Cinéma de Taverny, j'ai écrit mon 4e court-métrage. En deux parties, Loop suit Eliott, la vingtaine, soudain confronté à des événements inexplicables : pour s'en sortir, il devra affronter ses démons intérieurs.",
    role: [
      { title: 'Écriture & réalisation', items: ["Écriture du scénario en deux parties.", 'Mise en scène et direction artistique, de la conception au film fini.'] },
      { title: 'Tournage', items: ['Prises de vues de toutes les séquences.', "Double casquette : réalisateur et acteur principal."] },
      { title: 'Post-production', items: ['Montage, effets visuels, étalonnage et mixage son.'] },
    ],
    media: [
      { t: 'yt', title: 'Loop — partie 1', id: 'q5kT0Mk8tY8' },
      { t: 'yt', title: 'Loop — partie 2', id: 'naqOvPMb4J8' },
      { t: 'link', title: 'Bande-annonce', url: 'https://www.instagram.com/p/DO1JN1gCLJ3/', thumb: G + 'Loop/AfficheBA.jpg' },
      { t: 'link', title: 'Bande-annonce 2', url: 'https://www.instagram.com/p/DPLrPMPCGXs/', thumb: G + 'Loop/thumb-BA2.jpg' },
    ],
  },

  'les-mots-bleus': {
    year: '2020',
    intro: "Pendant le confinement de 2020, David Bán reprend « Les Mots Bleus » en hommage au chanteur Christophe. J'ai réalisé le clip en 48 heures.",
    role: [
      { title: 'Réalisation', items: ['Mise en scène et tournage de toutes les séquences.'] },
      { title: 'Post-production', items: ['Montage, étalonnage et effets visuels.'] },
    ],
    media: [
      { t: 'yt', title: 'Les mots bleus (cover) — David Bán', id: '7TnYLTrAeFI' },
    ],
  },

  'bonjour-ivresse': {
    intro: "Pour annoncer la prolongation de la pièce Bonjour Ivresse, j'ai monté un teaser diffusé sur M6 (Absolument Star) et dans les rues de Paris.",
    role: [
      { title: 'Post-production', items: ['Réception des rushes, dérushage et montage.', 'Étalonnage et effets visuels.'] },
    ],
    media: [
      { t: 'yt', title: 'Teaser de la prolongation', id: 'vw0KmLs-kBg' },
      { t: 'video', title: 'Diffusion sur M6', src: V + 'bonjour-ivresse/M6-matin.mp4', thumb: G + 'bonjour-ivresse/thumb-M6.jpg' },
    ],
  },

  'little-italy-festival': {
    // ⚠️ L'ancien texte de présentation était celui de Bonjour Ivresse : intro réécrite à partir du rôle, à vérifier
    intro: "Le Little Italy Festival célèbre la culture italienne sur scène. J'ai monté ses vidéos de présentation, pour le public en salle comme pour la recherche de partenaires.",
    role: [
      { title: 'Post-production', items: ['Vidéo de présentation du festival, diffusée en salle en français et en italien.', 'Vidéo promotionnelle pour le compte Instagram de Julien Lieb.', 'Vidéo B2B pour convaincre de futurs partenaires.'] },
    ],
    media: [
      { t: 'video', title: 'Teaser diffusé en salle', src: V + 'little-italy-festival/LIF teaser JVT.mp4', thumb: G + 'little-italy-festival/thumb-teaser.jpg' },
      { t: 'link', title: 'Julien Lieb au Little Italy Festival', url: 'https://www.instagram.com/reels/DSK9dgrjMG9/', thumb: G + 'little-italy-festival/julien-lieb.jpg' },
    ],
  },

  'wereal': {
    intro: "L'agence nantaise WeReal Production a réalisé un film promotionnel pour le restaurant Goguette, à Nantes. J'ai rejoint l'équipe comme assistant tournage.",
    role: [
      { title: 'Tournage', items: ["Assistanat sur le tournage du film promotionnel.", 'Prises de vues pour le making-of.'] },
    ],
    media: [
      { t: 'link', title: 'Le film promotionnel', url: 'https://www.instagram.com/reel/C--l02wMh8v/', thumb: G + 'wereal/thumb-wereal.jpg' },
    ],
  },
};
