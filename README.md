# HRMS Lite — Lightweight Human Resource Management System

A full-stack web application for managing employee records and tracking daily attendance. Built with FastAPI (backend) and React (frontend), this project simulates a practical internal HR tool with clean architecture, validation, and deployment readiness.

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

## 🌐 Live Deployment

- **Frontend (Vercel):**  
  https://hrms-lite-fullstack-steel.vercel.app/

- **Backend (Render):**  
  https://hrms-lite-backend-pob5.onrender.com/docs

> **Note to Reviewer:** The backend is hosted on Render Free Tier. The first request after a period of inactivity may take **30-50 seconds** due to cold start. Please be patient while the instance spins up.

---

## 📋 Project Overview

HRMS Lite enables an admin to:

- **Manage Employees**
  - Add employee (Unique ID, Name, Email, Department)
  - View employee list
  - Delete employee
  - Server-side validation & duplicate handling

- **Track Attendance**
  - Mark Present/Absent per employee per date
  - Prevent duplicate attendance for the same date
  - Filter attendance by employee and date

- **Dashboard Analytics**
  - Total employees
  - Present / Absent count
  - Attendance rate
  - Department breakdown
  - Present days per employee

The application emphasizes:
- Clean, professional UI
- Meaningful error handling & validation
- RESTful API design
- Modular code structure
- Deployment readiness

---

## 🛠 Tech Stack

| Layer       | Technology |
|------------|------------|
| **Frontend**   | React (Vite), Tailwind CSS, Axios, Lucide React |
| **Backend**    | FastAPI, SQLModel (Pydantic + SQLAlchemy) |
| **Database**   | SQLite (file-based) |
| **Server**     | Uvicorn |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🚀 Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### 1️⃣ Clone Repository

```bash
git clone https://github.com/iabhijais/hrms-lite-fullstack.git
cd hrms-lite-fullstack
```

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

The API runs at `http://localhost:8000`.  
Swagger Docs available at `http://localhost:8000/docs`.

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

---

## 📁 Project Structure

```
hrms-lite-fullstack/
├── backend/
│   ├── main.py              # FastAPI app endpoints & logic
│   ├── models.py            # Database models & schemas
│   ├── database.py          # DB session management
│   ├── requirements.txt
│   └── hrms.db              # SQLite DB (auto-generated)
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Main route pages
│   │   ├── services/        # API integration
│   │   ├── App.jsx          # Routing logic
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json          # Deployment config
│   └── package.json
└── README.md
```

---

## 🔗 API Endpoints

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| GET    | `/api/health`          | Health check      |
| GET    | `/api/employees`       | List employees    |
| POST   | `/api/employees`       | Create employee   |
| DELETE | `/api/employees/{id}`  | Delete employee   |
| GET    | `/api/attendance`      | List attendance   |
| POST   | `/api/attendance`      | Mark attendance   |
| GET    | `/api/dashboard/summary` | Dashboard metrics |

---

## ✅ Core Features

- [x] Employee CRUD Operations
- [x] Attendance Tracking
- [x] Server-side & Client-side Validation
- [x] Error Handling & HTTP Status Codes
- [x] Responsive UI with Loading/Error States
- [x] React Error Boundaries

## 🎯 Bonus Features

- [x] Dashboard Analytics & Charts
- [x] Attendance Filtering
- [x] Department Breakdown
- [x] Custom Favicon & Branding

---

## ⚠️ Assumptions & Limitations

1. **Single admin user** — No authentication system implemented.
2. **SQLite database** — Suitable for lightweight demo; production would use PostgreSQL.
3. **Deployment Storage** — Since SQLite is file-based, data on Render (free tier) may reset upon redeployment.
4. **CORS** — Configured to allow all origins for demonstration.

---

## 📄 License

This repository is built for evaluation purposes.
