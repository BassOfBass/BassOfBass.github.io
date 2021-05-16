import { nanoidHTML } from "@wp/lib/_index";

/**
 * @type {ComponentFactory.Container}
 */
const container = {
  element: null,
  id: null
}
/**
 * @type {Map<string, ComponentFactory.Item}
 */
const components = new Map();

/**
 * @param {HTMLElement} footer
 */
export function initComponentFactory(footer) {
  container.element = footer.querySelector(".component-container");

  // asign element's id to the container
  // otherwise create a new one and assign to element
  if (container.element.id) {
    container.id = container.element.id;
  } else {
    container.id = nanoidHTML();
    container.element.id = container.id;
  }

  // fill out components map from DOM
  Array.from(container.element.querySelectorAll(`#${container.id} > *`))
    .forEach((element) => {
      components.set(element.className, element);
    })
}

/**
 * @param {string} className 
 * @returns {ComponentFactory.Item}
 */
export function findComponent(className) {
  const component = components.get(className);

  if (!component) {
    throw new Error(`No component under ${className} exists.`)
  }

  return component;
}