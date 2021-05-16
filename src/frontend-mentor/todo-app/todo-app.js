import "./todo-app.scss";
import "./assets";
import { initComponentFactory, initTodoList } from "./components/_index";

const globalTheme = document.querySelector(".gtheme");
const header = document.querySelector(".gheader");
const footer = document.querySelector(".gfooter");
const main = document.querySelector("main");

initComponentFactory(footer);
initHeader(header, globalTheme);
initMain(main);

/**
 * @param {HTMLElement} header 
 * @param {HTMLElement} theme 
 */
function initHeader(header, theme) {
  /**
   * @type {HTMLButtonElement}
   */
  const themeButton = header.querySelector(".gswitch > button");

  themeButton.addEventListener("click", handleThemeChange);

  function handleThemeChange(event) {
    theme.classList.toggle("dark");
  }
}

/**
 * @param {HTMLElement} main 
 */
function initMain(main) {
  initTodoList(main);
}