import './styles/global.scss';

import { ThemeProvider } from './hooks/Theme';
import { Dashboard } from './pages/Dashboard';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
};
