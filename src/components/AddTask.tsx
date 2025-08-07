import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export const AddTask = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { addTask } = useTasks();

  const handleSubmit = () => {
    setError('');
    if (inputValue.trim().length < 2) {
      setError('La tarea debe tener al menos 2 caracteres');
      return;
    }

    addTask(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="add-task-container">
      <div className="add-task-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Escribe una nueva tarea..."
          className="add-task-input"
          maxLength={200}
        />
        <button
          onClick={handleSubmit}
          className="add-task-button"
        >
          <Plus size={18} />
          Agregar
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
