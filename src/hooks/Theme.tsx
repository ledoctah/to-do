import React, { createContext, useContext, useEffect, useState } from 'react';

interface IThemeProviderProps {
  children: React.ReactNode;
}

interface IThemeContextData {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContextData>({} as IThemeContextData);

export const ThemeProvider: React.FC<IThemeProviderProps> = ({
  children,
}: IThemeProviderProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    let selectedTheme = localStorage.getItem('@mfdev:theme');

    if (!selectedTheme) {
      selectedTheme = window.matchMedia(`(prefers-color-scheme: dark)`).matches
        ? 'dark'
        : 'light';
    }

    return selectedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('@mfdev:theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): IThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
