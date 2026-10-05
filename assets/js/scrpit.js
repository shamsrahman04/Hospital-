const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

const savedTheme = localStorage.getItem("harborwell-theme");
if (savedTheme === "dark" || savedTheme === "light") {
  root.dataset.theme = savedTheme;
}

function updateThemeButton() {
  const isDark = root.dataset.theme === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;
  themeToggle.setAttribute("aria-label", label);
  themeToggle.setAttribute("title", label);
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("harborwell-theme", root.dataset.theme);
  updateThemeButton();
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation",
  );
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

document
  .querySelector("#appointment-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = new FormData(form).get("name").trim();
    document.querySelector("#form-feedback").textContent =
      `Thanks, ${name}. This demo form is not connected to scheduling yet. Please call (555) 014-8300 to confirm your visit.`;
    form.reset();
  });
