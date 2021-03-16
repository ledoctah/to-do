import React, { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiPlus } from 'react-icons/fi';
import { TaskModal } from './TaskModal';
import { useTask } from '../hooks/Task';

export const TaskList: React.FC = () => {
  const { tasks, toggleTaskCompletion, removeTask } = useTask();

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
          {tasks.length > 0 ? (
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
