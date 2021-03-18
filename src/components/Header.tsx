import '../styles/header.scss';

import logoImg from '../assets/logo.svg';
import { DarkModeSwitcher } from './DarkModeSwitcher';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div>
        <img src={logoImg} alt="to.do" />
        <DarkModeSwitcher />
      </div>
    </header>
  );
};
