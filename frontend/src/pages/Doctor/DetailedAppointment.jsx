import React from 'react';
import {
  Search,
  Bell,
  Settings,
  ChevronRight,
  PersonStanding,
  ClipboardList,
  History,
  Pill,
  Activity,
  PlusCircle,
  Microscope,
  CheckCircle2,
  Download,
  Eye,
  Plus,
  Stethoscope
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
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
import { Separator } from "@/components/ui/separator";

const PatientDetailView = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-zinc-900 px-6 lg:px-10 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-primary">
              <div className="size-9 flex items-center justify-center bg-primary/10 rounded-xl">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold tracking-tight">HealthConnect</h2>
            </div>
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search patients..." 
                className="pl-10 bg-slate-100 dark:bg-zinc-800 border-none h-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" className="rounded-lg h-10 w-10">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-lg h-10 w-10">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            <Separator orientation="vertical" className="h-8 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Dr. Sarah Wilson</p>
                <p className="text-xs text-muted-foreground">Cardiologist</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-primary/10">
                <AvatarFallback className="bg-primary/20 text-primary font-bold">SW</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 lg:px-10 py-8 max-w-[1400px] mx-auto w-full">
        {/* Breadcrumb and Status Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-primary font-medium">Doctor Panel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg font-bold">Eleanor Thompson</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Appointment Status:</span>
            <Select defaultValue="consultation">
              <SelectTrigger className="w-56 h-11 font-semibold border-slate-200 dark:border-zinc-800">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="consultation">In Consultation</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Patient Detail View</h1>
          <Badge variant="outline" className="mt-2 font-mono text-muted-foreground">
            Consultation ID: #APP-8829-X
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Patient Summary & History */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Basic Details Card */}
            <Card className="shadow-sm border-slate-200 dark:border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <PersonStanding className="h-5 w-5 text-primary" />
                  Basic Patient Details
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-primary font-semibold">
                  Edit profile
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                  {[
                    { label: "Full Name", value: "Eleanor Thompson" },
                    { label: "Age / Gender", value: "42 Years / Female" },
                    { label: "Phone Number", value: "+1 (555) 0123-456" },
                    { label: "Appointment Time", value: "Oct 24, 2023 | 10:30 AM" },
                    { label: "Speciality", value: "Cardiology", isSpecial: true },
                    { label: "Referred By", value: "Dr. Michael Chen" },
                  ].map((info, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{info.label}</p>
                      <p className={`text-sm font-semibold ${info.isSpecial ? 'text-primary' : ''}`}>
                        {info.value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Clinical Description Section */}
            <Card className="shadow-sm border-slate-200 dark:border-zinc-800">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Clinical Observations & Chief Complaint
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Textarea 
                  placeholder="Describe patient's symptoms..." 
                  className="min-h-[160px] bg-slate-50 dark:bg-zinc-950 resize-none leading-relaxed"
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="px-3 py-1 font-medium">Chest Pain</Badge>
                  <Badge variant="secondary" className="px-3 py-1 font-medium">Shortness of Breath</Badge>
                  <Button variant="outline" size="sm" className="rounded-full border-dashed h-7 px-3 text-xs">
                    <Plus className="h-3 w-3 mr-1" /> Add tag
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* History Section */}
            <Card className="shadow-sm border-slate-200 dark:border-zinc-800">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  History: Previous Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                  <PrescriptionRow 
                    title="Annual Wellness Checkup" 
                    date="Aug 12, 2023" 
                    doctor="Dr. Sarah Wilson" 
                    icon={<Pill className="h-5 w-5" />}
                    color="primary"
                  />
                  <PrescriptionRow 
                    title="Cardiac Stress Test Results" 
                    date="Jan 15, 2023" 
                    doctor="Cardiology Lab" 
                    icon={<Activity className="h-5 w-5" />}
                    color="orange"
                  />
                </div>
              </CardContent>
              <Button variant="ghost" className="w-full py-6 rounded-none text-primary font-bold hover:bg-primary/5 border-t">
                View All Past Records
              </Button>
            </Card>
          </div>

          {/* Right Column: Consultation Actions & Vitals */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="sticky top-28 space-y-6">
              
              {/* Consultation Actions */}
              <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-md">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <div className="size-2 bg-primary rounded-full animate-pulse" />
                    Consultation Actions
                  </h3>
                  <Button className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20 gap-3">
                    <PlusCircle className="h-5 w-5" /> Add Prescription
                  </Button>
                  <Button variant="outline" className="w-full h-14 rounded-xl font-bold text-base border-2 border-primary text-primary hover:bg-primary/5 gap-3">
                    <Microscope className="h-5 w-5" /> Add Lab Tests
                  </Button>
                  <Separator className="my-4" />
                  <Button variant="default" className="w-full h-14 rounded-xl font-bold text-base bg-slate-900 dark:bg-slate-100 dark:hover:bg-slate-200 gap-3">
                    <CheckCircle2 className="h-5 w-5" /> Close Appointment
                  </Button>
                  <p className="text-[11px] text-center text-muted-foreground px-4 leading-relaxed">
                    Closing finalizes the medical record and notifies the patient.
                  </p>
                </CardContent>
              </Card>

              {/* Vital Signs Sidebar */}
              <Card className="border-slate-200 dark:border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-sm uppercase tracking-wider">Last Vitals</h4>
                    <Badge variant="outline" className="text-[10px] opacity-70">TODAY, 10:15 AM</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <VitalBox label="BP" value="120/80" unit="mmHg" />
                    <VitalBox label="Pulse" value="72" unit="bpm" />
                    <VitalBox label="Temp" value="98.6" unit="°F" />
                    <VitalBox label="SpO2" value="99" unit="%" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-components for cleaner code
const PrescriptionRow = ({ title, date, doctor, icon, color }) => (
  <div className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`size-10 rounded-lg flex items-center justify-center 
        ${color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/20'}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-muted-foreground">{date} • {doctor}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="h-8 gap-1 text-xs font-bold">
        <Eye className="h-3.5 w-3.5" /> View
      </Button>
      <Button variant="secondary" size="sm" className="h-8 gap-1 text-xs font-bold text-primary">
        <Download className="h-3.5 w-3.5" /> PDF
      </Button>
    </div>
  </div>
);

const VitalBox = ({ label, value, unit }) => (
  <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-900">
    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{label}</p>
    <p className="text-base font-bold">
      {value} <span className="text-[10px] font-medium text-muted-foreground">{unit}</span>
    </p>
  </div>
);

export default PatientDetailView;