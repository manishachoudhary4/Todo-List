import React from 'react';
import { useTodos } from '../context/TodoContext';

const TodoList = () => {
  const { todos, toggleComplete, deleteTodo, filter, search } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(search.toLowerCase());
    if (filter === 'completed') return todo.completed && matchesSearch;
    if (filter === 'incomplete') return !todo.completed && matchesSearch;
    return matchesSearch; 
  });

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : 'incomplete'}`}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.text}
          </label>
          <button onClick={() => deleteTodo(todo.id)}>×</button>
        </li>
      ))}
    </ul>
  );
  
  
      }
export default TodoList;
