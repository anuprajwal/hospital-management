import React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const DynamicFieldRenderer = ({ field, value, onChange }) => {
  const { label, type, required, options, dynamic_source } = field;

  // Render logic based on the "type" key from your backend JSON
  const renderInput = () => {
    switch (type) {
      case "String":
      case "Int":
        return (
          <Input 
            type={type === "Int" ? "number" : "text"} 
            value={value || ""}
            onChange={(e) => onChange(label, e.target.value)}
            placeholder={`Enter ${label}`} 
            required={required} 
            className="h-12" 
          />
        );
      
      case "Dropdown":
        let selectOptions = options || [];
        // Fallbacks for dynamic sources as requested
        if (dynamic_source === "specialisations") {
          selectOptions = ['Pediatrician', 'Cardiologist', 'Gynecologist', 'Neurologist'];
        } else if (dynamic_source === "users") {
          selectOptions = ['Dr. Smith', 'Dr. Adams', 'Dr. Brown'];
        }

        return (
          <Select 
            value={value || ""} 
            onValueChange={(val) => onChange(label, val)}
            required={required}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "Date":
        return (
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input 
              type="date" 
              value={value || ""}
              onChange={(e) => onChange(label, e.target.value)}
              required={required} 
              className="h-12 pl-10" 
            />
          </div>
        );

      case "Time":
        return (
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input 
              type="time" 
              value={value || ""}
              onChange={(e) => onChange(label, e.target.value)}
              required={required} 
              className="h-12 pl-10" 
            />
          </div>
        );

      case "Text":
        return (
          <div className="md:col-span-2">
            <Textarea 
              value={value || ""}
              onChange={(e) => onChange(label, e.target.value)}
              placeholder={`Enter ${label}...`} 
              required={required} 
              className="min-h-[100px] resize-none" 
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <Label className="font-semibold capitalize">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {renderInput()}
    </div>
  );
};

export default DynamicFieldRenderer;