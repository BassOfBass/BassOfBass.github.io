import { 
  nanoidHTML, 
  formatISODate,
  parseISODate,
  formatDate
} from "@wp/lib/_index";
import { findComponent } from "../_index";

/**
 * @type {TodoList.Container}
 */
const container = {
  id: null,
  element: null
};
/**
 * @type {string[]}
 */
const idList = [];
/**
 * @type {Map<string, TodoList.Item}
 */
const todos = new Map();
/**
 * @type {TodoList.Selected}
 */
const selectedTodo = {
  current: null,
  previous: null
};
/**
 * @type {TodoList.Current}
 */
const currentTodos = {
  element: null,
  list: new Set()
};
/**
 * @type {string[]}
 */
const removedTodos = [];

/**
 * @param {HTMLElement} ancestorElement 
 */
export function initTodoList(ancestorElement) {
  /**
   * @type HTMLFormElement
   */
  const newTodoForm = ancestorElement.querySelector(".new-todo");
  container.element = ancestorElement.querySelector(".todo-list");
  container.id = container.element.id;
  currentTodos.element = ancestorElement.querySelector(".todo-actions__count");
  const todoActions = ancestorElement.querySelector(".todo-actions");
  const clearButton = todoActions.querySelector(".todo-actions__clear");

  Array.from(container.element.querySelectorAll(".todo-list__item"))
    .forEach((element) => {
      const todoItem = createTodoItem(element);
      todos.set(todoItem.id, todoItem);
      idList.push(todoItem.id);

      if (!todoItem.isCompleted) {
        currentTodos.list.add(todoItem.id)
      }
    });

  newTodoForm.addEventListener("submit", addNewTodo);
  container.element.addEventListener("click", tagForRemoval);
  container.element.addEventListener("click", switchCompletion);
  clearButton.addEventListener("click", clearCompleted);
}


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
  const todoItem = createTodoItem(input.value);

  todos.set(todoItem.id, todoItem);
  idList.push(todoItem.id);
  container.element.appendChild(todoItem.element);
  input.value = "";
}

/**
 * @param {MouseEvent} event 
 */
function tagForRemoval(event) {
  event.stopPropagation();

  if (event.target.classList.contains("todo-list__remove")) {
    const date = new Date();
    /**
     * @type {HTMLLIElement}
     */
    const todo = event.target.closest(".todo-list__item");
    const todoItem = todos.get(todo.id);
    const dateField = todoItem.element.querySelector(".todo-list__removed");

    todoItem.element.classList.add("todo-list__item--removed");
    todoItem.isRemoved = true;
    todoItem.dateRemoved = date;
    dateField.dateTime = formatISODate(date);
    dateField.textContent = formatDate(date)
    todo.remove();
  }
}

/**
 * @param {MouseEvent} event
 */
function switchCompletion(event) {
  event.stopPropagation();

  if (event.target.classList.contains("todo-list__check")) {
    /**
     * @type {HTMLLIElement}
     */
    const todo = event.target.closest(".todo-list__item");
    
    if (todo.classList.contains("todo-list__item--completed")) {
      uncompleteTodo(todo.id);
    } else {
      completeTodo(todo.id)
    }

  }
}

/**
 * @param {MouseEvent} event 
 */
function clearCompleted(event) {
  todos.forEach((item) => {
    if (item.isCompleted) {
      removedTodos.push(item.id);
      item.element.remove();
    }
  });
}

/**
 * @param {HTMLLIElement | string} todo
 * @returns {TodoList.Item}
 */
function createTodoItem(todo) {
  
  if (typeof todo === "string") {
    const id = nanoidHTML();
    const date = new Date();
    const item = {
      element: createTodoElement(todo, id, date),
      task: todo,
      id,
      isCompleted: false,
      isRemoved: false,
      dateCreated: date,
      dateCompleted: null,
      dateRemoved: null
    }

    return item;
  }

  const item = {
    element: todo,
    task: todo.querySelector(".todo-list__task").textContent,
    id: todo.id,
    isCompleted: todo.classList.contains("todo-list__item--completed"),
    isRemoved: todo.classList.contains("todo-list__item--removed"),
    dateCreated: parseISODate(todo.querySelector(".todo-list__created").dateTime),
    dateCompleted: parseISODate(todo.querySelector(".todo-list__completed").dateTime),
    dateRemoved: parseISODate(todo.querySelector(".todo-list__removed").dateTime)
  };

  return item;
}

/**
 * @param {string} todoTask 
 * @param {string} id
 * @param {Date} date 
 * @returns {TodoList.Item["element"]}
 */
function createTodoElement(todoTask, id, date) {
  const skeleton = findComponent("todo-list__item");
  /**
   * @type {TodoList.Item["element"]}
   */
  const newTodo = skeleton.cloneNode(true);
  /**
   * @type {HTMLParagraphElement}
   */
  const task = newTodo.querySelector(".todo-list__task");
  const dateField = newTodo.querySelector(".todo-list__created");

  newTodo.id = id;
  task.textContent = todoTask;
  dateField.dateTime = formatISODate(date);
  dateField.textContent = formatDate(date);

  return newTodo;
}

/**
 * @param {string} id 
 */
function completeTodo(id) {
  const todo = todos.get(id);
  const completionDate = new Date();
  const dateField = todo.element.querySelector(".todo-list__completed");

  todo.isCompleted = true;
  dateField.dateTime = formatISODate(completionDate);
  dateField.textContent = formatDate(
    completionDate,
    "do MMMM yyyy"
  );
  todo.element.classList.add("todo-list__item--completed");
}

/**
 * @param {string} id 
 */
function uncompleteTodo(id) {
  const todo = todos.get(id);
  const dateField = todo.element.querySelector(".todo-list__completed");

  todo.isCompleted = false;
  todo.element.classList.remove("todo-list__item--completed");
  dateField.dateTime = ""
  dateField.textContent = ""
}

