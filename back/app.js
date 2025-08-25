function loadPage(page) {
  fetch(page)
    .then((res) => res.text())
    .then((data) => (document.getElementById("content").innerHTML = data))
    .catch(
      () =>
        (document.getElementById("content").innerHTML =
          "<p>Error loading content</p>")
    );
}

// Asignar evento a los enlaces del menú
document.querySelectorAll("nav a[data-page]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    loadPage(link.getAttribute("data-page"));
  });
});

// Cargar la página inicial
loadPage("home.html");
