import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  isLoading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Load tasks when user logs in
  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // For now, load from localStorage
      const storedTasks = localStorage.getItem(`tasks_${user?.id}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(updatedTasks));
    }
  };

  const addTask = async (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const task: Task = {
        ...newTask,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const updatedTasks = [...tasks, task];
      saveTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    setIsLoading(true);
    try {
      const updatedTasks = tasks.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      );
      saveTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      const updatedTasks = tasks.filter(task => task.id !== id);
      saveTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      isLoading
    }}>
      {children}
    </TaskContext.Provider>
  );
};