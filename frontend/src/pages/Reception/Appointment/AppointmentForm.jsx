import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import DynamicFieldRenderer from "@/components/DynamicFormFields";

const AddAppointmentForm = ({ open, onOpenChange, dynamicFields = [], formTitle }) => {
  const [formState, setFormState] = useState({});

  // Reset state whenever new fields are provided by the backend
  useEffect(() => {
    const initialState = {};
    dynamicFields.forEach(field => {
      initialState[field.label] = "";
    });
    setFormState(initialState);
  }, [dynamicFields]);

  const handleInputChange = (label, value) => {
    setFormState(prev => ({ ...prev, [label]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formState);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] h-[90vh] p-0 overflow-hidden flex flex-col border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b bg-white dark:bg-slate-900 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold">New {formTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <ScrollArea className="flex-1 px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              {dynamicFields.map((field, index) => (
                <DynamicFieldRenderer 
                  key={index}
                  field={field}
                  value={formState[field.label]}
                  onChange={handleInputChange}
                />
              ))}
            </div>
          </ScrollArea>

          <DialogFooter className="px-8 py-6 border-t bg-slate-50 dark:bg-slate-900/50 flex-shrink-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Submit Form</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointmentForm;