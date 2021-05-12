import "./todo-app.scss";
import "./assets";
import { createTodoListItem, TodoTask } from "./components/todo-list";
import { ComponentContainer } from "./components/component-container";

const globalTheme = document.querySelector(".gtheme");
const header = document.querySelector(".gheader");
const footer = document.querySelector(".gfooter");
const main = document.querySelector("main");

export const { getComponent } = ComponentContainer(footer);

initHeader(header, globalTheme);
initMain(main);

/**
 * @param {HTMLElement} header 
 * @param {HTMLElement} theme 
 */
function initHeader(header, theme) {
  /**
   * @type {HTMLButtonElement}
   */
  const themeButton = header.querySelector(".gswitch > button");

  themeButton.addEventListener("click", handleThemeChange);

  function handleThemeChange(event) {
    theme.classList.toggle("dark");
  }
}

/**
 * @param {HTMLElement} main 
 */
function initMain(main) {
  /**
   * @type HTMLFormElement
   */
  const newTodoForm = main.querySelector(".new-todo");
  /**
   * @type {HTMLUListElement}
   */
  const todoList = main.querySelector(".todo-list");

  newTodoForm.addEventListener("submit", addNewTodo);
  todoList.addEventListener("click", removeTodo);

  /**
   * @param {Event} event 
   */
  function addNewTodo(event) {
    event.preventDefault();

    /**
     * @type HTMLFormElement
     */
    const form = event.target;
    /**
     * @type HTMLInputElement
     */
    const input = form.elements["todo-task"];
    const todoTask = new TodoTask(input.value);
    const listItem = createTodoListItem(todoTask);

    todoList.appendChild(listItem);
    input.value = "";
  }

  /**
   * @param {MouseEvent} event 
   */
  function removeTodo(event) {
    event.stopPropagation();
  }
}