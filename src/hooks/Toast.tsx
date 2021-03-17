import { v4 as uuid } from 'uuid';
import { createContext, useContext, useState } from 'react';

interface IToast {
  id: string;
  type: 'error' | 'success';
  message: string;
}

interface IToastContextData {
  toasts: IToast[];
  addToast: (toast: Omit<IToast, 'id'>) => void;
  removeToast: (id: string) => void;
}

interface IToastProviderProps {
  children: React.ReactNode;
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

export const ToastProvider: React.FC<IToastProviderProps> = ({
  children,
}: IToastProviderProps) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  function addToast({ type, message }: Omit<IToast, 'id'>) {
    const toast = {
      id: uuid(),
      type,
      message,
    };

    const foundToast = toasts.find(item => item.message === message);

    if (foundToast) {
      removeToast(foundToast.id);
    }

    setToasts([...toasts, toast]);
  }

  function removeToast(id: string) {
    const newToasts = toasts.filter(toast => toast.id !== id);

    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): IToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
};
