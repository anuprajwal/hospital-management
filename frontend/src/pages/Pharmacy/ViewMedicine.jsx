import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Edit3, 
  AlertTriangle, 
  Calendar, 
  Package, 
  TrendingUp, 
  ShoppingCart,
  ChevronDown,
  Pill,
  ShieldCheck
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const inventory = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    status: "In Stock",
    category: "Tablet",
    batch: "B-2032",
    expiry: "10/2027",
    units: 450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYbVLZW5nma2wsFO9xr83OaEztshowX1R1myLPyKhxH6QangyfgrN_NIUb1Ozm3sAcC6OFdmp60FTxaDvIxfB_DfO_H6P1wxpN_KpRTuj5nek5AhSsVaumId4VaUQyDye3-M0DCqyfHTwmWBkGiI5JDxbKTJscAjgdgQ724lRtjlGe1rRcKDI8MH8THha_2jnVlqekfMAOJY3el-N6k9DHDuoZmiFRkuoruWwUqpXk65xf4_e_gFlsPHmugwcvHx78NgpGCEIrdRs"
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    status: "Expiring Soon",
    category: "Capsule",
    batch: "A-9921",
    expiry: "02/2024",
    units: 1200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDiPZicKweV9GvnLtyICAqOXUBswYw67Z5tzjyk3HzhxNTHcTx-7y84RhZaIBtE-rBO7SgSItohIkNjFcGhErbcywtGZuJ21MdYDWz0mM3JRFIuWT4l4jfU0Cu4A7rK1JS7jJKAADnG_VckArPrmxdCW8mX3b4SApBZdwSI0CO_NEGtbGinPkLlb-TqJRWOy1dpeqswzLRwgofpm-ETSZZjFdzPu-yHJlyw7HULeOEP-JABXC0Omj0Qwz9eO0FGjBTu8xecx4KmdY"
  },
  {
    id: 3,
    name: "Ibuprofen Syrup",
    status: "Low Stock",
    category: "Syrup",
    batch: "S-4055",
    expiry: "08/2026",
    units: 15,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBax7G42TLyd-G4_v_KcLEXrAwxieFmRMzm97o9_DsNWOxpVA89BJhzurJwEklEl_KRnqCGgyNs6uVI0embSvV0aOSkqtRDSrDidMyqwVs_fEi8hSabrhBPSGytj1_d2yeCLCBqnJEgwHvG-qPgZIXd3YhtcCAhCLgZndVF_Bt8qa6nOcWCdCFhMzX1l0hQ9DoTp3LVy2h0lbzZkRGn1M_BvoHH3Ms4Z_OjkMTgzDrBgH2OxGXuS-YuFB7biiiGSh4u_ze8ORBmMd8"
  }
];

export default function PharmacyInventory() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
                <Pill className="size-5" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none">Pharmacy Panel</h1>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Hospital System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button className="hidden sm:flex rounded-xl font-bold gap-2">
                <Plus className="size-4" /> Add Medicine
              </Button>
              <Avatar className="h-10 w-10 border-2 border-slate-200 dark:border-zinc-800">
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa2YleGqBtPTir8MgvX3sTgx5k_jSvEFaF8wUKhfeShU0wTMflCeCLzIVvG3cOp9_URn4TGK8Zw3RMzOxdXahyBaU2tK9-MNabwAa1YEA0l9niR36dvwdM4PGETYpV-nc3ivU2jlM2MerMw5YDKaDRrJZrBhM1lxDHwd7Sj_lU8GRAqtytifTsHodX-6tfCkIhYhyTWSJxfTknnsKQcCPitaHevG-r_ezXgyu20N737yWv9EMhmriyyL6_TizB1m6Dwouo5jT7yQo" />
                <AvatarFallback>PH</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground mt-1 font-medium">Manage stock levels and dispense medications for completed prescriptions.</p>
        </div>

        {/* Search & Quick Actions */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search medicine by name, category or batch..." 
              className="w-full pl-12 h-12 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm focus-visible:ring-primary/40 text-base"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-2xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 font-bold gap-2">
              <Filter className="size-4 text-primary" /> Filter
            </Button>
            <Button variant="outline" className="h-12 px-6 rounded-2xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 font-bold gap-2">
              <ArrowUpDown className="size-4 text-primary" /> Sort
            </Button>
          </div>
        </div>

        {/* Inventory List Container */}
        <div className="space-y-4">
          {inventory.map((item) => (
            <MedicineCard key={item.id} item={item} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="px-10 h-12 rounded-2xl bg-white dark:bg-zinc-900 font-bold text-primary border-primary/20 hover:bg-primary/5 gap-2 shadow-sm">
            Load More Records <ChevronDown className="size-4" />
          </Button>
        </div>
      </main>

      {/* Footer Stats Overlay */}
      <div className="fixed bottom-6 right-6 hidden lg:flex flex-col gap-4 z-50">
        <StatsCard label="Inventory Value" value="$124,500.00" trend="+12%" />
        <Card className="p-4 shadow-2xl border-slate-200 dark:border-zinc-800 w-72 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Low Stock Alerts</span>
            <Badge className="bg-destructive text-white font-black rounded-sm h-5 px-1.5">8</Badge>
          </div>
          <div className="flex -space-x-3">
            {[1, 2].map((i) => (
              <Avatar key={i} className="size-10 border-4 border-white dark:border-zinc-900 shadow-sm">
                <AvatarFallback className="bg-red-100 text-red-500">
                  <AlertTriangle className="size-4" />
                </AvatarFallback>
              </Avatar>
            ))}
            <div className="size-10 rounded-full border-4 border-white dark:border-zinc-900 bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-black text-slate-500 shadow-sm">
              +6
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Sub-components
function MedicineCard({ item }) {
  const isLowStock = item.status === "Low Stock";
  const isExpiring = item.status === "Expiring Soon";

  return (
    <Card className={`group overflow-hidden transition-all hover:shadow-md border-slate-200 dark:border-zinc-800 ${isLowStock ? 'border-2 border-destructive/50' : ''}`}>
      <CardContent className="p-4 flex flex-col md:flex-row items-center gap-6">
        <div 
          className="h-28 w-full md:w-40 bg-slate-100 dark:bg-zinc-800 rounded-xl flex-shrink-0 bg-cover bg-center border border-slate-100 dark:border-zinc-700 shadow-inner"
          style={{ backgroundImage: `url('${item.image}')` }}
        />
        
        <div className="flex-1 w-full space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-black tracking-tight">{item.name}</h3>
            <StatusBadge status={item.status} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <DataPoint label="Category" value={item.category} />
            <DataPoint label="Batch No." value={item.batch} />
            <DataPoint label="Expiry" value={item.expiry} isUrgent={isExpiring} />
            <div className="space-y-1">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">Available</span>
              <span className={`text-lg font-black tracking-tighter ${isLowStock ? 'text-destructive' : 'text-primary'}`}>
                {item.units.toLocaleString()} Units
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {isLowStock && (
            <Button className="flex-1 md:flex-none rounded-xl font-bold h-11 px-6 gap-2 shadow-lg shadow-primary/20">
              <ShoppingCart className="size-4" /> Refill
            </Button>
          )}
          <Button variant="secondary" className="flex-1 md:flex-none rounded-xl font-bold h-11 px-6 gap-2">
            <Edit3 className="size-4" /> Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "In Stock": "bg-green-100 text-green-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "Expiring Soon": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse",
    "Low Stock": "bg-destructive text-destructive-foreground",
  };
  return (
    <Badge className={`${styles[status]} border-none font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5`}>
      {status}
    </Badge>
  );
}

function DataPoint({ label, value, isUrgent }) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">{label}</span>
      <span className={`text-sm font-bold ${isUrgent ? 'text-destructive underline decoration-2' : ''}`}>{value}</span>
    </div>
  );
}

function StatsCard({ label, value, trend }) {
  return (
    <Card className="p-5 shadow-2xl border-slate-200 dark:border-zinc-800 w-72 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
        <Badge variant="outline" className="text-[10px] font-black text-green-500 border-green-500/20 bg-green-500/5 px-1.5 h-5">
          {trend}
        </Badge>
      </div>
      <div className="text-2xl font-black tracking-tighter">{value}</div>
    </Card>
  );
}