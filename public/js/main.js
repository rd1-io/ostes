document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const bookingForms = document.querySelectorAll("form[data-booking-form]");

  function closeMenu() {
    if (!header) return;
    header.classList.remove("is-menu-open");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!header) return;
    header.classList.add("is-menu-open");
    document.body.style.overflow = "hidden";
  }

  if (menuToggle && header) {
    menuToggle.addEventListener("click", () => {
      header.classList.contains("is-menu-open") ? closeMenu() : openMenu();
    });
  }

  document.querySelectorAll(".nav-links a, .nav-dropdown-menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
    const href = link.getAttribute("href") || "";
    if (href !== "#" && window.location.pathname.endsWith(href)) {
      link.classList.add("is-active");
    }
  });

  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  bookingForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      const phoneInput = form.querySelector('input[name="phone"]');
      const messageBox = form.querySelector(".form-message");
      if (!phoneInput) return;

      const phone = phoneInput.value.trim();
      if (!phone) {
        event.preventDefault();
        if (messageBox) {
          messageBox.textContent = "Пожалуйста, укажите номер телефона.";
          messageBox.className = "form-message form-message--error";
        }
        phoneInput.focus();
        return;
      }

      if (messageBox) {
        messageBox.textContent = "Отправляем заявку...";
        messageBox.className = "form-message";
      }
    });
  });
});
