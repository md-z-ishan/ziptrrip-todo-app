import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TodoList } from './pages/TodoList.jsx';
import { TodoDetail } from './pages/TodoDetail.jsx';

import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/responsive.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" replace />} />
        <Route path="/todos" element={<TodoListRoute />} />
      </Routes>
    </Router>
  );
}

/**
 * Route switcher handling query parameter /todos?id=123
 */
function TodoListRoute() {
  const params = new URLSearchParams(window.location.search);
  const hasId = params.has('id');

  if (hasId) {
    return <TodoDetail />;
  }

  return <TodoList />;
}
