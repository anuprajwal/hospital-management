// import React, { useState, useEffect, useCallback } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   PersonStanding,
//   ClipboardList,
//   Search,
//   PlusCircle,
//   CheckCircle2,
//   Trash2,
//   Clock,
//   Phone,
//   X,
//   Activity,
//   Loader2
// } from 'lucide-react';

// // UI Components
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";


// // Custom API Imports
// import { getPrices } from "@/pages/HospitalAdmin/Pricing/apis";
// import { createTests, createPrescription } from "./apis";
// import TopHeader from '@/components/Top-Header';
// import DynamicNavbar from '@/components/DynamicNavbar';

// const PatientDetailView = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { patient } = location.state || {};

//   // --- States ---
//   const [medicines, setMedicines] = useState([{ id: Date.now(), name: "", dosage: "", frequency: "1-0-1", duration: "", notes: "" }]);
//   const [availableTests, setAvailableTests] = useState([]);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [testSearch, setTestSearch] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [testLoading, setTestLoading] = useState(false);

//   // --- Fetch Tests from Pricing API ---
//   const fetchTests = useCallback(async (query = '') => {
//     setTestLoading(true);
//     try {
//       // Hardcoded 'active' status as requested
//       const response = await getPrices(1, 20, query, 'active');
//       setAvailableTests(response || []);
//     } catch (err) {
//       console.error("Error fetching tests:", err);
//     } finally {
//       setTestLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (patient) fetchTests();
//   }, [patient, fetchTests]);

//   if (!patient) return <div className="p-20 text-center font-bold">No patient data found.</div>;

//   // --- Handlers ---
//   const toggleTestSelection = (test) => {
//     const isAlreadySelected = selectedTests.find(t => t.id === test.id);
//     if (isAlreadySelected) {
//       setSelectedTests(selectedTests.filter(t => t.id !== test.id));
//     } else {
//       setSelectedTests([...selectedTests, { ...test, labNotes: '' }]);
//     }
//   };

//   const handleCompleteConsultation = async () => {
//     setIsSubmitting(true);
//     try {
//       // 1. Save Prescription (Send as JSON string)
//       const prescriptionPayload = {
//         patient_id: patient.id,
//         prescription: JSON.stringify(medicines)
//       };
//       await createPrescription(prescriptionPayload);

//       // 2. Save Tests (Sequential or parallel)
//       for (const test of selectedTests) {
//         await createTests({
//           patient_id: patient.id,
//           test_name: test.name,
//           test_cost: test.price
//         });
//       }

//       alert("Consultation completed and records saved!");
//       navigate('/doctor-dashboard');
//     } catch (err) {
//       console.error("Error finalizing consultation:", err);
//       alert("Failed to save all records. Please check the logs.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950">
//       <TopHeader />
//       <div className="flex flex-1 overflow-hidden">
//         <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-zinc-900 overflow-y-auto hidden lg:block">
//           <DynamicNavbar />
//         </aside>

//         <main className="flex-1 overflow-y-auto p-6 lg:p-10">
//           <div className="max-w-[1400px] mx-auto space-y-10 pb-20">
            
//             {/* Header Row */}
//             <div className="flex justify-between items-center border-b pb-6">
//               <div>
//                 <h1 className="text-3xl font-black">Consultation</h1>
//                 <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mt-1">ID: #APP-{patient.id}</p>
//               </div>
//               <Badge className="h-8 px-4 bg-primary/10 text-primary border-none">STATUS: {patient.status}</Badge>
//             </div>

//             {/* SECTION 1: Patient Basic Details */}
//             <Card className="shadow-sm border-slate-200">
//               <CardHeader className="bg-slate-50/50 border-b py-3 px-6">
//                 <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase">
//                   <PersonStanding className="h-4 w-4 text-primary" /> Patient Profile
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
//                 <InfoItem label="Full Name" value={patient.patient_name} />
//                 <InfoItem label="Age / Gender" value={`${patient.age}Y / ${patient.gender}`} />
//                 <InfoItem label="Contact" value={patient.phone} icon={<Phone className="size-3"/>} />
//                 <InfoItem label="Schedule" value={patient.time} icon={<Clock className="size-3"/>} />
//               </CardContent>
//             </Card>

//             {/* SECTION 2: Clinical Findings */}
//             <Card className="shadow-sm">
//               <CardHeader className="border-b py-3 px-6">
//                 <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
//                   <ClipboardList className="h-4 w-4 text-primary" /> Findings
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-4">
//                 <Textarea defaultValue={patient.notes} className="min-h-[100px] bg-slate-50 border-2" />
//               </CardContent>
//             </Card>

//             {/* SECTION 3: Integrated Prescription */}
//             <section className="space-y-4">
//               <h2 className="text-lg font-bold flex items-center gap-2">
//                 <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px]">3</div>
//                 Prescription
//               </h2>
//               <Card className="shadow-sm border-slate-200 overflow-hidden">
//                 <Table>
//                   <TableHeader className="bg-slate-50">
//                     <TableRow>
//                       <TableHead className="font-bold uppercase text-[10px]">Medicine</TableHead>
//                       <TableHead className="font-bold uppercase text-[10px]">Dosage</TableHead>
//                       <TableHead className="font-bold uppercase text-[10px]">Frequency</TableHead>
//                       <TableHead className="font-bold uppercase text-[10px]">Duration</TableHead>
//                       <TableHead className="text-center font-bold uppercase text-[10px]">Action</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {medicines.map((med, idx) => (
//                       <TableRow key={med.id}>
//                         <TableCell><Input placeholder="Name" value={med.name} onChange={(e) => {
//                           const newMeds = [...medicines];
//                           newMeds[idx].name = e.target.value;
//                           setMedicines(newMeds);
//                         }} className="border-none bg-transparent" /></TableCell>
//                         <TableCell><Input placeholder="1 cap" className="border-none bg-transparent w-20" /></TableCell>
//                         <TableCell>
//                           <Select defaultValue="1-0-1">
//                             <SelectTrigger className="border-none bg-transparent w-28"><SelectValue /></SelectTrigger>
//                             <SelectContent><SelectItem value="1-0-1">1-0-1</SelectItem><SelectItem value="1-1-1">1-1-1</SelectItem></SelectContent>
//                           </Select>
//                         </TableCell>
//                         <TableCell><Input placeholder="5 days" className="border-none bg-transparent w-20" /></TableCell>
//                         <TableCell className="text-center">
//                           <Button variant="ghost" size="icon" onClick={() => setMedicines(medicines.filter(m => m.id !== med.id))}><Trash2 size={16} className="text-muted-foreground"/></Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//                 <div className="p-4 bg-slate-50/50 border-t">
//                   <Button variant="ghost" onClick={() => setMedicines([...medicines, { id: Date.now(), name: "", dosage: "" }])} className="text-primary font-bold gap-2">
//                     <PlusCircle size={18} /> Add Medicine
//                   </Button>
//                 </div>
//               </Card>
//             </section>

//             {/* SECTION 4: Integrated Medical Tests */}
//             <section className="space-y-4">
//               <h2 className="text-lg font-bold flex items-center gap-2">
//                 <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px]">4</div>
//                 Medical Tests
//               </h2>
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//                 {/* Available Tests Selector */}
//                 <Card className="lg:col-span-5 border-slate-200">
//                   <CardHeader className="py-3 px-4 border-b space-y-3">
//                     <CardTitle className="text-xs font-bold uppercase tracking-widest">Directory</CardTitle>
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input 
//                         placeholder="Search test catalog..." 
//                         className="pl-9 h-10 border-2" 
//                         value={testSearch}
//                         onChange={(e) => {
//                           setTestSearch(e.target.value);
//                           fetchTests(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </CardHeader>
//                   <CardContent className="p-0">
//                     <ScrollArea className="h-[300px]">
//                       {testLoading ? (
//                         <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
//                       ) : (
//                         availableTests.map((test) => (
//                           <div 
//                             key={test.id}
//                             className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 border-b cursor-pointer"
//                             onClick={() => toggleTestSelection(test)}
//                           >
//                             <Checkbox checked={!!selectedTests.find(t => t.id === test.id)} onCheckedChange={() => toggleTestSelection(test)} />
//                             <div className="flex-grow">
//                               <p className="text-sm font-bold">{test.name}</p>
//                               <p className="text-[10px] text-muted-foreground">Price: ₹{test.price}</p>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </ScrollArea>
//                   </CardContent>
//                 </Card>

//                 {/* Orders Section */}
//                 <Card className="lg:col-span-7 border-slate-200 bg-white">
//                   <CardHeader className="py-3 px-4 border-b">
//                     <CardTitle className="text-xs font-bold uppercase tracking-widest">Active Orders ({selectedTests.length})</CardTitle>
//                   </CardHeader>
//                   <ScrollArea className="h-[360px] p-4">
//                     {selectedTests.length > 0 ? (
//                       <div className="space-y-2">
//                         {selectedTests.map((test) => (
//                           <div key={test.id} className="flex items-center gap-4 p-3 bg-slate-50 border rounded-lg">
//                             <div className="size-8 bg-white rounded flex items-center justify-center text-primary shadow-sm"><Activity size={16}/></div>
//                             <div className="flex-grow font-bold text-sm">{test.name}</div>
//                             <Button variant="ghost" size="icon" onClick={() => toggleTestSelection(test)}><X size={14} /></Button>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center h-full text-muted-foreground text-xs italic">Select tests from the directory</div>
//                     )}
//                   </ScrollArea>
//                 </Card>
//               </div>
//             </section>

//             {/* ACTIONS */}
//             <div className="pt-10 border-t flex items-center justify-between">
//               <Button variant="outline" className="px-10 h-12 font-bold" onClick={() => navigate(-1)}>Cancel</Button>
//               <Button 
//                 onClick={handleCompleteConsultation}
//                 disabled={isSubmitting}
//                 className="px-12 h-12 font-black shadow-lg shadow-primary/25 gap-2"
//               >
//                 {isSubmitting ? <Loader2 className="animate-spin" /> : <><CheckCircle2 className="size-5" /> Complete Consultation</>}
//               </Button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// const InfoItem = ({ label, value, icon }) => (
//   <div className="space-y-1">
//     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">{icon}{label}</p>
//     <p className="text-sm font-bold text-slate-800">{value || 'N/A'}</p>
//   </div>
// );

// export default PatientDetailView;



import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PersonStanding, ClipboardList, Search, PlusCircle, CheckCircle2,
  Trash2, Clock, Phone, X, Activity, Loader2
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { getPrices } from "@/pages/HospitalAdmin/Pricing/apis";
import { 
  createTests, 
  createPrescription, 
  getPatientPrescriptions, 
  getTests, 
  deleteTest 
} from "./apis";
import TopHeader from '@/components/Top-Header';
import DynamicNavbar from '@/components/DynamicNavbar';

const PatientDetailView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient } = location.state || {};

  // --- States ---
  const [medicines, setMedicines] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [testSearch, setTestSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testLoading, setTestLoading] = useState(false);


  // const loadExistingData = useCallback(async () => {
  //   if (!patient?.id) return;
  //   try {
  //     // 1. Fetch Prescriptions
  //     const presRes = await getPatientPrescriptions(patient.id);
      
  //     // Check if the response is an array and has at least one record
  //     if (Array.isArray(presRes) && presRes.length > 0) {
  //       // The backend returns the prescription as a stringified JSON array
  //       const rawPrescription = presRes[0].prescription;
  //       const parsedMedicines = JSON.parse(rawPrescription);
        
  //       setMedicines(parsedMedicines);
  //     } else {
  //       // Fallback to an empty row if no record exists
  //       setMedicines([{ id: Date.now(), name: "", dosage: "", frequency: "1-0-1", duration: "", notes: "" }]);
  //     }
  
  //     // 2. Fetch Existing Tests for this patient
  //     const testsRes = await getTests();
  //     const patientTests = (testsRes?.data || []).filter(t => t.patient_id === patient.id);
      
  //     setSelectedTests(patientTests.map(t => ({
  //       id: t.id,
  //       name: t.test_name,
  //       price: t.test_cost,
  //       isExisting: true 
  //     })));
  
  //   } catch (err) {
  //     console.error("Error loading patient history:", err);
  //   }
  // }, [patient]);



  const loadExistingData = useCallback(async () => {
    if (!patient?.id) return;
    try {
      // 1. Fetch Prescriptions
      const presRes = await getPatientPrescriptions(patient.id);
      if (Array.isArray(presRes) && presRes.length > 0) {
        // Parse stringified JSON from the first prescription record
        const rawPrescription = presRes[0].prescription;
        setMedicines(JSON.parse(rawPrescription));
      } else {
        setMedicines([{ id: Date.now(), name: "", dosage: "", frequency: "1-0-1", duration: "", notes: "" }]);
      }
  
      // 2. Fetch Existing Tests
      const testsRes = await getTests();
      // Filter the global tests list for this specific patient
      const patientTests = (testsRes || []).filter(t => t.patient_id === patient.id);
      
      setSelectedTests(patientTests.map(t => ({
        id: t.id,
        name: t.test_name || "Diagnostic Test", // Fallback if test_name isn't in top level
        price: t.test_cost,
        status: t.status,
        isExisting: true 
      })));
  
    } catch (err) {
      console.error("Error loading patient history:", err);
    }
  }, [patient]);



  const fetchTests = useCallback(async (query = '') => {
    setTestLoading(true);
    try {
      const response = await getPrices(1, 20, query, 'active');
      setAvailableTests(response || []);
    } catch (err) {
      console.error("Error fetching catalog:", err);
    } finally {
      setTestLoading(false);
    }
  }, []);

  useEffect(() => {
    if (patient) {
      loadExistingData();
      fetchTests();
    }
  }, [patient, loadExistingData, fetchTests]);

  if (!patient) return <div className="p-20 text-center font-bold">No patient data found.</div>;

  // --- Handlers ---
  const toggleTestSelection = async (test) => {
    const existing = selectedTests.find(t => t.name === test.name);
    
    if (existing) {
      // If it's an existing test from DB, we call the delete API
      if (existing.isExisting) {
        if (window.confirm("Delete this existing test record?")) {
          await deleteTest(existing.id);
        } else return;
      }
      setSelectedTests(selectedTests.filter(t => t.name !== test.name));
    } else {
      setSelectedTests([...selectedTests, { ...test, labNotes: '', isExisting: false }]);
    }
  };

  const handleCompleteConsultation = async () => {
    setIsSubmitting(true);
    try {
      const prescriptionPayload = {
        patient_id: patient.id,
        prescription: JSON.stringify(medicines)
      };
      await createPrescription(prescriptionPayload);

      // Only create tests that are NOT already in the database
      const newTests = selectedTests.filter(t => !t.isExisting);
      for (const test of newTests) {
        await createTests({
          patient_id: patient.id,
          test_name: test.name,
          test_cost: test.price
        });
      }

      alert("Records synchronized successfully!");
      navigate('/doctor-dashboard');
    } catch (err) {
      console.error("Sync Error:", err);
      alert("Error saving records.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950 font-sans">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-zinc-900 overflow-y-auto hidden lg:block">
          <DynamicNavbar />
        </aside>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto space-y-10 pb-20">
            
            {/* Consultation Header */}
            <div className="flex justify-between items-center border-b pb-6">
              <div>
                <h1 className="text-3xl font-black tracking-tight uppercase">Patient Consultation</h1>
                <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mt-1">Visit ID: #APP-{patient.id}</p>
              </div>
              <Badge className="h-9 px-6 bg-primary/10 text-primary border-none font-black text-xs uppercase">
                {patient.status}
              </Badge>
            </div>

            {/* Profile Section */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-slate-50/50 border-b py-3 px-6">
                <CardTitle className="text-xs font-black flex items-center gap-2 uppercase tracking-tighter">
                  <PersonStanding className="h-4 w-4 text-primary" /> Demographics
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                <InfoItem label="Full Name" value={patient.patient_name} />
                <InfoItem label="Age / Gender" value={`${patient.age}Y / ${patient.gender}`} />
                <InfoItem label="Contact" value={patient.phone} icon={<Phone className="size-3"/>} />
                <InfoItem label="Schedule" value={patient.time} icon={<Clock className="size-3"/>} />
              </CardContent>
            </Card>

            {/* Clinical Findings */}
            <Card className="shadow-sm">
              <CardHeader className="border-b py-3 px-6">
                <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-primary" /> Observations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <Textarea defaultValue={patient.notes} placeholder="Clinical notes here..." className="min-h-[100px] bg-slate-50 border-2 font-medium" />
              </CardContent>
            </Card>

            {/* Prescription Section */}
            <section className="space-y-4">
              <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px]">3</div>
                Medications
              </h2>
              <Card className="shadow-sm border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-black uppercase text-[10px]">Medicine</TableHead>
                      <TableHead className="font-black uppercase text-[10px]">Dosage</TableHead>
                      <TableHead className="font-black uppercase text-[10px]">Freq.</TableHead>
                      <TableHead className="font-black uppercase text-[10px]">Duration</TableHead>
                      <TableHead className="text-center font-black uppercase text-[10px]">Remove</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.map((med, idx) => (
                      <TableRow key={med.id}>
                        <TableCell>
                          <Input 
                            value={med.name} 
                            onChange={(e) => {
                              const newMeds = [...medicines];
                              newMeds[idx].name = e.target.value;
                              setMedicines(newMeds);
                            }} 
                            className="border-none bg-transparent font-bold" 
                          />
                        </TableCell>
                        <TableCell><Input placeholder="1 cap" className="border-none bg-transparent w-20 font-medium" /></TableCell>
                        <TableCell>
                          <Select defaultValue={med.frequency || "1-0-1"}>
                            <SelectTrigger className="border-none bg-transparent w-24 font-bold"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="1-0-1">1-0-1</SelectItem><SelectItem value="1-1-1">1-1-1</SelectItem></SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell><Input placeholder="7 days" className="border-none bg-transparent w-20 font-medium" /></TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" onClick={() => setMedicines(medicines.filter(m => m.id !== med.id))}>
                            <Trash2 size={16} className="text-red-400 hover:text-red-600"/>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 bg-slate-50/50 border-t">
                  <Button variant="ghost" onClick={() => setMedicines([...medicines, { id: Date.now(), name: "", dosage: "" }])} className="text-primary font-black uppercase text-[10px] gap-2">
                    <PlusCircle size={16} /> Add Line Item
                  </Button>
                </div>
              </Card>
            </section>

            {/* Test Selection */}
            <section className="space-y-4">
              <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px]">4</div>
                Diagnostic Orders
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-5 border-slate-200">
                  <CardHeader className="py-3 px-4 border-b space-y-3">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Catalog Search</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Filter tests..." 
                        className="pl-9 h-11 border-2 font-bold" 
                        value={testSearch}
                        onChange={(e) => {
                          setTestSearch(e.target.value);
                          fetchTests(e.target.value);
                        }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[300px]">
                      {testLoading ? (
                        <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
                      ) : (
                        availableTests.map((test) => (
                          <div 
                            key={test.id}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 border-b cursor-pointer"
                            onClick={() => toggleTestSelection(test)}
                          >
                            <Checkbox checked={!!selectedTests.find(t => t.name === test.name)} onCheckedChange={() => toggleTestSelection(test)} />
                            <div className="flex-grow">
                              <p className="text-sm font-black text-slate-700">{test.name}</p>
                              <p className="text-[10px] font-bold text-muted-foreground">Price: ₹{test.price}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-7 border-slate-200 bg-white">
                  <CardHeader className="py-3 px-4 border-b">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Queued Orders ({selectedTests.length})</CardTitle>
                  </CardHeader>
                  <ScrollArea className="h-[360px] p-4">
                    {selectedTests.length > 0 ? (
                      <div className="space-y-2">
                        {selectedTests.map((test) => (
                          <div key={test.id} className="flex items-center gap-4 p-3 bg-slate-50 border rounded-lg border-primary/10">
                            <div className="size-8 bg-white rounded flex items-center justify-center text-primary shadow-sm"><Activity size={16}/></div>
                            <div className="flex-grow font-black text-xs uppercase tracking-tight">{test.name}</div>
                            {test.isExisting && <Badge variant="outline" className="text-[9px] font-bold text-emerald-600 border-emerald-200">Existing</Badge>}
                            <Button variant="ghost" size="icon" onClick={() => toggleTestSelection(test)}><X size={14} className="text-red-400"/></Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-[10px] uppercase font-bold italic">No active test orders</div>
                    )}
                  </ScrollArea>
                </Card>
              </div>
            </section>

            {/* Actions */}
            <div className="pt-10 border-t flex items-center justify-between">
              <Button variant="outline" className="px-12 h-12 font-black uppercase text-xs tracking-widest border-2" onClick={() => navigate(-1)}>Discard</Button>
              <Button 
                onClick={handleCompleteConsultation}
                disabled={isSubmitting}
                className="px-12 h-12 font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/25 gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <><CheckCircle2 className="size-5" /> Sync Records</>}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, icon }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">{icon}{label}</p>
    <p className="text-sm font-black text-slate-700">{value || 'N/A'}</p>
  </div>
);

export default PatientDetailView;