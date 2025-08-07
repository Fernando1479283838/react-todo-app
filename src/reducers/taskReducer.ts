import { type Task } from "../types/Task";

type Action =
  | { type: 'LOAD_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'CLEAR_COMPLETED' };

export const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'LOAD_TASKS':
      return action.payload;

    case 'ADD_TASK':
      return [...state, action.payload];

    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );

    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);

    case 'CLEAR_COMPLETED':
      return state.filter(task => !task.completed);

    default:
      return state;
  }
};
