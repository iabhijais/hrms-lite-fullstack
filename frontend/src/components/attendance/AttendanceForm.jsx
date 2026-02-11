import { useState } from 'react';
import { CalendarCheck, Loader2, X } from 'lucide-react';

export default function AttendanceForm({ employees, onSubmit, onCancel, loading }) {
    const [form, setForm] = useState({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.employee_id) errs.employee_id = 'Please select an employee';
        if (!form.date) errs.date = 'Date is required';
        if (!form.status) errs.status = 'Please select a status';
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
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <CalendarCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-surface-900">Mark Attendance</h2>
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Employee */}
                    <div>
                        <label htmlFor="att_employee" className="block text-sm font-medium text-surface-700 mb-1.5">
                            Employee
                        </label>
                        <select
                            id="att_employee"
                            value={form.employee_id}
                            onChange={(e) => handleChange('employee_id', e.target.value)}
                            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-surface-50 
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                transition-all duration-150
                ${!form.employee_id ? 'text-surface-400' : 'text-surface-900'}
                ${errors.employee_id ? 'border-red-400 bg-red-50/50' : 'border-surface-200'}`}
                        >
                            <option value="" disabled>Select employee</option>
                            {employees.map((emp) => (
                                <option key={emp.employee_id} value={emp.employee_id}>
                                    {emp.full_name} ({emp.employee_id})
                                </option>
                            ))}
                        </select>
                        {errors.employee_id && (
                            <p className="text-xs text-red-500 mt-1">{errors.employee_id}</p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="att_date" className="block text-sm font-medium text-surface-700 mb-1.5">
                            Date
                        </label>
                        <input
                            id="att_date"
                            type="date"
                            value={form.date}
                            onChange={(e) => handleChange('date', e.target.value)}
                            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-surface-50 
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                transition-all duration-150
                ${errors.date ? 'border-red-400 bg-red-50/50' : 'border-surface-200'}`}
                        />
                        {errors.date && (
                            <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1.5">
                            Status
                        </label>
                        <div className="flex gap-3">
                            <label
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all duration-150 text-sm font-medium
                  ${form.status === 'Present'
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20'
                                        : 'border-surface-200 bg-surface-50 text-surface-600 hover:border-surface-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="Present"
                                    checked={form.status === 'Present'}
                                    onChange={(e) => handleChange('status', e.target.value)}
                                    className="sr-only"
                                />
                                <span className={`w-2 h-2 rounded-full ${form.status === 'Present' ? 'bg-emerald-500' : 'bg-surface-300'}`} />
                                Present
                            </label>
                            <label
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all duration-150 text-sm font-medium
                  ${form.status === 'Absent'
                                        ? 'border-red-400 bg-red-50 text-red-700 ring-2 ring-red-500/20'
                                        : 'border-surface-200 bg-surface-50 text-surface-600 hover:border-surface-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="Absent"
                                    checked={form.status === 'Absent'}
                                    onChange={(e) => handleChange('status', e.target.value)}
                                    className="sr-only"
                                />
                                <span className={`w-2 h-2 rounded-full ${form.status === 'Absent' ? 'bg-red-500' : 'bg-surface-300'}`} />
                                Absent
                            </label>
                        </div>
                        {errors.status && (
                            <p className="text-xs text-red-500 mt-1">{errors.status}</p>
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
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-sm"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <CalendarCheck className="w-4 h-4" />
                        )}
                        {loading ? 'Marking...' : 'Mark Attendance'}
                    </button>
                </div>
            </form>
        </div>
    );
}
