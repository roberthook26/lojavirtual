const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const bookingForm = document.querySelector("#booking-form");
const serviceSelect = document.querySelector("#service-select");
const whatsappNumber = "5548998409515";

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    navigation.classList.remove("is-open");
  });
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

document.querySelectorAll("[data-product]").forEach((link) => {
  const product = link.dataset.product;
  const message = `Olá! Tenho interesse no produto: ${product}. Pode me informar preço, disponibilidade e compatibilidade?`;
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const formData = new FormData(bookingForm);
  const name = formData.get("name").toString().trim();
  const city = formData.get("city").toString();
  const service = serviceSelect.selectedOptions[0].textContent.trim();
  const details = formData.get("details").toString().trim();
  const message = [
    "Olá! Vim pelo site da NorteByte e gostaria de agendar um atendimento.",
    `Nome: ${name}`,
    `Serviço: ${service}`,
    details ? `Detalhes: ${details}` : "",
    `Cidade: ${city}`,
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();