import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Info, 
  HelpCircle,
  UserPlus,
  AlertCircle, CheckCircle2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {createAccount} from "./apis"

const CreateUserModal = ({ triggerElement }) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    allowActivity: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role?.trim()) {
      setApiResponse({ ok: false, status: 400, data: { error: "Please select a user role." } });
      return;
    }
    setIsLoading(true);
    setApiResponse(null);

    const result = await createAccount(formData);
    setApiResponse(result);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerElement || (
          <Button className="gap-2 font-bold shadow-lg shadow-primary/20">
            <UserPlus className="w-4 h-4" />
            Create New User
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="text-lg font-semibold">Create user</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <Alert className="mb-5 bg-primary/10 border-primary/20">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Password cannot be viewed again after creation. Save it securely.
            </AlertDescription>
          </Alert>

          <form id="create-user-form" onSubmit={handleSubmit} className="space-y-5">

          {apiResponse && (
            <Alert variant={apiResponse.ok ? "default" : "destructive"} className={apiResponse.ok ? "border-emerald-500 text-emerald-600 mb-6" : "mb-6"}>
              {apiResponse.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{apiResponse.ok ? "Success" : "Error"}</AlertTitle>
              <AlertDescription className="mt-2 font-mono text-xs overflow-auto max-h-32">
                <p className="mb-1 font-bold">Status: {apiResponse.status}</p>
                <pre>{JSON.stringify(apiResponse.data, null, 2)}</pre>
              </AlertDescription>
            </Alert>
          )}
            {/* Username Field */}
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Username</Label>
              <Input 
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Enter username" 
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</Label>
              <div className="relative">
              <Input 
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role Dropdown - required */}
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">User Role <span className="text-destructive">*</span></Label>
              <Select required value={formData.role} onValueChange={(val) => setFormData({...formData, role: val})}>
                <SelectTrigger className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 py-6">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Doctor">Doctor / Medical Staff</SelectItem>
                  <SelectItem value="Lab_Incharge">Lab Technician</SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Activity Checkbox */}
            <div className="flex items-center space-x-3 pt-2">
            <Checkbox 
              id="activity" 
              checked={formData.allowActivity}
              onCheckedChange={(checked) => setFormData({...formData, allowActivity: checked})}
              className="w-5 h-5 border-slate-300 dark:border-slate-700" 
            />
              <div className="flex items-center gap-1.5">
                <Label htmlFor="activity" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  Allow user activity
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-slate-400 hover:text-primary cursor-help transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 text-white text-[11px] max-w-[200px] text-center">
                      <p>Frozen users cannot login to the HMS system.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

        <DialogFooter className="px-6 py-4 border-t bg-muted/30 gap-2 sm:justify-end">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" form="create-user-form" disabled={isLoading}>
                {isLoading ? "Creating…" : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;