import { useMemo, useState } from 'react';
import { AddTodoForm } from './AddTodoForm';
import { addTodo, clearCompleted, completeToggle, getItemsLeft, todosFiltered } from './TodosData';
import { FilteredStatus, Todo } from './types';
import { TodoList } from './TodoList';
import { startTodosData } from './startTodosData';
import { StatusBar } from './StatusBar';
import { getUUID } from '~/utils/getUUID';

export function TodoListWidget() {
  const [todos, setTodos] = useState<Todo[]>(startTodosData);
  const [status, setStatus] = useState<FilteredStatus>(FilteredStatus.ALL);

  const itemsLeft = useMemo(() => getItemsLeft(todos), [todos]);
  const filteredTodos = useMemo(() => todosFiltered(todos, status), [todos, status]);

  const handleAddTodo = (text: string) => {
    const currentTodos = addTodo(todos, { isComplete: false, text }, getUUID);
    setTodos(currentTodos);
  };

  const handleCompleteToggle = (id: string) => {
    const currentTodos = completeToggle(todos, id);
    setTodos(currentTodos);
  };

  const handleChangeStatus = (status: FilteredStatus) => {
    setStatus(status);
  };

  const handleClearCompleted = () => {
    const actualTodos = clearCompleted(todos);
    setTodos(actualTodos);
  };

  return (
    <>
      <div className={'w-full bg-white p-2 rounded shadow relative z-30'}>
        <AddTodoForm onSubmit={handleAddTodo} />
        <TodoList list={filteredTodos} onCompleteToggle={handleCompleteToggle} />
        <StatusBar
          itemsLeft={itemsLeft}
          onChangeStatus={handleChangeStatus}
          status={status}
          onClearCompleted={handleClearCompleted}
        />
      </div>
      <div
        className={'flex gap-3 border-b-2  items-center h-2 rounded-sm bg-white w-[98%] mx-auto relative z-20'}
      ></div>
      <div
        className={'flex gap-3 border-b-2  items-center h-1.5 rounded-sm bg-white w-[96%] mx-auto relative z-10'}
      ></div>
    </>
  );
}
