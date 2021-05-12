import Prism from "prismjs";
/**
 * @param {HTMLElement} section 
 */
export function initTextAreaPreview(section) {
  /**
   * @type {HTMLTextAreaElement}
   */
  const textArea = section.querySelector("#code-area");
  const pre = section.querySelector("#highlighting");
  /**
   * @type {HTMLElement}
   */
  const code = section.querySelector("#highlighting-content");

  textArea.addEventListener("keyup", update);

  function update() {
    code.innerText = textArea.value;
    Prism.highlightElement(code);
  }
}

