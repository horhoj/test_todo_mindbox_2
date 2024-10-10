import { fireEvent, render, screen } from '@testing-library/react';
import { vitest } from 'vitest';
import { AddTodoForm } from '~/features/todos/AddTodoForm';

describe('AddTodoForm должен отрабатывать корректно', () => {
  it('Должен корректно отрендерится', () => {
    const handleSubmit = vitest.fn();
    render(<AddTodoForm onSubmit={handleSubmit} />);
  });

  it.each(['test value 1 ', ' test value 22'])(
    'при клике по кнопке добавить, сабмит формы должен корректно отработать если введено корректное значение',
    (testValue) => {
      const handleSubmit = vitest.fn();
      render(<AddTodoForm onSubmit={handleSubmit} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: testValue } });

      const submitBtn = screen.getByRole('button');

      fireEvent.click(submitBtn);
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenLastCalledWith(testValue.trim());
      expect(input).toHaveValue('');
    },
  );

  it.each(['test value 1 ', ' test value 22'])(
    'при нажатии Enter в инпуте, сабмит формы должен корректно отработать если введено корректное значение',
    (testValue) => {
      const handleSubmit = vitest.fn();
      render(<AddTodoForm onSubmit={handleSubmit} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: testValue } });

      fireEvent.submit(input);
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenLastCalledWith(testValue.trim());
      expect(input).toHaveValue('');
    },
  );

  it.each([' ', '   '])(
    'при клике по кнопке добавить, сабмит формы не должен корректно отработать если введено не корректное значение',
    (testValue) => {
      const handleSubmit = vitest.fn();
      render(<AddTodoForm onSubmit={handleSubmit} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: testValue } });

      const submitBtn = screen.getByRole('button');

      fireEvent.click(submitBtn);
      expect(handleSubmit).toHaveBeenCalledTimes(0);
    },
  );

  it.each([' ', '    '])(
    'при нажатии Enter в инпуте, сабмит формы не должен корректно отработать если введено не корректное значение',
    (testValue) => {
      const handleSubmit = vitest.fn();
      render(<AddTodoForm onSubmit={handleSubmit} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: testValue } });

      fireEvent.submit(input);
      expect(handleSubmit).toHaveBeenCalledTimes(0);
    },
  );
});
