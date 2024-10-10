import { useState } from 'react';
import chevronDownImg from '~/assets/chevronDown.svg';

interface AddTodoFormProps {
  onSubmit: (text: string) => void;
}

export function AddTodoForm({ onSubmit }: AddTodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const realText = text.trim();
    if (realText !== '') {
      onSubmit(realText);
      setText('');
    }
  };

  return (
    <form className={'flex gap-1 border-b-2 p-2'} onSubmit={handleSubmit}>
      <button type={'submit'} className={'outline-none focus:bg-slate-100 py-2 px-1 rounded'}>
        <img src={chevronDownImg} className={'w-10'} />
      </button>
      <input
        type="text"
        className={'p-2 outline-none focus:bg-slate-100 w-full rounded'}
        placeholder={'what need to be done?'}
        autoFocus
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </form>
  );
}
