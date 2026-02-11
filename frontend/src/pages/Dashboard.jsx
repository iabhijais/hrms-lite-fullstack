import { useEffect, useState } from 'react';
import { Users, CalendarCheck, CheckCircle2, XCircle, TrendingUp, Building } from 'lucide-react';
import { getDashboardSummary } from '../services/api';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import { LoadingState, ErrorState } from '../components/ui/StateDisplays';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getDashboardSummary();
            setData(res.data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <LoadingState message="Loading dashboard..." />;
    if (error) return <ErrorState message={error} onRetry={fetchData} />;
    if (!data) return <ErrorState message="No dashboard data available" onRetry={fetchData} />;

    const attendanceRate =
        (data.total_attendance_records || 0) > 0
            ? Math.round(((data.total_present || 0) / data.total_attendance_records) * 100)
            : 0;

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Dashboard"
                description="Overview of your organization's HR metrics"
            />

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard
                    icon={Users}
                    label="Total Employees"
                    value={data.total_employees}
                    color="brand"
                />
                <StatCard
                    icon={CheckCircle2}
                    label="Total Present"
                    value={data.total_present}
                    color="emerald"
                />
                <StatCard
                    icon={XCircle}
                    label="Total Absent"
                    value={data.total_absent}
                    color="red"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Attendance Rate"
                    value={`${attendanceRate}%`}
                    color="amber"
                    subtitle="Overall"
                />
            </div>

            {/* Department Breakdown & Present Days */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Department Breakdown */}
                <div className="bg-white rounded-2xl border border-surface-200/80 p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
                            <Building className="w-5 h-5 text-brand-600" />
                        </div>
                        <h2 className="text-base font-semibold text-surface-900">
                            Department Breakdown
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {Object.entries(data.department_breakdown || {}).map(([dept, count]) => {
                            const pct = data.total_employees > 0 ? Math.round((count / data.total_employees) * 100) : 0;
                            return (
                                <div key={dept}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-medium text-surface-700">{dept}</span>
                                        <span className="text-xs font-semibold text-surface-500">
                                            {count} employee{count !== 1 ? 's' : ''} ({pct}%)
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-500"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Present Days Per Employee */}
                <div className="bg-white rounded-2xl border border-surface-200/80 p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <CalendarCheck className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h2 className="text-base font-semibold text-surface-900">
                            Present Days per Employee
                        </h2>
                    </div>
                    {Object.keys(data.employee_present_days || {}).length === 0 ? (
                        <p className="text-sm text-surface-400 py-4 text-center">No attendance data yet</p>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(data.employee_present_days || {})
                                .sort(([, a], [, b]) => b - a)
                                .map(([empId, days]) => (
                                    <div
                                        key={empId}
                                        className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-surface-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                                                {empId.slice(-2)}
                                            </div>
                                            <span className="text-sm font-medium text-surface-700">{empId}</span>
                                        </div>
                                        <span className="text-sm font-bold text-emerald-600">
                                            {days} day{days !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
