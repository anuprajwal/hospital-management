import React, { useState } from 'react';
import {
  Search,
  Bell,
  Stethoscope,
  Droplets,
  Activity,
  Box,
  Trash2,
  X,
  Info,
  Lightbulb,
  CheckCircle2,
  Radiation,
  Microscope,
  Trash
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const availableTests = [
  { id: 'blood', name: 'Blood Test (Full Count)', sub: 'Standard Hematology', icon: <Droplets className="size-5" /> },
  { id: 'ecg', name: 'ECG (Electrocardiogram)', sub: 'Cardiac Monitoring', icon: <Activity className="size-5" /> },
  { id: 'xray', name: 'X-Ray (Chest)', sub: 'PA & Lateral Views', icon: <Radiation className="size-5" /> },
  { id: 'mri', name: 'MRI Scan', sub: 'High Resolution Imaging', icon: <Box className="size-5" /> },
  { id: 'urine', name: 'Urine Test', sub: 'Urinalysis standard', icon: <Microscope className="size-5" /> },
];

export default function OrderMedicalTests() {
  const [selectedIds, setSelectedIds] = useState(['blood', 'xray']);

  const toggleTest = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedTests = availableTests.filter(t => selectedIds.includes(t.id));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Stethoscope className="size-6" />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight">HMS</h2>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink label="Dashboard" />
              <NavLink label="Patients" />
              <NavLink label="Orders" active />
              <NavLink label="Inventory" />
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full text-slate-500">
                <Bell className="size-5" />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-primary/10 shadow-sm">
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnPinSfKUOjEYdj3ZKIXZRK-SWYy9HO5MUjkKLcc-7eXCPT4xVJqVP__6IuKYKawlPqvJYZ_nTjx4JceWPTXQ_0yI_bMS32QSpp2ntG9fF9kGyY6QdGRPQ0xzsp_or3CX6oNoeCl1bJ2ZSbf8kkUtg4_jZq2CAANhenWU1bu32TfT5f02uH6KljDAfKo0ZsIHJ0fC2U9y_LrlOgO0jSZM4udSezrWUkesTC5HIGX-WeArscWLIhsiDikazVmKt6kSPz0PDq9hkpC4" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight">Order Medical Tests</h1>
          <p className="mt-2 text-muted-foreground">Select diagnostic procedures and add clinical instructions for the patient.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Selection Panel */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-primary/10 shadow-sm">
              <CardContent className="p-5">
                <label className="block text-sm font-bold mb-3">Find a Test</label>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search for a test..." 
                    className="pl-10 bg-slate-100 dark:bg-zinc-800 border-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm overflow-hidden">
              <CardHeader className="px-5 py-4 border-b bg-slate-50/50 dark:bg-zinc-900/50">
                <CardTitle className="text-sm font-bold">Available Tests</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                {availableTests.map((test) => (
                  <div 
                    key={test.id}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
                    onClick={() => toggleTest(test.id)}
                  >
                    <Checkbox 
                      id={test.id} 
                      checked={selectedIds.includes(test.id)} 
                      className="size-5 rounded border-slate-300 dark:border-zinc-700 data-[state=checked]:bg-primary"
                    />
                    <label className="text-sm font-medium cursor-pointer flex-grow">{test.name}</label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Selected Tests List */}
          <div className="lg:col-span-8 flex flex-col h-full">
            <Card className="border-primary/10 shadow-lg flex flex-col min-h-[550px]">
              <CardHeader className="px-6 py-5 border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-bold">Selected Tests</CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-bold">
                    {selectedIds.length} items
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs font-bold text-slate-400 hover:text-destructive gap-1"
                  onClick={() => setSelectedIds([])}
                >
                  <Trash className="size-3.5" /> Clear All
                </Button>
              </CardHeader>

              <ScrollArea className="flex-grow p-6">
                <div className="space-y-4">
                  {selectedTests.length > 0 ? (
                    selectedTests.map((test) => (
                      <div 
                        key={test.id}
                        className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-transparent hover:border-primary/20 transition-all group"
                      >
                        <div className="flex-shrink-0 size-12 bg-white dark:bg-zinc-700 rounded-lg flex items-center justify-center text-primary shadow-sm">
                          {test.icon}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold truncate">{test.name}</h4>
                          <p className="text-xs text-muted-foreground">{test.sub}</p>
                        </div>
                        <div className="flex-grow lg:max-w-xs">
                          <Input 
                            placeholder="Add clinical notes..." 
                            className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-sm h-10"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-shrink-0 text-slate-300 hover:text-destructive hover:bg-destructive/10"
                          onClick={() => toggleTest(test.id)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                      <div className="size-20 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <Box className="size-10 text-slate-400" />
                      </div>
                      <p className="font-bold">No tests selected yet.</p>
                      <p className="text-xs mt-1">Pick tests from the left list to add them to your order.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <CardFooter className="px-6 py-6 bg-slate-50/50 dark:bg-zinc-900/30 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Info className="size-4" />
                  <span className="text-xs font-medium">Results usually ready within 24-48 hours.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" className="px-6 font-bold text-slate-600 dark:text-slate-400">
                    Cancel
                  </Button>
                  <Button className="px-8 font-black shadow-lg shadow-primary/25 gap-2 h-11 transition-transform active:scale-95">
                    <CheckCircle2 className="size-4" /> Order Tests
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Secondary Helper Card */}
            <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-start gap-4">
              <div className="text-primary mt-0.5">
                <Lightbulb className="size-5" />
              </div>
              <div>
                <h5 className="text-sm font-black text-primary uppercase tracking-tight">Pro Tip</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  You can bulk-order related tests by selecting <strong>"Routine Checkup"</strong> categories from the full directory view. All selected tests will be linked to the patient session automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Bottom Status Bar */}
      <footer className="mt-auto border-t bg-white dark:bg-zinc-900 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] uppercase tracking-widest font-black text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              System Online <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </div>
          <div>© 2026 HMS PORTAL V2.4.0</div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ label, active = false }) {
  return (
    <a 
      href="#" 
      className={`text-sm font-bold transition-colors ${
        active ? 'text-primary' : 'text-slate-500 hover:text-primary'
      }`}
    >
      {label}
    </a>
  );
}