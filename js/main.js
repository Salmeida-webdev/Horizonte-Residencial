const planData = {
  92: {
    name: "Planta essencial",
    description: "Integração entre estar, jantar e varanda, com ambientes bem distribuídos para a rotina.",
    rooms: "2 quartos",
    suites: "1 suíte",
    balcony: "integrada à sala",
    code: "HR · 092",
    kicker: "Planta 01",
    svgTitle: "Planta ilustrativa de 92 metros quadrados",
    svgDescription: "Esquema com sala integrada, varanda, cozinha, dois quartos e banheiros."
  },
  124: {
    name: "Planta ampla",
    description: "Mais espaço para compartilhar momentos, com três quartos e varanda conectada à área social.",
    rooms: "3 quartos",
    suites: "2 suítes",
    balcony: "área social ampliada",
    code: "HR · 124",
    kicker: "Planta 02",
    svgTitle: "Planta ilustrativa de 124 metros quadrados",
    svgDescription: "Esquema com sala integrada, varanda, cozinha, três quartos e banheiros."
  }
};

const planTabs = [...document.querySelectorAll(".plan-tab")];
const planFormSelect = document.querySelector("#interest-plan");
const WHATSAPP_NUMBER = "5583998739712";

function trackEvent(eventName, parameters = {}) {
  window.dataLayer?.push({ event: eventName, ...parameters });
}

function makeWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function choosePlan(planId, announce = false) {
  const plan = planData[planId];
  if (!plan) return;

  planTabs.forEach((tab) => {
    const active = tab.dataset.plan === String(planId);
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-pressed", String(active));
  });

  document.querySelector("#plan-code").textContent = plan.code;
  document.querySelector("#plan-kicker").textContent = plan.kicker;
  document.querySelector("#plan-name").textContent = plan.name;
  document.querySelector("#plan-description").textContent = plan.description;
  document.querySelector("#plan-area").textContent = `${planId} m²`;
  document.querySelector("#plan-rooms").textContent = plan.rooms;
  document.querySelector("#plan-suites").textContent = plan.suites;
  document.querySelector("#plan-balcony-note").textContent = plan.balcony;
  document.querySelector("#floorplan-title").textContent = plan.svgTitle;
  document.querySelector("#floorplan-description").textContent = plan.svgDescription;
  document.querySelector("#layout-92").hidden = String(planId) !== "92";
  document.querySelector("#layout-124").hidden = String(planId) !== "124";
  if (planFormSelect) planFormSelect.value = String(planId);
  const planCta = document.querySelector("[data-plan-cta]");
  if (planCta) {
    const message = `Olá! Vi o projeto conceitual Horizonte Residencial no portfólio e gostaria de conhecer a apresentação da planta de ${planId} m².`;
    planCta.href = makeWhatsAppUrl(message);
  }
  if (announce) trackEvent("plan_select", { plan_id: String(planId) });
}

planTabs.forEach((tab) => tab.addEventListener("click", () => choosePlan(tab.dataset.plan, true)));

document.querySelector("#plan-interest").addEventListener("click", () => {
  trackEvent("cta_click", { cta_location: "plan_section" });
});

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => trackEvent("cta_click", { cta_location: element.dataset.track }));
});

const floatingCta = document.querySelector(".floating-cta");
const contactSection = document.querySelector("#contato");
if (floatingCta && contactSection && "IntersectionObserver" in window) {
  const contactObserver = new IntersectionObserver(([entry]) => {
    floatingCta.classList.toggle("is-hidden", entry.isIntersecting);
  }, { threshold: 0.12 });
  contactObserver.observe(contactSection);
}

const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  siteHeader.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    siteHeader.classList.remove("menu-open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteHeader.classList.contains("menu-open")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    siteHeader.classList.remove("menu-open");
    menuToggle.focus();
  }
});

const galleryItems = [...document.querySelectorAll(".gallery-card")];
const galleryDialog = document.querySelector("#gallery-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogCaption = document.querySelector("#dialog-caption");
let currentGalleryIndex = 0;
let lastGalleryTrigger = null;

function showGalleryItem(index) {
  currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;
  const card = galleryItems[currentGalleryIndex];
  const image = card.querySelector("img");
  const caption = card.querySelector(".gallery-caption span:first-child");
  dialogImage.src = image.src;
  dialogImage.alt = image.alt;
  dialogCaption.textContent = caption.textContent;
}

galleryItems.forEach((card, index) => {
  card.addEventListener("click", () => {
    lastGalleryTrigger = card;
    showGalleryItem(index);
    galleryDialog.showModal();
    document.querySelector(".dialog-close").focus();
    trackEvent("gallery_open", { gallery_index: index });
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => galleryDialog.close());
document.querySelector(".dialog-prev").addEventListener("click", () => showGalleryItem(currentGalleryIndex - 1));
document.querySelector(".dialog-next").addEventListener("click", () => showGalleryItem(currentGalleryIndex + 1));
galleryDialog.addEventListener("click", (event) => {
  if (event.target === galleryDialog) galleryDialog.close();
});
galleryDialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showGalleryItem(currentGalleryIndex + 1);
  if (event.key === "ArrowLeft") showGalleryItem(currentGalleryIndex - 1);
});
galleryDialog.addEventListener("close", () => {
  lastGalleryTrigger?.focus();
  trackEvent("gallery_close");
});

const interestForm = document.querySelector("#interest-form");
interestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#form-status");
  status.textContent = "";

  if (!interestForm.checkValidity()) {
    interestForm.reportValidity();
    return;
  }

  const name = document.querySelector("#visitor-name").value.trim();
  const selectedPlan = planFormSelect.value;
  const message = `Olá! Vi o projeto conceitual Horizonte Residencial no portfólio. Meu nome é ${name} e gostaria de conversar sobre a apresentação da planta de ${selectedPlan} m².`;
  const whatsappWindow = window.open("about:blank", "_blank");
  if (whatsappWindow) {
    whatsappWindow.opener = null;
    whatsappWindow.location.href = makeWhatsAppUrl(message);
    status.textContent = "O WhatsApp foi aberto em outra aba. Revise a mensagem e confirme o envio por lá.";
    trackEvent("whatsapp_lead_start", { plan_id: selectedPlan });
  } else {
    status.textContent = "O navegador bloqueou a nova aba. Use o botão flutuante do WhatsApp para continuar.";
  }
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
