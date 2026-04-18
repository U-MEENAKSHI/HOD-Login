import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={
          <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center p-4">
            <Login />
          </div>
        } />
        <Route path="/forgot-password" element={
          <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center p-4">
            <ForgotPassword />
          </div>
        } />

        {/* Protected Dashboard Routes (Day 1 & Day 2 implementation) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Placeholders for future frames */}
          <Route path="/dashboard/staff" element={<div className="p-4">Staff Directory Coming Soon</div>} />
          <Route path="/dashboard/schedule" element={<div className="p-4">Schedule Coming Soon</div>} />
          <Route path="/dashboard/settings" element={<div className="p-4">Settings Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
