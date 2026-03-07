import React, { useEffect, useState } from 'react';
import { 
  RefreshCw, 
  User, 
  Clock, 
  ChevronRight
} from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";
import { useNavigate } from 'react-router-dom';
import { getPrescriptions } from './apis'; 

export default function PrescriptionQueue() {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const response = await getPrescriptions({ page: 1, limit: 10 });
      console.log("Prescription Queue Data:", response.data);
      setPrescriptions(response.data); // Mapping to the "data" key in your JSON
    } catch (err) {
      console.error("Fetch Prescriptions Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleViewDetails = (item) => {
    // Parse the prescription string once before sending
    const parsedMeds = JSON.parse(JSON.parse(item.prescription));
    navigate('/match-medicines', { 
      state: { 
        prescriptionId: item.id,
        patientName: item.patient_name,
        patientId: item.patient_id,
        medicines: parsedMeds,
        createdOn: item.created_on
      } 
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
      <TopHeader />

      <div className="flex flex-1">
        <DynamicNavbar />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-10 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight">Prescription Queue</h1>
              <p className="text-muted-foreground font-medium flex items-center gap-2">
                Patients waiting for medicine dispensing 
                <Badge variant="outline" className="font-bold">
                  {loading ? "Loading..." : `${prescriptions.length} Active`}
                </Badge>
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={fetchQueue} className="rounded-xl h-11 px-6 font-black gap-2 shadow-lg shadow-primary/20 transition-all hover:brightness-110">
                <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Queue
              </Button>
            </div>
          </div>

          {/* Prescription List */}
          <div className="space-y-4">
            {prescriptions.map((item) => {
              // Parse the nested prescription string
              const drugDetails = JSON.parse(JSON.parse(item.prescription));
              const drugCount = drugDetails.length;

              return (
                <Card key={item.id} className="group border-slate-200 dark:border-zinc-800 hover:shadow-md transition-all rounded-2xl overflow-hidden">
                  <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-1 flex-col md:flex-row items-start md:items-center gap-6 w-full">
                      <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <User className="size-8" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 w-full">
                        <InfoUnit label="Patient Name" value={item.patient_name} isHighlight />
                        <InfoUnit label="Patient ID" value={`#PT-${item.patient_id}`} />
                        <InfoUnit label="Prescription ID" value={`#RX-${item.id}`} />
                        <InfoUnit label="Items" value={`${drugCount} Medicine(s)`} />
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-zinc-800">
                      <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center justify-end gap-1">
                          <Clock className="size-3" /> Created On
                        </p>
                        <p className="text-sm font-black text-primary tracking-tight">
                          {new Date(item.created_on).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <Button className="min-w-[150px] rounded-xl font-bold gap-2 h-10 shadow-sm" onClick={() => handleViewDetails(item)}>
                        View Details <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {!loading && prescriptions.length === 0 && (
              <div className="text-center py-20 text-muted-foreground font-bold">
                No active prescriptions found.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Internal Helpers
function InfoUnit({ label, value, isHighlight = false }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</p>
      <p className={`tracking-tight ${isHighlight ? 'text-lg font-black text-slate-900 dark:text-white capitalize' : 'text-sm font-bold text-muted-foreground'}`}>
        {value}
      </p>
    </div>
  );
}