import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings2, Save } from 'lucide-react';

// Added editData prop to handle prefilling
const FieldConfigPopup = ({ triggerElement, onSave, editData = null }) => {
  const [open, setOpen] = useState(false);
  
  // Initial state uses 'label' to match your API data structure
  const [field, setField] = useState({ 
    name: '', 
    type: 'String', 
    defaultValue: '', 
    required: false 
  });

  // Sync state when editData is provided or when the popup opens
  useEffect(() => {
    if (editData && open) {
      // Prefill with existing data
      setField({
        name: editData.label || editData.name || '',
        type: editData.type || 'String',
        defaultValue: editData.defaultValue || '',
        required: editData.required || false
      });
    } else if (!editData && open) {
      // Reset for "Add New" mode
      setField({ name: '', type: 'String', defaultValue: '', required: false });
    }
  }, [editData, open]);

  const handleSave = () => {
    if (!field.name) return alert("Field Name is required");
    onSave(field);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerElement || <Button>Configure Field</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold">
              {editData ? "Edit Field" : "Field Configuration"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-slate-500">
            Define the properties and validation rules for this schema field.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Field Label Input */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-semibold text-[10px] uppercase tracking-widest text-slate-400">
              Field Label <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="name"
              value={field.name} 
              onChange={(e) => setField({...field, name: e.target.value})} 
              placeholder="e.g. blood_group" 
              className="font-bold h-11"
            />
          </div>

          {/* Data Type Select */}
          <div className="grid gap-2">
            <Label htmlFor="type" className="text-sm font-semibold text-[10px] uppercase tracking-widest text-slate-400">
              Data Type
            </Label>
            <Select 
              value={field.type} 
              onValueChange={(val) => setField({...field, type: val})}
            >
              <SelectTrigger id="type" className="h-11 font-bold border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="String">String (Text)</SelectItem>
                <SelectItem value="Int">Integer (Number)</SelectItem>
                <SelectItem value="Dropdown">Dropdown (Select)</SelectItem>
                <SelectItem value="Date">DateTime</SelectItem>
                <SelectItem value="Text">Long Text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Default Value Input */}
          <div className="grid gap-2">
            <Label htmlFor="default" className="text-sm font-semibold text-[10px] uppercase tracking-widest text-slate-400">
              Default Value
            </Label>
            <Input 
              id="default"
              value={field.defaultValue} 
              onChange={(e) => setField({...field, defaultValue: e.target.value})} 
              placeholder="Optional" 
              className="h-11"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} className="gap-2 font-bold">
            <Save className="w-4 h-4" /> {editData ? "Update Field" : "Save Field"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FieldConfigPopup;