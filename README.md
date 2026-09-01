# 🚀 Ziptrrip Premium Todo Application

A **premium, interview-quality full-stack Todo Application** built for the Ziptrrip internship evaluation. Designed with custom CSS variables, dark mode, real-time statistics dashboard, toast notifications with a 5-second **Undo Delete** grace period, debounced search, category tags, priority levels, due date countdowns, and mobile responsiveness.

---

## 🌟 Features Overview

### 🎯 Priority Levels
- **High (🔴)**, **Medium (🟡)**, **Low (🟢)** visual indicators.
- Filter and sort tasks by priority level.

### 📅 Due Dates & Overdue Warnings
- Add due date & time when creating or editing tasks.
- Dynamic badges: `"Due in X days"`, `"Due today"`, or `"Overdue by X days"` with warning colors.

### 📂 Categories & Tags
- 6 predefined categories: **Work 💼**, **Personal 👤**, **Shopping 🛒**, **Health 💪**, **Learning 📚**, **Other 📌**.
- Quick category filter tabs with live task counts.

### 📊 Statistics Dashboard
- **SVG Circular Progress Chart** showing overall completion %.
- Priority level breakdown mini cards.
- Category distribution horizontal bar chart.
- Real-time overdue task warning indicator.

### 🌙 Dark Mode & Preferences
- Theme switcher with Sun ☀️ / Moon 🌙 toggle button in header.
- Persistent state saved in `localStorage`.
- CSS variable theme system with smooth background transitions.

### 🔔 Toast Notifications & 5-Second Undo
- Interactive toast alerts for creation, edits, and deletions.
- **5-second grace period for Undo** on task deletion before persisting to server.

### 📱 Responsive & Accessible (A11y)
- Mobile-first responsive grid (390px mobile $\rightarrow$ 768px tablet $\rightarrow$ 1440px desktop).
- ARIA focus rings, keyboard tab navigation, and semantic HTML structure.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6, Custom CSS Variables (Design Tokens), Axios, Lucide Icons, Vite
- **Backend**: Node.js, Express.js, CORS, Dotenv, Request Logger Middleware
- **Database**: Atomic JSON file storage (`backend/data/todos.json`)

---

## 🚀 Quick Start Guide

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/md-z-ishan/ziptrrip-todo-app.git
cd ziptrrip-todo-app
npm run install-all
```

### 2. Running Locally
Run client and server concurrently with a single command:
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:3000`
- **Backend Express API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

---

## 📁 Project Architecture

```
ziptrrip-todo-app/
├── backend/
│   ├── data/
│   │   └── todos.json             # Atomic JSON file storage
│   ├── middleware/
│   │   ├── errorHandler.js        # 404 & global error handling
│   │   └── validation.js          # Payload & ID validation
│   ├── controllers/
│   │   └── todoController.js      # CRUD & Statistics handlers
│   ├── routes/
│   │   └── todos.js               # API routes router
│   ├── utils/
│   │   └── fileStorage.js         # Safe atomic file read/write
│   └── server.js                  # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/            # Header, Cards, Modals, Forms, Stats, Toasts
│   │   ├── pages/                 # TodoList (Main) & TodoDetail (/todos?id=...)
│   │   ├── hooks/                 # useTodos, useToast, useLocalStorage, useDebounce
│   │   ├── utils/                 # apiClient, constants, helpers, themes
│   │   ├── styles/                # CSS Tokens, Components, Animations, Responsive
│   │   ├── App.jsx                # Router & ToastProvider wrapper
│   │   └── main.jsx               # React entry point
│   ├── index.html
│   └── vite.config.js
└── ENDPOINTS.md                   # REST API Specification Documentation
```

---

## 📑 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server health status check |
| `GET` | `/api/todos` | List all todos (query params: `?search=`, `?priority=`, `?category=`, `?completed=`) |
| `GET` | `/api/todos/stats` | Retrieve aggregated dashboard metrics |
| `GET` | `/api/todos/:id` | Get single todo by ID |
| `POST` | `/api/todos` | Create a new todo |
| `PUT` | `/api/todos/:id` | Update an existing todo |
| `DELETE` | `/api/todos/:id` | Delete todo |

For detailed request/response payload examples, see [ENDPOINTS.md](file:///Users/mdzishan/Desktop/ziptrrip-todo-app/ENDPOINTS.md).

---

## 🧪 Testing Checklist

- [x] Create task with title, description, priority, category, and due date.
- [x] Edit task inline or on detail page (`/todos?id=...`).
- [x] Mark complete with checkmark animation and strikethrough state.
- [x] Delete task with 5-second **Undo** notification toast.
- [x] Filter by Category pills and Priority tabs.
- [x] Search tasks with real-time debouncing.
- [x] Verify Dark Mode toggle persistence in `localStorage`.
- [x] Verify mobile responsiveness on 390px, 768px, and 1440px viewports.
