# 🎯 Ziptrrip Premium Todo Application

> **Official Internship Coding Challenge Submission for Ziptrrip**  
> **GitHub Repository**: [https://github.com/md-z-ishan/ziptrrip-todo-app.git](https://github.com/md-z-ishan/ziptrrip-todo-app.git)

---

## 📌 Executive Summary & Qualifying Compliance

This project is a **full-stack, interview-grade Todo Application** built specifically for the **Ziptrrip Tech Challenge**. It satisfies 100% of the qualifying requirements:

1. **Multi-Page React Frontend**: Built with React 18 & React Router v6.
   - **Page 1 (Task List)**: `http://localhost:3000/todos` — Interactive list, search, category pills, priority selectors, dark mode, statistics dashboard, and deletion undo.
   - **Page 2 (Single Task Detail)**: `http://localhost:3000/todos?id=<todo-id>` — Query parameter based route displaying complete task metadata, edit controls, timestamps, and return navigation.
2. **Node.js + Express.js Backend**: REST API with full CRUD endpoints and atomic file-based persistence (`backend/data/todos.json`).
3. **Documentation in `.md` Files**: Complete documentation in `README.md` and `ENDPOINTS.md`.

---

## 🌟 Comprehensive Feature Matrix

### 1. 🔀 Multi-Page Query-Param Routing
- **/todos**: Main task management interface.
- **/todos?id=:id**: Single task detail view that reads the `id` query parameter using `URLSearchParams`.
- **404 Handling**: Invalid task IDs (e.g. `/todos?id=invalid`) display a clean "Task Not Found" state with return navigation.

### 2. 🎯 Priority Levels
- **High (🔴)**, **Medium (🟡)**, and **Low (🟢)** visual indicators on cards and detail view.
- Real-time priority filtering and sorting.

### 3. 📅 Due Dates & Overdue Warnings
- Add due date & time when creating or editing tasks.
- Dynamic status badges: `"Due in X days"`, `"Due today"`, or `"Overdue by X days"` with warning colors.

### 4. 📂 Categories & Tags
- 6 predefined categories: **Work 💼**, **Personal 👤**, **Shopping 🛒**, **Health 💪**, **Learning 📚**, **Other 📌**.
- Category filter tabs with real-time task counts.

### 5. 📊 Productivity Statistics Dashboard
- **SVG Circular Progress Chart** showing overall completion percentage.
- Priority level mini cards (High/Medium/Low counts).
- Category distribution horizontal bar chart.
- Real-time overdue task warning indicator.

### 6. 🌙 Dark Mode & Preferences Persistence
- Sun ☀️ / Moon 🌙 theme toggle button in header.
- Persistent state saved in browser `localStorage`.
- CSS variable theme system with smooth background color transitions.

### 7. 🔔 Toast Notifications & 5-Second Undo Grace Period
- Interactive toast alerts for creation, edits, and deletions.
- **5-second grace period for Undo** on task deletion before persisting to server.

### 8. 📥 JSON Backup Export & Import
- One-click **Export JSON** button in header to download all task data as a `.json` backup file.
- One-click **Import JSON** button to restore task backups instantly.

### 9. 📱 Responsive Design & Accessibility (A11y)
- Mobile-first responsive breakpoints (**390px mobile** $\rightarrow$ **768px tablet** $\rightarrow$ **1440px desktop**).
- **0 horizontal overflow on 390px mobile viewports**.
- ARIA focus rings, keyboard tab navigation (`tabIndex={0}`), and minimum 44px touch targets.

---

## 🛠️ Architecture & Tech Stack

```
ziptrrip-todo-app/
├── backend/
│   ├── data/
│   │   └── todos.json             # Persistent JSON file storage
│   ├── middleware/
│   │   ├── errorHandler.js        # 404 & global Express error handling
│   │   ├── logger.js              # Request logging middleware
│   │   └── validation.js          # Payload & ID validation
│   ├── controllers/
│   │   └── todoController.js      # CRUD & Statistics handlers
│   ├── routes/
│   │   └── todos.js               # API routes router
│   ├── utils/
│   │   └── fileStorage.js         # Safe atomic file read/write
│   ├── server.js                  # Express app entry point & port fallback handling
│   ├── README.md                  # Backend developer documentation
│   └── package.json              # Express, Cors, Dotenv, Nodemon
├── frontend/
│   ├── src/
│   │   ├── components/            # Header, TodoCard, TodoForm, TodoModal, ConfirmDelete, StatsCard, FilterTabs, Toast, FAB
│   │   ├── pages/                 # TodoList (Main) & TodoDetail (/todos?id=...)
│   │   ├── hooks/                 # useTodos, useToast, useLocalStorage, useDebounce
│   │   ├── utils/                 # apiClient, constants, helpers, themes, backup
│   │   ├── styles/                # CSS Tokens, Components, Animations, Responsive
│   │   ├── App.jsx                # Router & ToastProvider wrapper
│   │   └── main.jsx               # React entry point
│   ├── index.html
│   └── vite.config.js
├── README.md                      # Comprehensive developer guide (This file)
└── ENDPOINTS.md                   # REST API Specification Documentation
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/md-z-ishan/ziptrrip-todo-app.git
cd ziptrrip-todo-app
npm run install-all
```

### 3. Running Development Servers
Run both backend and frontend concurrently with a single command:
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:3000`
- **Backend Express API**: `http://localhost:5000` (or `http://localhost:5001` fallback if port 5000 is occupied by macOS AirPlay Receiver)
- **API Health Check**: `http://localhost:5000/api/health`

---

## 📑 API Endpoints Summary

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check | `200 OK` |
| `GET` | `/api/todos` | List todos (Query params: `?search=`, `?priority=`, `?category=`, `?completed=`) | `200 OK` |
| `GET` | `/api/todos/stats` | Retrieve productivity dashboard metrics | `200 OK` |
| `GET` | `/api/todos/:id` | Get single todo by ID | `200 OK` / `404` |
| `POST` | `/api/todos` | Create a new todo | `201 Created` / `400` |
| `PUT` | `/api/todos/:id` | Update an existing todo | `200 OK` / `400` / `404` |
| `DELETE` | `/api/todos/:id` | Delete todo | `200 OK` / `404` |

For detailed request/response JSON payload examples, please refer to [ENDPOINTS.md](file:///Users/mdzishan/Desktop/ziptrrip-todo-app/ENDPOINTS.md).

---

## 🧪 Verification & Build Status

- **Production Build**: Verified with Vite compiler (`npm run build` $\rightarrow$ `✓ built in 964ms`, 0 warnings, 0 errors).
- **Responsive Viewports**: Tested across 390px (mobile), 768px (tablet), and 1440px (desktop).
- **Git Commit History**: Clean atomic git commit log pushed to `origin/main`.
