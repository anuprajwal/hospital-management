import React, { useState } from 'react';
import { Save, Plus, Trash2, Info, ListTree, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPrice } from "./apis";
import { toast } from "sonner";

const LaboratoryTestForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    status: true, // Boolean for the UI Switch
    description: '',
  });

  const handleSave = async () => {
    // Validation
    if (!formData.name || !formData.price) {
      return toast.error("Please fill in the Test Name and Price");
    }
    
    setLoading(true);
    try {
      // Prepare payload to match backend controller requirements
      const payload = { 
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        // Backend expects 0 or 1
        status: formData.status ? 1 : 0, 
        // Backend expects "laboratory_tests" or "package"
        category: 'laboratory_tests', 
        // Array of parameters
        parameters: parameters 
      };

      const result = await createPrice(payload);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Laboratory test created successfully!");
        // Optional: navigate('/view-prices');
      }
    } catch (err) {
      toast.error("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const [parameters, setParameters] = useState([
    { parameter_name: '', normal_value: '' }
  ]);

  const addParameter = () => {
    setParameters([...parameters, { parameter_name: '', normal_value: '' }]);
  };

  const removeParameter = (index) => {
    const updated = parameters.filter((_, i) => i !== index);
    setParameters(updated);
  };

  const handleParamChange = (index, field, value) => {
    const updated = [...parameters];
    updated[index][field] = value;
    setParameters(updated);
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-7 space-y-6">
        {/* Basic Info Card */}
        <Card className="shadow-sm border-2">
          <CardHeader className="border-b py-4 bg-slate-50/50 dark:bg-zinc-900/50">
            <CardTitle className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" /> Basic Test Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label className="font-bold">Test Name</Label>
                <Input 
                  placeholder="e.g. Complete Blood Count (CBC)" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-12 border-2" 
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Base Price (₹)</Label>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="h-12 border-2 font-mono text-lg" 
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold block mb-3">Status</Label>
                <div className="flex items-center gap-3 h-10">
                  <Switch 
                    checked={formData.status} 
                    onCheckedChange={(val) => setFormData({...formData, status: val})} 
                  />
                  <span className="font-bold text-sm">{formData.status ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Test Description</Label>
              <Textarea 
                placeholder="Describe the test methodology..." 
                className="min-h-[100px] border-2"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Parameters Section */}
        <Card className="shadow-sm border-2">
          <CardHeader className="border-b py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
              <ListTree className="w-4 h-4 text-primary" /> Test Parameters
            </CardTitle>
            <Button size="sm" onClick={addParameter} className="rounded-full font-bold h-8">
              <Plus className="w-4 h-4 mr-1" /> Add Parameter
            </Button>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {parameters.map((param, index) => (
              <div key={index} className="flex items-end gap-3 p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border animate-in zoom-in-95 duration-200">
                <div className="flex-1 space-y-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground">Parameter Name</Label>
                  <Input 
                    placeholder="e.g. Hemoglobin" 
                    value={param.parameter_name}
                    onChange={(e) => handleParamChange(index, 'parameter_name', e.target.value)}
                    className="h-10 border-2"
                  />
                </div>
                <div className="w-40 space-y-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground">Normal Value</Label>
                  <Input 
                    placeholder="e.g. 13.5 - 17.5" 
                    value={param.normal_value}
                    onChange={(e) => handleParamChange(index, 'normal_value', e.target.value)}
                    className="h-10 border-2"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeParameter(index)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 h-10 w-10"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right Column Action Sidebar */}
      <div className="lg:col-span-5">
        <Card className="sticky top-4 border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Save className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-black text-xl">Review & Save</h3>
              <p className="text-sm text-muted-foreground">Ensure all parameters and pricing details are accurate before saving.</p>
            </div>
            
            <div className="space-y-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-bold uppercase text-[10px]">Test Type</span>
                <span className="font-black">Laboratory</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-bold uppercase text-[10px]">Total Parameters</span>
                <span className="font-black">{parameters.length}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-black">FINAL PRICE</span>
                <span className="text-2xl font-black text-primary">₹{formData.price || '0.00'}</span>
              </div>
            </div>

            <Button 
              className="w-full h-14 font-black text-lg shadow-xl shadow-primary/20"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
              SAVE LABORATORY TEST
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaboratoryTestForm;