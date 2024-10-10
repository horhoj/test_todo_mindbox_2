import { TodoListWidget } from '~/features/todos/TodoListWidget';

export function App() {
  return (
    <div className={'bg-gray-300 min-h-screen flex flex-col w-full mx-auto p-6'}>
      <div className={'mx-auto max-w-sm text-yellow-700 text-5xl font-medium'}>TODOS</div>
      <div className={'mx-auto max-w-md w-full mt-6'}>
        <TodoListWidget />
      </div>
    </div>
  );
}
