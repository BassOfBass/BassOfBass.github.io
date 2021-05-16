import { nanoidHTML } from "@wp/lib/_index";
import { initSectionPreviews } from "@wp/pages/previews/previews";
import { initTextAreaPreview } from "@wp/pages/previews/editable-textarea";
import { initTablePreview } from "@wp/pages/previews/table-stuff/table-stuff";

export class SiteSection {
  /**
   * @param {string} name 
   * @param {(section: HTMLElement) => void} callback 
   */
  constructor(name, callback) {
    this.name = name,
    this.callback = callback;
    this.selector = `section.site-section--${name}`;
    this.id = nanoidHTML();
  }
}

/**
 * @type {SiteSection[]}
 */
export const sections = [
  new SiteSection("previews", initSectionPreviews),
  new SiteSection("textarea", initTextAreaPreview),
  new SiteSection("tables", initTablePreview)
]