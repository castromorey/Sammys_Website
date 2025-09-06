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

// Cargar la página inicial
loadPage("products.html");

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

//Order button
function ordenar() {
  const contenedor = document.getElementById("matriz");
  const celdas = Array.from(contenedor.children);
  celdas.sort((a, b) => a.textContent.localeCompare(b.textContent));
  contenedor, (innerHTML = "");
  celdas.forEach((celda) => contenedor.appendChild(celda));
}

//Search Product
/*
const search = document.getElementById("search");
const items = document.querySelectorAll("#info li");

search.addEventListener("input", function () {
  let text = this.value.toLowerCase().trim();

  items.forEach((item) => {
    //Si el texto coincide con el contenido, mostrar; si no, ocultar
    item.style.display = item.textContent.toLowerCase().includes(text)
      ? ""
      : "none";
  });
});*/
