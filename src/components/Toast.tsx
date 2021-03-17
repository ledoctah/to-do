import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useToast } from '../hooks/Toast';

interface IToast {
  id: string;
  type: 'error' | 'success';
  message: string;
}

interface IProps {
  toast: IToast;
}

export const Toast: React.FC<IProps> = ({ toast }: IProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toast.id]);

  return (
    <>
      <div className={`toast ${toast.type}`}>
        <strong>
          {toast.type === 'error' ? 'Ocorreu um erro' : 'Sucesso!'}
        </strong>
        <p>{toast.message}</p>

        <button type="button" onClick={() => removeToast(toast.id)}>
          <FiX size={18} />
        </button>
      </div>
    </>
  );
};
