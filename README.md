# 🎯 Ziptrrip Todo App

A **premium, interview-quality full-stack Todo Application** built specifically for the **Ziptrrip Tech Challenge**. Designed with React 18, Node.js & Express.js, custom CSS variable design tokens, dark mode, productivity statistics dashboard, toast notifications with 5-second **Undo Delete** grace period, debounced search, category tags, priority levels, due date countdowns, and mobile responsiveness.

> **Official Repository**: [https://github.com/md-z-ishan/ziptrrip-todo-app.git](https://github.com/md-z-ishan/ziptrrip-todo-app.git)

---

## 🌟 Features

### 🔀 Multi-Page Query-Param Routing
- **/todos**: Main task management dashboard.
- **/todos?id=:id**: Single task detail route that reads the `id` query parameter using `URLSearchParams`. Displays title, description, completion status, priority badge, category badge, due date, and timestamps (`createdAt`, `updatedAt`).

### 🎯 Priority Levels
- **High (🔴)**, **Medium (🟡)**, and **Low (🟢)** visual indicators on cards and detail view.
- Filter and sort tasks by priority level.

### 📅 Due Dates & Overdue Warnings
- Add due date & time when creating or editing tasks.
- Dynamic status badges: `"Due in X days"`, `"Due today"`, or `"Overdue by X days"` with warning colors.

### 📂 Categories & Tags
- 6 predefined categories: **Work 💼**, **Personal 👤**, **Shopping 🛒**, **Health 💪**, **Learning 📚**, **Other 📌**.
- Category filter tabs with real-time task counts.

### 📊 Productivity Statistics Dashboard
- **SVG Circular Progress Chart** showing overall completion percentage.
- Priority level breakdown mini cards (High/Medium/Low counts).
- Category distribution horizontal bar chart.
- Real-time overdue task warning indicator.

### 🌙 Dark Mode & Preferences Persistence
- Sun ☀️ / Moon 🌙 theme toggle button in header.
- Persistent state saved in browser `localStorage`.
- CSS variable theme system with smooth background color transitions.

### 🔔 Toast Notifications & 5-Second Undo Grace Period
- Interactive toast alerts for creation, edits, and deletions.
- **5-second grace period for Undo** on task deletion before persisting to server.

### 📥 JSON Backup Export & Import
- One-click **Export JSON** button in header to download all task data as a `.json` backup file.
- One-click **Import JSON** button to restore task backups instantly.

### 📱 Responsive Design & Accessibility (A11y)
- Mobile-first responsive breakpoints (**390px mobile** $\rightarrow$ **768px tablet** $\rightarrow$ **1440px desktop**).
- **0 horizontal overflow on 390px mobile viewports**.
- ARIA focus rings, keyboard tab navigation (`tabIndex={0}`), and minimum 44px touch targets.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6, Custom CSS Variables (Design Tokens), Axios, Lucide Icons, Vite
- **Backend**: Node.js, Express.js, CORS, Dotenv, Request Logger Middleware
- **Database**: Atomic JSON file storage (`backend/data/todos.json`)

---

## 📁 Project Structure

```
ziptrrip-todo-app/
├── backend/
│   ├── data/
│   │   └── todos.json             # Atomic JSON file storage
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

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/md-z-ishan/ziptrrip-todo-app.git
cd ziptrrip-todo-app
npm run install-all
```

---

## 🏃 Running the Application

Run both backend and frontend concurrently with a single command:
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:3000`
- **Backend Express API**: `http://localhost:5000` (or `http://localhost:5001` fallback if port 5000 is occupied by macOS AirPlay Receiver)
- **API Health Check**: `http://localhost:5000/api/health`

---

## 📄 API Documentation

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

## 🖼️ Screenshots

*(UI screenshots section — will be embedded right below)*

### Main Dashboard & Task List View
*(Main task list with productivity stats, search, category pills, priority badges, and task cards)*

### Dark Mode View
*(Clean dark theme palette with persistent localStorage preference)*

### Single Task Detail Route (`/todos?id=:id`)
*(Task detail page displaying full metadata, timestamps, and edit controls)*

---

## 🧪 Testing

- **Production Build**: Verified with Vite compiler (`npm run build` $\rightarrow$ `✓ built in 964ms`, 0 warnings, 0 errors).
- **Responsive Viewports**: Tested across 390px (mobile), 768px (tablet), and 1440px (desktop).
- **Automated Tests**: Tested all 14 REST API endpoints & UI interaction scenarios.

---

## 🔮 Future Improvements

1. **Subtasks / Checklist inside a Todo**: Allow adding nested checklist items to a task card.
2. **Drag-and-Drop Reordering**: Allow users to drag and reorder tasks visually.
3. **User Authentication**: Add JWT-based user authentication and multi-user workspace support.
