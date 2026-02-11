import { useEffect, useState, useCallback } from 'react';
import { Plus, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { getEmployees, createEmployee, deleteEmployee } from '../services/api';
import PageHeader from '../components/ui/PageHeader';
import { LoadingState, EmptyState, ErrorState } from '../components/ui/StateDisplays';
import EmployeeForm from '../components/employees/EmployeeForm';
import EmployeeTable from '../components/employees/EmployeeTable';
import ConfirmDialog from '../components/ui/ConfirmDialog';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getEmployees();
            setEmployees(res.data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to load employees');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleCreate = async (data) => {
        try {
            setSubmitting(true);
            await createEmployee(data);
            toast.success(`Employee ${data.full_name} added successfully`);
            setShowForm(false);
            fetchEmployees();
        } catch (err) {
            const msg = err.response?.data?.detail || 'Failed to add employee';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await deleteEmployee(deleteTarget.employee_id);
            toast.success(`Employee ${deleteTarget.full_name} deleted`);
            setDeleteTarget(null);
            fetchEmployees();
        } catch (err) {
            toast.error(err.response?.data?.detail || 'Failed to delete employee');
        }
    };

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Employees"
                description="Manage your organization's employee directory"
            >
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Employee
                </button>
            </PageHeader>

            {/* Add Employee Form */}
            {showForm && (
                <div className="mb-6">
                    <EmployeeForm
                        onSubmit={handleCreate}
                        onCancel={() => setShowForm(false)}
                        loading={submitting}
                    />
                </div>
            )}

            {/* Employee List */}
            {loading ? (
                <LoadingState message="Loading employees..." />
            ) : error ? (
                <ErrorState message={error} onRetry={fetchEmployees} />
            ) : employees.length === 0 ? (
                <EmptyState
                    icon={Users}
                    title="No Employees Yet"
                    message="Add your first employee to get started with the HRMS system."
                />
            ) : (
                <>
                    <div className="mb-4">
                        <p className="text-sm text-surface-500">
                            Showing <span className="font-semibold text-surface-700">{employees.length}</span> employee{employees.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <EmployeeTable employees={employees} onDelete={setDeleteTarget} />
                </>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={!!deleteTarget}
                title="Delete Employee"
                message={`Are you sure you want to delete ${deleteTarget?.full_name}? This will also remove all their attendance records. This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
}
