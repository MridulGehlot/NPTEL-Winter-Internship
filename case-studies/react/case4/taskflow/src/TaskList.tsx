// TaskList.tsx
import { useTaskStore } from './store/taskStore';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

function TaskList() {
  const [newTask, setNewTask] = useState('');
  const tasks = useTaskStore((state) => state.tasks);        // Selective subscription
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div>
      <h2>Tasks ({theme} mode)</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add Task</button>
      </form>
      
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
