import React, { useState, useEffect } from "react";
import { 
  Search, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AddAppointmentForm from "./AppointmentForm";
import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";
import { fetchModulesByRole } from './apis';

const AppointmentDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(null); // State to hold API response

  useEffect(() => {
    const getRoleModules = async () => {
      try {
        const data = await fetchModulesByRole();
        // Assuming you want the first form (e.g., In-Patient)
        if (data?.forms?.length > 0) {
          setFormData(data.forms[0]);
        }
      } catch (err) {
        console.error("Error fetching modules:", err);
      }
    };
    getRoleModules();
  }, []);

  const appointments = [
    { id: 1, name: "Johnathan Doe", phone: "555-0101", age: 45, gender: "Male", speciality: "Cardiology", time: "Oct 24, 2023 | 10:30 AM", status: "Scheduled" },
    { id: 2, name: "Sarah Jenkins", phone: "555-0198", age: 29, gender: "Female", speciality: "Pediatrics", time: "Oct 24, 2023 | 11:15 AM", status: "Completed" },
    { id: 3, name: "Michael Smith", phone: "555-0122", age: 62, gender: "Male", speciality: "Orthopedics", time: "Oct 24, 2023 | 01:00 PM", status: "Cancelled" },
    { id: 4, name: "Linda Wu", phone: "555-0145", age: 41, gender: "Female", speciality: "Dermatology", time: "Oct 24, 2023 | 02:45 PM", status: "No Show" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Scheduled": return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Scheduled</Badge>;
      case "Completed": return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Completed</Badge>;
      case "Cancelled": return <Badge variant="secondary" className="text-slate-500">Cancelled</Badge>;
      case "No Show": return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">No Show</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-slate-800 dark:text-slate-200 flex flex-col">
        <TopHeader />
        <div className="flex flex-1 overflow-hidden">
        {/* 4. Insert DynamicNavbar for the left side */}
        <DynamicNavbar />
      <main className="max-w-7xl mx-auto px-6 py-8 lg:px-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Reception Dashboard</h1>
          <p className="text-muted-foreground">Manage patient appointments and admissions.</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input className="pl-10 h-11 bg-white dark:bg-slate-900" placeholder="Search by name or phone" />
          </div>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="h-11 px-5 font-bold gap-2 shadow-sm"
          >
            <PlusCircle className="h-5 w-5" />
            Create Appointment
          </Button>
        </div>

        {/* Table Section */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="font-bold text-slate-500 px-6 py-4 uppercase text-xs tracking-wider">Patient Name</TableHead>
                <TableHead className="font-bold text-slate-500 px-6 py-4 uppercase text-xs tracking-wider">Phone</TableHead>
                <TableHead className="font-bold text-slate-500 px-6 py-4 uppercase text-xs tracking-wider">Age/Gender</TableHead>
                <TableHead className="font-bold text-slate-500 px-6 py-4 uppercase text-xs tracking-wider">Speciality</TableHead>
                <TableHead className="font-bold text-slate-500 px-6 py-4 uppercase text-xs tracking-wider">Date/Time</TableHead>
                <TableHead className="font-bold text-slate-500 px-6 py-4 uppercase text-xs tracking-wider">Status</TableHead>
                <TableHead className="text-right font-bold text-slate-500 px-6 py-4 uppercase text-xs tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <TableCell className="px-6 py-4 font-semibold">{apt.name}</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">{apt.phone}</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">{apt.age} / {apt.gender}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                      {apt.speciality}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground text-sm">{apt.time}</TableCell>
                  <TableCell className="px-6 py-4">{getStatusBadge(apt.status)}</TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900"><Eye className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-6 py-4">
            <span className="text-sm text-muted-foreground">Showing 1 to 5 of 24 appointments</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900">Previous</Button>
              <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900">Next</Button>
            </div>
          </div>
        </div>
      </main>
      </div>

      {/* Appointment Popup */}
      <AddAppointmentForm 
      open={isFormOpen} 
      onOpenChange={setIsFormOpen} 
      dynamicFields={formData ? JSON.parse(formData.form_fields) : []} 
      formTitle={formData?.form_name}
    />
    </div>
  );
};

export default AppointmentDashboard;