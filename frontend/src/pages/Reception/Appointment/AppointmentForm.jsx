// import React, { useState, useEffect } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import DynamicFieldRenderer from "@/components/DynamicFormFields";

// const AddAppointmentForm = ({ open, onOpenChange, dynamicFields = [], formTitle }) => {
//   const [formState, setFormState] = useState({});

//   // Reset state whenever new fields are provided by the backend
//   useEffect(() => {
//     const initialState = {};
//     dynamicFields.forEach(field => {
//       initialState[field.label] = "";
//     });
//     setFormState(initialState);
//   }, [dynamicFields]);

//   const handleInputChange = (label, value) => {
//     setFormState(prev => ({ ...prev, [label]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting:", formState);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-[700px] h-[90vh] p-0 overflow-hidden flex flex-col border-none shadow-2xl">
//         <DialogHeader className="px-8 py-6 border-b bg-white dark:bg-slate-900 flex-shrink-0">
//           <DialogTitle className="text-2xl font-bold">New {formTitle}</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
//           <ScrollArea className="flex-1 px-8 py-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
//               {dynamicFields.map((field, index) => (
//                 <DynamicFieldRenderer 
//                   key={index}
//                   field={field}
//                   value={formState[field.label]}
//                   onChange={handleInputChange}
//                 />
//               ))}
//             </div>
//           </ScrollArea>

//           <DialogFooter className="px-8 py-6 border-t bg-slate-50 dark:bg-slate-900/50 flex-shrink-0">
//             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
//             <Button type="submit">Submit Form</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddAppointmentForm;


import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, AlertCircle } from "lucide-react";
import DynamicFieldRenderer from "@/components/DynamicFormFields";
import { createOutpatient, editOutpatient } from "./apis";

const AddAppointmentForm = ({ open, onOpenChange, dynamicFields = [], formTitle, formId, initialData = null, onSuccess }) => {
  const [formState, setFormState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync state with dynamic fields OR initialData (for editing)
  useEffect(() => {
    if (initialData) {
      // If editing, use existing data (parsed from JSON if necessary)
      const data = typeof initialData.form_data === 'string' ? JSON.parse(initialData.form_data) : initialData.form_data;
      setFormState(data || {});
    } else {
      // If creating new
      const initialState = {};
      dynamicFields.forEach(field => { initialState[field.label] = ""; });
      setFormState(initialState);
    }
    setError(null);
  }, [dynamicFields, initialData, open]);

  const handleInputChange = (label, value) => {
    setFormState(prev => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (initialData?.id) {
        await editOutpatient(initialData.id, formState);
      } else {
        await createOutpatient(formId, formState);
      }
      onSuccess?.(); // Trigger refresh in parent
      onOpenChange(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] h-[90vh] p-0 overflow-hidden flex flex-col border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b bg-white dark:bg-slate-900 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold">
            {initialData ? "Edit" : "New"} {formTitle}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <ScrollArea className="flex-1 px-8 py-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              {dynamicFields.map((field, index) => (
                <DynamicFieldRenderer 
                  key={index}
                  field={field}
                  value={formState[field.label] || ""}
                  onChange={handleInputChange}
                />
              ))}
            </div>
          </ScrollArea>

          <DialogFooter className="px-8 py-6 border-t bg-slate-50 dark:bg-slate-900/50 flex-shrink-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Update Changes" : "Submit Form"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointmentForm;