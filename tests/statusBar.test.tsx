import { fireEvent, render, screen } from '@testing-library/react';
import { vitest } from 'vitest';
import { StatusBar } from '~/features/todos/StatusBar';
import { FilteredStatus } from '~/features/todos/types';

describe('StatusBar должен отрабатывать корректно', () => {
  it.each([
    { status: FilteredStatus.ALL, itemsLeft: 100 },
    { status: FilteredStatus.COMPLETED, itemsLeft: 2002 },
    { status: FilteredStatus.ACTIVE, itemsLeft: 3333 },
  ])('должен корректно рендерится', ({ itemsLeft, status }) => {
    const handleChangeStatus = vitest.fn();
    const handleClearCompleted = vitest.fn();

    render(
      <StatusBar
        itemsLeft={itemsLeft}
        status={status}
        onChangeStatus={handleChangeStatus}
        onClearCompleted={handleClearCompleted}
      />,
    );

    const allBtn = screen.getByText('All');
    const completedBtn = screen.getByText('Completed');
    const ActiveBtn = screen.getByText('Active');
    if (status === FilteredStatus.ALL) {
      expect(allBtn).toHaveClass('border border-slate-400');
      expect(completedBtn).not.toHaveClass('border border-slate-400');
      expect(ActiveBtn).not.toHaveClass('border border-slate-400');
    }

    if (status === FilteredStatus.COMPLETED) {
      expect(allBtn).not.toHaveClass('border border-slate-400');
      expect(completedBtn).toHaveClass('border border-slate-400');
      expect(ActiveBtn).not.toHaveClass('border border-slate-400');
    }

    if (status === FilteredStatus.ACTIVE) {
      expect(allBtn).not.toHaveClass('border border-slate-400');
      expect(completedBtn).not.toHaveClass('border border-slate-400');
      expect(ActiveBtn).toHaveClass('border border-slate-400');
    }

    screen.getByText(`${itemsLeft} items left`);
  });

  it('при клике по All, должен отработать onChangeStatus с параметром FilteredStatus.ALL', () => {
    const handleChangeStatus = vitest.fn();
    const handleClearCompleted = vitest.fn();

    render(
      <StatusBar
        itemsLeft={1000}
        status={FilteredStatus.ALL}
        onChangeStatus={handleChangeStatus}
        onClearCompleted={handleClearCompleted}
      />,
    );

    const allBtn = screen.getByText('All');

    fireEvent.click(allBtn);

    expect(handleChangeStatus).toHaveBeenLastCalledWith(FilteredStatus.ALL);
  });

  it('при клике по Active, должен отработать onChangeStatus с параметром FilteredStatus.Active', () => {
    const handleChangeStatus = vitest.fn();
    const handleClearCompleted = vitest.fn();

    render(
      <StatusBar
        itemsLeft={1000}
        status={FilteredStatus.ALL}
        onChangeStatus={handleChangeStatus}
        onClearCompleted={handleClearCompleted}
      />,
    );

    const activeBtn = screen.getByText('Active');

    fireEvent.click(activeBtn);

    expect(handleChangeStatus).toHaveBeenLastCalledWith(FilteredStatus.ACTIVE);
  });

  it('при клике по Completed, должен отработать onChangeStatus с параметром FilteredStatus.Completed', () => {
    const handleChangeStatus = vitest.fn();
    const handleClearCompleted = vitest.fn();

    render(
      <StatusBar
        itemsLeft={1000}
        status={FilteredStatus.ALL}
        onChangeStatus={handleChangeStatus}
        onClearCompleted={handleClearCompleted}
      />,
    );

    const completedBtn = screen.getByText('Completed');

    fireEvent.click(completedBtn);

    expect(handleChangeStatus).toHaveBeenLastCalledWith(FilteredStatus.COMPLETED);
  });

  it('при клике по clearCompleted, должен отработать onClearCompleted ', () => {
    const handleChangeStatus = vitest.fn();
    const handleClearCompleted = vitest.fn();

    render(
      <StatusBar
        itemsLeft={1000}
        status={FilteredStatus.ALL}
        onChangeStatus={handleChangeStatus}
        onClearCompleted={handleClearCompleted}
      />,
    );

    const clearCompletedBtn = screen.getByText('Clear completed');

    fireEvent.click(clearCompletedBtn);

    expect(handleClearCompleted).toHaveBeenCalledTimes(1);
  });
});
