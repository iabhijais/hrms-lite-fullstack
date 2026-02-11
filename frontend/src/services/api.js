/**
 * Axios instance and API service functions for HRMS Lite.
 * Centralizes all backend communication in one module.
 */
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

// ── Employee APIs ──

export const getEmployees = () => api.get('/api/employees');

export const getEmployee = (employeeId) => api.get(`/api/employees/${employeeId}`);

export const createEmployee = (data) => api.post('/api/employees', data);

export const deleteEmployee = (employeeId) => api.delete(`/api/employees/${employeeId}`);

// ── Attendance APIs ──

export const getAttendance = (params = {}) => api.get('/api/attendance', { params });

export const markAttendance = (data) => api.post('/api/attendance', data);

// ── Dashboard APIs ──

export const getDashboardSummary = () => api.get('/api/dashboard/summary');

export default api;
