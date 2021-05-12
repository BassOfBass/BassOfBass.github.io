import { nanoidHTML } from "@wp/lib/_index";

/**
 * @param {HTMLElement} footer
 * @returns {{ container: HTMLElement, getComponent: (className: string) => Element }}
 */
export function ComponentContainer(footer) {
  const container = footer.querySelector(".component-container");
  container.id = nanoidHTML();
  const items = Array.from(
    container.querySelectorAll(`#${container.id} > *`)
  );

  return {
    container,
    getComponent: getComponent(items)
  }
}

/**
 * @param {Element[]} items 
 * @returns {(className: string) => Element}
 */
function getComponent(items) {
  return (className) => {
    const component = items.find(({ classList }) => {
      classList.contains(className);
    });

    if (!component) {
      throw new Error(`No component under ${className} exists.`)
    }

    return component;
  }
}