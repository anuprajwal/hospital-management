import React from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  Calendar, 
  Filter, 
  Clock, 
  Phone, 
  ArrowRight, 
  Eye, 
  RefreshCcw,
  Stethoscope
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const appointments = [
  {
    id: 1,
    name: "Sarah Jenkins",
    age: 34,
    gender: "Female",
    time: "09:30 AM",
    phone: "+1 234-567-8901",
    dept: "Cardiology",
    type: "Routine Checkup",
    status: "In Consultation",
    notes: "Experiencing mild chest tightness and occasional shortness of breath during light exercise for the past 3 days.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD9uQemZOdC5sxCm67V2j0xGXEvR_4kl7nBFqCRTTUeUQM08xbFo3G-oNJLljzt78Q0kG8NWaim4gGFzL7OPWPLbQXAlOC14d-G8WPYGS59bVjBodsA3jjVBL1vUc-P4crDzQqQXPQ_RDtFDQX5s1zqSJQUVUj4BC6el_axtK_BrTAkolLAHcmiwXgawVj6HytdLAZKsMw-TfRnuajAaHJvOCgsJpeTux4MfT6KfJTZ_9YrwouF8gz9t_ucj-rZ6WPwhG13S0Ry10"
  },
  {
    id: 2,
    name: "David Miller",
    age: 52,
    gender: "Male",
    time: "10:15 AM",
    phone: "+1 234-998-1234",
    dept: "Cardiology",
    type: "Follow-up",
    status: "Scheduled",
    notes: "Post-surgery follow-up. Checking on recovery progress and adjusting blood pressure medication dosage.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVVWyUhDtV7jBVmYd1DH_F2yUBFOTyrnw7PBJ3Xp0nYPNBb1AO10fhk0bvJr15-r0F_2HZTHjdpPeNSZceYXyrKnnmx8iYl0pm_18awwymhl7udGVxSTB1iPVliBAod3xaKPWYnmfDH_ej9f1TttDwxRFCn3dn3Shk95g5rWwJEhnfav0gyMlus54T9C1zki3DoGp_J_GXYth7vP-shzP5satLuPJvlZVuZNfB34xXidkIRjh4ko1i79UNtV1VubZlir_ELuYcqes"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    age: 28,
    gender: "Female",
    time: "08:45 AM",
    phone: "+1 234-111-2222",
    dept: "General",
    type: "Lab Results",
    status: "Completed",
    notes: "Review of annual blood work results. Patient reports feeling energetic and maintaining a healthy diet.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBunp03BFkugElFD9KfgQkyhNwbj3wZOrAyA5TAo8JgJSW8Ra8d8DAu2-hmGI8iT66A3TKnn_X9gZecyMAbzwOR3j62tjZRrDFuuUYteUKE1O-0vi9Nak7Ey1Lk77F0NAqk_cWGFwQxPNKF-dkmiEnPwpQ5UezBVA6wGPoRRsWpcsiI4R2G7elCFNx2n2WsLf3eCAJ_cdhLYUVw7LEccRCy7hDGL_ohVPCAEUvC-dOPKOM4zgzTU1tO1blN8VeQEZxYJ1jw29enAkI"
  }
  // ... more cards can be mapped here
];

const StatusBadge = ({ status }) => {
  const variants = {
    "In Consultation": "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-none",
    "Scheduled": "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-none",
    "Completed": "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-none",
    "Cancelled": "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-none"
  };
  return <Badge className={`${variants[status]} uppercase text-[10px] font-bold`}>{status}</Badge>;
};

export default function DoctorPanel() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-primary">
              <Stethoscope className="h-8 w-8" />
              <h1 className="text-xl font-extrabold tracking-tight">Doctor Panel</h1>
            </div>
            <div className="hidden md:flex relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search patients, ID, or records..." 
                className="pl-10 bg-slate-100 dark:bg-zinc-800 border-none focus-visible:ring-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white dark:border-zinc-900" />
            </Button>
            
            <Separator orientation="vertical" className="h-8" />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">Dr. James Wilson</p>
                <p className="text-xs text-muted-foreground mt-1">Senior Cardiologist</p>
              </div>
              <Avatar className="h-10 w-10 border border-primary/20">
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW2qMgYPpuPcB1RKCK_D8bgpn9u2EB0nLPo42Xk6G1jmTsPQLv3KfyII1YMgwarnQK5bGMAg55XjEt3yTy7dv_P-nZ2rG5r0Qubpas6EZwSlNcDPJVguCDzvZsVYrx3SoVMHn3RBSC0XLvvKixasBeBWrn8P_pXsME0_7KjPIvloLe5Er6OeYCxhCEJ0hvj9W81S7uL-CXg0AFQe_guF2iiFrX6cCsySHsnSlVLKyHHfjSeXigHfdatB6yr-X45sSIQJ908Su2RN8" alt="Dr. James Wilson" />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Sub-header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Today's Appointments</h2>
            <p className="text-muted-foreground mt-1">Monday, Oct 24th • 12 Appointments remaining</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select defaultValue="today">
              <SelectTrigger className="w-[130px] bg-white dark:bg-zinc-800">
                <Calendar className="mr-2 h-4 w-4 text-primary" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[150px] bg-white dark:bg-zinc-800">
                <Filter className="mr-2 h-4 w-4 text-primary" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status: All</SelectItem>
                <SelectItem value="pending">Scheduled</SelectItem>
                <SelectItem value="done">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Button className="font-bold shadow-sm">
              <Plus className="mr-2 h-4 w-4" /> New Appointment
            </Button>
          </div>
        </div>

        {/* Appointment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((apt) => (
            <Card key={apt.id} className="group overflow-hidden transition-all hover:shadow-md border-slate-200 dark:border-zinc-800">
              <CardHeader className="flex flex-row justify-between items-start pb-4 space-y-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 rounded-lg">
                    <AvatarImage src={apt.image} />
                    <AvatarFallback className="rounded-lg">{apt.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold leading-tight">{apt.name}</h3>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      {apt.age} | {apt.gender}
                    </p>
                  </div>
                </div>
                <StatusBadge status={apt.status} />
              </CardHeader>

              <CardContent className={`space-y-4 ${apt.status === 'Completed' ? 'opacity-70' : ''}`}>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold text-slate-700 dark:text-slate-300">{apt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{apt.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-md font-medium">{apt.dept}</Badge>
                  <Badge variant="outline" className="rounded-md border-primary/20 text-primary bg-primary/5">
                    {apt.type}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground italic line-clamp-2">
                  "{apt.notes}"
                </p>
              </CardContent>

              <CardFooter>
                {apt.status === 'Completed' ? (
                  <Button variant="secondary" className="w-full font-bold">
                    View Summary <Eye className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="w-full font-bold group-hover:bg-primary/90">
                    Open Record <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-10 mt-12 border-t text-muted-foreground text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2023 HMS Doctor Panel • Built for Healthcare Professionals</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-primary transition-colors" href="#">Support</a>
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}