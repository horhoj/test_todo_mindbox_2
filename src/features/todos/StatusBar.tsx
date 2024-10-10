import classNames from 'classnames';
import { FilteredStatus } from './types';

interface StatusBarProps {
  itemsLeft: number;
  status: FilteredStatus;
  onChangeStatus: (status: FilteredStatus) => void;
  onClearCompleted: () => void;
}

export function StatusBar({ itemsLeft, status, onChangeStatus, onClearCompleted }: StatusBarProps) {
  return (
    <div className={'flex gap-3 p-2 items-center h-16 text-xs text-slate-500 justify-between'}>
      <div>{itemsLeft} items left</div>
      <div className={'flex gap-1'}>
        <button
          className={classNames(
            'outline-none  p-2 rounded',
            status === FilteredStatus.ALL && 'border border-slate-400',
          )}
          onClick={() => onChangeStatus(FilteredStatus.ALL)}
        >
          All
        </button>
        <button
          className={classNames(
            'outline-none  p-2 rounded',
            status === FilteredStatus.ACTIVE && 'border border-slate-400',
          )}
          onClick={() => onChangeStatus(FilteredStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={classNames(
            'outline-none  p-2 rounded',
            status === FilteredStatus.COMPLETED && 'border border-slate-400',
          )}
          onClick={() => onChangeStatus(FilteredStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <button className={'outline-none  p-2 rounded'} onClick={onClearCompleted}>
        Clear completed
      </button>
    </div>
  );
}
