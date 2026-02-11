import { CalendarDays, CheckCircle2, XCircle } from 'lucide-react';

export default function AttendanceTable({ records, employees }) {
    // Build a name lookup map for display purposes
    const nameMap = {};
    employees.forEach((emp) => {
        nameMap[emp.employee_id] = emp.full_name;
    });

    const formatDate = (dateStr) => {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-IN', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-surface-200/80 overflow-hidden animate-fade-in">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-surface-100">
                            <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                Employee
                            </th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                Employee ID
                            </th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                        {records.map((rec, idx) => (
                            <tr
                                key={rec.id}
                                className="hover:bg-surface-50/80 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                                            {(nameMap[rec.employee_id] || rec.employee_id).charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-surface-900">
                                            {nameMap[rec.employee_id] || rec.employee_id}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-semibold">
                                        {rec.employee_id}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="flex items-center gap-2 text-sm text-surface-600">
                                        <CalendarDays className="w-3.5 h-3.5 text-surface-400" />
                                        {formatDate(rec.date)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {rec.status === 'Present' ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Present
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
                                            <XCircle className="w-3.5 h-3.5" />
                                            Absent
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-surface-100">
                {records.map((rec) => (
                    <div key={rec.id} className="p-4 hover:bg-surface-50/80 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold">
                                    {(nameMap[rec.employee_id] || rec.employee_id).charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-surface-900">
                                        {nameMap[rec.employee_id] || rec.employee_id}
                                    </p>
                                    <p className="text-xs text-surface-500 mt-0.5">{rec.employee_id}</p>
                                </div>
                            </div>
                            {rec.status === 'Present' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Present
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
                                    <XCircle className="w-3 h-3" />
                                    Absent
                                </span>
                            )}
                        </div>
                        <p className="mt-2 flex items-center gap-2 text-xs text-surface-500 pl-12">
                            <CalendarDays className="w-3.5 h-3.5" />
                            {formatDate(rec.date)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
