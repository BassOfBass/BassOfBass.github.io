import "@wp/assets/favicon-32x32.png";
import "./index.scss";
import { sections, SiteSection } from "@wp/pages/_index";
import { ComponentFactory } from "./components/_index";

const header = document.querySelector(".gheader");
const main = document.querySelector("main");
const globalFooter = document.querySelector(".global-footer");
const activeSections = filterSections(main, sections);

ComponentFactory(globalFooter);

/**
 * @param {HTMLElement} main
 * @param {SiteSection[]} sections
 * @returns {HTMLElement[]}
 */
function filterSections(main, sections) {
  const activeSections = [];

  for (const { selector, callback } of sections) {
    /**
     * @type HTMLElement | null
     */
    const section = main.querySelector(selector);

    if (section) {
      callback(section);
      activeSections.push(section);
    }
  }

  return activeSections;
}