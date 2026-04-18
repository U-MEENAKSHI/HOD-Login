import React from 'react';
import { LogOut, Landmark, User } from 'lucide-react';

const Header = ({ toggleProfile, profilePic }) => {
  const handleLogout = () => {
    localStorage.removeItem('hod_token');
    window.location.href = '/login';
  };

  return (
    <header className="bg-white border-b border-gray-100 flex items-center justify-between px-6 h-16 w-full fixed top-0 z-20">
      {/* Left side: Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-orange-500">
          <Landmark size={24} />
        </div>
        <span className="font-bold text-gray-900 text-lg uppercase tracking-wide">Moto</span>
      </div>

      {/* Center: Navigation */}
      <nav className="hidden md:flex space-x-8 items-center h-full">
        <a href="#" className="text-orange-500 font-medium text-sm flex items-center h-full border-b-2 border-orange-500">Dashboard</a>
        <a href="#" className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center h-full border-b-2 border-transparent hover:border-gray-300">Analytics</a>
        <a href="#" className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center h-full border-b-2 border-transparent hover:border-gray-300">Review Panel</a>
      </nav>

      {/* Right side: Actions */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>

        {/* Profile Avatar Button — empty by default */}
        <button 
          onClick={toggleProfile}
          title="Open Profile"
          className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-gray-100 focus:outline-none focus:ring-orange-200 transition-all hover:scale-105 bg-gray-100 flex items-center justify-center"
        >
          {profilePic ? (
            <img 
              src={profilePic}
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={18} className="text-gray-400" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
