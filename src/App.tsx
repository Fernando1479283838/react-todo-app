import { TaskProvider } from './context/TaskContext';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { CheckSquare } from 'lucide-react';

const App = () => (
  <TaskProvider>
    <div className="app-container">
      <div className="wrapper">
        <header className="header">
          <h1 className="title">
            <CheckSquare className="icon" size={32} />
            Gestor de Tareas
          </h1>
          <p className="subtitle">Organiza tu día de manera eficiente</p>
        </header>

        <main className="main-content">
          <AddTask />
          <TaskList />
          <TaskStats />
        </main>

        <footer className="footer">
          Tus tareas se guardan automáticamente en tu navegador
        </footer>
      </div>
    </div>
  </TaskProvider>
);

export default App;