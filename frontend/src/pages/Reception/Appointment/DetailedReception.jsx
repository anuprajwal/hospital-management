import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Info, 
  Stethoscope, 
  Pill, 
  Beaker, 
  Timer, 
  Activity,
  Scan,
  RefreshCcw,
  Check
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

import { getPatientPrescriptions, getTests } from "@/pages/Doctor/apis"

export default function PatientOverview() {

    const location = useLocation();
    const navigate = useNavigate();
    
    // Data passed from the dashboard
    const patientDetails = location.state?.patientDetails;
  
    // --- States for API Data ---
    const [prescriptions, setPrescriptions] = useState([]);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // --- Data Normalization ---
    // Parse form_data string into an object for easy access
    const formData = useMemo(() => {
      if (!patientDetails?.form_data) return {};
      try {
        return typeof patientDetails.form_data === 'string' 
          ? JSON.parse(patientDetails.form_data) 
          : patientDetails.form_data;
      } catch (e) {
        console.error("Failed to parse form_data", e);
        return {};
      }
    }, [patientDetails]);

    const latestPrescription = useMemo(() => {
        if (!prescriptions || prescriptions.length === 0) return null;
        const latest = prescriptions[0];
        try {
            return {
                ...latest,
                medicines: typeof latest.prescription === 'string' 
                    ? JSON.parse(latest.prescription) 
                    : latest.prescription
            };
        } catch (e) {
            return { ...latest, medicines: [] };
        }
    }, [prescriptions]);

    const testStats = useMemo(() => {
        const stats = {
            total: tests.length,
            completed: tests.filter(t => t.status === 'test completed').length,
            processing: tests.filter(t => t.status === 'test processing').length,
            pending: tests.filter(t => t.status === 'recommended' || t.status === 'payment done').length
        };
        return stats;
    }, [tests]);

    const journeyStatus = useMemo(() => {
        return {
            appointment: patientDetails.status !== 'Deleted',
            prescription: prescriptions.length > 0,
            tests: tests.length > 0 ? (testStats.completed === testStats.total ? 'Completed' : 'In Progress') : 'Not Started'
        };
    }, [patientDetails.status, prescriptions, tests, testStats]);
  
    // --- API Lifecycle ---
    useEffect(() => {
      const fetchPatientHistory = async () => {
        if (!patientDetails?.id) return;
        
        setLoading(true);
        try {
          // Run both API calls in parallel
          const [prescRes, testsRes] = await Promise.all([
            getPatientPrescriptions(patientDetails.id),
            getTests({ patient_id: patientDetails.id, limit: 100 })
          ]);
  
          setPrescriptions(prescRes || []);
          setTests(testsRes.data || []); // Access .data for paginated testsRes
        } catch (err) {
          console.error("Error fetching patient history:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPatientHistory();
    }, [patientDetails?.id]);
  
    if (!patientDetails) return <div className="p-20 text-center">No patient context found.</div>;

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950 font-sans overflow-hidden">
        <TopHeader />
        <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-zinc-900 hidden lg:block overflow-y-auto">
                    <DynamicNavbar />
                </aside>
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 pb-20">
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Header & Navigation */}
        <header className="mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)} className="text-primary font-bold gap-2 p-0 hover:bg-transparent">
              <ArrowLeft className="size-4" /> Back to OP List
            </Button>
            <Badge variant="secondary" className="bg-primary/10 text-primary font-black px-4 py-1 uppercase tracking-widest text-[10px]">
              {patientDetails.status}
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Patient Overview</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-muted-foreground font-medium">Patient ID:</span>
                <Badge variant="outline" className="font-mono font-bold text-primary bg-primary/5">
                  P-{patientDetails.id}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl border shadow-sm">
              <Calendar className="size-5 text-primary" />
              <div className="text-right">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Appointment Date</p>
                <p className="text-sm font-bold">{formData.date || "N/A"}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Section 1: Patient Details Card */}
          <Card className="border-l-[6px] border-l-primary shadow-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <User className="size-7" />
                </div>
                <CardTitle className="text-2xl font-black tracking-tight">Patient Details</CardTitle>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                <div className="space-y-4">
                  <DetailItem label="Full Name" value={patientDetails.patient_name} />
                  <DetailItem label="Age" value={formData.age || "N/A"} />
                  <DetailItem label="Gender" value={formData.gender || "N/A"} />
                  <DetailItem label="Phone Number" value={formData['phone number'] || "N/A"} />
                </div>
                <div className="space-y-4">
                  <DetailItem label="Surname" value={formData['Sur name'] || "N/A"} />
                  <DetailItem label="Appointment Type" value={formData['appointment type'] || "N/A"} />
                  <DetailItem label="Speciality" value={formData.speciality || "General"} isSpecial />
                  <DetailItem label="Referrer" value={formData.referer || "Self"} />
                </div>
              </div>

              <div className="mt-10">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 block">Clinical Description</label>
                <div className="bg-slate-50 dark:bg-zinc-900 p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 text-sm italic font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {formData['clinical description'] || "No clinical description provided for this visit."}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Patient Journey Status (Timeline) */}
          <Card className="shadow-sm overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-xl font-black tracking-tight">Patient Journey Status</CardTitle>
            </CardHeader>
            <CardContent className="p-12 relative">
              <div className="hidden md:block absolute top-[4.25rem] left-20 right-20 h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full" />
              
              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
                <JourneyStep 
                  icon={<Check className="size-6" />} 
                  label="Appointment" 
                  status="Completed" 
                  variant="success" 
                />
                <JourneyStep 
                  icon={journeyStatus.prescription ? <Check className="size-6" /> : <Clock className="size-6" />} 
                  label="Prescription" 
                  status={journeyStatus.prescription ? "Completed" : "Pending"} 
                  variant={journeyStatus.prescription ? "success" : "warning"} 
                />
                <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                  <JourneyStep 
                    icon={journeyStatus.tests === 'Completed' ? <Check className="size-6" /> : <RefreshCcw className="size-6 animate-spin-slow" />} 
                    label="Laboratory" 
                    status={journeyStatus.tests} 
                    variant={journeyStatus.tests === 'Completed' ? "success" : "warning"} 
                  />
                  {/* Sub-indicators for top 3 tests */}
                  <div className="flex gap-4 bg-slate-50 dark:bg-zinc-900 p-3 rounded-2xl border-2 border-dotted border-slate-200 dark:border-zinc-800">
                    {tests.slice(0, 3).map((t, i) => (
                        <TestIndicator 
                            key={i}
                            color={t.status === 'test completed' ? 'bg-emerald-500' : 'bg-amber-500'} 
                            label={t.test_name} 
                        />
                    ))}
                    {tests.length === 0 && <span className="text-[10px] font-bold text-muted-foreground uppercase italic px-4">No tests ordered</span>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Grid: Appointment & Prescription */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section 3: Doctor Info (Static/Inferred) */}
            <Card className="flex flex-col border-slate-200 dark:border-zinc-800 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 p-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 flex items-center justify-center">
                    <Stethoscope className="size-6" />
                  </div>
                  <CardTitle className="text-lg font-bold">Doctor Visit</CardTitle>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 font-black uppercase text-[10px]">Active</Badge>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-1 flex flex-col">
                <div className="space-y-3 mb-8">
                  <CompactDetail label="Primary Physician" value={formData['doctor name'] || "Not Assigned"} />
                  <CompactDetail label="Speciality" value={formData.speciality || "General Medicine"} highlight />
                  <CompactDetail label="Time Slot" value={formData.time || "N/A"} />
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Prescription Details */}
            <Card className="flex flex-col border-slate-200 dark:border-zinc-800 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 p-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 flex items-center justify-center">
                    <Pill className="size-6" />
                  </div>
                  <CardTitle className="text-lg font-bold">Prescription</CardTitle>
                </div>
                <Badge className="bg-sky-100 text-sky-700 font-black uppercase text-[10px]">
                    {latestPrescription ? 'Issued' : 'Pending'}
                </Badge>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-1 flex flex-col">
                {latestPrescription ? (
                    <div className="space-y-3">
                        <CompactDetail label="Prescription ID" value={`PR-${latestPrescription.id}`} />
                        <CompactDetail label="Medicines Count" value={latestPrescription.medicines.length} />
                        <CompactDetail label="Last Updated" value={latestPrescription.created_on} />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground italic">No prescription records found for this patient.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Section 5: Laboratory Tests Card */}
          <Card className="shadow-sm">
            <CardHeader className="p-8 flex flex-row items-center gap-3 border-b">
              <div className="size-10 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 flex items-center justify-center">
                <Beaker className="size-6" />
              </div>
              <CardTitle className="text-xl font-black tracking-tight">Laboratory Tests</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <StatBox label="Total Ordered" value={testStats.total} color="text-slate-900" />
                <StatBox label="Completed" value={testStats.completed} color="text-emerald-600" bg="bg-emerald-50" />
                <StatBox label="Processing" value={testStats.processing} color="text-amber-600" bg="bg-amber-50" />
                <StatBox label="Pending" value={testStats.pending} color="text-slate-400" bg="bg-slate-100" />
              </div>

              <div className="space-y-4">
                {tests.map((test) => (
                    <TestRow 
                        key={test.id}
                        title={test.test_name} 
                        id={`LAB-${test.id}`} 
                        status={test.status} 
                        color={test.status === 'test completed' ? 'emerald' : 'amber'} 
                        isProcessing={test.status === 'test processing'} 
                    />
                ))}
                {tests.length === 0 && (
                    <div className="py-10 text-center border-2 border-dashed rounded-3xl border-slate-100">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">No Laboratory Orders Found</p>
                    </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </main>
    </div>
    </div>
  );
}

// Helper Components
function DetailItem({ label, value, isSpecial }) {
  return (
    <div className="flex justify-between border-b border-slate-100 dark:border-zinc-800 pb-3 transition-all hover:bg-slate-50/50 px-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className={`text-sm font-bold ${isSpecial ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>{value}</span>
    </div>
  );
}

function JourneyStep({ icon, label, status, variant }) {
  const styles = {
    success: "bg-emerald-500 shadow-emerald-500/20",
    warning: "bg-amber-500 shadow-amber-500/20"
  };
  const textColors = {
    success: "text-emerald-600",
    warning: "text-amber-600"
  };

  return (
    <div className="relative z-10 flex flex-col items-center group w-full md:w-auto">
      <div className={`size-14 rounded-full text-white flex items-center justify-center shadow-xl ${styles[variant]} ring-8 ring-white dark:ring-zinc-950`}>
        {icon}
      </div>
      <div className="mt-4 text-center">
        <p className="font-black text-sm uppercase tracking-tighter">{label}</p>
        <p className={`text-[10px] font-black uppercase tracking-widest ${textColors[variant]}`}>{status}</p>
      </div>
    </div>
  );
}

function TestIndicator({ color, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`size-3 rounded-full ${color} shadow-sm`} />
      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter">{label}</span>
    </div>
  );
}

function CompactDetail({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground font-medium">{label}:</span>
      <span className={`font-bold ${highlight ? 'text-primary underline underline-offset-4 decoration-2' : ''}`}>{value}</span>
    </div>
  );
}

function StatBox({ label, value, color, bg }) {
  return (
    <div className={`p-5 rounded-2xl text-center ${bg || 'bg-slate-50 dark:bg-zinc-900'} border transition-transform hover:scale-105`}>
      <p className={`text-3xl font-black tracking-tighter ${color}`}>{value}</p>
      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}

function TestRow({ title, id, status, color, isProcessing }) {
  const colorMap = {
    emerald: "border-l-emerald-500 text-emerald-600",
    amber: "border-l-amber-500 text-amber-600",
    slate: "border-l-slate-300 dark:border-l-zinc-700 text-slate-400"
  };

  return (
    <div className={`flex items-center justify-between p-5 bg-white dark:bg-zinc-900/50 rounded-2xl border-l-[5px] shadow-sm border border-slate-100 dark:border-zinc-800 transition-all hover:shadow-md ${colorMap[color]}`}>
      <div>
        <p className="font-black tracking-tight text-slate-900 dark:text-white">{title}</p>
        <p className="text-[10px] font-bold text-muted-foreground tracking-widest">ID: {id}</p>
      </div>
      <div className="flex items-center gap-2">
        {isProcessing ? <RefreshCcw size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
        <span className="text-[10px] font-black uppercase tracking-widest">{status}</span>
      </div>
    </div>
  );
}