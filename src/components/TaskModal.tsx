import React, { FormEvent, useState } from 'react';
import { FiCheckSquare, FiChevronDown, FiX } from 'react-icons/fi';
import * as yup from 'yup';
import { useTask } from '../hooks/Task';
import { useToast } from '../hooks/Toast';

import '../styles/modal.scss';

interface ITaskModalProps {
  closeModal: () => void;
}

const categories = ['Estudo', 'Trabalho', 'Dia-a-dia', 'Outros'];

export const TaskModal: React.FC<ITaskModalProps> = ({
  closeModal,
}: ITaskModalProps) => {
  const { addTask } = useTask();
  const { addToast } = useToast();

  const [isListOpen, setIsListOpen] = useState(false);

  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function setCategory(category: string) {
    setSelectedCategory(category);
    toggleOpenList();
  }

  function toggleOpenList() {
    setIsListOpen(!isListOpen);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const schema = yup.object().shape({
      title: yup.string().required('O nome da task é obrigatório.'),
      category: yup.string().required('A categoria é obrigatória.'),
    });

    const task = {
      title: taskName,
      category: selectedCategory || '',
    };

    schema
      .validate(task)
      .then(() => {
        addTask(task);

        closeModal();
      })
      .catch(e => {
        addToast({
          message: e.message,
          type: 'error',
        });
      });
  }

  return (
    <div className="form-container">
      <FiX className="close" onClick={closeModal} />

      <h3>Nova tarefa</h3>

      <form id="task-modal" onSubmit={handleSubmit}>
        <div className="item">
          <div>Nome da tarefa</div>
          <input
            type="text"
            placeholder="Ex.: Preparar apresentação"
            onChange={e => setTaskName(e.target.value)}
            value={taskName}
          />
        </div>

        <div className="item">
          <div>Categoria</div>
          <div
            className="category"
            onClick={toggleOpenList}
            onKeyDown={toggleOpenList}
            role="button"
            tabIndex={0}
          >
            <div className="selected">
              <div>{selectedCategory ?? 'Selecione a categoria...'}</div>
            </div>

            <div>
              <FiChevronDown />
            </div>

            <div className={`list ${isListOpen ? 'active' : ''}`}>
              {categories.map((category, index) => (
                <div
                  className="option"
                  onClick={() => setCategory(category)}
                  onKeyDown={() => setCategory(category)}
                  key={category}
                  role="button"
                  tabIndex={index + 1}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button id="addButton" type="submit">
          <FiCheckSquare />
          Adicionar
        </button>
      </form>
    </div>
  );
};
