# Ziptrrip Todo API

Express.js REST API for the Ziptrrip Todo Application. Provides lightweight, file-based persistence for todo management, priority filtering, category tagging, search, and productivity metrics.

---

## 🛠️ Technology Used

- **Node.js** (Runtime environment)
- **Express.js** (Web framework)
- **CORS** (Cross-Origin Resource Sharing middleware)
- **dotenv** (Environment variable management)
- **JSON File Storage** (`fs/promises` atomic write handling)
- **Nodemon** (Development hot-reloading)

---

## 📁 Folder Structure

```
backend/
├── controllers/
│   └── todoController.js     # Handles request logic, filtering, and response formatting
├── middleware/
│   ├── errorHandler.js       # 404 handler and global error management
│   └── validation.js         # Payload validation for title, priority, category, and dates
├── routes/
│   └── todos.js              # REST endpoint route definitions
├── utils/
│   └── fileStorage.js        # File I/O operations with atomic write handling
├── data/
│   └── todos.json            # Persistent JSON file storage
├── .env.example              # Environment variables template
├── package.json              # Backend dependencies and scripts
└── server.js                 # Express server configuration and entry point
```

---

## ⚙️ Environment Setup

Copy `.env.example` to create a `.env` file:
```bash
cp .env.example .env
```

Default configuration:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 📦 Installation & Running

### Installation
```bash
npm install
```

### Running Development Server (with Nodemon)
```bash
npm run dev
```

### Running Production Server
```bash
npm start
```

Server running at: `http://localhost:5000`

---

## 📑 API Endpoint Table

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Server health status check | N/A |
| `GET` | `/api/todos` | List all todos | `search`, `priority`, `category`, `completed` |
| `GET` | `/api/todos/stats` | Aggregated metrics | N/A |
| `GET` | `/api/todos/:id` | Get single todo by ID | N/A |
| `POST` | `/api/todos` | Create a new todo | N/A |
| `PUT` | `/api/todos/:id` | Update an existing todo | N/A |
| `DELETE` | `/api/todos/:id` | Delete todo by ID | N/A |

---

## 📝 Example Request Bodies

### Create Todo (`POST /api/todos`)
```json
{
  "title": "Complete Ziptrrip assignment",
  "description": "Implement Express backend and React UI",
  "priority": "high",
  "category": "work",
  "dueDate": "2026-09-02T11:00:00.000Z"
}
```

### Update Todo (`PUT /api/todos/:id`)
```json
{
  "completed": true,
  "priority": "medium"
}
```

---

## 💾 JSON Storage Explanation

To avoid external database setup overhead, todos are stored directly in `backend/data/todos.json`.

The `fileStorage.js` utility safely reads and writes to this file using atomic operations (writing to a `.tmp` temporary file first, then performing an atomic file rename). This prevents file corruption during rapid or concurrent update operations.
