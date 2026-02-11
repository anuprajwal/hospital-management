import React, { useState } from 'react';
import { TriangleAlert, Trash2, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DeleteUserDialog = ({ triggerElement, onConfirm }) => {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const isConfirmed = confirmText === "DELETE";

  const handleAction = async (e) => {
    e.preventDefault(); // Prevent modal from closing immediately
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
    setConfirmText("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {triggerElement || (
          <Button variant="destructive" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md p-0 overflow-hidden border-slate-200 dark:border-slate-800">
        {/* Warning Header Section */}
        <div className="p-6 pb-0 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
            <TriangleAlert className="w-6 h-6 text-red-600 dark:text-red-500" />
          </div>
          <div className="pt-1">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                Delete User?
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                You are about to permanently delete this user. This action is{" "}
                <span className="text-red-600 dark:text-red-500 font-bold">
                  IRREVERSIBLE
                </span>{" "}
                and will revoke all access immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
        </div>

        {/* Confirmation Input Area */}
        <div className="p-6">
          <Label
            htmlFor="confirm_delete"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3"
          >
            Type{" "}
            <span className="text-slate-900 dark:text-white font-bold px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
              DELETE
            </span>{" "}
            to confirm
          </Label>
          <Input
            id="confirm_delete"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full"
            placeholder="DELETE"
          />
        </div>

        {/* Modal Footer */}
        <AlertDialogFooter className="bg-slate-50 dark:bg-slate-800/50 p-6 flex items-center justify-end gap-3">
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            disabled={!isConfirmed || isDeleting}
            onClick={handleAction}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;