"""
HRMS Lite — Main Application
FastAPI backend with RESTful endpoints for Employee and Attendance management.
"""

from contextlib import asynccontextmanager
from datetime import date

from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from database import get_session, init_db
from models import (
    Attendance,
    AttendanceCreate,
    AttendanceRead,
    AttendanceStatus,
    Employee,
    EmployeeCreate,
    EmployeeRead,
)


# ──────────────────────────────────────────────
#  Seed Data
# ──────────────────────────────────────────────

SEED_EMPLOYEES = [
    EmployeeCreate(
        employee_id="EMP001",
        full_name="Aarav Sharma",
        email="aarav.sharma@company.com",
        department="Engineering",
    ),
    EmployeeCreate(
        employee_id="EMP002",
        full_name="Priya Patel",
        email="priya.patel@company.com",
        department="Human Resources",
    ),
    EmployeeCreate(
        employee_id="EMP003",
        full_name="Rohan Mehta",
        email="rohan.mehta@company.com",
        department="Marketing",
    ),
    EmployeeCreate(
        employee_id="EMP004",
        full_name="Ananya Gupta",
        email="ananya.gupta@company.com",
        department="Finance",
    ),
    EmployeeCreate(
        employee_id="EMP005",
        full_name="Vikram Singh",
        email="vikram.singh@company.com",
        department="Engineering",
    ),
]


def _seed_database(session: Session) -> None:
    """Populate the database with initial employee data if empty."""
    existing = session.exec(select(Employee)).first()
    if existing:
        return  # Data already seeded

    for emp_data in SEED_EMPLOYEES:
        employee = Employee.model_validate(emp_data)
        session.add(employee)

    # Add some sample attendance records
    sample_attendance = [
        Attendance(employee_id="EMP001", date=date(2026, 2, 10), status=AttendanceStatus.PRESENT),
        Attendance(employee_id="EMP001", date=date(2026, 2, 11), status=AttendanceStatus.PRESENT),
        Attendance(employee_id="EMP002", date=date(2026, 2, 10), status=AttendanceStatus.PRESENT),
        Attendance(employee_id="EMP002", date=date(2026, 2, 11), status=AttendanceStatus.ABSENT),
        Attendance(employee_id="EMP003", date=date(2026, 2, 10), status=AttendanceStatus.PRESENT),
        Attendance(employee_id="EMP004", date=date(2026, 2, 10), status=AttendanceStatus.ABSENT),
        Attendance(employee_id="EMP005", date=date(2026, 2, 10), status=AttendanceStatus.PRESENT),
        Attendance(employee_id="EMP005", date=date(2026, 2, 11), status=AttendanceStatus.PRESENT),
    ]
    for record in sample_attendance:
        session.add(record)

    session.commit()


# ──────────────────────────────────────────────
#  Application Lifespan
# ──────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database and seed data on startup."""
    from database import engine

    init_db()
    with Session(engine) as session:
        _seed_database(session)
    yield


# ──────────────────────────────────────────────
#  FastAPI App
# ──────────────────────────────────────────────

app = FastAPI(
    title="HRMS Lite",
    description="Lightweight Human Resource Management System — Employee & Attendance Management",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ──────────────────────────────────────────────
#  Health Check
# ──────────────────────────────────────────────

@app.get("/api/health", tags=["Health"])
def health_check():
    """Health‑check endpoint for monitoring."""
    return {"status": "healthy", "service": "HRMS Lite API"}


# ══════════════════════════════════════════════
#  EMPLOYEE ENDPOINTS
# ══════════════════════════════════════════════

@app.get("/api/employees", response_model=list[EmployeeRead], tags=["Employees"])
def list_employees(session: Session = Depends(get_session)):
    """Retrieve all employees ordered by their database ID."""
    employees = session.exec(select(Employee).order_by(Employee.id)).all()
    return employees


@app.get("/api/employees/{employee_id}", response_model=EmployeeRead, tags=["Employees"])
def get_employee(employee_id: str, session: Session = Depends(get_session)):
    """Retrieve a single employee by their unique employee ID."""
    employee = session.exec(
        select(Employee).where(Employee.employee_id == employee_id)
    ).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID '{employee_id}' not found.",
        )
    return employee


@app.post(
    "/api/employees",
    response_model=EmployeeRead,
    status_code=status.HTTP_201_CREATED,
    tags=["Employees"],
)
def create_employee(payload: EmployeeCreate, session: Session = Depends(get_session)):
    """
    Create a new employee.
    Validates unique employee_id and email before persisting.
    """
    # Check duplicate employee ID
    existing_id = session.exec(
        select(Employee).where(Employee.employee_id == payload.employee_id)
    ).first()
    if existing_id:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Employee ID '{payload.employee_id}' already exists.",
        )

    # Check duplicate email
    existing_email = session.exec(
        select(Employee).where(Employee.email == payload.email)
    ).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Email '{payload.email}' is already registered.",
        )

    employee = Employee.model_validate(payload)
    session.add(employee)
    session.commit()
    session.refresh(employee)
    return employee


@app.delete("/api/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Employees"])
def delete_employee(employee_id: str, session: Session = Depends(get_session)):
    """
    Delete an employee and all their associated attendance records.
    """
    employee = session.exec(
        select(Employee).where(Employee.employee_id == employee_id)
    ).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID '{employee_id}' not found.",
        )

    # Delete associated attendance records first
    attendance_records = session.exec(
        select(Attendance).where(Attendance.employee_id == employee_id)
    ).all()
    for record in attendance_records:
        session.delete(record)

    session.delete(employee)
    session.commit()


# ══════════════════════════════════════════════
#  ATTENDANCE ENDPOINTS
# ══════════════════════════════════════════════

@app.get("/api/attendance", response_model=list[AttendanceRead], tags=["Attendance"])
def list_attendance(
    employee_id: str | None = Query(default=None, description="Filter by employee ID"),
    date_filter: date | None = Query(default=None, alias="date", description="Filter by date (YYYY-MM-DD)"),
    session: Session = Depends(get_session),
):
    """
    Retrieve attendance records with optional filters.
    - `employee_id`: filter records for a specific employee
    - `date`: filter records for a specific date
    """
    query = select(Attendance)

    if employee_id:
        query = query.where(Attendance.employee_id == employee_id)
    if date_filter:
        query = query.where(Attendance.date == date_filter)

    query = query.order_by(Attendance.date.desc(), Attendance.employee_id)
    records = session.exec(query).all()
    return records


@app.post(
    "/api/attendance",
    response_model=AttendanceRead,
    status_code=status.HTTP_201_CREATED,
    tags=["Attendance"],
)
def mark_attendance(payload: AttendanceCreate, session: Session = Depends(get_session)):
    """
    Mark attendance for an employee.
    Validates that the employee exists and prevents duplicate entries for the same date.
    """
    # Verify employee exists
    employee = session.exec(
        select(Employee).where(Employee.employee_id == payload.employee_id)
    ).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID '{payload.employee_id}' not found.",
        )

    # Check for duplicate attendance on the same date
    existing = session.exec(
        select(Attendance).where(
            Attendance.employee_id == payload.employee_id,
            Attendance.date == payload.date,
        )
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Attendance for employee '{payload.employee_id}' on {payload.date} already exists.",
        )

    record = Attendance.model_validate(payload)
    session.add(record)
    session.commit()
    session.refresh(record)
    return record


# ══════════════════════════════════════════════
#  DASHBOARD / SUMMARY ENDPOINT (Bonus)
# ══════════════════════════════════════════════

@app.get("/api/dashboard/summary", tags=["Dashboard"])
def dashboard_summary(session: Session = Depends(get_session)):
    """
    Returns a summary for the dashboard:
    - Total employees
    - Total attendance records
    - Present / Absent counts
    - Department-wise employee count
    """
    employees = session.exec(select(Employee)).all()
    attendance = session.exec(select(Attendance)).all()

    total_present = sum(1 for a in attendance if a.status == AttendanceStatus.PRESENT)
    total_absent = sum(1 for a in attendance if a.status == AttendanceStatus.ABSENT)

    # Department breakdown
    dept_count: dict[str, int] = {}
    for emp in employees:
        dept_count[emp.department] = dept_count.get(emp.department, 0) + 1

    # Per-employee present days
    employee_present_days: dict[str, int] = {}
    for a in attendance:
        if a.status == AttendanceStatus.PRESENT:
            employee_present_days[a.employee_id] = employee_present_days.get(a.employee_id, 0) + 1

    return {
        "total_employees": len(employees),
        "total_attendance_records": len(attendance),
        "total_present": total_present,
        "total_absent": total_absent,
        "department_breakdown": dept_count,
        "employee_present_days": employee_present_days,
    }
