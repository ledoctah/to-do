import './styles/global.scss';

import { ThemeProvider } from './hooks/Theme';
import { Dashboard } from './pages/Dashboard';
import { TaskProvider } from './hooks/Task';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Dashboard />
      </TaskProvider>
    </ThemeProvider>
  );
};
