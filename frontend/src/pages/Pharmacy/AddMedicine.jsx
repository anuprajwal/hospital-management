import React from 'react';
import { 
  ArrowLeft, 
  Info, 
  Package, 
  Save, 
  ChevronRight, 
  Beaker,
  Stethoscope,
  Bell,
  CircleUser,
  Factory,
  Pill
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function EditMedicinePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-zinc-900 px-6 lg:px-40 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Stethoscope size={20} />
          </div>
          <h2 className="text-lg font-black tracking-tight uppercase">Pharmacy Panel</h2>
        </div>

        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-8">
            <NavLink label="Dashboard" />
            <NavLink label="Inventory" active />
            <NavLink label="Orders" />
            <NavLink label="Reports" />
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-slate-600 dark:text-slate-300">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-slate-600 dark:text-slate-300">
              <CircleUser size={20} />
            </Button>
            <Avatar className="size-10 border-2 border-primary/20 ml-2">
              <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRv74GI6XeJHkQhoTYrCRDb_iqiMIgT9wIyxLzNL0MDh2pX6dvg0wJNvALuVNOPohDoznUkSSTmk7dmMRLujHy2jFXDe3RaE2PZ73Zs5nMDHrVuJnuqP5OypVvatZszrquj2DgfKQEGgHHETQH3wbeHD_7dSWaGSkvCAlvuW-FnjaMOibPvlynptC1Z9z68rp8R-o9i13Ee5Ioc63JY_0JMMtAzY3aRwrBAjfIlJCpq863P-yQ8vogqJZrsQtbE49dWw9x8ZhLQUM" />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 flex justify-center py-8 px-4">
        <div className="w-full max-w-[960px] flex flex-col gap-6">
          
          {/* Breadcrumbs & Header */}
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="font-bold text-muted-foreground">Inventory</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-primary">Add/Edit Medicine</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h1 className="text-3xl font-black tracking-tight">Add/Edit Medicine</h1>
              <Button variant="secondary" className="font-bold gap-2 rounded-xl h-11 px-6 shadow-sm">
                <ArrowLeft size={18} />
                Back to Pharmacy
              </Button>
            </div>
          </div>

          <div className="space-y-8 pb-20">
            {/* Section: Basic Info */}
            <Card className="border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b">
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Info className="size-5 text-primary" />
                  Basic Info
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput label="Medicine Name" placeholder="e.g. Paracetamol 500mg" />
                  <FormSelect 
                    label="Category" 
                    options={["Analgesics", "Antibiotics", "Antivirals", "Cardiovascular"]} 
                  />
                  <FormInput label="Manufacturer" placeholder="e.g. Pfizer, GSK" icon={<Factory className="size-4" />} />
                  <FormSelect 
                    label="Dosage Form" 
                    options={["Tablet", "Capsule", "Syrup", "Injection", "Ointment"]} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section: Stock Info */}
            <Card className="border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b">
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Package className="size-5 text-primary" />
                  Stock Info
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FormInput label="Batch Number" placeholder="BT-2023-001" />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expiry Date</label>
                    <Input type="date" className="rounded-xl h-12 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 font-bold" />
                  </div>
                  <FormInput label="Quantity" type="number" placeholder="0" />
                  <FormInput label="Purchase Price ($)" type="number" step="0.01" placeholder="0.00" />
                  <FormInput label="Selling Price ($)" type="number" step="0.01" placeholder="0.00" />
                  <FormInput label="Low Stock Threshold" type="number" defaultValue="10" />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-10">
              <Button variant="ghost" className="min-w-[120px] h-12 rounded-xl font-bold text-base hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all">
                Cancel
              </Button>
              <Button className="min-w-[180px] h-12 rounded-xl font-black text-base gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                <Save size={20} />
                Save Medicine
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-10 border-t bg-white dark:bg-zinc-900 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">
          © 2026 Pharmacy Panel Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// Helper Components
function NavLink({ label, active = false }) {
  return (
    <a 
      href="#" 
      className={`text-sm font-bold transition-all ${
        active ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-primary'
      }`}
    >
      {label}
    </a>
  );
}

function FormInput({ label, icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <Input 
          className={`rounded-xl h-12 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 focus-visible:ring-primary font-bold ${icon ? 'pl-10' : ''}`} 
          {...props} 
        />
      </div>
    </div>
  );
}

function FormSelect({ label, options }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      <Select>
        <SelectTrigger className="rounded-xl h-12 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 font-bold focus:ring-primary">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}