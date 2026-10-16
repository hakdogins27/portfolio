import React from 'react';
import { useTheme } from './hooks/useTheme';
import { MainLayout } from './components/layout/MainLayout';
import { RouterProvider } from './lib/router';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <RouterProvider>
      <MainLayout theme={theme} toggleTheme={toggleTheme} />
    </RouterProvider>
  );
}

export default App;
