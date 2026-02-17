import React, { useState } from 'react';
import {
  CloudCheck,
  History,
  Trash2,
  PlusCircle,
  Printer,
  Save,
  Calendar as CalendarIcon,
  ChevronRight,
  Stethoscope,
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function AddPrescription() {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Amoxicillin 500mg", dosage: "1 capsule", frequency: "1-0-1", duration: "7 days", notes: "After meal" },
    { id: 2, name: "", dosage: "", frequency: "", duration: "", notes: "" }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6 py-3 lg:px-20">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-primary">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Stethoscope className="size-5" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">HMS</h2>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <NavButton icon={<LayoutDashboard size={16} />} label="Dashboard" />
              <NavButton icon={<Users size={16} />} label="Patients" />
              <NavButton icon={<CalendarDays size={16} />} label="Appointments" active />
              <NavButton icon={<FileText size={16} />} label="Prescriptions" />
            </nav>
          </div>
          <Avatar className="h-10 w-10 border border-slate-200">
            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKCYq3R56VcAIA3hDKdInBxwIHIui4RA0EqvpFE5YPTJRgIZG3tWS05A_2Xk8LBxMcAXZk6aQv-rf1R-a-y0q9Uby6J8LdhTD_YRY7qm897Ssrflg_4SEiCHO1hIAoUntU1EFUgmX9uyVcu-ZLoMMQ5l_6KVQKwTpIYXaBoo_iVYMXLI0Nf_76vT9Xj_72PbgCSsiyV586D7sI6z52KNyCnTK-1Ly4wufmnWFmgdNRq5dSkjopAlTYJ2raBLjBPB8GA2CXLvirgm8" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 lg:px-10 py-8 pb-32">
        {/* Page Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-4xl font-black tracking-tight">Add Prescription</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CloudCheck className="size-4 text-emerald-500" />
            <p className="text-sm">Draft saved at 10:45 AM</p>
          </div>
        </div>

        {/* Patient Mini Summary Strip */}
        <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 mb-8 overflow-hidden">
          <CardContent className="p-5 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-primary/20">
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2Omd5BL8ZWyJ4Sxks7SU3EkawYxlBs5rXe5_V3VFQNZPepCb46MCOV4d9ta4BKguZ_rhF1NoabllPMl-rCu-yCX5LMu9zFcM3H-0SgIRDsxriulqWvVfB-cq1Zy4HpBZzd32auwajLjiPdBN8cUgyLI_0NAZAP3nalcPXbl0_kWJa7QH_xDP1Ts3ciMX8fQj-VDAo7HBRg3Z9w9EKPjQwUuDRJWapttJ2PGqPjmytZFFXFKBBW2FRri9DThZDR25ymvqb_Y0QgoM" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold">John Doe</p>
                  <Badge variant="secondary" className="font-bold text-[10px]">PID: 4829</Badge>
                </div>
                <p className="text-sm text-muted-foreground font-medium">42 Years • Male • O+ Blood Group</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Appointment Time</p>
                <p className="text-primary font-bold">Today, 10:30 AM</p>
              </div>
              <Button variant="outline" className="gap-2 bg-white dark:bg-zinc-800 font-bold shadow-sm h-11">
                <History className="size-4" /> View History
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-10">
          {/* Section 1 - Diagnosis */}
          <section>
            <SectionTitle number="1" title="Diagnosis" />
            <Card className="shadow-sm border-slate-200 dark:border-zinc-800">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Clinical Diagnosis & Findings</label>
                  <Textarea 
                    placeholder="Enter patient diagnosis, symptoms, and clinical observations..." 
                    className="min-h-[128px] bg-slate-50 dark:bg-zinc-950 focus-visible:ring-primary"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 - Medicines */}
          <section>
            <SectionTitle number="2" title="Medicines" />
            <Card className="shadow-sm border-slate-200 dark:border-zinc-800 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-zinc-900">
                  <TableRow>
                    <TableHead className="w-[30%] font-bold uppercase text-[11px]">Medicine Name</TableHead>
                    <TableHead className="font-bold uppercase text-[11px]">Dosage</TableHead>
                    <TableHead className="font-bold uppercase text-[11px]">Frequency</TableHead>
                    <TableHead className="font-bold uppercase text-[11px]">Duration</TableHead>
                    <TableHead className="font-bold uppercase text-[11px]">Notes</TableHead>
                    <TableHead className="text-center font-bold uppercase text-[11px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicines.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell><Input defaultValue={med.name} placeholder="Medicine name..." className="border-none bg-transparent shadow-none" /></TableCell>
                      <TableCell><Input defaultValue={med.dosage} placeholder="e.g. 1 cap" className="border-none bg-transparent shadow-none w-28" /></TableCell>
                      <TableCell>
                        <Select defaultValue={med.frequency || "1-0-1"}>
                          <SelectTrigger className="border-none bg-transparent shadow-none w-32 focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-0-1">1-0-1</SelectItem>
                            <SelectItem value="1-1-1">1-1-1</SelectItem>
                            <SelectItem value="0-0-1">0-0-1</SelectItem>
                            <SelectItem value="As needed">As needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell><Input defaultValue={med.duration} placeholder="7 days" className="border-none bg-transparent shadow-none w-24" /></TableCell>
                      <TableCell><Input defaultValue={med.notes} placeholder="After meal" className="border-none bg-transparent shadow-none" /></TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-4 bg-slate-50/50 dark:bg-zinc-900/50 border-t">
                <Button variant="ghost" className="text-primary font-bold gap-2 hover:bg-primary/10">
                  <PlusCircle size={18} /> Add Medicine
                </Button>
              </div>
            </Card>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Section 3 - Advice */}
            <section className="lg:col-span-2">
              <SectionTitle number="3" title="Advice" />
              <Card className="h-full shadow-sm border-slate-200 dark:border-zinc-800">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Lifestyle & Dietary Advice</label>
                    <Textarea 
                      placeholder="Enter special instructions, diet plan, or physical activity advice..." 
                      className="min-h-[120px] bg-slate-50 dark:bg-zinc-950"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 4 - Follow Up */}
            <section>
              <SectionTitle number="4" title="Follow Up" />
              <Card className="h-full shadow-sm border-slate-200 dark:border-zinc-800">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Next Scheduled Visit</label>
                    <div className="relative">
                      <Input type="date" className="h-12 bg-slate-50 dark:bg-zinc-950 font-medium" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Recommended after 2 weeks for this diagnosis based on previous clinical patterns.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      {/* Sticky Footer Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-zinc-800 px-6 py-4 lg:px-20 z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Button variant="outline" className="font-bold px-8 h-12">Cancel</Button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex font-bold gap-2 text-muted-foreground h-12 hover:text-slate-900 dark:hover:text-white">
              <Printer size={18} /> Preview & Print
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 h-12 font-bold shadow-lg shadow-primary/25 gap-2">
              <Save size={18} /> Save Prescription
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function SectionTitle({ number, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black shadow-sm shadow-primary/30">
        {number}
      </div>
      <h2 className="text-xl font-bold tracking-tight">Section {number} - {title}</h2>
    </div>
  );
}

function NavButton({ icon, label, active = false }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-2 text-sm font-bold transition-all ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-primary'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}