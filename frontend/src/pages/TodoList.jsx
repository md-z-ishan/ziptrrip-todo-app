import React, { useState } from 'react';
import { Header } from '../components/Header.jsx';
import { TodoCard } from '../components/TodoCard.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { LoadingSkeleton } from '../components/LoadingSkeleton.jsx';
import { mockTodos } from '../data/mockTodos.js';
import { CATEGORIES, PRIORITIES } from '../utils/constants.js';
import { Search, Plus, Filter } from 'lucide-react';

export function TodoList() {
  const [todos] = useState(mockTodos);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Filter mock todos in memory for UI presentation
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      !searchQuery ||
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || todo.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || todo.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <div>
      <Header />

      <main className="container page-wrapper">
        {/* Page Title & Supporting Text */}
        <div style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>Task Master</h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Manage your tasks, set priorities, and track your daily progress.
            </p>
          </div>

          <button className="btn btn-primary" aria-label="Add new task">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              className="search-bar"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search tasks"
            />
          </div>

          {/* Category & Priority Filters */}
          <div className="filter-bar">
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Filter size={14} /> Category:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn btn-secondary ${selectedCategory === 'all' ? 'active' : ''}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: 'auto' }}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-secondary ${selectedCategory === cat.id ? 'active' : ''}`}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  minHeight: 'auto',
                  borderColor: selectedCategory === cat.id ? cat.color : 'var(--border-color)',
                  color: selectedCategory === cat.id ? cat.color : 'var(--text-secondary)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Todo List Content */}
        {filteredTodos.length === 0 ? (
          <EmptyState
            title={searchQuery ? 'No matching tasks found' : 'No tasks created yet'}
            message={
              searchQuery
                ? `No tasks matched "${searchQuery}". Try clearing search or filters.`
                : 'Create your first task and keep your day moving.'
            }
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {filteredTodos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
