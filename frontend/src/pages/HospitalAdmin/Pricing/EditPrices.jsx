import React from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Info, 
  Lock, 
  Save, 
  ArrowRight,
  LayoutDashboard,
  Package,
  CreditCard,
  Settings,
  ChevronDown
} from 'lucide-react';

import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const EditPricing = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans">
      {/* Navigation Header */}
      <header className="flex items-center justify-between border-b bg-white dark:bg-slate-900 px-6 md:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
            <CreditCard className="size-5" />
          </div>
          <h2 className="text-lg font-bold tracking-tight">Admin Portal</h2>
        </div>
        
        <div className="flex flex-1 justify-end gap-8">
          <nav className="hidden md:flex items-center gap-9">
            <a className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors" href="#">Dashboard</a>
            <a className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="#">Inventory</a>
            <a className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors" href="#">Billing</a>
            <a className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors" href="#">Settings</a>
          </nav>
          <Avatar className="size-10 border">
            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGpOTWwpKdAlPWbJ607Rb1sgDfJ978GVJ2JmKU-5lw9rcEfgpwvQeSWC_r9vl5If9t4JKK2vClYXDIQH4GaBoicNYrrw5nu1LrHwcXj1GoJwdf0eH_HxbowTth7-b867xH0Tkf_EtYfOasdKxgAip5-QwNV4P3J5qxpQMVocmxp6-NurkIMa3BxOWtgQeUhg3qVPxYr9os-j_sLCGRCDuUug0M_t5eJA_0FmmfmPbB6xko2hZv_yEdQ34o0UxsxUVnZFz3z0IGbj0" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center py-8 px-4 md:px-0">
        <div className="max-w-[800px] flex-1 flex flex-col gap-6">
          
          {/* Breadcrumbs & Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
              <a className="hover:text-primary transition-colors" href="#">Pricing Management</a>
              <ChevronRight className="size-3" />
              <span className="text-foreground">Edit Pricing Item</span>
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <Button variant="outline" size="icon" className="shadow-sm">
                <ArrowLeft className="size-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-black tracking-tight">Edit Pricing Item</h1>
                <p className="text-muted-foreground">Update service or product pricing details across the system.</p>
              </div>
            </div>
          </div>

          {/* Warning Banner */}
          <Alert className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30 py-5">
            <Info className="size-5 text-primary" />
            <div className="ml-2">
              <AlertTitle className="text-base font-bold">Important Notice</AlertTitle>
              <AlertDescription className="text-slate-600 dark:text-slate-300 text-base mt-1">
                This pricing item has been used in patient bills. Price changes will only affect future bills.
              </AlertDescription>
              <Button variant="link" className="p-0 h-auto text-primary font-bold mt-2 gap-2">
                Learn more <ArrowRight className="size-4" />
              </Button>
            </div>
          </Alert>

          {/* Form Card */}
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Item Name */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="item-name" className="font-semibold">Item Name</Label>
                  <Input 
                    id="item-name" 
                    defaultValue="Standard Consultation (General Medicine)" 
                    className="bg-slate-50 dark:bg-slate-800 h-12"
                  />
                </div>

                {/* SKU / Code */}
                <div className="space-y-2">
                  <Label htmlFor="sku" className="font-semibold">Item Code / SKU</Label>
                  <Input 
                    id="sku" 
                    defaultValue="MED-GEN-001" 
                    className="bg-slate-50 dark:bg-slate-800 h-12"
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="font-semibold">Unit Price ($)</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <Input 
                      id="price" 
                      type="number" 
                      defaultValue="150.00" 
                      className="bg-slate-50 dark:bg-slate-800 h-12 pl-8 font-medium"
                    />
                  </div>
                </div>

                {/* Category (Disabled/Locked) */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-muted-foreground flex items-center gap-1.5 font-semibold">
                    Category <Lock className="size-3" />
                  </Label>
                  <div className="relative group">
                    <Select disabled defaultValue="gen-med">
                      <SelectTrigger className="h-12 bg-slate-100/50 dark:bg-slate-950/50 italic text-muted-foreground border-slate-100 dark:border-slate-800">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gen-med">General Medicine</SelectItem>
                        <SelectItem value="lab">Laboratory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground italic mt-1">
                    Category cannot be changed once an item has been billed.
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="desc" className="font-semibold">Description</Label>
                  <Textarea 
                    id="desc" 
                    rows={4}
                    defaultValue="Includes standard 20-minute consultation with a general practitioner, physical assessment, and digital health record update."
                    className="bg-slate-50 dark:bg-slate-800 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-slate-50 dark:bg-slate-800/50 border-t px-8 py-6 flex flex-col-reverse sm:flex-row justify-end items-center gap-4">
              <Button variant="ghost" className="w-full sm:w-auto font-bold text-slate-600 dark:text-slate-300">
                Cancel
              </Button>
              <Button className="w-full sm:w-auto px-8 h-12 font-bold shadow-lg shadow-primary/20 gap-2">
                <Save className="size-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>

          {/* Metadata */}
          <div className="flex justify-between items-center text-[11px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 px-2 pb-10">
            <p>Modified: Oct 12, 2023 by Dr. Sarah Smith</p>
            <p>ID: PRIC-9928-XA</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EditPricing;