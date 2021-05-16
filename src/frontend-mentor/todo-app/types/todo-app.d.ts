namespace ComponentFactory {
  export interface Container {
    id: string
    element: HTMLDivElement
  }

  export interface Item extends HTMLElement {}
}

namespace TodoList {
  export interface Container {
    id: string
    element: HTMLUListElement
  }

  export interface Item {
    element: HTMLLIElement
    id: string
    task: string
    isCompleted: boolean
    isRemoved: boolean
    dateCreated: Date
    dateCompleted: Date
    dateRemoved: Date
  }

  export interface Selected {
    current: Item
    previous: Item
  }

  export interface Current {
    element: HTMLSpanElement
    list: Set<string>
  }
}