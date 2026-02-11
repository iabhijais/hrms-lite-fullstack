/**
 * StatCard — Dashboard metric card with icon, value, and label.
 */
export default function StatCard({ icon: Icon, label, value, color = 'brand', subtitle }) {
    const colorMap = {
        brand: {
            bg: 'bg-brand-50',
            icon: 'text-brand-600',
            ring: 'ring-brand-100',
        },
        emerald: {
            bg: 'bg-emerald-50',
            icon: 'text-emerald-600',
            ring: 'ring-emerald-100',
        },
        red: {
            bg: 'bg-red-50',
            icon: 'text-red-500',
            ring: 'ring-red-100',
        },
        amber: {
            bg: 'bg-amber-50',
            icon: 'text-amber-600',
            ring: 'ring-amber-100',
        },
    };

    const c = colorMap[color] || colorMap.brand;

    return (
        <div className="bg-white rounded-2xl border border-surface-200/80 p-6 hover:shadow-medium transition-shadow duration-300">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${c.icon}`} />
                </div>
                <div>
                    <p className="text-2xl font-bold text-surface-900">{value}</p>
                    <p className="text-sm text-surface-500 font-medium">{label}</p>
                    {subtitle && <p className="text-xs text-surface-400 mt-0.5">{subtitle}</p>}
                </div>
            </div>
        </div>
    );
}
