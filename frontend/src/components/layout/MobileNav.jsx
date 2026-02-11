import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    Building2,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Employees', href: '/employees', icon: Users },
    { name: 'Attendance', href: '/attendance', icon: CalendarCheck },
];

export default function MobileNav() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="md:hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface-900 text-white">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600">
                        <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm">HRMS Lite</span>
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-lg hover:bg-surface-800 transition-colors"
                    aria-label="Toggle navigation"
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Dropdown nav */}
            {open && (
                <div className="bg-surface-900 border-t border-surface-700/50 px-3 pb-3 animate-fade-in">
                    {navigation.map((item) => {
                        const isActive =
                            item.href === '/'
                                ? location.pathname === '/'
                                : location.pathname.startsWith(item.href);

                        return (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                onClick={() => setOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-150
                  ${isActive
                                        ? 'bg-brand-600 text-white'
                                        : 'text-surface-300 hover:bg-surface-800 hover:text-white'
                                    }
                `}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
