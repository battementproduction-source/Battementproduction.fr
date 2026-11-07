// Envoi des demandes de devis (compte EmailJS, mêmes réglages que l'ancien formulaire de contact).
// Ces identifiants sont publics par nature : EmailJS est prévu pour être utilisé depuis le navigateur.
window.BATTEMENT_EMAILJS = { service: 'battement_contact', template: 'template_ul7zehh', publicKey: 'VOJNITXc2n75SAG5m' };

// Avis de secours, affichés seulement si assets/data/avis.json est vide.
// Format : { nom: 'Prénom Nom', note: 5, texte: "Le texte de l'avis…", date: 'il y a 2 mois' },
window.BATTEMENT_AVIS = [
];

// Prise de RDV : ton lien Cal.com SANS "https://cal.com/" (ex. 'battement-production/appel-decouverte').
// Laisse vide pour garder la maquette.
window.BATTEMENT_CAL = 'elias-ban-edgxhz/30min';
