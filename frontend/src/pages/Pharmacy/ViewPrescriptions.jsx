import React from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  Filter, 
  RefreshCw, 
  User, 
  Clock, 
  ChevronRight, 
  Pill,
  ExternalLink,
  ChevronDown,
  MonitorDot,
  Users2
} from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";

const queueData = [
  { id: 1, name: "Johnathan Doe", ptId: "#PT-8821", rxId: "#RX-5542", doctor: "Dr. Emily Smith", wait: "12 mins" },
  { id: 2, name: "Jane Williams", ptId: "#PT-8845", rxId: "#RX-5560", doctor: "Dr. Mark Johnson", wait: "24 mins" },
  { id: 3, name: "Michael Chen", ptId: "#PT-8901", rxId: "#RX-5588", doctor: "Dr. Sarah Wilson", wait: "5 mins" },
  { id: 4, name: "Robert Brown", ptId: "#PT-9122", rxId: "#RX-5602", doctor: "Dr. David Miller", wait: "31 mins" },
];

export default function PrescriptionQueue() {
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
              Patients waiting for medicine dispensing <Badge variant="outline" className="font-bold">Active</Badge>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl h-11 px-6 font-bold gap-2 bg-white dark:bg-zinc-900 border-slate-200">
              <Filter className="size-4" /> Filter
            </Button>
            <Button className="rounded-xl h-11 px-6 font-black gap-2 shadow-lg shadow-primary/20 transition-all hover:brightness-110">
              <RefreshCw className="size-4" /> Refresh Queue
            </Button>
          </div>
        </div>

        {/* Prescription List */}
        <div className="space-y-4">
          {queueData.map((item) => (
            <Card key={item.id} className="group border-slate-200 dark:border-zinc-800 hover:shadow-md transition-all rounded-2xl overflow-hidden">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-1 flex-col md:flex-row items-start md:items-center gap-6 w-full">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <User className="size-8" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 w-full">
                    <InfoUnit label="Patient Name" value={item.name} isHighlight />
                    <InfoUnit label="Patient ID" value={item.ptId} />
                    <InfoUnit label="Prescription ID" value={item.rxId} />
                    <InfoUnit label="Doctor Name" value={item.doctor} />
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-zinc-800">
                  <div className="text-right space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center justify-end gap-1">
                      <Clock className="size-3" /> Wait Time
                    </p>
                    <p className="text-sm font-black text-primary tracking-tight">{item.wait}</p>
                  </div>
                  <Button className="min-w-[150px] rounded-xl font-bold gap-2 h-10 shadow-sm">
                    View Prescription <ChevronRight className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <Button variant="ghost" className="text-muted-foreground font-bold hover:text-primary gap-2 h-12 rounded-xl">
            Load more patients <ChevronDown className="size-4" />
          </Button>
        </div>
      </main>

      {/* Bottom Stats Bar */}
      <footer className="bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 py-4 px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-8">
            <FooterStat icon={<MonitorDot className="size-4 text-emerald-500" />} label="System Online" />
            <FooterStat icon={<Users2 className="size-4" />} label="12 Active Sessions" />
          </div>
          
          <div className="flex items-center gap-6 text-[10px] uppercase font-black tracking-widest text-muted-foreground">
            <a className="hover:text-primary transition-colors" href="#">Documentation</a>
            <a className="hover:text-primary transition-colors" href="#">Support</a>
            <a className="hover:text-primary transition-colors" href="#">API Status</a>
            <span className="opacity-40">© 2026 PharmacyPanel Inc.</span>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}

// Internal Helpers
function InfoUnit({ label, value, isHighlight = false }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
        {label}
      </p>
      <p className={`tracking-tight ${isHighlight ? 'text-lg font-black text-slate-900 dark:text-white' : 'text-sm font-bold text-muted-foreground'}`}>
        {value}
      </p>
    </div>
  );
}

function FooterStat({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
  );
}