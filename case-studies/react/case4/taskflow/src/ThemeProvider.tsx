// import React, { useState, useContext } from 'react';
// import type { ReactNode } from 'react';

// // 1. Define the context type
// interface ThemeContextType {
//   theme: 'light' | 'dark';
//   toggleTheme: () => void;
// }

// // 2. Create the context
// const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

// interface ThemeProviderProps {
//   children: ReactNode;
// }


// // 3. Provider implementation
// export const ThemeProvider = ({ children }: ThemeProviderProps) => {
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');
//   const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// // 4. Custom hook for safe consumption
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error('useTheme must be used within ThemeProvider');
//   return context;
// };


import React, { useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // 1. Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved as 'light' | 'dark');
  }, []);

  // 2. Apply theme to HTML + save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
