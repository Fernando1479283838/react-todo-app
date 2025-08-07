import { Calendar } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import { AnimatePresence } from 'framer-motion';

export const TaskList = () => {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <Calendar size={56} className="empty-icon" />
        <p className="empty-title">No hay tareas aún</p>
        <p className="empty-subtitle">¡Agrega tu primera tarea arriba!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </ul>
  );
};