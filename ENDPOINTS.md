# 📄 Ziptrip Todo App - REST API Documentation

Base URL: `http://localhost:5000/api`

---

## 1. List All Todos
Retrieves todos with optional filtering, search, and sorting.

- **Endpoint**: `GET /api/todos`
- **Query Parameters**:
  - `search` (string): Query to filter by title or description (e.g. `?search=react`)
  - `priority` (string): Filter by priority (`high`, `medium`, `low`, or `all`)
  - `category` (string): Filter by category (`work`, `personal`, `shopping`, `health`, `learning`, `other`, or `all`)
  - `completed` (boolean): Filter by completion status (`true` or `false`)
  - `sortBy` (string): Order results (`newest`, `dueDate`, `priority`)

### Example Response (200 OK):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "todo-1",
      "title": "Learn React Hooks",
      "description": "Deep dive into useState, useEffect, custom hooks, and context API",
      "priority": "high",
      "category": "work",
      "dueDate": "2026-09-05T18:00:00.000Z",
      "completed": false,
      "createdAt": "2026-08-31T10:00:00.000Z",
      "updatedAt": "2026-08-31T10:00:00.000Z"
    }
  ]
}
```

---

## 2. Get Single Todo
Retrieves details of a specific todo by ID.

- **Endpoint**: `GET /api/todos/:id`

### Example Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "todo-1",
    "title": "Learn React Hooks",
    "description": "Deep dive into useState, useEffect, custom hooks, and context API",
    "priority": "high",
    "category": "work",
    "dueDate": "2026-09-05T18:00:00.000Z",
    "completed": false,
    "createdAt": "2026-08-31T10:00:00.000Z",
    "updatedAt": "2026-08-31T10:00:00.000Z"
  }
}
```

### Error Response (404 Not Found):
```json
{
  "success": false,
  "message": "Todo with ID 'todo-999' not found."
}
```

---

## 3. Create Todo
Creates a new todo item.

- **Endpoint**: `POST /api/todos`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "title": "Complete Ziptrip Internship Task",
  "description": "Build interview-ready Todo application",
  "priority": "high",
  "category": "work",
  "dueDate": "2026-09-02T11:00:00.000Z"
}
```

### Response (201 Created):
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": "todo-1693630000000-abc12",
    "title": "Complete Ziptrip Internship Task",
    "description": "Build interview-ready Todo application",
    "priority": "high",
    "category": "work",
    "dueDate": "2026-09-02T11:00:00.000Z",
    "completed": false,
    "createdAt": "2026-09-02T04:30:00.000Z",
    "updatedAt": "2026-09-02T04:30:00.000Z"
  }
}
```

---

## 4. Update Todo
Updates any field of an existing todo.

- **Endpoint**: `PUT /api/todos/:id`
- **Request Body**: (Partial fields allowed)
```json
{
  "completed": true,
  "priority": "medium"
}
```

### Response (200 OK):
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": "todo-1",
    "title": "Learn React Hooks",
    "description": "Deep dive into useState...",
    "priority": "medium",
    "category": "work",
    "dueDate": "2026-09-05T18:00:00.000Z",
    "completed": true,
    "createdAt": "2026-08-31T10:00:00.000Z",
    "updatedAt": "2026-09-02T04:32:00.000Z"
  }
}
```

---

## 5. Delete Todo
Deletes a todo item by ID.

- **Endpoint**: `DELETE /api/todos/:id`

### Response (200 OK):
```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": {
    "id": "todo-1"
  }
}
```

---

## 6. Get Productivity Statistics
Calculates aggregated metric counts for dashboard charts.

- **Endpoint**: `GET /api/todos/stats`

### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "total": 4,
    "completed": 1,
    "pending": 3,
    "completionPercentage": 25,
    "overdueCount": 1,
    "byPriority": {
      "high": 2,
      "medium": 1,
      "low": 1
    },
    "byCategory": {
      "work": 2,
      "personal": 0,
      "shopping": 1,
      "health": 1,
      "learning": 0,
      "other": 0
    }
  }
}
```
