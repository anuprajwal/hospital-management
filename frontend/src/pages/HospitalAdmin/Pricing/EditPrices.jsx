import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Info, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { editPrice } from "./apis"; // Ensure path is correct
import TopHeader from '@/components/Top-Header';
import DynamicNavbar from '@/components/DynamicNavbar';

const EditPricing = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // pricing_id from URL

  // Initialize with passed state or empty defaults
  const [formData, setFormData] = useState({
    name: state?.name || '',
    price: state?.price || '',
    status: state?.status ?? true,
    description: state?.description || ''
  });
  
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price) return alert("Name and Price are required.");
    
    setSaving(true);
    try {
      await editPrice(id, formData);
      navigate('/view-prices'); // Redirect back to list
    } catch (err) {
      console.error("Save Error:", err);
      alert("Failed to update pricing.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-slate-950">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-zinc-900 overflow-y-auto hidden lg:block">
          <DynamicNavbar />
        </aside>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 flex justify-center">
          <div className="max-w-[900px] w-full space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                <span>Pricing Control</span> <ChevronRight className="size-3" /> <span>Edit Record</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 border-2" 
                  onClick={() => navigate('/view-pricing')}
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <h1 className="text-3xl font-black tracking-tight">Edit Pricing Item</h1>
              </div>
            </div>

            <Alert className="bg-blue-50/50 border-blue-200 py-4">
              <Info className="size-5 text-primary" />
              <div className="ml-2">
                <AlertTitle className="font-bold">Database Sync Active</AlertTitle>
                <AlertDescription className="text-sm font-medium">Modifying these values will update all future billing calculations for this service ID: #{id}.</AlertDescription>
              </div>
            </Alert>

            <Card className="shadow-sm border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="name" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Item Name</Label>
                    <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="h-12 font-bold text-lg border-2 focus-visible:ring-primary" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Price (₹)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      value={formData.price} 
                      onChange={handleInputChange} 
                      className="h-12 font-black text-xl border-2 focus-visible:ring-primary" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Current Status</Label>
                    <div className="h-12 flex items-center px-4 bg-slate-50 dark:bg-zinc-800 rounded-md border-2 border-dashed">
                      <Badge className={`font-bold ${formData.status ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                        {formData.status ? "ACTIVE" : "BLOCKED"}
                      </Badge>
                      <span className="ml-2 text-[10px] text-muted-foreground font-medium italic">Change status from main list</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Description / Billing Notes</Label>
                    <Textarea 
                      id="description" 
                      rows={4} 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      className="resize-none border-2 bg-slate-50/30 focus-visible:ring-primary" 
                      placeholder="Add specific details about this charge..."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 dark:bg-zinc-950 border-t px-8 py-6 flex justify-end gap-4">
                <Button 
                  variant="ghost" 
                  className="font-bold h-12 px-8" 
                  onClick={() => navigate('/view-pricing')}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button 
                  className="px-10 h-12 font-black shadow-lg shadow-primary/25 gap-3" 
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "UPDATING..." : <><Save className="size-5" /> SAVE CHANGES</>}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditPricing;