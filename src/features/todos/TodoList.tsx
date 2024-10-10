import classNames from 'classnames';
import { Todo } from './types';
import checkMarkIcon from '~/assets/checkmarkIcon.svg';

interface TodoListProps {
  list: Todo[];
  onCompleteToggle: (id: string) => void;
}

export function TodoList({ list, onCompleteToggle }: TodoListProps) {
  return (
    <ul>
      {list.map((el) => (
        <li key={el.id} className={'flex gap-3 border-b-2 p-2 items-center h-16 '}>
          <button
            className={classNames(
              'outline-none p-2 rounded-[50%] border w-10 h-10',
              el.isComplete && 'border-green-400',
            )}
            onClick={() => onCompleteToggle(el.id)}
          >
            {el.isComplete && <img alt={'todo complete'} src={checkMarkIcon} />}
          </button>
          <span className={classNames('text-ellipsis overflow-hidden', el.isComplete && 'line-through text-gray-300')}>
            {el.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
