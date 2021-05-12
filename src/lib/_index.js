import { nanoid } from "nanoid";

/**
 * @param {number} ms 
 * @returns {Promise<true>}
 */
export function asyncTimeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

export function nanoidHTML() {
  return `u${nanoid()}`;
}