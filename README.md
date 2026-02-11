# HRMS Lite — Lightweight Human Resource Management System

A full-stack web application for managing employee records and tracking daily attendance. Built with a modern tech stack featuring a FastAPI backend and React frontend, designed to simulate a practical internal HR tool.

![Tech Stack](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

## 📋 Project Overview

HRMS Lite is a lightweight Human Resource Management System that enables an admin to:

- **Employee Management** — Add, view, and delete employee records with validated fields (Employee ID, Full Name, Email, Department).
- **Attendance Tracking** — Mark daily attendance (Present/Absent) and view filterable attendance records per employee.
- **Dashboard** — View organization-level HR metrics including total employees, attendance rates, department breakdown, and per-employee present days.

The application focuses on delivering a clean, stable, and production-ready experience with proper error handling, validation, and meaningful UI states.

---

## 🛠 Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| **Frontend** | React (Vite), Tailwind CSS, Lucide React, Axios |
| **Backend**  | Python, FastAPI, SQLModel (Pydantic + SQLAlchemy) |
| **Database** | SQLite (file-based, auto-generated) |
| **Dev Tools** | Vite Dev Server, Uvicorn           |

---

## 🚀 Getting Started — Local Setup

### Prerequisites

- **Python 3.10+** installed
- **Node.js 18+** and npm installed
- **Git** installed

### 1. Clone the Repository

```bash
git clone https://github.com/iabhijais/hrms-lite-fullstack.git
cd hrms-lite-fullstack
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

The API server starts at `http://localhost:8000`.  
API documentation is available at `http://localhost:8000/docs` (Swagger UI).

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server starts at `http://localhost:5173`.  
The Vite proxy is pre-configured to route `/api/*` requests to the backend.

### 4. Access the Application

Open [http://localhost:5173](http://localhost:5173) in your browser.  
The database is auto-created on first run with 5 seeded employees and sample attendance records.

---

## 🌍 Deployment Guide

### Backend (Render / Railway)

1. **Root Directory**: Set to `backend`
2. **Build Command**: `pip install -r requirements.txt`
3. **Start Command**: `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Environment**: Python 3.10+

*Note: The SQLite database is file-based. On ephemeral cloud hosting (like Render Free Tier), the database may reset on redeployments.*

### Frontend (Vercel / Netlify)

1. **Root Directory**: Set to `frontend`
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: Set this to your deployed backend URL (e.g., `https://your-backend.onrender.com`)

*Note: A `vercel.json` file is included in the frontend directory to handle client-side routing.*

---

## 📁 Project Structure

```
hrms-lite-fullstack/
├── backend/
│   ├── main.py              # FastAPI app, endpoints, seed data
│   ├── models.py            # SQLModel/Pydantic data models
│   ├── database.py          # DB engine and session management
│   ├── requirements.txt     # Python dependencies
│   └── hrms.db              # SQLite database (auto-generated)
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── layout/      # Sidebar, MobileNav
│   │   │   ├── ui/          # PageHeader, StatCard, StateDisplays, ConfirmDialog, ErrorBoundary
│   │   │   ├── employees/   # EmployeeForm, EmployeeTable
│   │   │   └── attendance/  # AttendanceForm, AttendanceTable
│   │   ├── pages/           # Dashboard, Employees, Attendance
│   │   ├── services/        # API service (Axios)
│   │   ├── App.jsx          # Root component with routing
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles + Tailwind
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json          # Deployment config
│   └── package.json
└── README.md
```

---

## 🔗 API Endpoints

| Method   | Endpoint                      | Description                          |
| -------- | ----------------------------- | ------------------------------------ |
| `GET`    | `/api/health`                 | Health check                         |
| `GET`    | `/api/employees`              | List all employees                   |
| `GET`    | `/api/employees/:id`          | Get a single employee                |
| `POST`   | `/api/employees`              | Create a new employee                |
| `DELETE` | `/api/employees/:id`          | Delete an employee                   |
| `GET`    | `/api/attendance`             | List attendance (filterable)         |
| `POST`   | `/api/attendance`             | Mark attendance                      |
| `GET`    | `/api/dashboard/summary`      | Dashboard metrics summary            |

---

## ✅ Features & Bonus

- [x] Employee CRUD (Add, View, Delete)
- [x] Attendance marking with date & status
- [x] Server-side validation (unique ID, email format, duplicates)
- [x] Client-side form validation with error messages
- [x] Loading, empty, and error state handling
- [x] Professional, minimalist UI with responsive design
- [x] Seed data (5 employees + sample attendance)
- [x] **Bonus:** Filter attendance records by date and employee
- [x] **Bonus:** Dashboard with total present days per employee
- [x] **Bonus:** Dashboard summary (counts, department breakdown, attendance rate)

---

## ⚠️ Assumptions & Limitations

1. **Single admin user** — No authentication or role-based access control is implemented (as per requirements).
2. **SQLite database** — Suitable for lightweight usage.
3. **Leave management, payroll** — Out of scope for this version.
4. **CORS** — Configured to allow all origins for development/demo; should be restricted in production.
5. **Deployment** — Environment variable `VITE_API_URL` should point to the deployed backend URL in production.

---

## 📄 License

This project is built as part of a full-stack development assessment.
