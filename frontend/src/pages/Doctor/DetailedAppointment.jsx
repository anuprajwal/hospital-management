// import React from 'react';
// import {
//   PersonStanding,
//   ClipboardList,
//   History,
//   Pill,
//   Activity,
//   PlusCircle,
//   Microscope,
//   CheckCircle2,
//   Download,
//   Eye,
//   Plus,
// } from 'lucide-react';

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import { useLocation } from 'react-router-dom';
// import TopHeader from '@/components/Top-Header';
// import DynamicNavbar from '@/components/DynamicNavbar';


// const PatientDetailView = () => {
//   const location = useLocation();
//   // Extract the patient data passed from the cards
//   const { patient } = location.state || {};

//   if (!patient) return <div>No patient data found.</div>;
  
//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-zinc-950">
//       {/* Top Navigation Bar */}
//       <div className="w-64 h-full flex-shrink-0 border-r bg-white dark:bg-zinc-900">
//         <DynamicNavbar />
//       </div>


//       <div className="flex-1 flex flex-col min-w-0">
//         <TopHeader />
//       <main className="flex-1 px-4 lg:px-10 py-8 max-w-[1400px] mx-auto w-full">
//         {/* Breadcrumb and Status Row */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-extrabold tracking-tight">Patient Detail View</h1>
//             <Badge variant="outline" className="mt-2 font-mono text-muted-foreground">
//               Consultation ID: #APP-8829-X
//             </Badge>
//           </div>
//           <div className="flex items-center gap-4">
//             <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Appointment Status:</span>
//             <Select defaultValue="consultation">
//               <SelectTrigger className="w-56 h-11 font-semibold border-slate-200 dark:border-zinc-800">
//                 <SelectValue placeholder="Select Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="scheduled">Scheduled</SelectItem>
//                 <SelectItem value="consultation">In Consultation</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//                 <SelectItem value="cancelled">Cancelled</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Page Title */}
        

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Column: Patient Summary & History */}
//           <div className="lg:col-span-8 flex flex-col gap-8">
            
//             {/* Basic Details Card */}
//             <Card className="shadow-sm border-slate-200 dark:border-zinc-800">
//               <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
//                 <CardTitle className="text-base font-bold flex items-center gap-2">
//                   <PersonStanding className="h-5 w-5 text-primary" />
//                   Basic Patient Details
//                 </CardTitle>
//                 <Button variant="ghost" size="sm" className="text-primary font-semibold">
//                   Edit profile
//                 </Button>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
//                   {[
//                     { label: "Full Name", value: "Eleanor Thompson" },
//                     { label: "Age / Gender", value: "42 Years / Female" },
//                     { label: "Phone Number", value: "+1 (555) 0123-456" },
//                     { label: "Appointment Time", value: "Oct 24, 2023 | 10:30 AM" },
//                     { label: "Speciality", value: "Cardiology", isSpecial: true },
//                     { label: "Referred By", value: "Dr. Michael Chen" },
//                   ].map((info, i) => (
//                     <div key={i} className="space-y-1">
//                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{info.label}</p>
//                       <p className={`text-sm font-semibold ${info.isSpecial ? 'text-primary' : ''}`}>
//                         {info.value}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Clinical Description Section */}
//             <Card className="shadow-sm border-slate-200 dark:border-zinc-800">
//               <CardHeader className="border-b pb-4">
//                 <CardTitle className="text-base font-bold flex items-center gap-2">
//                   <ClipboardList className="h-5 w-5 text-primary" />
//                   Clinical Observations & Chief Complaint
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <Textarea 
//                   placeholder="Describe patient's symptoms..." 
//                   className="min-h-[160px] bg-slate-50 dark:bg-zinc-950 resize-none leading-relaxed"
//                 />
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   <Badge variant="secondary" className="px-3 py-1 font-medium">Chest Pain</Badge>
//                   <Badge variant="secondary" className="px-3 py-1 font-medium">Shortness of Breath</Badge>
//                   <Button variant="outline" size="sm" className="rounded-full border-dashed h-7 px-3 text-xs">
//                     <Plus className="h-3 w-3 mr-1" /> Add tag
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* History Section */}
//             <Card className="shadow-sm border-slate-200 dark:border-zinc-800">
//               <CardHeader className="border-b pb-4">
//                 <CardTitle className="text-base font-bold flex items-center gap-2">
//                   <History className="h-5 w-5 text-primary" />
//                   History: Previous Prescriptions
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <div className="divide-y divide-slate-100 dark:divide-zinc-800">
//                   <PrescriptionRow 
//                     title="Annual Wellness Checkup" 
//                     date="Aug 12, 2023" 
//                     doctor="Dr. Sarah Wilson" 
//                     icon={<Pill className="h-5 w-5" />}
//                     color="primary"
//                   />
//                   <PrescriptionRow 
//                     title="Cardiac Stress Test Results" 
//                     date="Jan 15, 2023" 
//                     doctor="Cardiology Lab" 
//                     icon={<Activity className="h-5 w-5" />}
//                     color="orange"
//                   />
//                 </div>
//               </CardContent>
//               <Button variant="ghost" className="w-full py-6 rounded-none text-primary font-bold hover:bg-primary/5 border-t">
//                 View All Past Records
//               </Button>
//             </Card>
//           </div>

//           {/* Right Column: Consultation Actions & Vitals */}
//           <div className="lg:col-span-4 flex flex-col gap-6">
//             <div className="sticky top-28 space-y-6">
              
//               {/* Consultation Actions */}
//               <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-md">
//                 <CardContent className="p-6 space-y-4">
//                   <h3 className="font-bold mb-4 flex items-center gap-2">
//                     <div className="size-2 bg-primary rounded-full animate-pulse" />
//                     Consultation Actions
//                   </h3>
//                   <Button className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20 gap-3">
//                     <PlusCircle className="h-5 w-5" /> Add Prescription
//                   </Button>
//                   <Button variant="outline" className="w-full h-14 rounded-xl font-bold text-base border-2 border-primary text-primary hover:bg-primary/5 gap-3">
//                     <Microscope className="h-5 w-5" /> Add Lab Tests
//                   </Button>
//                   <Separator className="my-4" />
//                   <Button variant="default" className="w-full h-14 rounded-xl font-bold text-base bg-slate-900 dark:bg-slate-100 dark:hover:bg-slate-200 gap-3">
//                     <CheckCircle2 className="h-5 w-5" /> Close Appointment
//                   </Button>
//                   <p className="text-[11px] text-center text-muted-foreground px-4 leading-relaxed">
//                     Closing finalizes the medical record and notifies the patient.
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* Vital Signs Sidebar */}
//               <Card className="border-slate-200 dark:border-zinc-800">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h4 className="font-bold text-sm uppercase tracking-wider">Last Vitals</h4>
//                     <Badge variant="outline" className="text-[10px] opacity-70">TODAY, 10:15 AM</Badge>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <VitalBox label="BP" value="120/80" unit="mmHg" />
//                     <VitalBox label="Pulse" value="72" unit="bpm" />
//                     <VitalBox label="Temp" value="98.6" unit="°F" />
//                     <VitalBox label="SpO2" value="99" unit="%" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
//       </div>
//     </div>
//   );
// };

// // Sub-components for cleaner code
// const PrescriptionRow = ({ title, date, doctor, icon, color }) => (
//   <div className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
//     <div className="flex items-center gap-4">
//       <div className={`size-10 rounded-lg flex items-center justify-center 
//         ${color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/20'}`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm font-bold">{title}</p>
//         <p className="text-xs text-muted-foreground">{date} • {doctor}</p>
//       </div>
//     </div>
//     <div className="flex items-center gap-2">
//       <Button variant="outline" size="sm" className="h-8 gap-1 text-xs font-bold">
//         <Eye className="h-3.5 w-3.5" /> View
//       </Button>
//       <Button variant="secondary" size="sm" className="h-8 gap-1 text-xs font-bold text-primary">
//         <Download className="h-3.5 w-3.5" /> PDF
//       </Button>
//     </div>
//   </div>
// );

// const VitalBox = ({ label, value, unit }) => (
//   <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-900">
//     <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{label}</p>
//     <p className="text-base font-bold">
//       {value} <span className="text-[10px] font-medium text-muted-foreground">{unit}</span>
//     </p>
//   </div>
// );

// export default PatientDetailView;



import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  PersonStanding,
  ClipboardList,
  Pill,
  Droplets,
  Activity,
  Box,
  X,
  PlusCircle,
  Microscope,
  CheckCircle2,
  Radiation,
  Trash2,
  Save,
  Clock,
  Phone
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import TopHeader from '@/components/Top-Header';
import DynamicNavbar from '@/components/DynamicNavbar';

// --- Static Data for Tests ---
const availableTests = [
  { id: 'blood', name: 'Blood Test (Full Count)', sub: 'Standard Hematology', icon: <Droplets className="size-5" /> },
  { id: 'ecg', name: 'ECG (Electrocardiogram)', sub: 'Cardiac Monitoring', icon: <Activity className="size-5" /> },
  { id: 'xray', name: 'X-Ray (Chest)', sub: 'PA & Lateral Views', icon: <Radiation className="size-5" /> },
  { id: 'mri', name: 'MRI Scan', sub: 'High Resolution Imaging', icon: <Box className="size-5" /> },
  { id: 'urine', name: 'Urine Test', sub: 'Urinalysis standard', icon: <Microscope className="size-5" /> },
];

const PatientDetailView = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  // States for Prescription & Tests
  const [medicines, setMedicines] = useState([
    { id: 1, name: "", dosage: "", frequency: "1-0-1", duration: "", notes: "" }
  ]);
  const [selectedTestIds, setSelectedTestIds] = useState([]);

  if (!patient) return <div className="p-20 text-center font-bold">No patient data found. Please return to the dashboard.</div>;

  // --- Handlers ---
  const addMedicine = () => {
    setMedicines([...medicines, { id: Date.now(), name: "", dosage: "", frequency: "1-0-1", duration: "", notes: "" }]);
  };

  const removeMedicine = (id) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const toggleTest = (id) => {
    setSelectedTestIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectedTests = availableTests.filter(t => selectedTestIds.includes(t.id));

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950">
      {/* 1. Top Navbar: Full Width */}
      <div className="w-full flex-shrink-0 z-50">
        <TopHeader />
      </div>

      {/* 2. Main Body: Side-by-Side Sidebar and Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Dynamic Sidebar */}
        <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-zinc-900 overflow-y-auto hidden lg:block">
          <DynamicNavbar />
        </aside>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto space-y-10">
            
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
              <div>
                <h1 className="text-3xl font-black tracking-tight">Consultation</h1>
                <p className="text-muted-foreground font-medium uppercase text-xs mt-1">
                  ID: #APP-{patient.id} • Created On: {patient.fullDetails?.date || 'N/A'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-tighter">Status:</span>
                <Select defaultValue={patient.status}>
                  <SelectTrigger className="w-56 h-11 font-bold border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Created">Created</SelectItem>
                    <SelectItem value="In Consultation">In Consultation</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SECTION 1: Patient Basic Details (Data Mapped from State) */}
            <Card className="shadow-sm border-slate-200 dark:border-zinc-800">
              <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b py-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <PersonStanding className="h-5 w-5 text-primary" />
                  BASIC PATIENT DETAILS
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                  <InfoItem label="Full Name" value={patient.patient_name} />
                  <InfoItem label="Age / Gender" value={`${patient.age}Y / ${patient.gender}`} />
                  <InfoItem label="Phone Number" value={patient.phone} icon={<Phone className="size-3"/>} />
                  <InfoItem label="Appointment Time" value={patient.time} icon={<Clock className="size-3"/>} />
                  <InfoItem label="Speciality" value={patient.fullDetails?.speciality || "General"} isSpecial />
                  <InfoItem label="Referrer" value={patient.fullDetails?.referer || "Self"} />
                </div>
              </CardContent>
            </Card>

            {/* SECTION 2: Clinical Description */}
            <Card className="shadow-sm border-slate-200 dark:border-zinc-800">
              <CardHeader className="border-b py-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Clinical Observations & Findings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Textarea 
                  placeholder="Enter clinical description..." 
                  defaultValue={patient.notes}
                  className="min-h-[120px] bg-slate-50 dark:bg-zinc-950 border-2 focus-visible:ring-primary"
                />
              </CardContent>
            </Card>

            {/* SECTION 3: Integrated Prescription (Medicine Table) */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="size-7 rounded-full bg-primary flex items-center justify-center text-white text-xs">3</div>
                Prescription
              </h2>
              <Card className="shadow-sm border-slate-200 dark:border-zinc-800 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-zinc-900">
                    <TableRow>
                      <TableHead className="font-bold uppercase text-[10px]">Medicine Name</TableHead>
                      <TableHead className="font-bold uppercase text-[10px]">Dosage</TableHead>
                      <TableHead className="font-bold uppercase text-[10px]">Frequency</TableHead>
                      <TableHead className="font-bold uppercase text-[10px]">Duration</TableHead>
                      <TableHead className="font-bold uppercase text-[10px]">Notes</TableHead>
                      <TableHead className="text-center font-bold uppercase text-[10px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.map((med) => (
                      <TableRow key={med.id}>
                        <TableCell><Input placeholder="E.g. Paracetamol" className="border-none bg-transparent" /></TableCell>
                        <TableCell><Input placeholder="1 cap" className="border-none bg-transparent w-24" /></TableCell>
                        <TableCell>
                          <Select defaultValue="1-0-1">
                            <SelectTrigger className="border-none bg-transparent w-28"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-0-1">1-0-1</SelectItem>
                              <SelectItem value="1-1-1">1-1-1</SelectItem>
                              <SelectItem value="0-0-1">0-0-1</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell><Input placeholder="5 days" className="border-none bg-transparent w-24" /></TableCell>
                        <TableCell><Input placeholder="After food" className="border-none bg-transparent" /></TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" onClick={() => removeMedicine(med.id)} className="text-muted-foreground hover:text-destructive">
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 bg-slate-50/50 dark:bg-zinc-900/50 border-t">
                  <Button variant="ghost" onClick={addMedicine} className="text-primary font-bold gap-2">
                    <PlusCircle size={18} /> Add Another Medicine
                  </Button>
                </div>
              </Card>
            </section>

            {/* SECTION 4: Integrated Medical Tests */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="size-7 rounded-full bg-primary flex items-center justify-center text-white text-xs">4</div>
                Medical Tests
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Available Tests Selector */}
                <Card className="lg:col-span-4 border-slate-200 dark:border-zinc-800">
                  <CardHeader className="py-4 border-b">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest">Available Tests</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    {availableTests.map((test) => (
                      <div 
                        key={test.id}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
                        onClick={() => toggleTest(test.id)}
                      >
                        <Checkbox checked={selectedTestIds.includes(test.id)} className="size-4" />
                        <label className="text-sm font-semibold cursor-pointer">{test.name}</label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Selected Tests List */}
                <Card className="lg:col-span-8 border-slate-200 dark:border-zinc-800 min-h-[300px] flex flex-col">
                  <CardHeader className="py-4 border-b flex flex-row items-center justify-between">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest">Orders ({selectedTests.length})</CardTitle>
                  </CardHeader>
                  <ScrollArea className="flex-grow p-4">
                    {selectedTests.length > 0 ? (
                      <div className="space-y-3">
                        {selectedTests.map((test) => (
                          <div key={test.id} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-zinc-900 rounded-lg border border-slate-100 dark:border-zinc-800">
                            <div className="size-10 bg-white dark:bg-zinc-800 rounded flex items-center justify-center text-primary shadow-sm">{test.icon}</div>
                            <div className="flex-grow"><h4 className="text-sm font-bold">{test.name}</h4><p className="text-[10px] text-muted-foreground">{test.sub}</p></div>
                            <Input placeholder="Lab notes..." className="max-w-[200px] h-8 text-xs bg-white dark:bg-zinc-950" />
                            <Button variant="ghost" size="icon" onClick={() => toggleTest(test.id)} className="text-muted-foreground"><X size={14} /></Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-40 flex items-center justify-center text-muted-foreground text-sm italic">No tests selected</div>
                    )}
                  </ScrollArea>
                </Card>
              </div>
            </section>

            {/* FOOTER ACTIONS */}
            <div className="pt-10 pb-20 border-t flex items-center justify-between">
              <Button variant="outline" className="px-10 h-12 font-bold">Discard Draft</Button>
              <div className="flex gap-4">
                <Button variant="secondary" className="px-10 h-12 font-bold text-primary">Save as Draft</Button>
                <Button className="px-12 h-12 font-black shadow-lg shadow-primary/25 gap-2">
                  <CheckCircle2 className="size-5" /> Complete Consultation
                </Button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

// Reusable Info Display Component
const InfoItem = ({ label, value, isSpecial, icon }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
      {icon} {label}
    </p>
    <p className={`text-sm font-bold ${isSpecial ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>
      {value || 'N/A'}
    </p>
  </div>
);

export default PatientDetailView;