// import React, {useEffect} from 'react';
// import { 
//   Plus, 
//   Search, 
//   Filter, 
//   ArrowUpDown, 
//   Edit3, 
//   AlertTriangle, 
//   Calendar, 
//   Package, 
//   TrendingUp, 
//   ShoppingCart,
//   ChevronDown,
//   Pill,
//   ShieldCheck
// } from 'lucide-react';

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import DynamicNavbar from "@/components/DynamicNavbar";
// import TopHeader from "@/components/Top-Header";
// import { getDrugs, deleteDrug } from './apis';
// import { useNavigate } from 'react-router-dom';

// const inventory = [
//   {
//     id: 1,
//     name: "Paracetamol 500mg",
//     status: "In Stock",
//     category: "Tablet",
//     batch: "B-2032",
//     expiry: "10/2027",
//     units: 450,
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYbVLZW5nma2wsFO9xr83OaEztshowX1R1myLPyKhxH6QangyfgrN_NIUb1Ozm3sAcC6OFdmp60FTxaDvIxfB_DfO_H6P1wxpN_KpRTuj5nek5AhSsVaumId4VaUQyDye3-M0DCqyfHTwmWBkGiI5JDxbKTJscAjgdgQ724lRtjlGe1rRcKDI8MH8THha_2jnVlqekfMAOJY3el-N6k9DHDuoZmiFRkuoruWwUqpXk65xf4_e_gFlsPHmugwcvHx78NgpGCEIrdRs"
//   },
//   {
//     id: 2,
//     name: "Amoxicillin 250mg",
//     status: "Expiring Soon",
//     category: "Capsule",
//     batch: "A-9921",
//     expiry: "02/2024",
//     units: 1200,
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDiPZicKweV9GvnLtyICAqOXUBswYw67Z5tzjyk3HzhxNTHcTx-7y84RhZaIBtE-rBO7SgSItohIkNjFcGhErbcywtGZuJ21MdYDWz0mM3JRFIuWT4l4jfU0Cu4A7rK1JS7jJKAADnG_VckArPrmxdCW8mX3b4SApBZdwSI0CO_NEGtbGinPkLlb-TqJRWOy1dpeqswzLRwgofpm-ETSZZjFdzPu-yHJlyw7HULeOEP-JABXC0Omj0Qwz9eO0FGjBTu8xecx4KmdY"
//   },
//   {
//     id: 3,
//     name: "Ibuprofen Syrup",
//     status: "Low Stock",
//     category: "Syrup",
//     batch: "S-4055",
//     expiry: "08/2026",
//     units: 15,
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBax7G42TLyd-G4_v_KcLEXrAwxieFmRMzm97o9_DsNWOxpVA89BJhzurJwEklEl_KRnqCGgyNs6uVI0embSvV0aOSkqtRDSrDidMyqwVs_fEi8hSabrhBPSGytj1_d2yeCLCBqnJEgwHvG-qPgZIXd3YhtcCAhCLgZndVF_Bt8qa6nOcWCdCFhMzX1l0hQ9DoTp3LVy2h0lbzZkRGn1M_BvoHH3Ms4Z_OjkMTgzDrBgH2OxGXuS-YuFB7biiiGSh4u_ze8ORBmMd8"
//   }
// ];

// export default function PharmacyInventory() {

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const data = await getDrugs();
//         console.log("Inventory Data:", data);
//       } catch (err) {
//         console.error("Fetch Inventory Error:", err);
//       }
//     };
//     fetchInventory();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this medicine?")) {
//       try {
//         await deleteDrug(id);
//         alert("Deleted successfully");
//         // Typically you'd refresh state here
//       } catch (err) {
//         alert("Delete failed: " + err.message);
//       }
//     }
//   };


//   return (
//     <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
//       <TopHeader />
      
//       <div className="flex flex-1">
//         <DynamicNavbar />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header Section */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-black tracking-tight">Inventory Management</h2>
//           <p className="text-muted-foreground mt-1 font-medium">Manage stock levels and dispense medications for completed prescriptions.</p>
//         </div>

//         {/* Search & Quick Actions */}
//         <div className="mb-8 flex flex-col md:flex-row gap-4">
//           <div className="relative flex-1 group">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-primary transition-colors" />
//             <Input 
//               placeholder="Search medicine by name, category or batch..." 
//               className="w-full pl-12 h-12 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm focus-visible:ring-primary/40 text-base"
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" className="h-12 px-6 rounded-2xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 font-bold gap-2">
//               <Filter className="size-4 text-primary" /> Filter
//             </Button>
//             <Button variant="outline" className="h-12 px-6 rounded-2xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 font-bold gap-2">
//               <ArrowUpDown className="size-4 text-primary" /> Sort
//             </Button>
//           </div>
//         </div>

//         {/* Inventory List Container */}
//         <div className="space-y-4">
//           {inventory.map((item) => (
//             <MedicineCard key={item.id} item={item} onDelete={() => handleDelete(item.id)}
//             onEdit={() => navigate('/add-medicine', { state: { editData: item } })} />
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-12 flex justify-center">
//           <Button variant="outline" className="px-10 h-12 rounded-2xl bg-white dark:bg-zinc-900 font-bold text-primary border-primary/20 hover:bg-primary/5 gap-2 shadow-sm">
//             Load More Records <ChevronDown className="size-4" />
//           </Button>
//         </div>
//       </main>

//     </div>
//     </div>
//   );
// }

// // Sub-components
// function MedicineCard({ item, onDelete, onEdit }) {
//   const isLowStock = item.status === "Low Stock";
//   const isExpiring = item.status === "Expiring Soon";

//   return (
//     <Card className={`group overflow-hidden transition-all hover:shadow-md border-slate-200 dark:border-zinc-800 ${isLowStock ? 'border-2 border-destructive/50' : ''}`}>
//       <CardContent className="p-4 flex flex-col md:flex-row items-center gap-6">
//         <div 
//           className="h-28 w-full md:w-40 bg-slate-100 dark:bg-zinc-800 rounded-xl flex-shrink-0 bg-cover bg-center border border-slate-100 dark:border-zinc-700 shadow-inner"
//           style={{ backgroundImage: `url('${item.image}')` }}
//         />
        
//         <div className="flex-1 w-full space-y-4">
//           <div className="flex flex-wrap items-center gap-3">
//             <h3 className="text-xl font-black tracking-tight">{item.name}</h3>
//             <StatusBadge status={item.status} />
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             <DataPoint label="Category" value={item.category} />
//             <DataPoint label="Batch No." value={item.batch} />
//             <DataPoint label="Expiry" value={item.expiry} isUrgent={isExpiring} />
//             <div className="space-y-1">
//               <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">Available</span>
//               <span className={`text-lg font-black tracking-tighter ${isLowStock ? 'text-destructive' : 'text-primary'}`}>
//                 {item.units.toLocaleString()} Units
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-2 w-full md:w-auto">
//           {isLowStock && (
//             <Button className="flex-1 md:flex-none rounded-xl font-bold h-11 px-6 gap-2 shadow-lg shadow-primary/20">
//               <ShoppingCart className="size-4" /> Refill
//             </Button>
//           )}
//           <Button variant="secondary" onClick={onEdit} className="flex-1 md:flex-none rounded-xl font-bold h-11 px-6 gap-2">
//             <Edit3 className="size-4" /> Edit
//           </Button>
//           <Button variant="destructive" onClick={onDelete} className="flex-1 md:flex-none rounded-xl font-bold h-11 px-6 gap-2">
//             Delete
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function StatusBadge({ status }) {
//   const styles = {
//     "In Stock": "bg-green-100 text-green-700 dark:bg-emerald-900/30 dark:text-emerald-400",
//     "Expiring Soon": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse",
//     "Low Stock": "bg-destructive text-destructive-foreground",
//   };
//   return (
//     <Badge className={`${styles[status]} border-none font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5`}>
//       {status}
//     </Badge>
//   );
// }

// function DataPoint({ label, value, isUrgent }) {
//   return (
//     <div className="space-y-1">
//       <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">{label}</span>
//       <span className={`text-sm font-bold ${isUrgent ? 'text-destructive underline decoration-2' : ''}`}>{value}</span>
//     </div>
//   );
// }

// function StatsCard({ label, value, trend }) {
//   return (
//     <Card className="p-5 shadow-2xl border-slate-200 dark:border-zinc-800 w-72 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
//         <Badge variant="outline" className="text-[10px] font-black text-green-500 border-green-500/20 bg-green-500/5 px-1.5 h-5">
//           {trend}
//         </Badge>
//       </div>
//       <div className="text-2xl font-black tracking-tighter">{value}</div>
//     </Card>
//   );
// }


import React, { useEffect, useState } from 'react';
import { 
  Plus, Search, Filter, ArrowUpDown, Edit3, ShoppingCart, ChevronDown 
} from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";
import { getDrugs, deleteDrug } from './apis';
import { useNavigate } from 'react-router-dom';

export default function PharmacyInventory() {
  const navigate = useNavigate();
  // 1. Initialize state for API data
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await getDrugs();
      // 2. Map to the "data" key from your JSON structure
      setMedicines(response.data || []);
      console.log("Inventory Data Loaded:", response.data);
    } catch (err) {
      console.error("Fetch Inventory Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await deleteDrug(id);
        alert("Deleted successfully");
        fetchInventory(); // Refresh list after deletion
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
      <TopHeader />
      
      <div className="flex flex-1">
        <DynamicNavbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Inventory Management</h2>
              <p className="text-muted-foreground mt-1 font-medium text-sm">
                {loading ? "Updating stock..." : `Showing ${medicines.length} medications in stock.`}
              </p>
            </div>
            <Button onClick={() => navigate('/add-medicine')} className="rounded-xl font-bold gap-2 h-11 px-6 shadow-lg shadow-primary/20">
              <Plus className="size-4" /> Add Medicine
            </Button>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <Input 
                placeholder="Search inventory..." 
                className="w-full pl-12 h-12 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-2xl"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold gap-2 bg-white dark:bg-zinc-900">
                <Filter className="size-4" /> Filter
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-20 font-bold text-muted-foreground">Loading Inventory...</div>
            ) : medicines.length > 0 ? (
              medicines.map((item) => (
                <MedicineCard 
                  key={item.id} 
                  item={item} 
                  onDelete={() => handleDelete(item.id)}
                  onEdit={() => navigate('/add-medicine', { state: { editData: item } })} 
                />
              ))
            ) : (
              <div className="text-center py-20 font-bold text-muted-foreground border-2 border-dashed rounded-3xl">
                No medicines found in inventory.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function MedicineCard({ item, onDelete, onEdit }) {
  // 3. Dynamic logic based on API data
  const isLowStock = item.quantity < 20;
  const status = isLowStock ? "Low Stock" : "In Stock";

  return (
    <Card className={`group overflow-hidden transition-all hover:shadow-md border-slate-200 dark:border-zinc-800 ${isLowStock ? 'border-l-4 border-l-destructive' : ''}`}>
      <CardContent className="p-5 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 w-full space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-black tracking-tight capitalize">{item.name}</h3>
            <StatusBadge status={status} />
            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">
              {item.drug_form}
            </Badge>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <DataPoint label="Manufacturer" value={item.manufacturer_name} />
            <DataPoint label="Batch No." value={item.meta_data?.batch_number || "N/A"} />
            <DataPoint label="Expiry Date" value={item.expiry_date} />
            <div className="space-y-1">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">Available Stock</span>
              <span className={`text-lg font-black tracking-tighter ${isLowStock ? 'text-destructive' : 'text-primary'}`}>
                {item.quantity.toLocaleString()} Units
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
          <div className="flex flex-col items-end mr-4 hidden lg:flex">
             <span className="text-[10px] font-black text-muted-foreground uppercase">Selling Price</span>
             <span className="text-lg font-black text-slate-900 dark:text-white">${item.selling_price}</span>
          </div>
          <Button variant="secondary" onClick={onEdit} className="flex-1 md:flex-none rounded-xl font-bold h-11 px-6 gap-2">
            <Edit3 className="size-4" /> Edit
          </Button>
          <Button variant="destructive" onClick={onDelete} className="flex-1 md:flex-none rounded-xl font-bold h-11 px-6 gap-2">
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "In Stock": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "Low Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <Badge className={`${styles[status]} border-none font-black text-[10px] uppercase px-2.5 py-0.5`}>
      {status}
    </Badge>
  );
}

function DataPoint({ label, value }) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">{label}</span>
      <span className="text-sm font-bold text-slate-700 dark:text-zinc-300">{value}</span>
    </div>
  );
}