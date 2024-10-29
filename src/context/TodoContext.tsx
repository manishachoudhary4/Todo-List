// src/context/TodoContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
  search: string;           // New search state
  setSearch: (search: string) => void; // New function to update search state
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used within a TodoProvider');
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>(''); // New state for search term

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ 
      todos, 
      addTodo, 
      toggleComplete, 
      deleteTodo, 
      filter, 
      setFilter,
      search,       // Provide search term
      setSearch     // Provide function to update search term
    }}>
      {children}
    </TodoContext.Provider>
  );
};
