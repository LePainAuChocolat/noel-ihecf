/* =====================================================================
   CONFIGURATION DU SITE — c'est le SEUL fichier à modifier
   pour changer les dates, le programme, le menu, le traiteur et le formulaire.
   ===================================================================== */

const CONFIG = {
  // --- Infos générales -------------------------------------------------
  nomEvenement: "Noël de l'IHECF",
  sousTitre: "Une journée magique pour les élèves de l'IHECF Nantes",
  lieu: "IHECF Nantes", // ex : "Campus IHECF, 12 rue ..., Nantes"

  // Date de l'événement (format AAAA-MM-JJTHH:MM, heure de Paris)
  dateEvenement: "2026-12-18T10:00",

  // Date LIMITE d'inscription : après cette date, le formulaire se ferme
  dateLimiteInscription: "2026-12-10T23:59",

  // --- Google Form -----------------------------------------------------
  // 1. Dans Google Forms : bouton "Envoyer" > onglet "< >" (intégrer)
  // 2. Copier l'URL qui est dans src="..." et la coller ci-dessous
  //    (elle doit finir par "viewform?embedded=true")
  googleFormUrl: "", // ex : "https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true"

  // --- Programme -------------------------------------------------------
  programme: {
    journee: {
      titre: "La journée",
      horaires: "10h00 – 18h00",
      intro: "Ouverte à tous les élèves inscrits.",
      activites: [
        { heure: "10h00", titre: "Accueil & chocolat chaud", description: "Ouverture des portes, viennoiseries et boissons chaudes.", icone: "☕" },
        { heure: "11h00", titre: "Atelier déco de Noël", description: "Décoration du sapin et fabrication de couronnes.", icone: "🎄" },
        { heure: "12h30", titre: "Pause déjeuner", description: "Temps libre pour se restaurer.", icone: "🥪" },
        { heure: "14h00", titre: "Tournoi de jeux", description: "Blind test de Noël, quiz et jeux en équipe.", icone: "🎲" },
        { heure: "16h00", titre: "Secret Santa", description: "Échange de cadeaux (budget conseillé : 10 €).", icone: "🎁" },
        { heure: "17h00", titre: "Concours du plus beau pull moche", description: "Le pull le plus kitsch remporte un prix !", icone: "🧶" },
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
    nom: "Nom du traiteur",
    slogan: "Cuisine maison & produits locaux",
    description:
      "Présentation du traiteur : son histoire, sa cuisine, ses valeurs. " +
      "Par exemple : installé à Nantes depuis 2015, il travaille des produits frais et de saison " +
      "issus de producteurs de la région.",
    points: ["Produits frais et de saison", "Fait maison", "Options végétariennes et adaptations allergies"],
    photo: "",     // ex : "images/traiteur.jpg" (laisser "" pour afficher une illustration)
    site: "",      // ex : "https://www.traiteur-exemple.fr"
    instagram: "", // ex : "https://instagram.com/traiteur"
  },

  // --- Menu du dîner ---------------------------------------------------
  menu: {
    heure: "19h45",
    prix: "15 €", // laisser "" pour masquer
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
