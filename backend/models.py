"""
Data models for HRMS Lite.
Defines both database tables (SQLModel) and request/response schemas (Pydantic).
"""

from datetime import date
from enum import Enum
from typing import Optional

from pydantic import EmailStr, field_validator
from sqlmodel import Field, SQLModel


# ──────────────────────────────────────────────
#  Enums
# ──────────────────────────────────────────────

class AttendanceStatus(str, Enum):
    """Allowed attendance statuses."""
    PRESENT = "Present"
    ABSENT = "Absent"


# ──────────────────────────────────────────────
#  Employee Models
# ──────────────────────────────────────────────

class EmployeeBase(SQLModel):
    """Shared fields for Employee creation and response."""
    employee_id: str = Field(index=True, unique=True, min_length=1, max_length=20)
    full_name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    department: str = Field(min_length=1, max_length=50)


class Employee(EmployeeBase, table=True):
    """Employee database table model."""
    id: Optional[int] = Field(default=None, primary_key=True)


class EmployeeCreate(EmployeeBase):
    """Schema for creating a new employee (request body)."""

    @field_validator("employee_id")
    @classmethod
    def employee_id_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Employee ID cannot be blank")
        return v.strip()

    @field_validator("full_name")
    @classmethod
    def full_name_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Full name cannot be blank")
        return v.strip()

    @field_validator("department")
    @classmethod
    def department_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Department cannot be blank")
        return v.strip()


class EmployeeRead(EmployeeBase):
    """Schema for employee API responses."""
    id: int


# ──────────────────────────────────────────────
#  Attendance Models
# ──────────────────────────────────────────────

class AttendanceBase(SQLModel):
    """Shared fields for Attendance."""
    employee_id: str = Field(foreign_key="employee.employee_id")
    date: date
    status: AttendanceStatus


class Attendance(AttendanceBase, table=True):
    """Attendance database table model."""
    id: Optional[int] = Field(default=None, primary_key=True)


class AttendanceCreate(SQLModel):
    """Schema for marking attendance (request body)."""
    employee_id: str
    date: date
    status: AttendanceStatus


class AttendanceRead(AttendanceBase):
    """Schema for attendance API responses."""
    id: int
