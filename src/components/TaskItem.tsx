'use client';

import { CheckSquare, Square, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, deleteTask } = useTasks();
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => deleteTask(task.id), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          layout
          className={`task-item ${task.completed ? 'task-completed' : ''}`}
        >
          <button
            onClick={() => toggleTask(task.id)}
            className="toggle-button"
          >
            {task.completed ? <CheckSquare size={20} /> : <Square size={20} />}
          </button>
          <motion.span
            layout
            className={`task-title ${task.completed ? 'title-completed' : ''}`}
          >
            {task.title}
          </motion.span>
          <button
            onClick={handleDelete}
            className="delete-button"
            title="Eliminar tarea"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};