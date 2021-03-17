import '../styles/header.scss';

import logoImg from '../assets/logo.svg';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div>
        <img src={logoImg} alt="to.do" />
      </div>
    </header>
  );
};
