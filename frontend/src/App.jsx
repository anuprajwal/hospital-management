import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Auth/Login/Login";
import HospitalModules from "./pages/HospitalAdmin/FormConfig/FormConfigHome";
import ConfigHeader from "./pages/HospitalAdmin/FormConfig/EachForm.jsx";
import UserManagement from "./pages/HospitalAdmin/UserManagement/UsersHomePage";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "@/middleware/protectedMiddlewares"; // Import the middleware
import NotFoundPage from "@/pages/404/NotFound"
import ModuleManagement from '@/pages/HospitalAdmin/FormConfig/ModuleManagement'

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes - Super_Admin Only */}
          <Route 
            path="/users" 
            element={
              <ProtectedRoute allowedRoles={['Super_Admin', 'Admin']}>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/module-management" 
            element={
              <ProtectedRoute allowedRoles={['Super_Admin']}>
                <ModuleManagement />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes - Admin and Super_Admin */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <HospitalModules />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/form-edit" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <ConfigHeader />
              </ProtectedRoute>
            } 
          />

          {/* Default Redirects */}
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;