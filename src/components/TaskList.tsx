import React, { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';
import { useTheme } from '../hooks/Theme';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { toggleTheme } = useTheme();

  function handleCreateNewTask() {
    toggleTheme();
    if (newTaskTitle) {
      const newTask = {
        id: Math.floor(Math.random() * 500000 + 1),
        title: newTaskTitle,
        isComplete: false,
      };

      setTasks([...tasks, newTask]);

      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(item => {
      const task = item;

      if (task.id === id) {
        task.isComplete = !item.isComplete;
      }

      return task;
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(task => task.id !== id);

    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={e => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark" />
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};
