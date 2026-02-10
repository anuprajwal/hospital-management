import React from 'react';
import { 
  Plus, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  Bed, 
  ReceiptText, 
  ScanLine, 
  Info 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TopHeader from "@/components/Top-Header"
import Sidebar from "@/components/Navbar"

const modules = [
  {
    title: "OP (Out-Patient)",
    description: "Manage daily patient appointments, walk-ins, and outpatient consultations.",
    icon: Stethoscope,
    status: "Configured",
    color: "bg-primary",
    active: true,
  },
  {
    title: "LAB (Laboratory)",
    description: "Configure test types, equipment integration, and result report templates.",
    icon: FlaskConical,
    status: "Active",
    color: "bg-indigo-500",
  },
  {
    title: "Pharmacy",
    description: "Real-time inventory control, drug tracking, and prescription fulfillment.",
    icon: Pill,
    status: "Active",
    color: "bg-emerald-500",
  },
  {
    title: "IPD (In-Patient)",
    description: "Ward management, nursing charts, and inpatient admission workflows.",
    icon: Bed,
    status: "Active",
    color: "bg-amber-500",
  },
  {
    title: "Billing",
    description: "Invoice generation, insurance processing, and revenue analytics.",
    icon: ReceiptText,
    status: "Active",
    color: "bg-rose-500",
  },
  {
    title: "Radiology",
    description: "Full DICOM integration, imaging reports, and modality management.",
    icon: ScanLine,
    status: "Active",
    color: "bg-sky-500",
  },
];

const HospitalModules = () => {
  return (
    <div
        class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
        <div class="flex h-screen flex-col">
            <TopHeader/>
            <div class="flex flex-1 overflow-hidden">
                <Sidebar/>
                <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-slate-50/30 dark:bg-transparent">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Hospital Modules
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                        Configure operational departments and system workflows.
                        </p>
                    </div>
                    {/* <Button className="font-bold gap-2 px-5 py-6">
                        <Plus className="w-5 h-5" />
                        Add New Module
                    </Button> */}
                    </div>

                    {/* Module Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module) => (
                        <Card 
                        key={module.title}
                        className={cn(
                            "group transition-all duration-300 border-2",
                            module.active 
                            ? "border-primary shadow-md" 
                            : "hover:border-primary/40 hover:shadow-xl border-slate-100 dark:border-slate-800"
                        )}
                        >
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                            <div className={cn(
                                "w-12 h-12 flex items-center justify-center rounded-xl text-white shadow-lg",
                                module.color,
                                !module.active && "bg-opacity-10 !text-current !shadow-none"
                            )}>
                                <module.icon className={cn("w-6 h-6", !module.active && `text-inherit`)} />
                            </div>
                            {/* <Badge 
                                variant={module.active ? "default" : "secondary"}
                                className="uppercase tracking-widest text-[10px] font-bold"
                            >
                                {module.status}
                            </Badge> */}
                            </div>
                        </CardHeader>
                        
                        <CardContent>
                            <CardTitle className="text-xl font-bold mb-2">{module.title}</CardTitle>
                            <CardDescription className="text-sm leading-relaxed">
                            {module.description}
                            </CardDescription>
                        </CardContent>

                        <CardFooter>
                            <Button 
                            variant={module.active ? "default" : "outline"} 
                            className="w-full font-bold transition-all"
                            >
                            Configure
                            </Button>
                        </CardFooter>
                        </Card>
                    ))}
                    </div>

                    {/* Bottom Info Section */}
                    <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                        <Info className="text-primary w-6 h-6" />
                        </div>
                        <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Need custom modules?</h4>
                        <p className="text-sm text-slate-500">
                            Contact system support to request developer access for specialized department plugins.
                        </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="text-center px-6">
                        <p className="text-2xl font-black text-slate-900 dark:text-white">06</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Modules</p>
                        </div>
                        <div className="text-center px-6 border-l border-slate-200 dark:border-slate-700">
                        <p className="text-2xl font-black text-slate-900 dark:text-white">24</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Users</p>
                        </div>
                    </div>
                    </div>

                </div>
                </main>
            </div>
        </div>
    </div>
  );
};

export default HospitalModules;