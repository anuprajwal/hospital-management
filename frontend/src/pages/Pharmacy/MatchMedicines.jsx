import React from 'react';
import { 
  ArrowLeft, 
  User, 
  FileText, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Pill, 
  Stethoscope, 
  LayoutGrid, 
  Receipt,
  PauseCircle,
  PackageCheck
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export default function PharmacyDispensing() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Top Navigation & Header */}
        <header className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-primary font-bold gap-2 hover:bg-primary/5 p-0">
              <ArrowLeft className="size-4" />
              Back to Queue
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-black px-3 py-1 uppercase text-[10px] tracking-widest">
                Waiting for Dispense
              </Badge>
              <Avatar className="h-10 w-10 border-2 border-slate-200 dark:border-zinc-800">
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9EOQk4dIMcdlOQO9aQVQpPXjTN3Mc5I0p5fMoXSCLFD49M1CCFZIhTZLH-PGmaTkiHjunEMGDnc8Bcq880F3uUeo0sHoltkjAXYVPWUN6IHrq_hygli65GfYp_n0p8qZ2x1KXrDLZghVAzMhlgYF9zvBDCi_6Nhz3xEvDL1IR6TiyM_Cy--9e4GiTB3_kuQFWs11ARG1eQ0iKIxLxOBFK53khPeVfFa5MkXOjhm3SCgkcViVZVKLOdos54oubI_Ca8rRY-wRShPs" />
                <AvatarFallback>PH</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b">
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Prescription PR-9034</h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground font-medium text-sm">
                <span className="flex items-center gap-1.5"><User className="size-4 text-primary" /> John Doe</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Patient ID: P-10293</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="font-bold border-slate-300 dark:border-zinc-700 gap-2">
                <PauseCircle className="size-4" /> Hold Order
              </Button>
              <Button className="font-black px-8 shadow-lg shadow-primary/20 gap-2">
                <PackageCheck className="size-4" /> Process All
              </Button>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Prescription Overview */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-black flex items-center gap-2">
                  <FileText className="size-5 text-primary" />
                  Prescription Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <InfoUnit label="Doctor" value="Dr. Sarah Smith" />
                  <InfoUnit label="Date" value="Oct 24, 2023" />
                </div>
                <InfoUnit label="Diagnosis" value="Acute Fever & Viral Symptoms" />
                <div className="p-4 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Doctor's Notes</p>
                  <p className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    "Take after meals. Drink plenty of water. Monitor temperature every 6 hours."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/[0.03] dark:bg-primary/[0.07] border-primary/20 border-dashed">
              <CardContent className="p-6">
                <h3 className="font-black text-primary mb-2 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <Info className="size-4" />
                  System Alert
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  Inventory levels for <strong>Paracetamol 500mg</strong> are fluctuating. Please verify physical stock before final confirmation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Medicine Matching & Billing */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <LayoutGrid className="size-6 text-primary" />
                Medicine Matching Panel
              </h2>
            </div>

            {/* Matching Cards */}
            <div className="space-y-6">
              {/* Case 1: Match Found */}
              <MatchingCard 
                name="Paracetamol 500mg"
                dosage="1-0-1 (Twice daily)"
                duration="5 Days"
                total="10 Units"
                stock={450}
                status="Match Found"
                variant="success"
              />

              {/* Case 2: Insufficient Stock */}
              <MatchingCard 
                name="Amoxicillin 250mg"
                dosage="1-1-1 (Thrice daily)"
                duration="7 Days"
                total="21 Units"
                stock={8}
                status="Insufficient Stock"
                variant="warning"
              />
            </div>

            {/* Billing Summary Section */}
            <Card className="border-slate-200 dark:border-zinc-800 shadow-xl overflow-hidden mt-4">
              <CardHeader className="bg-white dark:bg-zinc-900 border-b">
                <CardTitle className="text-lg font-black tracking-tight">Billing Summary</CardTitle>
              </CardHeader>
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-zinc-900/50">
                  <TableRow>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest px-6">Medicine</TableHead>
                    <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Qty</TableHead>
                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest">Price/Unit</TableHead>
                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest px-6">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="px-6 py-4 font-bold">Paracetamol 500mg</TableCell>
                    <TableCell className="text-center font-medium">10</TableCell>
                    <TableCell className="text-right text-muted-foreground font-medium">$0.50</TableCell>
                    <TableCell className="text-right px-6 font-bold">$5.00</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="px-6 py-4 font-bold">Amoxicillin 250mg <Badge variant="outline" className="ml-2 text-[8px] h-4 uppercase">Partial</Badge></TableCell>
                    <TableCell className="text-center font-medium">8</TableCell>
                    <TableCell className="text-right text-muted-foreground font-medium">$1.25</TableCell>
                    <TableCell className="text-right px-6 font-bold">$10.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="p-8 bg-slate-50 dark:bg-zinc-900/50 border-t">
                <div className="flex flex-col gap-3 max-w-xs ml-auto">
                  <SummaryRow label="Subtotal" value="$15.00" />
                  <SummaryRow label="Tax (5%)" value="$0.75" />
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-black tracking-tight">Grand Total</span>
                    <span className="text-2xl font-black tracking-tighter text-primary">$15.75</span>
                  </div>
                  <Button className="w-full h-12 font-black shadow-lg shadow-primary/30 rounded-xl gap-2 text-base">
                    <Receipt className="size-5" /> Generate Receipt
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>

        <footer className="mt-16 py-8 border-t text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
            © 2026 HMS - Laboratory Information System v4.2
          </p>
        </footer>
      </div>
    </div>
  );
}

// Internal Helper Components
function InfoUnit({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm font-medium">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-slate-900 dark:text-slate-100 font-bold">{value}</span>
    </div>
  );
}

function MatchingCard({ name, dosage, duration, total, stock, status, variant }) {
  const isSuccess = variant === 'success';
  return (
    <Card className="overflow-hidden border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row h-full">
      <div className="flex-1 p-6 border-b md:border-b-0 md:border-r bg-white dark:bg-zinc-900">
        <div className="flex justify-between items-start mb-6">
          <Badge variant="outline" className="text-[10px] font-black uppercase border-slate-200">Prescribed</Badge>
          <Pill className="size-5 text-slate-300" />
        </div>
        <h3 className="text-xl font-black tracking-tight mb-4">{name}</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-muted-foreground uppercase tracking-tighter">Dosage</span>
            <span>{dosage}</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-muted-foreground uppercase tracking-tighter">Duration</span>
            <span>{duration}</span>
          </div>
          <Separator className="opacity-50" />
          <div className="flex justify-between items-center pt-1">
            <span className="text-sm font-black uppercase">Total Required</span>
            <span className="text-lg font-black text-primary tracking-tighter">{total}</span>
          </div>
        </div>
      </div>
      
      <div className={`flex-1 p-6 ${isSuccess ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : 'bg-amber-50/50 dark:bg-amber-950/20'}`}>
        <div className="flex justify-between items-start mb-6">
          <Badge className={`font-black uppercase text-[10px] tracking-tight border-none ${
            isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {status}
          </Badge>
          {isSuccess ? <CheckCircle2 className="size-5 text-emerald-500" /> : <AlertTriangle className="size-5 text-amber-500" />}
        </div>
        
        <div className="flex items-baseline gap-2 mb-8">
          <span className={`text-4xl font-black tracking-tighter ${stock < 10 ? 'text-destructive' : ''}`}>{stock}</span>
          <span className="text-xs font-bold text-muted-foreground uppercase">In Stock</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button size="sm" className={`font-bold h-10 ${isSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary'}`}>
            {isSuccess ? 'Accept' : 'Partial Accept'}
          </Button>
          <Button size="sm" variant="outline" className="font-bold h-10 border-slate-300 bg-white dark:bg-zinc-800">
            Decline
          </Button>
        </div>
      </div>
    </Card>
  );
}