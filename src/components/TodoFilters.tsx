import React, { useState, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';

const TodoFilters: React.FC = () => {
  const { setFilter, setSearch } = useTodos();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Update filter based on search input
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setFilter(filter);
  };

  return (
      <div className="todo-filters">
      <h3>Today</h3>
      <input
          type="text"
          onChange={(e) => setSearch(e.target.value)} // Update search term
          placeholder="Search tasks"
      />
      <div className="filter-buttons">
          <button onClick={() => handleFilterChange('all')} className={activeFilter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => handleFilterChange('completed')} className={activeFilter === 'completed' ? 'active' : ''}>Completed</button>
          <button onClick={() => handleFilterChange('incomplete')} className={activeFilter === 'incomplete' ? 'active' : ''}>Incomplete</button>
      </div>
  </div>

  );
};

export default TodoFilters;
