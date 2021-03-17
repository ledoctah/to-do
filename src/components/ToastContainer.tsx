import { useToast } from '../hooks/Toast';

import '../styles/toast.scss';

import { Toast } from './Toast';

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast toast={toast} key={toast.id} />
      ))}
    </div>
  );
};
