import { useTheme } from '../hooks/Theme';
import '../styles/darkmodeswitcher.scss';

export const DarkModeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`dark-mode-switcher ${top ? 'top' : ''}`}>
      <div
        className="switcher"
        role="button"
        tabIndex={0}
        onClick={toggleTheme}
        onKeyDown={toggleTheme}
      >
        <div className={theme === 'dark' ? 'ball active' : 'ball'} />
      </div>
      <p>Modo escuro</p>
    </div>
  );
};
