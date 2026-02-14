import React, { useState } from 'react';
import { LockKeyhole, Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePassword } from './apis';
import { toast } from "sonner";

const ChangePasswordPopup = ({ open, onOpenChange }) => {
  const [showPass, setShowPass] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await updatePassword(newPassword);
      toast.success("Password updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden">
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <LockKeyhole size={20} />
          </div>
          <div>
            <DialogTitle className="text-xl font-bold">Change Password</DialogTitle>
            <DialogDescription className="text-xs">Update your account credentials</DialogDescription>
          </div>
        </div>

        <div className="px-6 py-4 space-y-5">
          <div className="space-y-1.5">
            <Label>New Password</Label>
            <div className="relative">
              <Input 
                type={showPass ? "text" : "password"} 
                placeholder="Minimum 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button 
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between text-[11px] font-medium">
                <span className="text-muted-foreground uppercase">Strength</span>
                <span className="text-primary uppercase">Strong</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                <div className="rounded-full bg-primary h-full"></div>
                <div className="rounded-full bg-primary h-full"></div>
                <div className="rounded-full bg-primary h-full"></div>
                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-full"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="text-emerald-500" size={16} />
            <span className="text-xs text-emerald-600 font-medium">Validation rules met</span>
          </div>
        </div>

        <DialogFooter className="px-6 py-5 bg-slate-50 dark:bg-slate-800/50">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordPopup;