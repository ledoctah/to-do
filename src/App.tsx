import './styles/global.scss';

import { ThemeProvider } from './hooks/Theme';
import { Dashboard } from './pages/Dashboard';
import { TaskProvider } from './hooks/Task';
import { ToastProvider } from './hooks/Toast';
import { ToastContainer } from './components/ToastContainer';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <ToastProvider>
          <Dashboard />
          <ToastContainer />
        </ToastProvider>
      </TaskProvider>
    </ThemeProvider>
  );
};
