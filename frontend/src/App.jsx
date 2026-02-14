import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Auth/Login/Login"
import HospitalModules from "./pages/HospitalAdmin/FormConfig/FormConfigHome"
import ConfigHeader from "./pages/HospitalAdmin/FormConfig/EachForm.jsx"
import UserManagement from "./pages/HospitalAdmin/UserManagement/UsersHomePage"
import { Toaster } from "@/components/ui/sonner"

// This is a wrapper to handle the side-by-side layout

function App() {
  return (
    <>
    <Toaster position="top-right" richColors />
    <Router>
      <Routes>
        {/* Default route shows the login layout */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Redirect root to login */}
        <Route path="/" element={<HospitalModules />} />
        
        {/* You can add your Dashboard route here later */}
        <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/form-edit" element={<ConfigHeader />} />
        <Route path="/users" element={<UserManagement />} />
        {/* <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/dashboard" element={<HospitalModules />} />
        <Route path="/dashboard" element={<HospitalModules />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;