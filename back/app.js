function loadPage(page) {
  fetch(page)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("content").innerHTML = data;

      window.scrollTo({ top: 0, behavior: "smooth" });

      if (page === "categories.html") {
        initSlider();
      }
    })
    .catch(() => {
      document.getElementById("content").innerHTML =
        "<p>Error loading content</p>";
    });
}

// Asignar evento a los enlaces del menú
document.querySelectorAll("nav a[data-page]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    loadPage(link.getAttribute("data-page"));
  });
});

// Asignar evento al enlace del footer
document.querySelectorAll("footer a[data-page]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    loadPage(link.getAttribute("data-page"));
  });
});

// Cargar la página inicial
loadPage("terms_conds.html");

// ------------------- SLIDER -------------------

function initSlider() {
  let index = 0;
  const slides = document.getElementById("slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  function moveSlide(step) {
    index = (index + step + totalSlides) % totalSlides;
    slides.style.transform = `translateX(${-index * 100}%)`;
  }

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  if (prevBtn && nextBtn) {
    prevBtn.onclick = () => moveSlide(-1);
    nextBtn.onclick = () => moveSlide(1);
  }

  setInterval(() => {
    moveSlide(1);
  }, 3000);
}

// ------------------- SEARCH -------------------
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#search");
  const searchForm = document.querySelector(".search_icon form");

  if (!searchInput || !searchForm) return;
  searchForm.addEventListener("submit", (e) => e.preventDefault());

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const brands = document.querySelectorAll(".celda");
    if (brands.length > 0) {
      brands.forEach((brand) => {
        brand.style.display = brand.textContent.toLowerCase().includes(query)
          ? "flex"
          : "none";
      });
    }

    const products = document.querySelectorAll(".gallery figure");
    if (products.length > 0) {
      products.forEach((figure) => {
        const img = figure.querySelector("img");
        const altText = img.alt.toLowerCase();

        if (altText.includes(query)) {
          figure.style.display = "inline-block";
        } else {
          figure.style.display = "none";
        }
      });
    }
  });
});

// ------------------- CONTACT FORM -------------------
const form = document.getElementById("contactForm");
const confirmation = document.getElementById("confirmation");
const mailto = document.getElementById("mailtoLink");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const company = document.getElementById("company").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const mailtoHref = `mailto:cmcomputer.network@gmail.com?subject=${encodeURIComponent(
      subject || "New Contact Form Submission"
    )}&body=${encodeURIComponent(
      `Full Name: ${fullname}
Company: ${company}
Email: ${email}
Phone: ${phone}
Message: ${message}`
    )}`;

    mailto.href = mailtoHref;
    mailto.click();

    form.reset();
    confirmation.style.display = "block";
  });
}

// ------------------- MENÚ HAMBURGUESA -------------------
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");

      // Cambiar icono ☰ ↔ ✖
      hamburger.innerHTML = menu.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menú al hacer clic en un enlace
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
});
