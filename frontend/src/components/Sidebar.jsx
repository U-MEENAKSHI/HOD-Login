import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('hod_token');
    window.location.href = '/login';
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Staff Directory', path: '/dashboard/staff', icon: <Users size={20} /> },
    { name: 'Schedule', path: '/dashboard/schedule', icon: <Calendar size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen fixed left-0 top-0 pt-16 z-10 transition-all duration-300">
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
