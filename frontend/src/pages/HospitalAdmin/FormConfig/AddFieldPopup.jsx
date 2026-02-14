import React, {useState} from 'react';
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

const FieldConfigPopup = ({ triggerElement, onSave }) => {
  const [open, setOpen] = useState(false);
  const [field, setField] = useState({ name: '', type: 'string', defaultValue: '', required: false });

  const handleSave = () => {
    if (!field.name) return alert("Field Name is required");
    onSave(field);
    setField({ name: '', type: 'string', defaultValue: '', required: false }); // Reset
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* The trigger can be any button or element passed from the parent */}
      <DialogTrigger asChild>
        {triggerElement || <Button>Configure Field</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold">Field Configuration</DialogTitle>
          </div>
          <DialogDescription className="text-slate-500">
            Define the properties and validation rules for this schema field.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Field Name Input */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Field Name <span className="text-red-500">*</span>
            </Label>
            <Input 
              value={field.name} 
              onChange={(e) => setField({...field, name: e.target.value})} 
              placeholder="e.g. blood_group" 
            />
          </div>

          {/* Data Type Select */}
          <div className="grid gap-2">
            <Label htmlFor="type" className="text-sm font-semibold">
              Data Type
            </Label>
            <Select value={field.type} onValueChange={(val) => setField({...field, type: val})}>
              <SelectTrigger id="type" className="border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String (Text)</SelectItem>
                <SelectItem value="number">Integer (Number)</SelectItem>
                <SelectItem value="boolean">Boolean (Yes/No)</SelectItem>
                <SelectItem value="date">DateTime</SelectItem>
                <SelectItem value="relation">Relation (Reference)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Default Value Input */}
          <div className="grid gap-2">
            <Label htmlFor="default" className="text-sm font-semibold">
              Default Value
            </Label>
            <Input 
              value={field.defaultValue} 
              onChange={(e) => setField({...field, defaultValue: e.target.value})} 
              placeholder="Optional" 
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
        <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSave} className="gap-2"><Save className="w-4 h-4" /> Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FieldConfigPopup;