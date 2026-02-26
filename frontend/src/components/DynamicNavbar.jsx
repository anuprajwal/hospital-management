import React from 'react';
import SuperAdminSidebar from "./SuperAdminNavbar";
import AdminSidebar from "./AdminNavbar";
import ReceptionistSidebar from "./ReceptionistNavbar"
import LabInchargeSidebar from './LabInchargeSidebar';

const DynamicNavbar = () => {
  const role = localStorage.getItem('user_role');

  switch (role) {
    case 'Super_Admin':
      return <SuperAdminSidebar />;
    case 'Admin':
      return <AdminSidebar />;
    case 'Receptionist':
      return <ReceptionistSidebar/>
    case 'Doctor':
      return <ReceptionistSidebar/>
    case 'Lab_Incharge':
      return <LabInchargeSidebar/>
    default:
      return <Sidebar />;
  }
};

export default DynamicNavbar;