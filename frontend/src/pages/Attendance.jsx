import { useEffect, useState, useCallback } from 'react';
import { Plus, CalendarCheck, Filter, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { getEmployees, getAttendance, markAttendance } from '../services/api';
import PageHeader from '../components/ui/PageHeader';
import { LoadingState, EmptyState, ErrorState } from '../components/ui/StateDisplays';
import AttendanceForm from '../components/attendance/AttendanceForm';
import AttendanceTable from '../components/attendance/AttendanceTable';

export default function AttendancePage() {
    const [employees, setEmployees] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Filters
    const [filterEmployee, setFilterEmployee] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [empRes, attRes] = await Promise.all([
                getEmployees(),
                getAttendance({
                    employee_id: filterEmployee || undefined,
                    date: filterDate || undefined,
                }),
            ]);
            setEmployees(empRes.data);
            setRecords(attRes.data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to load attendance data');
        } finally {
            setLoading(false);
        }
    }, [filterEmployee, filterDate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleMark = async (data) => {
        try {
            setSubmitting(true);
            await markAttendance(data);
            toast.success('Attendance marked successfully');
            setShowForm(false);
            fetchData();
        } catch (err) {
            const msg = err.response?.data?.detail || 'Failed to mark attendance';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const clearFilters = () => {
        setFilterEmployee('');
        setFilterDate('');
    };

    const hasFilters = filterEmployee || filterDate;

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Attendance"
                description="Track and manage employee attendance records"
            >
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Mark Attendance
                </button>
            </PageHeader>

            {/* Mark Attendance Form */}
            {showForm && (
                <div className="mb-6">
                    <AttendanceForm
                        employees={employees}
                        onSubmit={handleMark}
                        onCancel={() => setShowForm(false)}
                        loading={submitting}
                    />
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-surface-200/80 p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-4 h-4 text-surface-500" />
                    <span className="text-sm font-medium text-surface-700">Filters</span>
                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="ml-auto flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium"
                        >
                            <X className="w-3 h-3" />
                            Clear all
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                        value={filterEmployee}
                        onChange={(e) => setFilterEmployee(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-surface-200 bg-surface-50 
              focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    >
                        <option value="">All Employees</option>
                        {employees.map((emp) => (
                            <option key={emp.employee_id} value={emp.employee_id}>
                                {emp.full_name} ({emp.employee_id})
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-surface-200 bg-surface-50 
              focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                        placeholder="Filter by date"
                    />
                </div>
            </div>

            {/* Attendance Records */}
            {loading ? (
                <LoadingState message="Loading attendance records..." />
            ) : error ? (
                <ErrorState message={error} onRetry={fetchData} />
            ) : records.length === 0 ? (
                <EmptyState
                    icon={CalendarCheck}
                    title="No Attendance Records"
                    message={
                        hasFilters
                            ? 'No records match the current filters. Try adjusting your filters.'
                            : 'Mark attendance for employees to see records here.'
                    }
                />
            ) : (
                <>
                    <div className="mb-4">
                        <p className="text-sm text-surface-500">
                            Showing <span className="font-semibold text-surface-700">{records.length}</span> record{records.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <AttendanceTable records={records} employees={employees} />
                </>
            )}
        </div>
    );
}
