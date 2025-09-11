function loadPage(page) {
  fetch(page)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("content").innerHTML = data;

      // Si cargamos categories.html, inicializamos el slider
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

// Asignar evento al enlace del footer about us
document.querySelectorAll("footer a[data-page]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    loadPage(link.getAttribute("data-page"));
  });
});

// Asignar evento al enlace del contact us button
document.querySelectorAll("aside a[data-page]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    loadPage(link.getAttribute("data-page"));
  });
});

// Cargar la página inicial
loadPage("contact_form.html");

// ------------------- SLIDER -------------------
function initSlider() {
  let index = 0;
  const slides = document.getElementById("slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  function moveSlide(step) {
    index = (index + step + totalSlides) % totalSlides;
    slides.style.transform = `translateX(${-index * 100}%)`;
  }

  // botones (solo si existen en el DOM)
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  if (prevBtn && nextBtn) {
    prevBtn.onclick = () => moveSlide(-1);
    nextBtn.onclick = () => moveSlide(1);
  }

  // slider automático
  setInterval(() => {
    moveSlide(1);
  }, 3000);
}

//Order button para ordenar los items en las diferentes páginas
function ordenar() {
  const contenedor = document.getElementById("matriz");
  const celdas = Array.from(contenedor.children);
  celdas.sort((a, b) => a.textContent.localeCompare(b.textContent));
  contenedor.innerHTML = "";
  celdas.forEach((celda) => contenedor.appendChild(celda));
}

// ------------------- SEARCH -------------------
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#search");
  const searchForm = document.querySelector(".search_icon form");

  if (!searchInput || !searchForm) return;

  // Evitar recarga al enviar el form
  searchForm.addEventListener("submit", (e) => e.preventDefault());

  // Buscar al escribir
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    // Si estamos en brands.html
    const brands = document.querySelectorAll(".celda");
    if (brands.length > 0) {
      brands.forEach((brand) => {
        brand.style.display = brand.textContent.toLowerCase().includes(query)
          ? "flex"
          : "none";
      });
    }

    // Si estamos en products.html
    const products = document.querySelectorAll(".gallery img");
    if (products.length > 0) {
      products.forEach((product) => {
        const altText = product.alt.toLowerCase();
        product.style.display = altText.includes(query) ? "block" : "none";
      });
    }
  });
});
