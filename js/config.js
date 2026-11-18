/* =====================================================================
   CONFIGURATION DU SITE — c'est le SEUL fichier à modifier
   pour changer les dates, le programme, le menu, le traiteur et le formulaire.
   ===================================================================== */

const CONFIG = {
  // --- Infos générales -------------------------------------------------
  nomEvenement: "Noël de l'IHECF",
  sousTitre: "Une journée magique pour les élèves de l'IHECF Nantes",
  lieu: "IHECF Nantes", // ex : "Campus IHECF, 12 rue ..., Nantes"
  prix: "15 € la journée, repas inclus",

  // Adresse publique du site (affichée avec le QR code dans la partie "Partager")
  urlSite: "https://lepainauchocolat.github.io/noel-ihecf/",

  // Date de l'événement (format AAAA-MM-JJTHH:MM, heure de Paris)
  dateEvenement: "2026-12-18T12:30",

  // Date LIMITE d'inscription : après cette date, le formulaire se ferme
  dateLimiteInscription: "2026-12-10T23:59",

  // Date LIMITE de paiement : sans paiement à cette date, l'élève ne peut pas participer
  dateLimitePaiement: "2026-12-10T23:59",

  // --- Google Form -----------------------------------------------------
  // 1. Dans Google Forms : bouton "Envoyer" > onglet "< >" (intégrer)
  // 2. Copier l'URL qui est dans src="..." et la coller ci-dessous
  //    (elle doit finir par "viewform?embedded=true")
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeWX1zbrp7ROeV9Eq6U2LI_jbyLxPFf8_GebbIeyOr2PgZVqw/viewform?embedded=true",

  // --- Programme -------------------------------------------------------
  programme: {
    journee: {
      titre: "La journée",
      horaires: "12h30 – 16h45",
      intro: "Ouverte à tous les élèves inscrits.",
      activites: [
        { heure: "12h30 – 13h45", titre: "Repas en musique", description: "Chacun amène sa nourriture, avec de la musique en fond sonore. Distribution des pulls pendant le repas.", icone: "🥪" },
        { heure: "13h50 – 14h30", titre: "Loup-garou & jeux de société", description: "Parties de loup-garou et jeux de société.", icone: "🐺" },
        { heure: "14h35 – 15h10", titre: "Blind test", description: "Par équipes de 4 ou 5 : +1 point pour le titre, +1 point pour l'artiste, −0,5 point par mauvaise réponse.", icone: "🎵" },
        { heure: "15h30 – 16h00", titre: "Quiz de culture générale", description: "Testez vos connaissances… et peut-être quelques photos de Noël de nous enfants 👀", icone: "🧠" },
        { heure: "16h00 – 16h30", titre: "Concours du pull moche", description: "Le jury présélectionne 5 pulls, puis tout le monde vote pour le meilleur. Des prix pour les 3 premiers !", icone: "🧶" },
        { heure: "16h30 – 16h45", titre: "Remise des prix", description: "Récompenses des gagnants du concours du pull moche.", icone: "🏆" },
      ],
    },
    soiree: {
      titre: "La soirée",
      horaires: "19h00 – 23h00",
      intro: "Dîner sur inscription uniquement.",
      activites: [
        { heure: "19h00", titre: "Apéritif de bienvenue", description: "Cocktails avec et sans alcool, amuse-bouches.", icone: "🥂" },
        { heure: "19h45", titre: "Dîner de Noël", description: "Repas festif préparé par notre traiteur.", icone: "🍽️" },
        { heure: "21h30", titre: "Remise des prix", description: "Résultats du tournoi et du concours de pulls.", icone: "🏆" },
        { heure: "22h00", titre: "Soirée dansante", description: "DJ set et photobooth de Noël.", icone: "🎶" },
        { heure: "23h00", titre: "Fin de la soirée", description: "Merci à tous et joyeuses fêtes !", icone: "✨" },
      ],
    },
  },

  // --- Traiteur --------------------------------------------------------
  traiteur: {
    nom: "E.Leclerc Traiteur",
    slogan: "Le service traiteur de l'E.Leclerc de Saint-Herblain",
    description:
      "Pour notre dîner de Noël, nous faisons confiance au service traiteur de l'E.Leclerc de Saint-Herblain. " +
      "Leur équipe prépare le repas de la soirée, et nous ferons adapter les assiettes " +
      "selon les allergies et régimes alimentaires que vous nous signalez à l'inscription.",
    points: ["Repas préparé par le rayon traiteur", "Alternatives végétariennes", "Adaptations allergies & intolérances"],
    photo: "",     // ex : "images/traiteur.jpg" (laisser "" pour afficher une illustration)
    site: "",      // ex : "https://www.traiteur-exemple.fr"
    instagram: "", // ex : "https://instagram.com/traiteur"
  },

  // --- Menu du dîner ---------------------------------------------------
  menu: {
    heure: "19h45",
    prix: "Inclus dans le tarif de la journée (15 €)", // laisser "" pour masquer
    sections: [
      { titre: "Entrée",  plats: ["Velouté de potimarron & éclats de châtaigne", "Option végétarienne disponible"] },
      { titre: "Plat",    plats: ["Suprême de volaille, sauce aux morilles", "Gratin dauphinois & légumes rôtis", "Alternative végétarienne : risotto aux champignons"] },
      { titre: "Dessert", plats: ["Bûche de Noël chocolat ou fruits rouges"] },
      { titre: "Boissons", plats: ["Jus de fruits, sodas, eau", "Vin chaud (avec modération, +18 ans)"] },
    ],
    note: "Indiquez bien vos allergies et intolérances dans le formulaire d'inscription : nous adapterons votre assiette.",
  },

  // --- Contact ---------------------------------------------------------
  contact: {
    instagram: "", // ex : "https://instagram.com/bde_ihecf_nantes"
    email: "",     // ex : "bde@exemple.fr"
  },
};
