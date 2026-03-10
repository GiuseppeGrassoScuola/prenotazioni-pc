document.addEventListener("DOMContentLoaded", () => {
  const links = {
    bacheca: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT9KPxL_HxaQWEhixnNTr5qOY4rcNu8AIbfgvmIEEXepLOQZqL0z4NXt3AD-N7sUZ_E0OWvKTpijdU7/pubhtml?gid=0&single=true",
    prenotazione: "https://forms.gle/9X31GkumzhMnc4DM6",
    modifica: "https://forms.gle/Ex98ugN6JEo1PPfM8",
    bachecaEmbed: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT9KPxL_HxaQWEhixnNTr5qOY4rcNu8AIbfgvmIEEXepLOQZqL0z4NXt3AD-N7sUZ_E0OWvKTpijdU7/pubhtml?gid=0&single=true"
  };

  const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

  const setLink = (id, url) => {
    const element = document.getElementById(id);
    if (element && url) {
      element.href = url;
    }
  };

  const buildNoCacheUrl = (url) => {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}t=${Date.now()}`;
  };

  const updateBoardStatus = (text) => {
    const status = document.getElementById("bachecaStatus");
    if (status) {
      status.textContent = text;
    }
  };

  const setFrame = (id, url) => {
    const frame = document.getElementById(id);
    if (frame && url) {
      updateBoardStatus("Aggiornamento bacheca in corso...");
      frame.src = buildNoCacheUrl(url);
    }
  };

  setLink("bachecaTopLink", links.bacheca);
  setLink("prenotaTopLink", links.prenotazione);
  setLink("modificaTopLink", links.modifica);
  setLink("bacheca-link", links.bacheca);
  setLink("prenotazione-link", links.prenotazione);
  setLink("modifica-link", links.modifica);
  setLink("bachecaButtonLink", links.bacheca);
  setLink("footerPrenotaLink", links.prenotazione);
  setLink("footerModificaLink", links.modifica);

  setFrame("bachecaFrame", links.bachecaEmbed);

  const bachecaFrame = document.getElementById("bachecaFrame");
  const refreshButton = document.getElementById("refreshBachecaButton");

  if (bachecaFrame) {
    bachecaFrame.addEventListener("load", () => {
      const now = new Date();
      const formatted = now.toLocaleString("it-IT");
      updateBoardStatus(`Ultimo aggiornamento richiesto: ${formatted}`);
    });
  }

  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      setFrame("bachecaFrame", links.bachecaEmbed);
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      setFrame("bachecaFrame", links.bachecaEmbed);
    }
  });

  window.addEventListener("focus", () => {
    setFrame("bachecaFrame", links.bachecaEmbed);
  });

  setInterval(() => {
    if (!document.hidden) {
      setFrame("bachecaFrame", links.bachecaEmbed);
    }
  }, REFRESH_INTERVAL_MS);

  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav--open");
    });

    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("nav--open");
      });
    });
  }
});
