// набор функций для имутабельной модификации списка туду

import { FilteredStatus, Todo, TodoBody } from './types';

export function addTodo(todos: Todo[], todoBody: TodoBody, genId: () => string): Todo[] {
  const todo: Todo = {
    ...todoBody,
    id: genId(),
  };

  return [todo, ...todos];
}

export function patchTodo(todos: Todo[], todoBody: TodoBody, todoId: string): Todo[] {
  return todos.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, ...todoBody };
    }
    return todo;
  });
}

export function completeToggle(todos: Todo[], todoId: string): Todo[] {
  return todos.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, isComplete: !todo.isComplete };
    }
    return todo;
  });
}

export function getItemsLeft(todos: Todo[]): number {
  return todos.filter((todo) => !todo.isComplete).length;
}

export function todosFiltered(todos: Todo[], status: FilteredStatus): Todo[] {
  if (status === FilteredStatus.ACTIVE) {
    return todos.filter((todo) => !todo.isComplete);
  }

  if (status === FilteredStatus.COMPLETED) {
    return todos.filter((todo) => todo.isComplete);
  }

  return todos.slice();
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.isComplete);
}
