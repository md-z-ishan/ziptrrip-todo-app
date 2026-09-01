# 📑 Ziptrrip Todo Application - REST API Specification

Base URL: `http://localhost:5000/api`

---

## Overview

The Ziptrrip Todo API is a lightweight, high-performance RESTful service built with Node.js and Express.js, utilizing atomic file-based persistence via `todos.json`.

---

## 📍 API Endpoints Summary

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check | `200 OK` |
| `GET` | `/api/todos` | List all todos with search & filters | `200 OK` |
| `GET` | `/api/todos/stats` | Aggregated dashboard metrics | `200 OK` |
| `GET` | `/api/todos/:id` | Get single todo by ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/todos` | Create a new todo | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/todos/:id` | Update an existing todo | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/api/todos/:id` | Delete todo by ID | `200 OK` / `404 Not Found` |

---

## 1. Health Check Endpoint

- **Endpoint**: `GET /api/health`
- **Description**: Verifies if the backend Express server is running.

### Response (200 OK):
```json
{
  "status": "ok"
}
```

---

## 2. List All Todos (With Filters & Search)

- **Endpoint**: `GET /api/todos`
- **Query Parameters**:
  - `search` (string): Query to filter by title or description (case-insensitive). E.g. `?search=react`
  - `priority` (string): Filter by priority (`high`, `medium`, `low`, or `all`)
  - `category` (string): Filter by category (`work`, `personal`, `shopping`, `health`, `learning`, `other`, or `all`)
  - `completed` (boolean): Filter by completion state (`true` or `false`)

### Example Request:
```http
GET /api/todos?priority=high&category=work HTTP/1.1
Host: localhost:5000
```

### Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "todo-1",
      "title": "Complete Ziptrrip internship assignment",
      "description": "Build high-quality REST API backend and React frontend UI foundation",
      "priority": "high",
      "category": "work",
      "dueDate": "2026-09-02T11:00:00.000Z",
      "completed": false,
      "createdAt": "2026-09-01T09:00:00.000Z",
      "updatedAt": "2026-09-01T09:00:00.000Z"
    }
  ]
}
```

---

## 3. Get Productivity Statistics Dashboard Metrics

- **Endpoint**: `GET /api/todos/stats`
- **Description**: Returns aggregated task metrics for SVG completion rings, priority cards, and category bars.

### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "total": 5,
    "completed": 1,
    "pending": 4,
    "completionPercentage": 20,
    "byPriority": {
      "high": 2,
      "medium": 2,
      "low": 1
    },
    "byCategory": {
      "work": 2,
      "personal": 0,
      "shopping": 1,
      "health": 1,
      "learning": 1,
      "other": 0
    }
  }
}
```

---

## 4. Get Single Todo by ID

- **Endpoint**: `GET /api/todos/:id`

### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "todo-1",
    "title": "Complete Ziptrrip internship assignment",
    "description": "Build high-quality REST API backend and React frontend UI foundation",
    "priority": "high",
    "category": "work",
    "dueDate": "2026-09-02T11:00:00.000Z",
    "completed": false,
    "createdAt": "2026-09-01T09:00:00.000Z",
    "updatedAt": "2026-09-01T09:00:00.000Z"
  }
}
```

### Error Response (404 Not Found):
```json
{
  "success": false,
  "message": "Todo not found."
}
```

---

## 5. Create New Todo

- **Endpoint**: `POST /api/todos`
- **Headers**: `Content-Type: application/json`
- **Payload Rules**:
  - `title` (required): string, min 3 characters after trimming.
  - `priority` (optional): `"high"`, `"medium"` (default), or `"low"`.
  - `category` (optional): `"work"`, `"personal"`, `"shopping"`, `"health"`, `"learning"`, or `"other"` (default).
  - `dueDate` (optional): valid ISO 8601 date string.

### Request Body:
```json
{
  "title": "Prepare Ziptrrip Final Demo",
  "description": "Review feature checklist and responsive design",
  "priority": "high",
  "category": "work",
  "dueDate": "2026-09-02T11:00:00.000Z"
}
```

### Response (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "todo-1693630000000-a1b2c",
    "title": "Prepare Ziptrrip Final Demo",
    "description": "Review feature checklist and responsive design",
    "priority": "high",
    "category": "work",
    "dueDate": "2026-09-02T11:00:00.000Z",
    "completed": false,
    "createdAt": "2026-09-02T05:15:00.000Z",
    "updatedAt": "2026-09-02T05:15:00.000Z"
  }
}
```

### Error Response (400 Bad Request):
```json
{
  "success": false,
  "message": "Title must be at least 3 characters."
}
```

---

## 6. Update Todo (Partial or Full)

- **Endpoint**: `PUT /api/todos/:id`
- **Headers**: `Content-Type: application/json`

### Request Body (Partial Update):
```json
{
  "completed": true
}
```

### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "todo-1",
    "title": "Complete Ziptrrip internship assignment",
    "description": "Build high-quality REST API backend and React frontend UI foundation",
    "priority": "high",
    "category": "work",
    "dueDate": "2026-09-02T11:00:00.000Z",
    "completed": true,
    "createdAt": "2026-09-01T09:00:00.000Z",
    "updatedAt": "2026-09-02T05:15:30.000Z"
  }
}
```

---

## 7. Delete Todo

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
