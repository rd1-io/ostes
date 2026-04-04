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

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
    const href = link.getAttribute("href") || "";
    if (href !== "#" && window.location.pathname.endsWith(href)) {
      link.classList.add("is-active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* Hero carousel */
  const track = document.querySelector(".carousel-track");
  const dots = document.querySelectorAll(".carousel-dot");
  if (track && dots.length) {
    let current = 0;
    const total = dots.length;
    let timer = null;
    let paused = false;

    function goTo(idx) {
      current = ((idx % total) + total) % total;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(() => { if (!paused) goTo(current + 1); }, 6000);
    }

    function stopAuto() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => { goTo(i); startAuto(); });
    });

    let touchX = 0;
    track.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); startAuto(); }
    });

    track.addEventListener("mouseenter", () => { paused = true; });
    track.addEventListener("mouseleave", () => { paused = false; });

    startAuto();
  }

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
