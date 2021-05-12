import "./styles/main.scss";

const header = document.querySelector(".gheader");

initBurger(header);

/**
 * @param {HTMLElement} header 
 */
function initBurger(header) {
  /**
   * @type HTMLLabelElement
   */
  const burger = header.querySelector(".gburger");
  const icon = burger.querySelector(".burger-icon");
  /**
   * @type HTMLInputElement
   */
  const burgerSwitch = document.querySelector(`#${burger.htmlFor}`);

  burgerSwitch.addEventListener("input", handleBurger);

  function handleBurger(event) {
    icon.classList.toggle("close");
  }
}
