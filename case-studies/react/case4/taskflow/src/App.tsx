// App.tsx
import { ThemeProvider } from './ThemeProvider';
import TaskList from './TaskList';
import NotificationList from './NotificationList';
import ThemeSwitcher from './ThemeSwitcher';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeSwitcher></ThemeSwitcher>
        <TaskList />
        <NotificationList />
      </div>
    </ThemeProvider>
  );
}

export default App;