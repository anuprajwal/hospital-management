import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Auth/Login/Login";
import HospitalModules from "./pages/HospitalAdmin/FormConfig/FormConfigHome";
import ConfigHeader from "./pages/HospitalAdmin/FormConfig/EachForm.jsx";
import UserManagement from "./pages/HospitalAdmin/UserManagement/UsersHomePage";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "@/middleware/protectedMiddlewares";
import NotFoundPage from "@/pages/404/NotFound"
import ModuleManagement from '@/pages/HospitalAdmin/FormConfig/ModuleManagement'
import AppointmentDashboard from "@/pages/Reception/Appointment/AppointmentDashboard"
import DoctorPanel from "@/pages/Doctor/AppointmentCardsView"
import PatientDetailView from "@/pages/Doctor/DetailedAppointment"
import CreatePricing from "@/pages/HospitalAdmin/Pricing/CreatePrices"
import PricingManagement from "@/pages/HospitalAdmin/Pricing/ViewPrices"
import EditPricing from "@/pages/HospitalAdmin/Pricing/EditPrices"

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
          
          <Route 
            path="/create-price" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <CreatePricing />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/view-prices" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <PricingManagement />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/edit-price/:id" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <EditPricing />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/appointment-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Receptionist']}>
                <AppointmentDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/doctor-appointments" 
            element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorPanel />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/detailed-appointment" 
            element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <PatientDetailView />
              </ProtectedRoute>
            } 
          />

          {/* Default Redirects */}
          <Route 
            path="*" 
            element={
              (() => {
                const userRole = localStorage.getItem('user_role');

                if (userRole === "Super_Admin") {
                  console.log('returning to module');
                  return <Navigate to="/module-management" replace />;
                } else if (userRole === "Admin") {
                  console.log("returning to dashboard");
                  return <Navigate to="/dashboard" replace />;
                }else if (userRole === "Receptionist") {
                  console.log("returning to appointment");
                  return <Navigate to="/appointment-dashboard" replace />;
                }else if (userRole === "Doctor") {
                  console.log("returning to Doctor dashboard");
                  return <Navigate to="/doctor-appointments" replace />;
                }
                
                // Fallback for other roles or unauthenticated users
                return <Navigate to="/login" replace />; 
              })()
            } 
          />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;