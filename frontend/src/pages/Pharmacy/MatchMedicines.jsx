// import React, { useState, useEffect, useCallback } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Search, Trash2, CheckCircle2, AlertTriangle, PackageCheck, Receipt, X, Pill, ArrowRight, RefreshCw
// } from 'lucide-react';
// import { searchDrugByName, getDrugs as searchDrugs } from './apis';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import TopHeader from "@/components/Top-Header";
// import DynamicNavbar from "@/components/DynamicNavbar";

// export default function PharmacyDispensing() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { medicines, patientName, prescriptionId } = location.state || { medicines: [] };

//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const performAutoMatch = useCallback(async () => {
//     setLoading(true);
//     const results = await Promise.all(medicines.map(async (pres) => {
//       const inv = await searchDrugByName(pres.name);
//       const reqQty = parseInt(pres.duration || 1) * 2; 
//       return {
//         ...pres,
//         inventoryItem: inv,
//         isAccepted: !!(inv && inv.quantity >= reqQty),
//         status: inv ? (inv.quantity >= reqQty ? "Exact Match" : "Low Stock") : "No Match",
//         manualSearch: false,
//         isRejected: false // Track if the match was manually rejected
//       };
//     }));
//     setMatches(results);
//     setLoading(false);
//   }, [medicines]);

//   useEffect(() => { if (medicines.length > 0) performAutoMatch(); }, [performAutoMatch]);

//   const handleManualSelect = (index, selectedItem) => {
//     const updated = [...matches];
//     updated[index] = {
//       ...updated[index],
//       inventoryItem: selectedItem,
//       status: "Manually Substituted",
//       isAccepted: true,
//       manualSearch: false,
//       isRejected: false 
//     };
//     setMatches(updated);
//   };

//   const handleReject = (index) => {
//     const updated = [...matches];
//     updated[index].isAccepted = false;
//     updated[index].isRejected = true;
//     updated[index].inventoryItem = null;
//     updated[index].status = "Rejected";
//     updated[index].manualSearch = true; // Automatically open search on reject
//     setMatches(updated);
//   };

//   const handleCheckout = () => {
//     const acceptedItems = matches.filter(m => m.isAccepted);
//     navigate('/pharmacy-receipt', { 
//       state: { acceptedItems, patientName, prescriptionId } 
//     });
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
//       <TopHeader />
//       <div className="flex flex-1">
//         <DynamicNavbar />
//         <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
//           <div className="flex justify-between items-center mb-10">
//             <div>
//               <h1 className="text-3xl font-black tracking-tight">Dispensing: {patientName}</h1>
//               <p className="text-muted-foreground font-medium">Verify or substitute prescribed medications.</p>
//             </div>
//             <Badge className="px-4 py-1 text-sm font-black">RX-{prescriptionId}</Badge>
//           </div>

//           <div className="space-y-6">
//             {matches.map((item, idx) => (
//               <div key={idx} className="relative">
//                 <MatchingRow 
//                   item={item} 
//                   onToggleAccept={() => {
//                     const up = [...matches];
//                     up[idx].isAccepted = !up[idx].isAccepted;
//                     setMatches(up);
//                   }}
//                   onReject={() => handleReject(idx)}
//                   onOpenSearch={() => {
//                     const up = [...matches];
//                     up[idx].manualSearch = true;
//                     setMatches(up);
//                   }}
//                 />
                
//                 {item.manualSearch && (
//                   <ManualSearchOverlay 
//                     onClose={() => {
//                       const up = [...matches];
//                       up[idx].manualSearch = false;
//                       setMatches(up);
//                     }}
//                     onSelect={(selected) => handleManualSelect(idx, selected)}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {matches.some(m => m.isAccepted) && (
//             <div className="mt-12 flex justify-end">
//               <Button onClick={handleCheckout} size="lg" className="h-16 px-10 rounded-2xl font-black text-lg gap-3 shadow-2xl shadow-primary/40">
//                 <Receipt size={24} /> Proceed to Receipt
//               </Button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// function MatchingRow({ item, onToggleAccept, onReject, onOpenSearch }) {
//   const { inventoryItem, isAccepted, status, isRejected } = item;
//   const isGoodMatch = status === "Exact Match" || status === "Manually Substituted";

//   return (
//     <Card className={`overflow-hidden border-2 transition-all ${isAccepted ? 'border-primary bg-primary/[0.02]' : isRejected ? 'border-destructive/30 bg-destructive/[0.01]' : 'border-slate-200'}`}>
//       <div className="flex flex-col md:flex-row">
//         {/* Prescribed Medicine Info */}
//         <div className="flex-1 p-6 border-r border-slate-100 dark:border-zinc-800">
//           <div className="flex items-center gap-2 mb-2 text-muted-foreground">
//             <Pill size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">Prescribed</span>
//           </div>
//           <h3 className="text-xl font-black">{item.name}</h3>
//           <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Freq: {item.frequency} | Days: {item.duration}</p>
//         </div>

//         {/* Inventory Matching Actions */}
//         <div className="flex-1 p-6 bg-white dark:bg-zinc-900">
//           {inventoryItem ? (
//             <div className="flex flex-col h-full justify-between">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <Badge variant={isGoodMatch ? "success" : "warning"} className="mb-2 font-black uppercase text-[10px]">
//                     {status}
//                   </Badge>
//                   <p className="font-bold text-slate-900 dark:text-slate-100">{inventoryItem.name}</p>
//                   <p className="text-xs text-muted-foreground font-medium">Available: {inventoryItem.quantity} units</p>
//                 </div>
//                 {/* Reject Option */}
//                 {!isAccepted && (
//                   <Button variant="ghost" size="sm" onClick={onReject} className="text-destructive font-bold text-xs gap-1 hover:bg-destructive/10">
//                     <Trash2 size={14} /> Reject Match
//                   </Button>
//                 )}
//               </div>
              
//               <div className="mt-4 flex gap-2">
//                 <Button onClick={onToggleAccept} className="flex-1 font-black rounded-xl">
//                   {isAccepted ? <CheckCircle2 className="mr-2 size-4" /> : null}
//                   {isAccepted ? "Accepted" : "Accept Medicine"}
//                 </Button>
//                 {isAccepted && (
//                   <Button variant="outline" size="icon" onClick={onReject} className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive/5">
//                     <RefreshCw size={16} />
//                   </Button>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
//               <span className="text-xs font-black text-destructive uppercase tracking-tighter flex items-center gap-1">
//                 <AlertTriangle size={14} /> {isRejected ? "Match Rejected" : "No Match Found"}
//               </span>
//               <Button onClick={onOpenSearch} variant="secondary" size="sm" className="font-black gap-2 w-full rounded-xl">
//                 <Search size={14} /> {isRejected ? "Search Substitute" : "Manual Selection"}
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// }

// // ManualSearchOverlay remains largely the same, ensuring results.data is mapped
// function ManualSearchOverlay({ onClose, onSelect }) {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(async () => {
//       if (query.length > 2) {
//         const data = await searchDrugs(query);
//         setResults(data.data || []);
//       }
//     }, 300);
//     return () => clearTimeout(delayDebounceFn);
//   }, [query]);

//   return (
//     <div className="h-100 absolute inset-0 z-20 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-6 rounded-2xl flex flex-col gap-4 border-2 border-primary shadow-2xl animate-in zoom-in-95">
//       <div className="flex justify-between items-center">
//         <h4 className="font-black text-primary uppercase text-xs tracking-widest">Substitution Search</h4>
//         <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full"><X size={18} /></Button>
//       </div>
//       <div className="relative">
//         <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
//         <Input 
//           autoFocus
//           placeholder="Search inventory for substitute..." 
//           className="pl-12 h-14 rounded-2xl font-bold text-base border-primary/20"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col gap-2 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
//         {results.map((res) => (
//           <button 
//             key={res.id} 
//             onClick={() => onSelect(res)}
//             className="flex justify-between items-center p-4 rounded-2xl hover:bg-primary/10 border border-slate-100 dark:border-zinc-800 transition-all text-left group"
//           >
//             <div>
//               <p className="font-black text-sm group-hover:text-primary transition-colors">{res.name}</p>
//               <div className="flex gap-2 mt-1">
//                 <Badge variant="outline" className="text-[9px] font-bold py-0">{res.drug_form}</Badge>
//                 <span className="text-[10px] text-muted-foreground font-bold">Qty: {res.quantity}</span>
//               </div>
//             </div>
//             <ArrowRight size={18} className="text-slate-300 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
//           </button>
//         ))}
//         {query.length > 2 && results.length === 0 && (
//           <p className="text-center py-10 text-xs font-bold text-muted-foreground">No substitute found in inventory.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Trash2, CheckCircle2, AlertTriangle, Receipt, X, Pill, ArrowRight, RefreshCw, Save
} from 'lucide-react';
import { searchDrugByName, getDrugs as searchDrugs } from './apis';
import { editPrescription } from '@/pages/Doctor/apis'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import TopHeader from "@/components/Top-Header";
import DynamicNavbar from "@/components/DynamicNavbar";

export default function PharmacyDispensing() {
  const location = useLocation();
  const navigate = useNavigate();
  // 1. Extract data from navigation state
  const { medicines, patientName, prescriptionId } = location.state || { medicines: [] };

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Core Function: Auto-Match and State Restoration
  const performAutoMatch = useCallback(async () => {
    setLoading(true);
    const results = await Promise.all(medicines.map(async (pres) => {
      // If status is already "Issued" or "Changed", we use the existing issuedMedicine data
      if (pres.status === "Issued" || pres.status === "Changed") {
        return {
          ...pres,
          inventoryItem: pres.issuedMedicine, // Use the stored record
          isAccepted: true,
          status: pres.status,
          manualSearch: false,
          isRejected: false
        };
      }

      // If status is "Rejected", keep it as is
      if (pres.status === "Rejected") {
        return { ...pres, inventoryItem: null, isAccepted: false, status: "Rejected", manualSearch: false, isRejected: true };
      }

      // Default: Search inventory for a match (Prescripted state)
      const inv = await searchDrugByName(pres.name);
      const reqQty = parseInt(pres.duration || 1) * 2; 
      
      return {
        ...pres,
        inventoryItem: inv,
        isAccepted: !!(inv && inv.quantity >= reqQty),
        status: inv ? (inv.quantity >= reqQty ? "Exact Match" : "Low Stock") : "No Match",
        manualSearch: false,
        isRejected: false
      };
    }));
    setMatches(results);
    setLoading(false);
  }, [medicines]);

  useEffect(() => { if (medicines.length > 0) performAutoMatch(); }, [performAutoMatch]);

  // Handle Acceptance (Sets status to "Issued")
  const handleAccept = (index) => {
    const updated = [...matches];
    const item = updated[index];
    
    item.isAccepted = true;
    item.isRejected = false;
    // Determine if this is the original medicine or a substitution
    item.status = (item.name.toLowerCase() === item.inventoryItem?.name?.toLowerCase()) ? "Issued" : "Changed";
    
    // Attach issuedMedicine data
    item.issuedMedicine = {
      ...item.inventoryItem,
      issued_quantity: parseInt(item.duration || 1) * 2
    };
    
    setMatches(updated);
  };

  // Handle Rejection (Sets status to "Rejected")
  const handleReject = (index) => {
    const updated = [...matches];
    updated[index].isAccepted = false;
    updated[index].isRejected = true;
    updated[index].inventoryItem = null;
    updated[index].status = "Rejected";
    updated[index].issuedMedicine = null;
    updated[index].manualSearch = true; 
    setMatches(updated);
  };

  const handleManualSelect = (index, selectedItem) => {
    const updated = [...matches];
    updated[index] = {
      ...updated[index],
      inventoryItem: selectedItem,
      status: "Changed", // If manual select, it's a change
      isAccepted: true,
      manualSearch: false,
      isRejected: false,
      issuedMedicine: {
        ...selectedItem,
        issued_quantity: parseInt(updated[index].duration || 1) * 2
      }
    };
    setMatches(updated);
  };

  // Sync with Backend
  const saveDispensingState = async () => {
    try {
      // Prepare the payload matching the required record structure
      const updatedPrescription = matches.map(m => ({
        id: m.id || Date.now(),
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        duration: m.duration,
        notes: m.notes,
        status: m.status, // Issued, Rejected, or Changed
        issuedMedicine: m.issuedMedicine || null
      }));

      await editPrescription(prescriptionId, { prescription: JSON.stringify(updatedPrescription) });
      return true;
    } catch (err) {
      console.error("Failed to sync prescription:", err);
      alert("Sync failed. Check connection.");
      return false;
    }
  };

  const handleCheckout = async () => {
    const success = await saveDispensingState();
    if (success) {
      const acceptedItems = matches.filter(m => m.isAccepted);
      navigate('/pharmacy-receipt', { 
        state: { acceptedItems, patientName, prescriptionId } 
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
      <TopHeader />
      <div className="flex flex-1">
        <DynamicNavbar />
        <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Dispensing: {patientName}</h1>
              <p className="text-muted-foreground font-medium italic">Pharmacy Records Sync Active</p>
            </div>
            <Button onClick={saveDispensingState} variant="outline" className="font-bold gap-2">
              <Save size={16} /> Save Progress
            </Button>
          </header>

          <div className="space-y-6">
            {matches.map((item, idx) => (
              <div key={idx} className="relative">
                <MatchingRow 
                  item={item} 
                  onAccept={() => handleAccept(idx)}
                  onReject={() => handleReject(idx)}
                  onOpenSearch={() => {
                    const up = [...matches];
                    up[idx].manualSearch = true;
                    setMatches(up);
                  }}
                />
                
                {item.manualSearch && (
                  <ManualSearchOverlay 
                    onClose={() => {
                      const up = [...matches];
                      up[idx].manualSearch = false;
                      setMatches(up);
                    }}
                    onSelect={(selected) => handleManualSelect(idx, selected)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-end">
             <Button onClick={handleCheckout} size="lg" className="h-16 px-10 rounded-2xl font-black text-lg gap-3 shadow-2xl shadow-primary/40">
                <Receipt size={24} /> Confirm & Receipt
             </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

function MatchingRow({ item, onAccept, onReject, onOpenSearch }) {
  const { inventoryItem, isAccepted, status } = item;
  
  // Dynamic status styling
  const getBadgeColor = () => {
    if (status === "Issued" || status === "Exact Match") return "success";
    if (status === "Changed") return "default"; // Usually blue/primary
    if (status === "Rejected") return "destructive";
    return "warning";
  };

  return (
    <Card className={`overflow-hidden border-2 transition-all ${isAccepted ? 'border-primary' : status === "Rejected" ? 'border-destructive' : 'border-slate-200'}`}>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-6 border-r border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Pill size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">Prescription Item</span>
          </div>
          <h3 className="text-xl font-black">{item.name}</h3>
          <p className="text-xs font-bold text-slate-500 uppercase">Status: {status}</p>
        </div>

        <div className="flex-1 p-6 bg-white dark:bg-zinc-900">
          {inventoryItem ? (
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant={getBadgeColor()} className="mb-2 font-black uppercase text-[10px]">{status}</Badge>
                  <p className="font-bold">{inventoryItem.name}</p>
                  <p className="text-xs text-muted-foreground">Manufacturer: {inventoryItem.manufacturer_name}</p>
                </div>
                {!isAccepted && <Button variant="ghost" size="sm" onClick={onReject} className="text-destructive"><Trash2 size={16} /></Button>}
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={onAccept} className="flex-1 font-black" variant={isAccepted ? "secondary" : "default"}>
                  {isAccepted ? "Re-Issue" : "Issue Medicine"}
                </Button>
                <Button variant="outline" size="icon" onClick={onReject} className="text-destructive"><RefreshCw size={16} /></Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <span className="text-[10px] font-black text-destructive uppercase">Pending Action</span>
              <Button onClick={onOpenSearch} variant="secondary" size="sm" className="w-full font-bold">Substitute / Search</Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function ManualSearchOverlay({ onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        const data = await searchDrugs(query);
        setResults(data.data || []);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="h-100 absolute inset-0 z-20 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-6 rounded-2xl flex flex-col gap-4 border-2 border-primary shadow-2xl animate-in zoom-in-95">
      <div className="flex justify-between items-center">
        <h4 className="font-black text-primary uppercase text-xs tracking-widest">Substitution Search</h4>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full"><X size={18} /></Button>
      </div>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input 
          autoFocus
          placeholder="Search inventory for substitute..." 
          className="pl-12 h-14 rounded-2xl font-bold text-base border-primary/20"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
        {results.map((res) => (
          <button 
            key={res.id} 
            onClick={() => onSelect(res)}
            className="flex justify-between items-center p-4 rounded-2xl hover:bg-primary/10 border border-slate-100 dark:border-zinc-800 transition-all text-left group"
          >
            <div>
              <p className="font-black text-sm group-hover:text-primary transition-colors">{res.name}</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="text-[9px] font-bold py-0">{res.drug_form}</Badge>
                <span className="text-[10px] text-muted-foreground font-bold">Qty: {res.quantity}</span>
              </div>
            </div>
            <ArrowRight size={18} className="text-slate-300 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
          </button>
        ))}
        {query.length > 2 && results.length === 0 && (
          <p className="text-center py-10 text-xs font-bold text-muted-foreground">No substitute found in inventory.</p>
        )}
      </div>
    </div>
  );
}