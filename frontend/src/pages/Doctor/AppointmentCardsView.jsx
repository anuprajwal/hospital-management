import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Info,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

import { getOutpatients } from "@/pages/Reception/Appointment/apis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";

const statusBadgeClass = (status) => {
  const map = {
    "In Consultation": "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-none",
    "Created": "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-none",
    "Completed": "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-none",
  };
  return map[status] || "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none";
};

export default function DoctorPanel() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [totalRecords, setTotalRecords] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsApt, setDetailsApt] = useState(null);
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
          user_id: item.user_id,
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
    const t = setTimeout(() => fetchAppointments(), 300);
    return () => clearTimeout(t);
  }, [page, search, status]);

  const totalPages = Math.ceil(totalRecords / limit);
  const hasMore = (page - 1) * limit + appointments.length < totalRecords;

  const handleOpenAppointment = (apt) => {
    navigate('/detailed-appointment', { state: { patient: apt } });
  };

  const openDetails = (apt) => {
    setDetailsApt(apt);
    setDetailsOpen(true);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      <div className="flex-shrink-0 h-full">
        <DynamicNavbar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="w-full">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Appointments</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  View and open patient consultations.
                </p>
              </div>
            </div>

            {/* Filters */}
            <Card className="mb-4">
              <CardContent className="p-3 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by patient name..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="pl-9 h-9"
                  />
                </div>
                <Select
                  value={status}
                  onValueChange={(val) => {
                    setStatus(val);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-44 h-9">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Created">Created</SelectItem>
                    <SelectItem value="In Consultation">In Consultation</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <Table className="text-[15px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-medium text-muted-foreground">Patient</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Phone</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Age / Gender</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Time</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><div className="h-5 w-32 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-28 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-24 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-20 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-24 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell />
                      </TableRow>
                    ))
                  ) : (
                    appointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>
                          <div className="font-medium text-foreground">{apt.patient_name}</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{apt.phone}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {apt.age} / {apt.gender}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{apt.time}</TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${statusBadgeClass(apt.status)}`}>
                            {apt.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="gap-1.5 h-8"
                              onClick={() => handleOpenAppointment(apt)}
                            >
                              <ArrowRight className="w-4 h-4" />
                              Open
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => openDetails(apt)}
                              aria-label="View details"
                            >
                              <Info className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenAppointment(apt)}>
                                  <ArrowRight className="w-4 h-4" />
                                  Open appointment
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>

            {/* Pagination */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Showing {appointments.length} of {totalRecords} appointments
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <PaginationPrevious className="h-4 w-4" />
                      Previous
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={!hasMore}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                      <PaginationNext className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </main>
      </div>

      {/* Details dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment details</DialogTitle>
          </DialogHeader>
          {detailsApt && (
            <div className="space-y-3 text-sm">
              <p><span className="font-medium text-muted-foreground">Patient:</span> {detailsApt.patient_name}</p>
              <p><span className="font-medium text-muted-foreground">Phone:</span> {detailsApt.phone}</p>
              <p><span className="font-medium text-muted-foreground">Age / Gender:</span> {detailsApt.age} / {detailsApt.gender}</p>
              <p><span className="font-medium text-muted-foreground">Time:</span> {detailsApt.time}</p>
              <p><span className="font-medium text-muted-foreground">Status:</span> {detailsApt.status}</p>
              <p><span className="font-medium text-muted-foreground">Notes:</span> {detailsApt.notes}</p>
              <div className="pt-2">
                <Button
                  variant="secondary"
                  className="w-full gap-2"
                  onClick={() => {
                    setDetailsOpen(false);
                    handleOpenAppointment(detailsApt);
                  }}
                >
                  Open appointment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
