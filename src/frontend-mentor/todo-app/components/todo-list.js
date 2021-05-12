import { nanoidHTML } from "@wp/lib/_index";
import { getComponent } from "../todo-app";

export class TodoTask {
  /**
   * @param {string} task
   */
  constructor(task) {
    this.task = task;
    this.id = nanoidHTML();
    this.isCompleted = false;
    this.isRemoved = false;
    this.dateCreated = new Date();
    this.dateCompleted = null;
    this.dateRemoved = null;
  }
}

/**
 * @param {TodoTask} todoTask 
 * @returns {HTMLLIElement}
 */
export function createTodoListItem(todoTask) {

  const skeleton = getComponent("todo-list");
  /**
   * @type {HTMLLIElement}
   */
  const newTodo = skeleton.cloneNode(true);
  /**
   * @type {HTMLParagraphElement}
   */
  const task = newTodo.querySelector(".todo-list__task");

  newTodo.id = todoTask.id;
  task.textContent = todoTask.task;

  return newTodo;
}