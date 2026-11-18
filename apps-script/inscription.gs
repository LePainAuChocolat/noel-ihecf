/* =====================================================================
   Script Google Apps Script : reçoit les inscriptions du site
   et les ajoute dans l'onglet "Inscriptions" du Google Sheet.

   Installation (une seule fois) :
   1. Ouvrir le Google Sheet > Extensions > Apps Script
   2. Remplacer tout le code par ce fichier, puis Enregistrer
   3. Déployer > Nouveau déploiement > type "Application Web"
        - Exécuter en tant que : Moi
        - Qui a accès : Tout le monde
   4. Autoriser l'accès, puis copier l'URL (qui finit par /exec)
      dans js/config.js > inscriptionScriptUrl
   Après une modification de ce script : Déployer > Gérer les déploiements >
   modifier (crayon) > Version : Nouvelle version.
   ===================================================================== */

const SHEET_NAME = "Inscriptions";
const DATE_LIMITE = new Date("2026-12-10T23:59:59+01:00");
const TARIFS = { pull: 2, diner: 10 };
const HEADERS = [
  "Horodateur", "Prénom", "Nom", "Classe", "Dîner du soir", "Concours pull moche",
  "Secret Santa", "Allergies alimentaires", "Régime alimentaire", "Montant à payer (€)",
  "Moyen de paiement", "Payé ?", "Présent(e) ?",
];

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return json({ ok: true, montant: 0 }); // robot (champ piège rempli)
  if (new Date() > DATE_LIMITE) return json({ ok: false, error: "Les inscriptions sont closes." });

  const prenom = clean(p.prenom, 60), nom = clean(p.nom, 60), classe = clean(p.classe, 40);
  if (!prenom || !nom || !classe) return json({ ok: false, error: "Prénom, nom et classe sont obligatoires." });

  const diner = p.diner === "Oui", pull = p.pull === "Oui", santa = p.santa === "Oui";
  if (p.diner !== "Oui" && p.diner !== "Non") return json({ ok: false, error: "Indique si tu restes manger le soir." });

  const allergies = diner ? clean(p.allergies, 400) : "";
  const regime = diner ? clean(p.regime, 400) : "";
  if (diner && (!allergies || !regime)) {
    return json({ ok: false, error: "Allergies et régime alimentaire sont obligatoires pour le dîner." });
  }

  const montant = (pull ? TARIFS.pull : 0) + (diner ? TARIFS.diner : 0);
  const paiement = montant > 0 ? p.paiement : "";
  if (montant > 0 && paiement !== "Chèque" && paiement !== "Virement") {
    return json({ ok: false, error: "Choisis ton moyen de paiement." });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sheet = getSheet();
    sheet.appendRow([
      new Date(), prenom, nom, classe, diner ? "Oui" : "Non", pull ? "Oui" : "Non",
      santa ? "Oui" : "Non", allergies, regime, montant, paiement, false, false,
    ]);
    const row = sheet.getLastRow();
    sheet.getRange(row, 12, 1, 2).insertCheckboxes();
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true, montant: montant });
}

function doGet() {
  return json({ ok: true, info: "Script d'inscription actif." });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Nettoie un texte et empêche qu'il soit interprété comme une formule
function clean(value, max) {
  let s = String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
