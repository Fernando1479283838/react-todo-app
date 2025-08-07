import { createContext, useReducer, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { taskReducer } from '../reducers/taskReducer';
import type { Task } from '../types/Task';

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string) => boolean;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextType | null>(null);

const getInitialState = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem('todo-tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error al cargar tareas de localStorage:", error);
    return [];
  }
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Error al guardar tareas en localStorage:", error);
    }
  }, [tasks]);

  const addTask = (text: string) => {
    if (!text.trim()) return false;
    const newTask: Task = {
      id: Date.now().toString(),
      title: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    return true;
  };

  const toggleTask = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, clearCompleted }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};