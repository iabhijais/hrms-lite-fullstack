import { useState } from 'react';
import { UserPlus, X, Loader2 } from 'lucide-react';

const DEPARTMENTS = [
    'Engineering',
    'Human Resources',
    'Marketing',
    'Finance',
    'Operations',
    'Sales',
    'Design',
    'Legal',
];

export default function EmployeeForm({ onSubmit, onCancel, loading }) {
    const [form, setForm] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.employee_id.trim()) errs.employee_id = 'Employee ID is required';
        if (!form.full_name.trim()) errs.full_name = 'Full name is required';
        if (!form.email.trim()) {
            errs.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errs.email = 'Please enter a valid email address';
        }
        if (!form.department) errs.department = 'Department is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(form);
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-surface-200/80 p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-brand-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-surface-900">Add New Employee</h2>
                </div>
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
                        aria-label="Close form"
                    >
                        <X className="w-5 h-5 text-surface-400" />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Employee ID */}
                    <div>
                        <label htmlFor="employee_id" className="block text-sm font-medium text-surface-700 mb-1.5">
                            Employee ID
                        </label>
                        <input
                            id="employee_id"
                            type="text"
                            placeholder="e.g. EMP006"
                            value={form.employee_id}
                            onChange={(e) => handleChange('employee_id', e.target.value)}
                            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-surface-50 
                focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
                transition-all duration-150 placeholder:text-surface-400
                ${errors.employee_id ? 'border-red-400 bg-red-50/50' : 'border-surface-200'}`}
                        />
                        {errors.employee_id && (
                            <p className="text-xs text-red-500 mt-1">{errors.employee_id}</p>
                        )}
                    </div>

                    {/* Full Name */}
                    <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-surface-700 mb-1.5">
                            Full Name
                        </label>
                        <input
                            id="full_name"
                            type="text"
                            placeholder="e.g. John Doe"
                            value={form.full_name}
                            onChange={(e) => handleChange('full_name', e.target.value)}
                            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-surface-50 
                focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
                transition-all duration-150 placeholder:text-surface-400
                ${errors.full_name ? 'border-red-400 bg-red-50/50' : 'border-surface-200'}`}
                        />
                        {errors.full_name && (
                            <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1.5">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="e.g. john.doe@company.com"
                            value={form.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-surface-50 
                focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
                transition-all duration-150 placeholder:text-surface-400
                ${errors.email ? 'border-red-400 bg-red-50/50' : 'border-surface-200'}`}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Department */}
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-surface-700 mb-1.5">
                            Department
                        </label>
                        <select
                            id="department"
                            value={form.department}
                            onChange={(e) => handleChange('department', e.target.value)}
                            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-surface-50 
                focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
                transition-all duration-150
                ${!form.department ? 'text-surface-400' : 'text-surface-900'}
                ${errors.department ? 'border-red-400 bg-red-50/50' : 'border-surface-200'}`}
                        >
                            <option value="" disabled>Select department</option>
                            {DEPARTMENTS.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        {errors.department && (
                            <p className="text-xs text-red-500 mt-1">{errors.department}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 py-2.5 text-sm font-medium text-surface-600 bg-surface-100 hover:bg-surface-200 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-sm"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <UserPlus className="w-4 h-4" />
                        )}
                        {loading ? 'Adding...' : 'Add Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
}
