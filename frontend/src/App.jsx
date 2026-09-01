import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './hooks/useToast';
import { Header } from './components/Header';
import { ToastContainer } from './components/Toast';
import { TodoList } from './pages/TodoList';
import { TodoDetail } from './pages/TodoDetail';
import { TodoModal } from './components/TodoModal';
import { TodoForm } from './components/TodoForm';
import { useTodos } from './hooks/useTodos';

import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/responsive.css';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderCreateModalOpen, setIsHeaderCreateModalOpen] = useState(false);
  const { createTodo } = useTodos();

  const handleHeaderCreateSubmit = async (formData) => {
    try {
      await createTodo(formData);
      setIsHeaderCreateModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      <div className="app-root">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenCreateModal={() => setIsHeaderCreateModalOpen(true)}
        />

        <Routes>
          <Route path="/" element={<TodoList searchQuery={searchQuery} />} />
          <Route path="/todos" element={<TodoDetail />} />
        </Routes>

        {/* Global Header Create Task Modal */}
        <TodoModal
          isOpen={isHeaderCreateModalOpen}
          title="Create New Task"
          onClose={() => setIsHeaderCreateModalOpen(false)}
        >
          <TodoForm
            onSubmit={handleHeaderCreateSubmit}
            onCancel={() => setIsHeaderCreateModalOpen(false)}
          />
        </TodoModal>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
