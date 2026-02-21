// import React, {useState} from 'react';
// import { ArrowLeft, Search, Save, Info, Receipt, Package as PackageIcon } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";

// import TopHeader from '@/components/Top-Header';
// import DynamicNavbar from '@/components/DynamicNavbar';

// const CreatePricing = () => {
//   const [formData, setFormData] = useState({ name: '', price: '', status: true });

//   const handleSave = async () => {
//     await createPrice(formData);
//     navigate('/view-pricing');
//   };

//   return (
//     <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-slate-950">
//       <TopHeader />
//       <div className="flex flex-1 overflow-hidden">
//         <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-zinc-900 overflow-y-auto hidden lg:block">
//           <DynamicNavbar />
//         </aside>

//         <main className="flex-1 overflow-y-auto p-6 lg:p-10">
//           <div className="max-w-[1400px] mx-auto">
//             <div className="flex flex-col gap-2 mb-8">
//               <Button variant="link" className="p-0 h-auto text-primary justify-start gap-2 w-fit font-bold">
//                 <ArrowLeft className="w-4 h-4" /> Back to Pricing
//               </Button>
//               <h1 className="text-3xl font-black tracking-tight">Create Pricing Item</h1>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//               <div className="lg:col-span-8 space-y-8">
//                 <Card className="shadow-sm">
//                   <CardHeader className="flex flex-row items-center gap-3 border-b py-4">
//                     <Info className="w-5 h-5 text-primary" />
//                     <CardTitle className="text-sm font-bold uppercase tracking-wider">Basic Information</CardTitle>
//                   </CardHeader>
//                   <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
//                     <div className="col-span-2 space-y-2">
//                       <Label className="font-bold">Item Name</Label>
//                       <Input placeholder="e.g. Executive Health Checkup" className="h-12" />
//                     </div>
//                     {/* <div className="space-y-2">
//                       <Label className="font-bold">Category</Label>
//                       <Select><SelectTrigger className="h-12"><SelectValue placeholder="Select" /></SelectTrigger>
//                         <SelectContent><SelectItem value="test">Test</SelectItem><SelectItem value="package">Package</SelectItem></SelectContent>
//                       </Select>
//                     </div> */}
//                     <div className="space-y-2 flex flex-col justify-end pb-1">
//                       <Label className="mb-3 font-bold">Status</Label>
//                       <div className="flex items-center space-x-2 h-10"><Switch defaultChecked /><Label className="font-bold text-muted-foreground">Active</Label></div>
//                     </div>
//                     <div className="col-span-2 space-y-2">
//                       <Label className="font-bold">Description</Label>
//                       <Textarea placeholder="Details..." className="min-h-[100px]" />
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* <Card className="overflow-hidden shadow-sm">
//                   <CardHeader className="border-b py-4 flex flex-row items-center justify-between">
//                     <CardTitle className="text-sm font-bold uppercase flex items-center gap-2"><PackageIcon className="w-5 h-5 text-primary" /> Inclusions</CardTitle>
//                     <div className="relative w-64">
//                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input placeholder="Search items..." className="pl-9 h-10" />
//                     </div>
//                   </CardHeader>
//                   <Table>
//                     <TableHeader className="bg-muted/30">
//                       <TableRow><TableHead className="w-[50px] pl-6"><Checkbox /></TableHead><TableHead className="font-bold">Item</TableHead><TableHead className="text-right pr-6 font-bold">Price</TableHead></TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       <TableRow><TableCell className="pl-6"><Checkbox /></TableCell><TableCell className="font-bold text-sm">CBC Test</TableCell><TableCell className="text-right pr-6 font-bold">₹450</TableCell></TableRow>
//                     </TableBody>
//                   </Table>
//                 </Card> */}
//               </div>

//               <div className="lg:col-span-4">
//                 <Card className="sticky top-4 shadow-lg border-primary/20">
//                   <div className="bg-primary px-6 py-4 text-white font-bold flex items-center gap-2"><Receipt className="w-5 h-5" /> Summary</div>
//                   <CardContent className="p-6 space-y-4">
//                     <div className="flex justify-between font-bold"><span>Total Value</span><span>₹450</span></div>
//                     <Separator />
//                     <div className="flex justify-between items-center"><span className="font-bold">Set Price</span><Input className="w-24 text-right h-10 font-bold" defaultValue="450" /></div>
//                   </CardContent>
//                   <CardFooter className="p-6 bg-slate-50 border-t flex flex-col gap-3">
//                     <Button className="w-full h-12 font-black">SAVE PRICING ITEM</Button>
//                     <Button variant="ghost" className="w-full font-bold">Cancel</Button>
//                   </CardFooter>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };
// export default CreatePricing;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Save, 
  Info, 
  Receipt, 
  Package as PackageIcon, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { createPrice } from "./apis"; //
import TopHeader from '@/components/Top-Header';
import DynamicNavbar from '@/components/DynamicNavbar';

const CreatePricing = () => {
  const navigate = useNavigate();

  // --- State Management ---
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    status: true, 
    description: '',
    category: '' 
  });
  
  const [status, setStatus] = useState({ 
    loading: false, 
    error: null, 
    success: false 
  });

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleStatusToggle = (checked) => {
    setFormData(prev => ({ ...prev, status: checked }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name || !formData.price) {
      setStatus({ ...status, error: "Item Name and Price are required fields." });
      return;
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await createPrice(formData);

      // Check if the API utility or backend returned an error
      // Note: If your createPrice utility doesn't throw on 400, 
      // check the response object directly here.
      if (response && (response.error || response.status === 400)) {
        throw new Error(response.message || "Backend rejected the request (Error 400).");
      }

      // If we reach here, the record was actually created
      setStatus({ loading: false, error: null, success: true });
      
      // Redirect after a short delay so the user sees the success state
      setTimeout(() => navigate('/view-pricing'), 1500);

    } catch (err) {
      console.error("Creation Error:", err);
      
      // Specifically catch the error and prevent the "Success" alert from showing
      setStatus({ 
        loading: false, 
        error: err.message || "Failed to create record. Please try again.", 
        success: false 
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-slate-950">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-zinc-900 overflow-y-auto hidden lg:block">
          <DynamicNavbar />
        </aside>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Navigation & Header */}
            <div className="flex flex-col gap-2 mb-8">
              <Button 
                variant="link" 
                onClick={() => navigate('/view-prices')}
                className="p-0 h-auto text-primary justify-start gap-2 w-fit font-bold"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Pricing
              </Button>
              <h1 className="text-3xl font-black tracking-tight">Create Pricing Item</h1>
            </div>

            {/* Error Feedback */}
            {status.error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{status.error}</AlertDescription>
              </Alert>
            )}

            {/* Success Feedback */}
            {status.success && (
              <Alert className="mb-6 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Pricing item created successfully. Redirecting...</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-8 space-y-8">
                <Card className="shadow-sm border-slate-200">
                  <CardHeader className="flex flex-row items-center gap-3 border-b py-4">
                    <Info className="w-5 h-5 text-primary" />
                    <CardTitle className="text-sm font-bold uppercase tracking-wider">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="name" className="font-bold">Item Name</Label>
                      <Input 
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Executive Health Checkup" 
                        className="h-12 border-2 focus-visible:ring-primary" 
                      />
                    </div>
                    {/* <div className="space-y-2">
                      <Label className="font-bold">Category</Label>
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="h-12 border-2">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="test">Test</SelectItem>
                          <SelectItem value="package">Package</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                    <div className="space-y-2 flex flex-col justify-end pb-1">
                      <Label className="mb-3 font-bold">Status</Label>
                      <div className="flex items-center space-x-2 h-10">
                        <Switch 
                          checked={formData.status} 
                          onCheckedChange={handleStatusToggle} 
                        />
                        <Label className="font-bold text-muted-foreground">
                          {formData.status ? "Active" : "Inactive"}
                        </Label>
                      </div>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description" className="font-bold">Description</Label>
                      <Textarea 
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Provide details about what this price covers..." 
                        className="min-h-[100px] border-2 focus-visible:ring-primary" 
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* <Card className="overflow-hidden shadow-sm border-slate-200">
                  <CardHeader className="border-b py-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
                      <PackageIcon className="w-5 h-5 text-primary" /> Inclusions
                    </CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search existing items..." className="pl-9 h-10 bg-slate-50" />
                    </div>
                  </CardHeader>
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="w-[50px] pl-6"><Checkbox /></TableHead>
                        <TableHead className="font-bold uppercase text-[10px]">Item</TableHead>
                        <TableHead className="text-right pr-6 font-bold uppercase text-[10px]">Base Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="pl-6"><Checkbox /></TableCell>
                        <TableCell className="font-bold text-sm">Sample Inclusion Test</TableCell>
                        <TableCell className="text-right pr-6 font-bold">₹0</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card> */}
              </div>

              {/* Right Column: Pricing Summary & Actions */}
              <div className="lg:col-span-4">
                <Card className="sticky top-4 shadow-lg border-primary/20">
                  <div className="bg-primary px-6 py-4 text-white font-bold flex items-center gap-2">
                    <Receipt className="w-5 h-5" /> Summary
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                      <span>Calculated Value</span>
                      <span>₹0</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <Label htmlFor="price" className="font-black text-sm uppercase">Set Price (₹)</Label>
                      <Input 
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-32 text-right h-12 font-black text-lg border-2 border-primary/20 focus-visible:ring-primary" 
                        placeholder="0.00"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 bg-slate-50 dark:bg-zinc-900/50 border-t flex flex-col gap-3">
                    <Button 
                      onClick={handleSave}
                      disabled={status.loading || status.success}
                      className="w-full h-14 font-black text-base shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                      {status.loading ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> CREATING...</>
                      ) : (
                        <><Save className="mr-2 h-5 w-5" /> SAVE PRICING ITEM</>
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigate('/view-pricing')}
                      disabled={status.loading}
                      className="w-full h-12 font-bold text-muted-foreground"
                    >
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePricing;