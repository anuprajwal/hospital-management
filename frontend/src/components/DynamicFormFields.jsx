import React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const DynamicFieldRenderer = ({ field, value, onChange }) => {
  const { name: label, type, required, options } = field;

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
          const selectOptions = Array.isArray(options) ? options : [];
                
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
                {selectOptions.map((opt) => {
                  const optionLabel = typeof opt === "object" ? opt.label : opt;
                  const optionValue = typeof opt === "object" ? String(opt.value) : opt;
        
                  return (
                    <SelectItem key={optionValue} value={optionValue}>
                      {optionLabel}
                    </SelectItem>
                  );
                })}
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