import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    Building2,
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Employees', href: '/employees', icon: Users },
    { name: 'Attendance', href: '/attendance', icon: CalendarCheck },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="hidden md:flex md:flex-col md:w-64 bg-surface-900 text-white">
            {/* Brand */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-surface-700/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600 shadow-lg shadow-brand-600/30">
                    <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight">HRMS Lite</h1>
                    <p className="text-xs text-surface-400 font-medium">Management System</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1">
                {navigation.map((item) => {
                    const isActive =
                        item.href === '/'
                            ? location.pathname === '/'
                            : location.pathname.startsWith(item.href);

                    return (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200 ease-out
                ${isActive
                                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                                    : 'text-surface-300 hover:bg-surface-800 hover:text-white'
                                }
              `}
                        >
                            <item.icon
                                className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-surface-400 group-hover:text-brand-400'
                                    }`}
                            />
                            {item.name}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-surface-700/50">
                <p className="text-xs text-surface-500">© 2026 HRMS Lite</p>
                <p className="text-xs text-surface-600 mt-0.5">v1.0.0</p>
            </div>
        </aside>
    );
}
