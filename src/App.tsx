// src/App.tsx
import React from 'react';
import './App.css';
import { TodoProvider } from './context/TodoContext';
import TodoApp from './components/TodoApp';

const App = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default App;
