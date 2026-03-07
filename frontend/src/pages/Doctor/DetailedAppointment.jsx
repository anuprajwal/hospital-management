import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search, PlusCircle, CheckCircle2,
  Trash2, Clock, Phone, X, Activity, Loader2
} from 'lucide-react';

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
  deleteTest,
  editPrescription
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
  const [prescriptionId, setPrescriptionId] = useState(null); // Track the ID


  // DetailedAppointment.jsx

  const loadExistingData = useCallback(async () => {
    if (!patient?.id) return;
    try {
      // 1. Fetch Prescriptions (Existing logic)
      const presRes = await getPatientPrescriptions(patient.id);
      if (Array.isArray(presRes) && presRes.length > 0) {
        const rawPrescription = presRes[0].prescription;
        setPrescriptionId(presRes[0].id);
        setMedicines(JSON.parse(rawPrescription));
      } else {
        setPrescriptionId(null);
        setMedicines([{ id: Date.now(), name: "", dosage: "", frequency: "1-0-1", duration: "", notes: "", status: "Prescripted" }]);
      }

      // 2. Fetch Existing Tests for THIS patient
      const testsRes = await getTests({
        patient_id: patient.id, // 🔹 Now passing the required ID
        limit: 100,
        status: "Completed" // Or whichever status you wish to filter by
      });

      // Access testsRes.data from the paginated response
      const patientTests = testsRes.data || [];

      setSelectedTests(patientTests.map(t => ({
        id: t.id,
        name: t.test_name || "Diagnostic Test",
        price: t.test_cost,
        status: t.status,
        isExisting: true,
        test_results:t.test_results
      })));

    } catch (err) {
      console.error("Error loading patient history:", err);
    }
  }, [patient]);



  const fetchTests = useCallback(async (query = '') => {
    setTestLoading(true);
    try {
      const response = await getPrices(1, 20, query, 'true');
      setAvailableTests(response?.data || []);
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

      if (prescriptionId) {
        // Use the edit API and pass the specific ID
        await editPrescription(prescriptionId, { prescription: JSON.stringify(medicines) });
      } else {
        // Fallback to create if it's a new entry
        await createPrescription(prescriptionPayload);
      }

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
      navigate('/doctor-appointments');
    } catch (err) {
      console.error("Sync Error:", err);
      alert("Error saving records.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      {/* Sidenav */}
      <div className="flex-shrink-0 h-full" aria-label="Sidebar">
        <DynamicNavbar />
      </div>
      {/* Header + right side content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 border-l border-border">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="w-full space-y-0 pb-6">
            {/* Title bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
              <div>
                <h1 className="text-base font-semibold text-foreground">Consultation</h1>
                <p className="text-xs text-muted-foreground">Visit ID: #{patient.id}</p>
              </div>
              <Badge variant="secondary" className="w-fit text-xs font-medium">
                {patient.status}
              </Badge>
            </div>


            {/* Patient details + Observations — one block */}
            <div className="py-3 border-b border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <InfoItem label="Full name" value={patient.patient_name} />
                <InfoItem label="Age / Gender" value={`${patient.age} / ${patient.gender}`} />
                <InfoItem label="Contact" value={patient.phone} icon={<Phone className="h-3.5 w-3.5 text-muted-foreground" />} />
                <InfoItem label="Schedule" value={patient.time} icon={<Clock className="h-3.5 w-3.5 text-muted-foreground" />} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Observations</p>
                <Textarea
                  defaultValue={patient.notes}
                  placeholder="Clinical notes…"
                  className="min-h-[64px] text-sm resize-y border-border w-full py-2"
                />
              </div>
            </div>

            {/* Prescription — full-width table */}
            <div className="py-3 border-b border-border">
              <div className="flex flex-row items-center justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-foreground">Prescription</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1 h-7 text-xs shrink-0"
                  onClick={() => setMedicines([...medicines, { id: Date.now(), name: "", dosage: "", frequency: "1-0-1", duration: "", notes: "" }])}
                >
                  <PlusCircle className="h-3 w-3" />
                  Add row
                </Button>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-muted/30 border-b border-border">
                      <TableHead className="text-xs font-medium text-muted-foreground h-9 px-3">Medicine</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground h-9 px-3 w-28">Dosage</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground h-9 px-3 w-24">Frequency</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground h-9 px-3 w-24">Duration</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground w-10 text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.map((med, idx) => (

                      <TableRow key={med.id} className="border-b border-border last:border-0">
                        <TableCell className="py-1 px-3">
                          <Input
                            value={med.name}
                            onChange={(e) => {
                              const next = [...medicines];
                              next[idx].name = e.target.value;
                              setMedicines(next);
                            }}
                            placeholder="Name"
                            className="h-7 border-border text-sm"
                          />
                        </TableCell>
                        <TableCell className="py-1 px-3">
                          <Input
                            placeholder="e.g. 1 cap"
                            value={med.dosage || ''}
                            onChange={(e) => {
                              const next = [...medicines];
                              next[idx].dosage = e.target.value;
                              setMedicines(next);
                            }}
                            className="h-7 border-border text-sm"
                          />
                        </TableCell>
                        <TableCell className="py-1 px-3">
                          <Select
                            value={med.frequency || "1-0-1"}
                            onValueChange={(val) => {
                              const next = [...medicines];
                              next[idx].frequency = val;
                              setMedicines(next);
                            }}
                          >
                            <SelectTrigger className="h-7 border-border text-sm w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-0-1">1-0-1</SelectItem>
                              <SelectItem value="1-1-1">1-1-1</SelectItem>
                              <SelectItem value="0-0-1">0-0-1</SelectItem>
                              <SelectItem value="1-0-0">1-0-0</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>

                        <TableCell className="py-1 px-3">
                          <Input
                            placeholder="e.g. 7 days"
                            value={med.duration || ''}
                            onChange={(e) => {
                              const next = [...medicines];
                              next[idx].duration = e.target.value;
                              setMedicines(next);
                            }}
                            className="h-7 border-border text-sm"
                          />
                        </TableCell>
                        <TableCell className="py-1 px-3 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => setMedicines(medicines.filter(m => m.id !== med.id))}
                            aria-label="Remove row"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Diagnostic orders — two columns, one section */}
            <div className="py-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground mb-2">Diagnostic orders</p>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5 border border-border rounded-md overflow-hidden">
                  <div className="px-3 py-2 border-b border-border bg-muted/30">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search tests…"
                        className="pl-8 h-8 text-sm border-border"
                        value={testSearch}
                        onChange={(e) => {
                          setTestSearch(e.target.value);
                          fetchTests(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[200px]">
                    {testLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <ul className="divide-y divide-border">
                        {availableTests.map((test) => (
                          <li
                            key={test.id}
                            className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-muted/50"
                            onClick={() => toggleTestSelection(test)}
                          >
                            <Checkbox
                              checked={!!selectedTests.find(t => t.name === test.name)}
                              onCheckedChange={() => toggleTestSelection(test)}
                              aria-label={`Select ${test.name}`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground truncate">{test.name}</p>
                              <p className="text-xs text-muted-foreground">₹{test.price}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ScrollArea>
                </div>
                <div className="lg:col-span-7 border border-border rounded-md overflow-hidden">
                  <div className="px-3 py-2 border-b border-border bg-muted/30">
                    <p className="text-sm font-medium text-foreground">
                      Ordered {selectedTests.length > 0 && `(${selectedTests.length})`}
                    </p>
                  </div>
                  <ScrollArea className="h-[200px]">
                    {selectedTests.length > 0 ? (
                      <ul className="divide-y divide-border">
                        {selectedTests.map((test) => (
                          <li key={test.id} className="flex items-center gap-2 px-3 py-1.5">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border bg-muted/30 text-muted-foreground">
                              <Activity className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground">{test.name}</p>
                              {test.isExisting && (
                                <span className="text-xs text-muted-foreground">Existing</span>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                              onClick={() => toggleTestSelection(test)}
                              aria-label="Remove test"
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center px-3">
                        <p className="text-sm text-muted-foreground">No tests ordered</p>
                        <p className="text-xs text-muted-foreground">Select from the list</p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="w-full sm:w-auto h-8">
                Back
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={isSubmitting}
                onClick={handleCompleteConsultation}
                className="gap-1.5 w-full sm:w-auto h-8"
              >
                {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                Save & complete
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, icon }) => (
  <div className="space-y-0.5">
    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
      {icon}
      {label}
    </p>
    <p className="text-sm text-foreground font-medium leading-tight">{value || '—'}</p>
  </div>
);

export default PatientDetailView;