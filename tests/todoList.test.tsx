import { fireEvent, render, screen, within } from '@testing-library/react';
import { vitest } from 'vitest';
import { TodoList } from '~/features/todos/TodoList';
import { Todo } from '~/features/todos/types';

describe('AddTodoForm должен отрабатывать корректно', () => {
  const makeTodo = (id: string, isComplete: boolean): Todo => ({ isComplete, id, text: `todo ${id}` });
  it.each([
    { todos: [makeTodo('1', true), makeTodo('2', false), makeTodo('3', true), makeTodo('4', false)] },
    { todos: [makeTodo('1', false), makeTodo('2', true), makeTodo('3', false)] },
  ])('список должен быть корректно отрендерен', ({ todos }) => {
    const handleCompleteToggle = vitest.fn();

    render(<TodoList list={todos} onCompleteToggle={handleCompleteToggle} />);

    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    // проверим что список содержит нужное количество элементов
    expect(items.length).toBe(todos.length);

    const actualTextContent = items.map((item) => item.textContent);
    const expectTextContent = todos.map((item) => item.text);
    // проверим совпадение вывденного текста в элементах
    expect(actualTextContent).toEqual(expectTextContent);

    // проверим отображается ли в элементе картинка, символизирующая что задача завершена
    const actualCompleteStatus = items.map((item) => Boolean(within(item).queryByAltText('todo complete')));
    const expectCompleteStatus = todos.map((item) => item.isComplete);
    expect(actualCompleteStatus).toEqual(expectCompleteStatus);
  });

  it('onCompleteToggle должен корректно отрабатывать если мы кликнули по кнопке смены статуса задачи', () => {
    const todos = [makeTodo('1', true), makeTodo('2', false), makeTodo('3', true), makeTodo('4', false)];
    const handleCompleteToggle = vitest.fn();
    render(<TodoList list={todos} onCompleteToggle={handleCompleteToggle} />);

    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    let i = 0;
    for (const item of items) {
      // для каждого элемента получаем ожидаемый id
      const todoId = todos[i].id;
      // находим кнопку
      const btn = within(item).getByRole('button');
      fireEvent.click(btn);
      // проверяем что функция была вызвана с ожидаемым id
      expect(handleCompleteToggle).toHaveBeenLastCalledWith(todoId);
      i++;
    }
  });
});
