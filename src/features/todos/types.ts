export interface Todo {
  id: string;
  isComplete: boolean;
  text: string;
}

export type TodoBody = Pick<Todo, 'isComplete' | 'text'>;

export enum FilteredStatus {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}
