"""
Database configuration and session management for HRMS Lite.
Uses SQLModel with SQLite for lightweight, file-based persistence.
"""

from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./hrms.db"

engine = create_engine(
    DATABASE_URL,
    echo=False,
    connect_args={"check_same_thread": False},  # Required for SQLite with FastAPI
)


def init_db() -> None:
    """Create all database tables based on SQLModel metadata."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """
    Dependency that provides a database session per request.
    Automatically handles commit/rollback and session cleanup.
    """
    with Session(engine) as session:
        yield session
