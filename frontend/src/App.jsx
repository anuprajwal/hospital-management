import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Auth/Login/Login"
import HospitalModules from "./pages/HospitalAdmin/FormConfig/FormConfigHoms"
import ConfigHeader from "./pages/HospitalAdmin/FormConfig/EachForm"
import UserManagement from "./pages/HospitalAdmin/UserManagement/UsersHomePage"

// This is a wrapper to handle the side-by-side layout

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route shows the login layout */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Redirect root to login */}
        <Route path="/" element={<HospitalModules />} />
        
        {/* You can add your Dashboard route here later */}
        <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/each" element={<ConfigHeader />} />
        <Route path="/users" element={<UserManagement />} />
        {/* <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/dashboard" element={<HospitalModules />} /> */}
      </Routes>
    </Router>
  );
}

export default App;