import React, { useEffect, useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiPlus } from 'react-icons/fi';
import { TaskModal } from './TaskModal';
import { useTask } from '../hooks/Task';
import { DarkModeSwitcher } from './DarkModeSwitcher';

interface IMappedTask {
  [category: string]: {
    tasks: Array<{
      id: string;
      title: string;
      category: string;
      isComplete?: boolean;
    }>;
  };
}

export const TaskList: React.FC = () => {
  const { tasks, toggleTaskCompletion, removeTask } = useTask();

  const [mappedTasks, setMappedTasks] = useState<IMappedTask>(
    {} as IMappedTask,
  );

  useEffect(() => {
    const mapped: IMappedTask = {};

    tasks.forEach(task => {
      if (!mapped[task.category]) {
        mapped[task.category] = {
          tasks: [],
        };
      }

      mapped[task.category].tasks.push(task);
    });

    setMappedTasks(mapped);
  }, [tasks]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleToggleTaskCompletion(id: string) {
    toggleTaskCompletion(id);
  }

  function handleRemoveTask(id: string) {
    removeTask(id);
  }

  return (
    <>
      <section
        className={`task-list container ${isModalOpen ? 'unfocused' : ''}`}
      >
        <header>
          <h2>Minhas tasks</h2>

          <div className="input-group">
            <button
              type="submit"
              data-testid="add-task-button"
              onClick={toggleModal}
            >
              <FiPlus size={18} color="#fff" />
              Nova tarefa
            </button>
          </div>
        </header>

        <main>
          {Object.keys(mappedTasks).length > 0 ? (
            <ul>
              {Object.keys(mappedTasks).map(category => (
                <div className="category-wrapper" key={category}>
                  <h3>{category}</h3>
                  {mappedTasks[category].tasks.map(task => (
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
                </div>
              ))}
            </ul>
          ) : (
            <div className="no-tasks">
              <h3>Você não possui tarefas adicionadas. 📝</h3>
            </div>
          )}
        </main>
      </section>
      {isModalOpen && (
        <div className="modal">
          <TaskModal closeModal={toggleModal} />
        </div>
      )}
    </>
  );
};
