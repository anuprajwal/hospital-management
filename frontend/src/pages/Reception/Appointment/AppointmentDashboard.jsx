import React, { useState, useEffect, useCallback } from "react";
import { 
  Search, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  UserPlus, Loader2, Hospital
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
import { fetchModulesByRole, getOutpatients, deleteOutpatient, moveToInpatient } from './apis';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const AppointmentDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(null); // Metadata for the form
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null); // Data for Edit mode
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch Form Structure and Patient List
  const loadInitialData = useCallback(async () => {
    console.log('called...........')
    setLoading(true);
    try {
      // Pass filters to the API call
      const actualStatus = statusFilter === "all" ? "" : statusFilter;
      const [moduleData, patientData] = await Promise.all([
        fetchModulesByRole(),
        getOutpatients(page, 10, search, actualStatus)
      ]);

      if (moduleData?.forms?.length > 0){
        setFormData(moduleData.forms[0]);
      } 
      setPatients(patientData.data || []); 
    } catch (err) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      loadInitialData();
    }, 500); 

    return () => clearTimeout(handler);
  }, [search, statusFilter, page, loadInitialData]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteOutpatient(id);
      loadInitialData();
    } catch (err) { alert("Delete failed"); }
  };

  const handleMoveToIP = async (id) => {
    try {
      await moveToInpatient(id);
      alert("Patient moved to In-Patient successfully");
      loadInitialData();
    } catch (err) { alert("Transfer failed"); }
  };

  const openEditForm = (patient) => {
    setSelectedPatient(patient);
    setIsFormOpen(true);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <DynamicNavbar />
        <main className="max-w-7xl mx-auto px-6 py-8 flex-1 space-y-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 flex-1 sm:flex-row sm:items-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  className="pl-10 h-11 bg-white dark:bg-slate-900" 
                  placeholder="Search names..." 
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>

              {/* Status Dropdown */}
              <Select 
                value={statusFilter} 
                onValueChange={(val) => { setStatusFilter(val); setPage(1); }}
              >
                <SelectTrigger className="w-[180px] h-11 bg-white dark:bg-slate-900">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Created">Created</SelectItem>
                  <SelectItem value="Visiting">Visiting</SelectItem>
                  <SelectItem value="Deleted">Deleted</SelectItem>
                  <SelectItem value="Discharged">Discharged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => { setSelectedPatient(null); setIsFormOpen(true); }} className="h-11 gap-2">
              <PlusCircle className="h-5 w-5" /> Create Appointment
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10" /></div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Info</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((pt) => {
                    const details = typeof pt.form_data === 'string' ? JSON.parse(pt.form_data) : pt.form_data;
                    return (
                      <TableRow key={pt.id}>
                        <TableCell className="font-semibold">
                          {pt?.patient_name || "N/A"} <br/>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {details['phone number'] || "N/A"} <br/>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {`${details?.age}/${details?.gender}`} <br/>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {details['doctor name'] || "N/A"} <br/>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {`${details?.date}, ${details?.time}`} <br/>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {pt?.status || "N/A"} <br/>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button title="Move to IP" variant="ghost" size="icon" className="text-blue-500" onClick={() => handleMoveToIP(pt.id)}>
                                <UserPlus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-slate-400" onClick={() => openEditForm(pt)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-400" onClick={() => handleDelete(pt.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
                <span className="text-sm">Page {page}</span>
                <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </main>
      </div>

      <AddAppointmentForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        dynamicFields={formData ? JSON.parse(formData.form_fields) : []} 
        formTitle={formData?.form_name}
        formId={formData?.id}
        initialData={selectedPatient}
        onSuccess={loadInitialData}
      />
    </div>
  );
};

export default AppointmentDashboard;