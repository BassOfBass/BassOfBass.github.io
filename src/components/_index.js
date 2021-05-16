import { nanoidHTML } from "@wp/lib/_index";

/**
 * @type Map<string, HTMLElement>
 */
const components = new Map();

/**
 * @param {HTMLElement} ancestorElement 
 */
export function ComponentFactory(ancestorElement) {
  const container = ancestorElement.querySelector(".component-container");
  container.id = nanoidHTML();
  const componentList = container.querySelectorAll(`#${container.id} > *`);
  
  componentList.forEach((component) => {
    components.set(component.className, component)
  });
}

/**
 * @param {string} className 
 * @returns {HTMLElement}
 */
export function retrieveComponent(className) {

  if (!components.has(className)) {
    throw new Error(`No component under name '${className}' exists.`);
  }

  const skeleton = components.get(className);
  const skelCopy = skeleton.cloneNode(true);

  return skelCopy;
}