import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Auth/Login/Login"

// This is a wrapper to handle the side-by-side layout

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route shows the login layout */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* You can add your Dashboard route here later */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;