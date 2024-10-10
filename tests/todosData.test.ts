import { expect } from 'vitest';
import {
  addTodo,
  clearCompleted,
  completeToggle,
  getItemsLeft,
  patchTodo,
  todosFiltered,
} from '~/features/todos/TodosData';
import { FilteredStatus, Todo, TodoBody } from '~/features/todos/types';

const makeTodo = (id: string): Todo => ({ isComplete: false, id, text: `todo ${id}` });

it('addTodo должен отработать правильно', () => {
  const makeOriginalTodos = (): Todo[] => [makeTodo('1'), makeTodo('2'), makeTodo('3')];
  const originalTodos = makeOriginalTodos();
  const todo = makeTodo('4');
  const { id: _, ...todoBody } = todo;
  const expectTodos = [makeTodo('4'), makeTodo('1'), makeTodo('2'), makeTodo('3')];
  const genId = () => '4';

  // проверяем что нам вернули правильно модифицированный список туду
  expect(addTodo(originalTodos, todoBody, genId)).toEqual(expectTodos);
  // проверяем что исходный массив todo не был модифицирован
  expect(originalTodos).toEqual(makeOriginalTodos());
});

it('patchTodo должен отработать правильно', () => {
  const UPDATE_ID = '2';
  const makeOriginalTodos = (): Todo[] => [makeTodo('1'), makeTodo(UPDATE_ID), makeTodo('3')];
  const originalTodos = makeOriginalTodos();
  const makeUpdateBody = (): TodoBody => ({ isComplete: true, text: 'updated body' });
  const makeExpectTodos = (): Todo[] => [makeTodo('1'), { id: UPDATE_ID, ...makeUpdateBody() }, makeTodo('3')];

  // проверяем что нам вернули правильно модифицированный список туду
  expect(patchTodo(originalTodos, makeUpdateBody(), UPDATE_ID)).toEqual(makeExpectTodos());
  // проверяем что исходный массив todo не был модифицирован
  expect(originalTodos).toEqual(makeOriginalTodos());
});

it('completeToggle должен отработать правильно', () => {
  const UPDATE_ID = '2';
  const makeOriginalTodos = (): Todo[] => [makeTodo('1'), makeTodo(UPDATE_ID), makeTodo('3')];
  const originalTodos = makeOriginalTodos();
  const makeExpectTodos = (): Todo[] => [makeTodo('1'), { ...makeTodo(UPDATE_ID), isComplete: true }, makeTodo('3')];
  // проверяем что нам вернули правильно модифицированный список туду
  expect(completeToggle(originalTodos, UPDATE_ID)).toEqual(makeExpectTodos());
  expect(originalTodos).toEqual(makeOriginalTodos());
});

it('getItemsLeft должен отработать правильно', () => {
  const makeOriginalTodos = (): Todo[] => [makeTodo('1'), makeTodo('2'), makeTodo('3')];
  const originalTodos = makeOriginalTodos();

  // проверяем что нам вернули правильное кол-во элементов
  expect(getItemsLeft(originalTodos)).toEqual(originalTodos.length);
  // проверяем что исходный массив todo не был модифицирован
  expect(originalTodos).toEqual(makeOriginalTodos());
});

it('getItemsLeft должен отдать все элементы для статуса FilteredStatus.ALL', () => {
  const makeOriginalTodos = (): Todo[] => [
    { ...makeTodo('1'), isComplete: true },
    { ...makeTodo('2'), isComplete: false },
    { ...makeTodo('3'), isComplete: true },
    { ...makeTodo('4'), isComplete: false },
    { ...makeTodo('5'), isComplete: false },
  ];
  const originalTodos = makeOriginalTodos();

  // проверяем что нам вернули правильное кол-во элементов
  expect(todosFiltered(originalTodos, FilteredStatus.ALL)).toEqual(makeOriginalTodos());
  // проверяем что исходный массив todo не был модифицирован
  expect(originalTodos).toEqual(makeOriginalTodos());
});

it('getItemsLeft должен отдать активные элементы для статуса FilteredStatus.ACTIVE', () => {
  const makeOriginalTodos = (): Todo[] => [
    { ...makeTodo('1'), isComplete: true },
    { ...makeTodo('2'), isComplete: false },
    { ...makeTodo('3'), isComplete: true },
    { ...makeTodo('4'), isComplete: false },
    { ...makeTodo('5'), isComplete: false },
  ];
  const originalTodos = makeOriginalTodos();

  // проверяем что нам вернули правильное кол-во элементов
  expect(todosFiltered(originalTodos, FilteredStatus.ACTIVE)).toEqual(
    makeOriginalTodos().filter((todo) => !todo.isComplete),
  );
  // проверяем что исходный массив todo не был модифицирован
  expect(originalTodos).toEqual(makeOriginalTodos());
});

it('getItemsLeft должен отдать активные элементы для статуса FilteredStatus.COMPLETED', () => {
  const makeOriginalTodos = (): Todo[] => [
    { ...makeTodo('1'), isComplete: true },
    { ...makeTodo('2'), isComplete: false },
    { ...makeTodo('3'), isComplete: true },
    { ...makeTodo('4'), isComplete: false },
    { ...makeTodo('5'), isComplete: false },
  ];
  const originalTodos = makeOriginalTodos();

  // проверяем что нам вернули правильное кол-во элементов
  expect(todosFiltered(originalTodos, FilteredStatus.COMPLETED)).toEqual(
    makeOriginalTodos().filter((todo) => todo.isComplete),
  );
  // проверяем что исходный массив todo не был модифицирован
  expect(originalTodos).toEqual(makeOriginalTodos());
});

it('clearCompleted должен убрать выполненные задачи', () => {
  const makeOriginalTodos = (): Todo[] => [
    { ...makeTodo('1'), isComplete: true },
    { ...makeTodo('2'), isComplete: false },
    { ...makeTodo('3'), isComplete: true },
    { ...makeTodo('4'), isComplete: false },
    { ...makeTodo('5'), isComplete: false },
  ];
  const originalTodos = makeOriginalTodos();

  // проверяем что нам вернули правильное кол-во элементов
  expect(clearCompleted(originalTodos)).toEqual(makeOriginalTodos().filter((todo) => !todo.isComplete));
  // проверяем что исходный массив todo не был модифицирован
  expect(originalTodos).toEqual(makeOriginalTodos());
});
