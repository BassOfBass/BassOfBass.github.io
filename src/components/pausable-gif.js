const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const details = document.querySelector("..pausable-gif__details");

if (mediaQuery.matches) {
  details.removeAttribute("open");
}