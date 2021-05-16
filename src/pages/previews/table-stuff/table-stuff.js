/**
 * @param {HTMLElement} section 
 */
export function initTablePreview(section) {
  /**
   * @type {HTMLTableElement}
   */
  const table = section.querySelector("#big-table");
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const tableFooter = table.querySelector("tbfooter");
  /**
   * @type {HTMLFormElement}
   */
  const cellEditor = section.querySelector(".cell-editor");
  /**
   * @type {HTMLInputElement}
   */
  const editorInput = cellEditor.querySelector(".cell-editor__input");

  /**
   * @type {HTMLTableDataCellElement}
   */
  let selectedCell;

  table.addEventListener("click", selectCell);
  cellEditor.addEventListener("submit", confirmEdit);
  /**
   * @param {MouseEvent} event
   */
  function selectCell(event) {
    event.stopPropagation();

    /**
     * @type {HTMLTableDataCellElement}
     */
    const tableCell = event.target;

    if (tableCell.classList.contains("table__cell") && tableCell !== selectedCell) {
      selectedCell && selectedCell.classList.remove("table__cell--selected");
      tableCell.classList.add("table__cell--selected");
      selectedCell = tableCell;
      editCell(tableCell);
    }
  }

  /**
   * @param {HTMLTableDataCellElement} cell 
   */
  function editCell(cell) {
    cell.classList.toggle("table__cell--editing", true);

    editorInput.value = cell.textContent;
    cell.appendChild(cellEditor);
    editorInput.focus();
  }

  /**
   * @param {Event} event 
   */
  function confirmEdit(event) {
    event.preventDefault();
    selectedCell.textContent = editorInput.value;
    selectedCell.classList.remove("table__cell--editing");
    editorInput.value = "";
  }
}



/**
 * @param {HTMLTableElement} table 
 * @param {string} id 
 */
function toggleColumn(table, id) {

}


