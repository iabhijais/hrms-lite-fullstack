import { Trash2, Mail, Building, Hash } from 'lucide-react';

export default function EmployeeTable({ employees, onDelete }) {
    return (
        <div className="bg-white rounded-2xl border border-surface-200/80 overflow-hidden animate-fade-in">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-surface-100">
                            <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                Employee ID
                            </th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                Full Name
                            </th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                        {employees.map((emp, idx) => (
                            <tr
                                key={emp.employee_id}
                                className="hover:bg-surface-50/80 transition-colors"
                                style={{ animationDelay: `${idx * 40}ms` }}
                            >
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-semibold">
                                        {emp.employee_id}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold">
                                            {emp.full_name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-surface-900">{emp.full_name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-surface-600">{emp.email}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-100 text-surface-700 text-xs font-medium">
                                        {emp.department}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onDelete(emp)}
                                        className="p-2 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                                        aria-label={`Delete ${emp.full_name}`}
                                        title="Delete employee"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-surface-100">
                {employees.map((emp) => (
                    <div key={emp.employee_id} className="p-4 hover:bg-surface-50/80 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">
                                    {emp.full_name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-surface-900">{emp.full_name}</p>
                                    <span className="inline-flex items-center mt-0.5 text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                                        {emp.employee_id}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => onDelete(emp)}
                                className="p-2 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                aria-label={`Delete ${emp.full_name}`}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-1.5 pl-[52px]">
                            <p className="flex items-center gap-2 text-xs text-surface-500">
                                <Mail className="w-3.5 h-3.5" /> {emp.email}
                            </p>
                            <p className="flex items-center gap-2 text-xs text-surface-500">
                                <Building className="w-3.5 h-3.5" /> {emp.department}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
