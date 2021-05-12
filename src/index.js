import "./index.scss";
import { sections, SiteSection } from "@wp/pages/_index";

const header = document.querySelector(".gheader");
const main = document.querySelector("main");
const footer = document.querySelector(".gfooter");
const activeSections = filterSections(main, sections);

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