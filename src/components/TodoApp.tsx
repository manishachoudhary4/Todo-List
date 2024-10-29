import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';

const TodoApp = () => {
  const { addTodo } = useTodos();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) { 
      addTodo(text);
      setText('');
    }
  };

  return (
    <div className="todo-app">
      <h1>To-do List</h1>
      <TodoFilters />
      <TodoList />
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="add-task-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
            className="add-task-input"
          />
          <button type="submit" className="add-task-button">Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default TodoApp;
