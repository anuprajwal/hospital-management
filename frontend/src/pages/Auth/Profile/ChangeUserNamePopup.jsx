import React, { useState } from 'react';
import { UserCog, AtSign, Info, CheckCircle, Loader2 } from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUsername } from './apis';
import { toast } from "sonner";

const ChangeUserNamePopup = ({ open, onOpenChange, currentUsername }) => {
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!newUsername) return;
    setLoading(true);
    try {
      await updateUsername(newUsername);
      toast.success("Username updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <UserCog size={20} />
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight">Change Username</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <Label>Current Username</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input value={currentUsername || "rahul_reception"} disabled className="pl-10 bg-muted/50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>New Username</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
              <Input 
                className="pl-10" 
                placeholder="e.g. rahul_admin"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value.toLowerCase())}
              />
            </div>
            <div className="flex gap-2 px-1">
              <Info className="text-slate-400 shrink-0" size={14} />
              <p className="text-[11px] text-muted-foreground">
                Letters, numbers and underscore allowed. Must be lowercase.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle size={16} />}
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeUserNamePopup;