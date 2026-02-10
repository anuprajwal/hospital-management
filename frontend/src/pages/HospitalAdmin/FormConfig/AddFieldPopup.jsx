import React from 'react';
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

const FieldConfigPopup = ({ triggerElement }) => {
  return (
    <Dialog>
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
              id="name"
              placeholder="e.g. blood_group"
              className="col-span-3 border-slate-200 dark:border-slate-800 focus-visible:ring-primary"
            />
          </div>

          {/* Data Type Select */}
          <div className="grid gap-2">
            <Label htmlFor="type" className="text-sm font-semibold">
              Data Type
            </Label>
            <Select defaultValue="string">
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
              id="default"
              placeholder="Leave empty for null"
              className="col-span-3 border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" className="font-semibold text-slate-500">
            Cancel
          </Button>
          <Button className="font-bold gap-2 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FieldConfigPopup;