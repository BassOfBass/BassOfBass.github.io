import "./styles/main.scss";
import iconCheck from "./assets/icon-check.svg";
import { nanoidHTML } from "@wp/lib/_index";

class TodoTask {
  /**
   * @param {string} task
   */
  constructor(task) {
    this.task = task;
    this.id = nanoidHTML();
    this.isCompleted = false;
    this.isRemoved = false;
    this.dateCreated = new Date().toISOString();
    this.dateCompleted = null;
    this.dateRemoved = null;
  }
}

const globalTheme = document.querySelector(".gtheme");
const header = document.querySelector(".gheader");
const main = document.querySelector("main");

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
  const todoList = main.querySelector(".todo-list")

  newTodoForm.addEventListener("submit", addNewTodo);

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
   * @param {TodoTask} todoTask 
   * @returns {HTMLLIElement}
   */
  function createTodoListItem(todoTask) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const buttonRemove = document.createElement("button");
    const buttonCheck = document.createElement("button");
    
    li.classList.add("todo-item");
    p.classList.add("todo-task");
    buttonRemove.classList.add("todo-remove");
    buttonCheck.classList.add("todo-check");
    buttonRemove.type = "button";
    buttonCheck.type = "button";
    li.id = todoTask.id;
    p.textContent = todoTask.task;
    buttonRemove.textContent = "―";

    buttonCheck.appendChild(iconCheck);
    li.appendChild(buttonCheck);
    li.appendChild(p);
    li.appendChild(buttonRemove);

    return li;
  }
}