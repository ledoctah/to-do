import React from 'react';
import { Header } from '../components/Header';
import { TaskList } from '../components/TaskList';
import { useTheme } from '../hooks/Theme';
import themes from '../styles/themes';

export const Dashboard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="wrapper" style={themes[theme] as React.CSSProperties}>
      <Header />
      <TaskList />
    </div>
  );
};
