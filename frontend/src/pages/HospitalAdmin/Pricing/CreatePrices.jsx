import React from 'react';
import { 
  ArrowLeft, 
  Search, 
  Save, 
  Info, 
  Receipt,
  Bell,
  Package as PackageIcon,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const availableItems = [
  { id: "cbc", name: "Complete Blood Count (CBC)", type: "Test", price: 450, checked: true },
  { id: "lipid", name: "Lipid Profile", type: "Test", price: 1200, checked: true },
  { id: "lft", name: "Liver Function Test (LFT)", type: "Test", price: 850, checked: false },
  { id: "urine", name: "Urine Routine & Micro", type: "Test", price: 350, checked: true },
  { id: "kft", name: "Kidney Function Test (KFT)", type: "Test", price: 950, checked: false },
];

const CreatePricing = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-6 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-bold tracking-tight">HealthAdmin Pro</h2>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {["Dashboard", "Inventory", "Pricing", "Staff"].map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`text-sm font-medium transition-colors hover:text-primary ${item === 'Pricing' ? 'text-primary border-b-2 border-primary pb-5 mt-5' : 'text-muted-foreground'}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkLM4KaFDgdxqTIjsVMJN28NAnwcoHa3cB3TSxEX-VRuHM5iyFSPVwbfEF2swDg4p4Bj7aEMa4b0hTuMVXpu3GJS5U7CjqdzFZnR7cvn75CuhbH4vnZK33XXzx_7bxCysYGVZBaN5Pl_1hggsgmUmnegmkXysLowSeEakemzQRiiooaIAToFqtyzs8AtnfcmoD1GUJutfFK_VdcGOxsPROV8HvXZz0xdyJnw_HzI6I3BuV33XVU5EX_AG-iAATcgWWPWDz6ANXHgI" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto w-full px-4 lg:px-10 py-8">
        {/* Breadcrumbs */}
        <div className="flex flex-col gap-2 mb-8">
          <Button variant="link" className="p-0 h-auto text-primary justify-start gap-2 w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Pricing
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">Create Pricing Item</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Basic Information */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Info className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" placeholder="e.g. Executive Health Checkup" className="py-6" />
                </div>
                
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue="package">
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Test</SelectItem>
                      <SelectItem value="package">Package</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="imaging">Imaging/Radiology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 flex flex-col justify-end">
                  <Label className="mb-3">Status</Label>
                  <div className="flex items-center space-x-2 h-10">
                    <Switch id="active-status" defaultChecked />
                    <Label htmlFor="active-status" className="font-normal text-muted-foreground">Active</Label>
                  </div>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" placeholder="Enter detailed description..." rows={4} className="resize-none" />
                </div>

                <div className="col-span-2 md:col-span-1 space-y-2">
                  <Label htmlFor="price">Base Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                    <Input id="price" type="number" placeholder="0.00" className="pl-8 py-6 font-bold" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Inclusions */}
            <Card className="overflow-hidden">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <PackageIcon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl">Package Inclusions</CardTitle>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search items to add (e.g. CBC, Liver Panel)..." className="pl-10 h-12" />
                </div>
              </CardHeader>
              <div className="border-t">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[50px] pl-6"><Checkbox /></TableHead>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right pr-6">Individual Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {availableItems.map((item) => (
                      <TableRow key={item.id} className="cursor-pointer">
                        <TableCell className="pl-6">
                          <Checkbox checked={item.checked} />
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400">
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold pr-6">₹{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-md border-primary/20 overflow-hidden">
              <div className="bg-primary px-6 py-4 text-white">
                <h3 className="font-bold flex items-center gap-2">
                  <Receipt className="w-5 h-5" /> Selected Inclusions
                </h3>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-4 mb-6">
                  {availableItems.filter(i => i.checked).map(item => (
                    <li key={item.id} className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.type} Inclusion</span>
                      </div>
                      <span className="text-sm font-bold">₹{item.price}</span>
                    </li>
                  ))}
                </ul>
                
                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span className="text-sm">Total Individual Value</span>
                    <span className="text-sm font-bold">₹2,000.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Package Price</span>
                    <div className="relative w-28">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">₹</span>
                      <Input defaultValue="1,499" className="text-right h-8 font-bold text-primary" />
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/50 flex justify-between items-center">
                    <span className="text-sm font-bold text-green-700 dark:text-green-400">Total Savings</span>
                    <span className="text-lg font-extrabold text-green-700 dark:text-green-400">₹501.00</span>
                  </div>
                  
                  <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
                    ~ 25% Discount Applied ~
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 p-6 bg-slate-50 dark:bg-slate-900/50">
                <Button className="w-full h-12 gap-2 shadow-lg shadow-primary/20">
                  <Save className="w-4 h-4" /> Save Pricing Item
                </Button>
                <Button variant="ghost" className="w-full text-muted-foreground">
                  Cancel & Discard
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Actions */}
      <div className="lg:hidden sticky bottom-0 left-0 right-0 bg-background border-t p-4 flex gap-3 z-50">
        <Button variant="outline" className="flex-1 h-12">Cancel</Button>
        <Button className="flex-[2] h-12">Save Pricing Item</Button>
      </div>
    </div>
  );
};

export default CreatePricing;