(function () {
  "use strict";
  const C = CONFIG;
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);
  const page = document.body.dataset.page;

  const eventDate = new Date(C.dateEvenement);
  const deadline = new Date(C.dateLimiteInscription);
  const isClosed = () => Date.now() > deadline.getTime();

  const fmtDate = (d, withTime) =>
    d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) +
    (withTime ? " à " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h") : "");

  /* ---------- Commun à toutes les pages ---------- */
  initSnow();

  // Lien actif dans la navigation
  $$("[data-nav]").forEach((a) => {
    if (a.dataset.nav === page) a.setAttribute("aria-current", "page");
  });

  // Textes liés à la config
  const binds = {
    nomEvenement: C.nomEvenement,
    sousTitre: C.sousTitre,
    lieu: C.lieu,
    prix: C.prix,
    dateEvenement: fmtDate(eventDate),
    dateLimiteInscription: fmtDate(deadline, true),
    dateLimitePaiement: fmtDate(new Date(C.dateLimitePaiement || C.dateLimiteInscription), true),
  };
  $$("[data-bind]").forEach((el) => { el.textContent = binds[el.dataset.bind] ?? ""; });

  // Boutons d'inscription grisés quand c'est clos
  if (isClosed()) $$("[data-signup], .nav-cta").forEach((a) => a.classList.add("is-closed"));

  // Liens de contact du pied de page
  const contact = $("contact-links");
  if (contact) {
    const links = [];
    if (C.contact.instagram) links.push(`<a href="${C.contact.instagram}" target="_blank" rel="noopener">Instagram</a>`);
    if (C.contact.email) links.push(`<a href="mailto:${C.contact.email}">${C.contact.email}</a>`);
    contact.innerHTML = links.join("");
  }

  /* ---------- Page par page ---------- */
  if (page === "accueil") { initCountdown(); initShare(); }
  if (page === "programme") initProgramme();
  if (page === "menu") initMenu();
  if (page === "inscription") initInscription();

  /* ---------- Accueil : compte à rebours ---------- */
  function initCountdown() {
    const cd = {};
    $$("[data-cd]").forEach((el) => (cd[el.dataset.cd] = el));
    const pad = (n) => String(n).padStart(2, "0");
    function tick() {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) {
        $("countdown-label").textContent = "Les inscriptions sont closes";
        $("countdown").hidden = true;
        return false;
      }
      const s = Math.floor(diff / 1000);
      cd.j.textContent = Math.floor(s / 86400);
      cd.h.textContent = pad(Math.floor((s % 86400) / 3600));
      cd.m.textContent = pad(Math.floor((s % 3600) / 60));
      cd.s.textContent = pad(s % 60);
      return true;
    }
    if (tick()) {
      const timer = setInterval(() => { if (!tick()) clearInterval(timer); }, 1000);
    }
  }

  /* ---------- Accueil : partage (QR code + lien) ---------- */
  function initShare() {
    const url = C.urlSite || location.href.split("#")[0];
    const link = $("share-url");
    link.href = url;
    link.textContent = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const feedback = $("share-feedback");

    $("copy-link").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(url);
        feedback.textContent = "✅ Lien copié !";
      } catch (e) {
        feedback.textContent = "Copie impossible : sélectionne le lien ci-dessus.";
      }
      setTimeout(() => (feedback.textContent = ""), 2500);
    });

    if (navigator.share) {
      const btn = $("native-share");
      btn.hidden = false;
      btn.addEventListener("click", () => {
        navigator.share({ title: C.nomEvenement, text: C.sousTitre, url }).catch(() => {});
      });
    }
  }

  /* ---------- Programme ---------- */
  function initProgramme() {
    $$("[data-prog]").forEach((el) => {
      const [part, key] = el.dataset.prog.split(".");
      el.textContent = C.programme[part][key] || "";
    });
    $$("[data-timeline]").forEach((ol) => {
      ol.innerHTML = C.programme[ol.dataset.timeline].activites.map((p) => `
        <li class="tl-item">
          <div class="tl-icon" aria-hidden="true">${p.icone || "⭐"}</div>
          <div class="tl-body">
            <p class="tl-time">${p.heure}</p>
            <h3>${p.titre}</h3>
            ${p.description ? `<p>${p.description}</p>` : ""}
          </div>
        </li>`).join("");
    });
  }

  /* ---------- Menu + traiteur ---------- */
  function initMenu() {
    const t = C.traiteur;
    $("caterer-name").textContent = t.nom;
    $("caterer-slogan").textContent = t.slogan || "";
    $("caterer-desc").textContent = t.description || "";
    $("caterer-points").innerHTML = (t.points || []).map((x) => `<li>${x}</li>`).join("");
    if (t.photo) {
      const ph = $("caterer-photo");
      ph.textContent = "";
      ph.style.backgroundImage = `url("${t.photo}")`;
      ph.classList.add("has-photo");
    }
    const links = [];
    if (t.site) links.push(`<a href="${t.site}" target="_blank" rel="noopener">Site web</a>`);
    if (t.instagram) links.push(`<a href="${t.instagram}" target="_blank" rel="noopener">Instagram</a>`);
    $("caterer-links").innerHTML = links.join(" · ");

    const m = C.menu;
    $("menu-info").textContent = [m.heure, m.prix].filter(Boolean).join(" · ");
    $("menu-sections").innerHTML = m.sections.map((s) => `
      <div class="menu-section">
        <h3>${s.titre}</h3>
        <ul>${s.plats.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>`).join('<div class="menu-sep" aria-hidden="true">✦</div>');
    $("menu-note").textContent = m.note || "";
  }

  /* ---------- Inscription ---------- */
  function initInscription() {
    function update() {
      const closed = isClosed();
      $("form-closed").hidden = !closed;
      const site = !!C.inscriptionScriptUrl;
      $("form-missing").hidden = closed || site || !!C.googleFormUrl;
      $("form-site").hidden = closed || !site;
      $("form-open").hidden = closed || site || !C.googleFormUrl;
      $("deadline-banner").classList.toggle("is-closed", closed);

      if (!closed && !site && C.googleFormUrl && !$("gform").getAttribute("src")) {
        $("gform").src = C.googleFormUrl;
        $("form-link").href = C.googleFormUrl.replace(/[?&]embedded=true/, "");
      }

      const left = $("deadline-left");
      if (closed) {
        left.textContent = "· inscriptions closes";
      } else {
        const days = Math.ceil((deadline.getTime() - Date.now()) / 86400000);
        left.textContent = days <= 1 ? "· dernier jour !" : `· encore ${days} jours`;
      }
      return closed;
    }
    if (C.inscriptionScriptUrl) initSignupForm();
    if (!update()) {
      // Ferme le formulaire automatiquement si la page reste ouverte au moment de la clôture
      const timer = setInterval(() => { if (update()) clearInterval(timer); }, 30000);
    }
  }

  /* ---------- Formulaire d'inscription du site ---------- */
  function initSignupForm() {
    const form = $("signup-form");
    const F = form.elements;
    const T = C.tarifs || { pull: 0, diner: 0 };
    const euro = (n) => n.toLocaleString("fr-FR") + " €";
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

    $$("[data-price]").forEach((el) => { el.textContent = `(${euro(T[el.dataset.price])})`; });
    const fill = (id, name, list) => {
      $(id).innerHTML = list.map((x) => `<label class="choice"><input type="checkbox" name="${name}" value="${esc(x)}"> <span>${esc(x)}</span></label>`).join("");
    };
    fill("allergies-list", "allergies", C.allergies || []);
    fill("regimes-list", "regime", C.regimes || []);

    // « Aucune allergie » / « Aucun régime » s'excluent avec les autres cases
    ["allergies", "regime"].forEach((name) => {
      const boxes = [...form.querySelectorAll(`input[name="${name}"]`)];
      boxes.forEach((b, i) => b.addEventListener("change", () => {
        if (!b.checked) return;
        if (i === 0) boxes.slice(1).forEach((o) => { o.checked = false; });
        else boxes[0].checked = false;
      }));
    });

    const val = (name) => (form.querySelector(`input[name="${name}"]:checked`) || {}).value || "";
    const checked = (name) => [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((b) => b.value);
    const total = () => (F.pull.checked ? T.pull : 0) + (val("diner") === "Oui" ? T.diner : 0);

    function refresh() {
      $("diet-block").hidden = val("diner") !== "Oui";
      const t = total();
      $("pay-block").hidden = t === 0;
      $("total").textContent = euro(t);
    }
    form.addEventListener("change", refresh);
    refresh();

    function fail(msg, el) {
      const e = $("form-error");
      e.textContent = "⚠️ " + msg;
      e.hidden = false;
      (el || e).scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }

    function validate() {
      $("form-error").hidden = true;
      for (const n of ["prenom", "nom", "classe"]) {
        if (!F[n].value.trim()) { F[n].focus(); return fail("Remplis ton prénom, ton nom et ta classe.", F[n]); }
      }
      if (!val("diner")) return fail("Indique si tu restes manger le soir.");
      if (val("diner") === "Oui") {
        if (!checked("allergies").length && !F.allergies_autre.value.trim()) return fail("Indique tes allergies (ou « Aucune allergie »).", $("allergies-field"));
        if (!checked("regime").length && !F.regime_autre.value.trim()) return fail("Indique ton régime alimentaire (ou « Aucun régime particulier »).", $("regimes-field"));
      }
      if (!val("image")) return fail("Indique ton choix pour le droit à l'image.", $("image-field"));
      if (total() > 0 && !val("paiement")) return fail("Choisis ton moyen de paiement.", $("pay-block"));
      return true;
    }

    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      if (!validate()) return;
      const diner = val("diner") === "Oui";
      const join = (list, other) => [...list, other.trim()].filter(Boolean).join(", ");
      const data = {
        prenom: F.prenom.value.trim(), nom: F.nom.value.trim(), classe: F.classe.value.trim(),
        diner: diner ? "Oui" : "Non",
        pull: F.pull.checked ? "Oui" : "Non",
        santa: F.santa.checked ? "Oui" : "Non",
        image: val("image"),
        allergies: diner ? join(checked("allergies"), F.allergies_autre.value) : "",
        regime: diner ? join(checked("regime"), F.regime_autre.value) : "",
        paiement: total() > 0 ? val("paiement") : "",
        website: F.website.value,
      };
      const btn = $("submit-btn");
      btn.disabled = true;
      btn.textContent = "Envoi en cours…";
      let out;
      try {
        const res = await fetch(C.inscriptionScriptUrl, { method: "POST", body: new URLSearchParams(data) });
        out = await res.json();
      } catch (err) {
        out = { ok: false, error: "L'envoi a échoué. Vérifie ta connexion et réessaie." };
      }
      if (!out.ok) {
        fail(out.error || "L'envoi a échoué, réessaie.");
        btn.disabled = false;
        btn.textContent = "Valider mon inscription";
        return;
      }
      const t = typeof out.montant === "number" ? out.montant : total();
      $("signup-ok-text").innerHTML = t > 0
        ? `Merci ${esc(data.prenom)} ! Il te reste à payer <strong>${euro(t)}</strong> par ${data.paiement.toLowerCase()} avant le ${fmtDate(new Date(C.dateLimitePaiement || C.dateLimiteInscription), true)}.`
        : `Merci ${esc(data.prenom)} ! Rendez-vous le jour J 🎅`;
      form.hidden = true;
      $("signup-ok").hidden = false;
      $("signup-ok").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Neige ---------- */
  function initSnow() {
    const canvas = $("snow");
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    let w, h, flakes;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(120, Math.floor(w / 10));
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 2.5 + 0.8,
        v: Math.random() * 0.6 + 0.3,
        d: Math.random() * Math.PI * 2,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      for (const f of flakes) {
        f.y += f.v; f.d += 0.01; f.x += Math.sin(f.d) * 0.4;
        if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      }
      ctx.fill();
      requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    resize();
    draw();
  }
})();
