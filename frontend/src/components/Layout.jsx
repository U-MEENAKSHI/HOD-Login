import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import ProfilePanel from './ProfilePanel';

const Layout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Profile picture state — persisted in localStorage, null by default
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem('hod_profile_pic') || null;
  });

  const handleProfilePicChange = (base64Image) => {
    setProfilePic(base64Image);
    if (base64Image) {
      localStorage.setItem('hod_profile_pic', base64Image);
    } else {
      localStorage.removeItem('hod_profile_pic');
    }
  };

  // Basic authentication check
  const isAuthenticated = !!localStorage.getItem('hod_token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <Header toggleProfile={toggleProfile} profilePic={profilePic} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 pt-16 ${isProfileOpen ? 'mr-80' : ''}`}>
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 animate-fade-in">
          <Outlet />
        </main>
      </div>

      {/* Profile Sidebar */}
      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profilePic={profilePic}
        onProfilePicChange={handleProfilePicChange}
      />
      
      {/* Overlay for mobile to close profile */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-20 md:hidden"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;
