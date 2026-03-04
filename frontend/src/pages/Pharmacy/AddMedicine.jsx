import React, { useState } from 'react';
import { 
  Info, 
  Package, 
  Save, 
  Factory
} from 'lucide-react';

// Import the service function
import { addDrug } from './apis';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";

export default function EditMedicinePage() {
  // 1. Initialize state for form data
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    drug_form: '',
    manufacturer_name: '',
    expiry_date: '',
    buying_price: '',
    selling_price: '',
    quantity: '',
    batch_number: '', // For meta_data
  });

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Submit function
  const handleSave = async () => {
    setLoading(true);
    try {
      // Map frontend state to the specific API structure provided
      const apiPayload = {
        name: formData.name,
        expiry_date: formData.expiry_date,
        drug_form: formData.drug_form,
        manufacturer_name: formData.manufacturer_name,
        buying_price: parseFloat(formData.buying_price),
        selling_price: parseFloat(formData.selling_price),
        quantity: parseInt(formData.quantity),
        meta_data: {
          category: formData.category,
          batch_number: formData.batch_number,
          low_stock_threshold: formData.low_stock_threshold
        }
      };

      await addDrug(apiPayload);
      alert("Medicine added successfully!");
      // Optional: Redirect or clear form here
    } catch (error) {
      console.error("Failed to add drug:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
      <TopHeader />

      <div className="flex flex-1">
        <DynamicNavbar />
        <main className="flex-1 flex justify-center py-8 px-4">
          <div className="w-full max-w-[960px] flex flex-col gap-6">
            
            <div className="space-y-4">           
              <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-3xl font-black tracking-tight">Add/Edit Medicine</h1>
              </div>
            </div>

            <div className="space-y-8 pb-20">
              {/* Section: Basic Info */}
              <Card className="border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b">
                  <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Info className="size-5 text-primary" />
                    Basic Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormInput 
                      label="Medicine Name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Paracetamol 500mg" 
                    />
                    <FormInput 
                      label="Manufacturer" 
                      name="manufacturer_name"
                      value={formData.manufacturer_name}
                      onChange={handleChange}
                      placeholder="e.g. Pfizer, GSK" 
                      icon={<Factory className="size-4" />} 
                    />
                    <FormSelect 
                      label="Dosage Form" 
                      value={formData.drug_form}
                      onValueChange={(val) => handleSelectChange('drug_form', val)}
                      options={["Tablet", "Capsule", "Syrup", "Injection", "Ointment"]} 
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section: Stock Info */}
              <Card className="border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b">
                  <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Package className="size-5 text-primary" />
                    Stock Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FormInput 
                      label="Batch Number" 
                      name="batch_number"
                      value={formData.batch_number}
                      onChange={handleChange}
                      placeholder="BT-2023-001" 
                    />
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expiry Date</label>
                      <Input 
                        type="date" 
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                        className="rounded-xl h-12 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 font-bold" 
                      />
                    </div>
                    <FormInput 
                      label="Quantity" 
                      name="quantity"
                      type="number" 
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="0" 
                    />
                    <FormInput 
                      label="Purchase Price ($)" 
                      name="buying_price"
                      type="number" 
                      step="0.01" 
                      value={formData.buying_price}
                      onChange={handleChange}
                      placeholder="0.00" 
                    />
                    <FormInput 
                      label="Selling Price ($)" 
                      name="selling_price"
                      type="number" 
                      step="0.01" 
                      value={formData.selling_price}
                      onChange={handleChange}
                      placeholder="0.00" 
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-10">
                <Button variant="ghost" className="min-w-[120px] h-12 rounded-xl font-bold text-base hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={loading}
                  className="min-w-[180px] h-12 rounded-xl font-black text-base gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                  <Save size={20} />
                  {loading ? "Saving..." : "Save Medicine"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Updated Helper Components to receive state props
function FormInput({ label, icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <Input 
          className={`rounded-xl h-12 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 focus-visible:ring-primary font-bold ${icon ? 'pl-10' : ''}`} 
          {...props} 
        />
      </div>
    </div>
  );
}

function FormSelect({ label, options, value, onValueChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="rounded-xl h-12 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 font-bold focus:ring-primary">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}