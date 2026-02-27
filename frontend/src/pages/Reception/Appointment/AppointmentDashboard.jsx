import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Trash2,
  Info,
  Edit,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { cn } from "@/lib/utils";
import AddAppointmentForm from "./AppointmentForm";
import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";
import { fetchModulesByRole, getOutpatients, deleteOutpatient, moveToInpatient } from "./apis";

const statusBadgeVariant = (status) => {
  if (status === "Deleted") return "destructive";
  if (status === "Discharged") return "secondary";
  if (status === "Visiting") return "default";
  return "outline";
};

const AppointmentDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 10;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsPatient, setDetailsPatient] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const actualStatus = statusFilter === "all" ? "" : statusFilter;
      const [moduleData, patientData] = await Promise.all([
        fetchModulesByRole(),
        getOutpatients(page, limit, search, actualStatus),
      ]);

      if (moduleData?.forms?.length > 0) {
        setFormData(moduleData.forms[0]);
      }
      setPatients(patientData?.data || []);
      setTotalRecords(patientData?.total_records ?? 0);
    } catch (err) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      loadInitialData();
    }, 300);
    return () => clearTimeout(handler);
  }, [search, statusFilter, page, loadInitialData]);

  const handleDelete = async (id) => {
    try {
      await deleteOutpatient(id);
      setPatients((prev) => prev.filter((p) => p.id !== id));
      setTotalRecords((prev) => Math.max(0, prev - 1));
      setDeleteOpen(false);
      setDeleteId(null);
    } catch (err) {
      setError("Delete failed.");
    }
  };

  const handleMoveToIP = async (id) => {
    try {
      await moveToInpatient(id);
      loadInitialData();
    } catch (err) {
      setError("Transfer failed.");
    }
  };

  const openEditForm = (patient) => {
    setSelectedPatient(patient);
    setIsFormOpen(true);
  };

  const openDetails = (patient) => {
    setDetailsPatient(patient);
    setDetailsOpen(true);
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const offset = (page - 1) * limit;
  const hasMore = offset + patients.length < totalRecords;

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
                  Manage outpatient appointments and records.
                </p>
              </div>
              <Button
                variant="secondary"
                className="gap-2"
                onClick={() => {
                  setSelectedPatient(null);
                  setIsFormOpen(true);
                }}
              >
                <Plus className="w-4 h-4" />
                Create Appointment
              </Button>
            </div>

            {/* Filters */}
            <Card className="mb-4">
              <CardContent className="p-3 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    className="pl-9 h-9"
                    placeholder="Search by patient name..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={(val) => {
                    setStatusFilter(val);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-44 h-9">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Created">Created</SelectItem>
                    <SelectItem value="Visiting">Visiting</SelectItem>
                    <SelectItem value="Deleted">Deleted</SelectItem>
                    <SelectItem value="Discharged">Discharged</SelectItem>
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
                    <TableHead className="font-medium text-muted-foreground">Doctor</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Date / Time</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><div className="h-5 w-32 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-24 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-20 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-28 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-28 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-16 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell />
                      </TableRow>
                    ))
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-destructive py-8">
                        {error}
                      </TableCell>
                    </TableRow>
                  ) : (
                    patients.map((pt) => {
                      const details = typeof pt.form_data === "string" ? JSON.parse(pt.form_data || "{}") : pt.form_data || {};
                      return (
                        <TableRow key={pt.id}>
                          <TableCell>
                            <div className="font-medium text-foreground">
                              {pt?.patient_name || "N/A"}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {details["phone number"] ?? "—"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {details?.age && details?.gender ? `${details.age} / ${details.gender}` : "—"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {details["doctor"] ?? "—"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {details?.date && details?.time ? `${details.date}, ${details.time}` : "—"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusBadgeVariant(pt?.status)} className="text-xs">
                              {pt?.status || "N/A"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground"
                                onClick={() => openDetails(pt)}
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
                                  <DropdownMenuItem onClick={() => handleMoveToIP(pt.user_id ?? pt.id)}>
                                    <UserPlus className="w-4 h-4" />
                                    Move to In-Patient
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openEditForm(pt)}>
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onSelect={(e) => {
                                      e.preventDefault();
                                      openDeleteDialog(pt.id);
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </Card>

            {/* Pagination */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Showing {patients.length} of {totalRecords} appointments
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

      <AddAppointmentForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        dynamicFields={formData ? JSON.parse(formData.form_fields || "[]") : []}
        formTitle={formData?.form_name}
        formId={formData?.id}
        initialData={selectedPatient}
        onSuccess={loadInitialData}
      />

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment details</DialogTitle>
          </DialogHeader>
          {detailsPatient && (() => {
            const d = typeof detailsPatient.form_data === "string"
              ? JSON.parse(detailsPatient.form_data || "{}")
              : detailsPatient.form_data || {};
            return (
              <dl className="space-y-3 pt-2 text-sm">
                <div className="flex justify-between gap-4 py-2 border-b border-border">
                  <dt className="text-muted-foreground">Patient</dt>
                  <dd className="font-medium text-foreground">{detailsPatient.patient_name || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-border">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>{d["phone number"] ?? "—"}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-border">
                  <dt className="text-muted-foreground">Age / Gender</dt>
                  <dd>{d?.age && d?.gender ? `${d.age} / ${d.gender}` : "—"}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-border">
                  <dt className="text-muted-foreground">Doctor</dt>
                  <dd>{d["doctor"] ?? "—"}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-border">
                  <dt className="text-muted-foreground">Date / Time</dt>
                  <dd>{d?.date && d?.time ? `${d.date}, ${d.time}` : "—"}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>
                    <Badge variant={statusBadgeVariant(detailsPatient.status)} className="text-xs">
                      {detailsPatient.status || "—"}
                    </Badge>
                  </dd>
                </div>
              </dl>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={(open) => { setDeleteOpen(open); if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the outpatient record. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary">Cancel</Button>
            </AlertDialogCancel>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => {
                if (deleteId != null) handleDelete(deleteId);
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AppointmentDashboard;
