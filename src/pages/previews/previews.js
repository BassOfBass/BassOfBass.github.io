/**
 * @param {HTMLElement} section 
 */
export function initSectionPreviews(section) {
  /**
   * @type HTMLFormElement | null
   */
  const form = section.querySelector(".form-examples");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
  })
}
