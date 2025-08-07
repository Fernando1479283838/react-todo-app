import { useTasks } from '../context/TaskContext';

export const TaskStats = () => {
  const { tasks, clearCompleted } = useTasks();
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="task-stats-container">
      <div className="stats-info">
        <span className="stat-item">Total: <strong>{total}</strong></span>
        <span className="stat-item text-blue">Pendientes: <strong>{pending}</strong></span>
        <span className="stat-item text-green">Completadas: <strong>{completed}</strong></span>
      </div>
      {completed > 0 && (
        <button
          onClick={clearCompleted}
          className="clear-button"
        >
          Limpiar completadas
        </button>
      )}
    </div>
  );
};