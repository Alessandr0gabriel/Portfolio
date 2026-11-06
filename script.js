const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");
const year = document.getElementById("current-year");
const emailLink = document.querySelector(".email-link");
const copyEmailButton = document.querySelector(".copy-email");
const copyEmailStatus = document.querySelector(".copy-email-status");

year.textContent = new Date().getFullYear();

copyEmailButton.hidden = false;
copyEmailButton.addEventListener("click", async () => {
  if (!navigator.clipboard || !window.isSecureContext) {
    copyEmailStatus.textContent = "Não foi possível copiar. Selecione e copie o endereço acima.";
    return;
  }

  try {
    await navigator.clipboard.writeText(emailLink.getAttribute("href").slice("mailto:".length));
    copyEmailStatus.textContent = "E-mail copiado!";
  } catch (error) {
    console.error("Não foi possível copiar o e-mail:", error);
    copyEmailStatus.textContent = "Não foi possível copiar. Selecione e copie o endereço acima.";
  }
});

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  navigation.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

backToTop.addEventListener("click", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

window.addEventListener(
  "scroll",
  () => {
    const hasScrolled = window.scrollY > 24;
    header.classList.toggle("is-scrolled", hasScrolled);
    backToTop.hidden = window.scrollY < 480;
  },
  { passive: true },
);
