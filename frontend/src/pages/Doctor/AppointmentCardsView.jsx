import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Clock, 
  Phone, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { getOutpatients } from "@/pages/Reception/Appointment/apis"; 
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";

const StatusBadge = ({ status }) => {
  const variants = {
    "In Consultation": "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-none",
    "Created": "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-none",
    "Completed": "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-none",
  };
  return <Badge className={`${variants[status] || "bg-slate-100"} uppercase text-[10px] font-bold`}>{status}</Badge>;
};

export default function DoctorPanel() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 10;

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const statusParam = status === 'all' ? '' : status;
      const response = await getOutpatients(page, limit, search, statusParam);
      
      const parsedData = (response.data || []).map(item => {
        const details = JSON.parse(item.form_data || "{}");
        return {
          id: item.id,
          patient_name: item.patient_name,
          status: item.status,
          age: details.age || 'N/A',
          gender: details.gender || 'N/A',
          time: details.time || 'N/A',
          phone: details["phone number"] || 'N/A',
          notes: details["clinical description"] || 'No notes provided',
          fullDetails: details,
          user_id: item.user_id
        };
      });

      setAppointments(parsedData);
      setTotalRecords(response.total_records || 0);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page, search, status]);

  const totalPages = Math.ceil(totalRecords / limit);

  const handleOpenAppointment = (apt) => {
    navigate('/detailed-appointment', { state: { patient: apt } });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950">
      {/* 1. Top Header: Full Width across the top */}
      <div className="w-full flex-shrink-0 z-50 border-b">
        <TopHeader />
      </div>

      {/* 2. Content Container: Below the header, split into Sidebar and Main */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar: Fixed left, scrollable if needed */}
        <aside className="w-64 h-full flex-shrink-0 border-r bg-white dark:bg-zinc-900 overflow-y-auto hidden lg:block">
          <DynamicNavbar />
        </aside>

        {/* Body Content: Right side, scrollable */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Appointments</h2>
                <p className="text-muted-foreground text-sm font-medium mt-1 uppercase tracking-wider">
                  Total Records Found: {totalRecords}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Filter by patient name..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-white dark:bg-zinc-800 border-slate-200 h-11"
                  />
                </div>

                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-800 h-11 border-2 font-bold">
                    <Filter className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Created">Created</SelectItem>
                    <SelectItem value="In Consultation">In Consultation</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Appointment Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <p className="font-bold text-muted-foreground animate-pulse">Synchronizing Patient Records...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {appointments.map((apt) => (
                  <Card key={apt.id} className="group transition-all hover:ring-2 hover:ring-primary/10 border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md">
                    <CardHeader className="flex flex-row justify-between items-start pb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 rounded-xl bg-primary/10">
                          <AvatarFallback className="rounded-xl text-primary font-bold">
                            {apt.patient_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-slate-800 dark:text-slate-100">{apt.patient_name}</h3>
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                            ID: #{apt.id} • {apt.age}Y / {apt.gender}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={apt.status} />
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-bold">{apt.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 opacity-70" />
                          <span className="font-medium">{apt.phone || "N/A"}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-100/50 dark:bg-zinc-900 rounded-lg min-h-[60px] border border-transparent group-hover:border-slate-200 dark:group-hover:border-zinc-700 transition-colors">
                        <p className="text-xs text-muted-foreground line-clamp-2 italic font-medium leading-relaxed">
                          "{apt.notes}"
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-2">
                      <Button 
                        onClick={() => handleOpenAppointment(apt)}
                        className="w-full font-black h-12 uppercase tracking-tight shadow-lg shadow-primary/10"
                      >
                        Open Appointment <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-12 pb-12 border-t pt-8">
                <p className="text-sm font-bold text-muted-foreground">
                  PAGE <span className="text-slate-900 dark:text-white px-2 py-1 bg-slate-200 dark:bg-zinc-800 rounded">{page}</span> OF {totalPages}
                </p>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="h-11 px-6 font-bold border-2"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="h-11 px-6 font-bold border-2"
                  >
                    Next <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}