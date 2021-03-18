import { v4 as uuid } from 'uuid';
import { createContext, useContext, useEffect, useState } from 'react';

interface ITask {
  id: string;
  title: string;
  category: string;
  isComplete: boolean;
}

interface IRequestTask {
  title: string;
  category: string;
}

interface ITaskContextData {
  tasks: ITask[];
  addTask: (task: IRequestTask) => void;
  removeTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

interface ITaskProviderProps {
  children: React.ReactNode;
}

const TaskContext = createContext<ITaskContextData>({} as ITaskContextData);

export const TaskProvider: React.FC<ITaskProviderProps> = ({
  children,
}: ITaskProviderProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const found = localStorage.getItem('@mfdev:todo:tasks');

    if (!found) return;

    const parsedTasks: ITask[] = JSON.parse(found);

    setTasks(parsedTasks);
  }, []);

  function addTask({ title, category }: IRequestTask) {
    const task = {
      id: uuid(),
      title,
      category,
      isComplete: false,
    };

    const newTasks = [...tasks, task];

    localStorage.setItem('@mfdev:todo:tasks', JSON.stringify(newTasks));

    setTasks(newTasks);
  }

  function removeTask(id: string) {
    const newTasks = tasks.filter(task => task.id !== id);

    localStorage.setItem('@mfdev:todo:tasks', JSON.stringify(newTasks));

    setTasks(newTasks);
  }

  function toggleTaskCompletion(id: string) {
    const newTasks = tasks.map(task => {
      const updatedTask = task;

      if (updatedTask.id === id) {
        updatedTask.isComplete = !updatedTask.isComplete;
      }

      return updatedTask;
    });

    if (newTasks === tasks) return;

    localStorage.setItem('@mfdev:todo:tasks', JSON.stringify(newTasks));

    setTasks(newTasks);
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, removeTask, toggleTaskCompletion }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = (): ITaskContextData => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTask must be used within an TaskProvider');
  }

  return context;
};
