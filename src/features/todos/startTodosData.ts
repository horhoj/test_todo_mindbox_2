import { Todo } from './types';
import { getUUID } from '~/utils/getUUID';

export const startTodosData: Todo[] = [
  { id: getUUID(), isComplete: false, text: 'Тестовое задание' },
  { id: getUUID(), isComplete: true, text: 'Прекрасный код' },
  { id: getUUID(), isComplete: false, text: 'Покрытие тестами' },
];
