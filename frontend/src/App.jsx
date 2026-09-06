import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { TodoList } from './pages/TodoList.jsx';
import { TodoDetail } from './pages/TodoDetail.jsx';
import { ToastProvider } from './hooks/useToast.jsx';
import { ToastContainer } from './components/Toast.jsx';

import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/responsive.css';

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/todos" element={<TodoListRoute />} />
        </Routes>
        <ToastContainer />
      </Router>
    </ToastProvider>
  );
}

/**
 * Switcher component for query parameter routing (/todos and /todos?id=123)
 */
function TodoListRoute() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  if (id) {
    return <TodoDetail />;
  }

  return <TodoList />;
}

