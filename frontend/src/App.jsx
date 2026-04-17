import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Day 2 Frame Placeholder */}
          <Route path="/dashboard" element={<div className="text-2xl font-bold p-8 text-brand-900 border bg-white shadow-xl rounded-xl">Welcome to HOD Dashboard</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
