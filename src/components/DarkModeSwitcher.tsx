import { useTheme } from '../hooks/Theme';
import '../styles/darkmodeswitcher.scss';

export const DarkModeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="dark-mode-switcher"
      role="button"
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={toggleTheme}
    >
      <div className="switcher">
        <div className={theme === 'dark' ? 'ball active' : 'ball'} />
      </div>
      <p>Modo escuro</p>
    </div>
  );
};
