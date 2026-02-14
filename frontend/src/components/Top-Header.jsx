import React from 'react';
import { LogOut, Hospital } from 'lucide-react';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const TopHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background px-6 z-20">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 text-primary-foreground">
          <img src="../../public/Logo.jpeg" className="w-10 h-10" />
        </div>
        <h2 className="text-lg font-bold tracking-tight">HMS</h2>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3">
          {/* User Info */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none">System Admin</p>
            <p className="text-xs text-muted-foreground mt-1">Hospital Admin Panel</p>
          </div>

          {/* Profile Avatar */}
          <Avatar className="w-10 h-10 border border-slate-200 dark:border-slate-700">
            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuADNpmrtRneVZTmFcMaHxkNCSghvNfLTrJty5dFOgiBEpgE15p-8C5nFcUU4WdUC96T5RRcbpWHYwBMA2FnZrKftuUVOA4w4Gj-x4xQsg9jMifs1WtQGcTDCU1dDcX5RVpIkCCvxr2QLCDgUkDMuhcU98UZWrViEtNWDNOw3qzZOQBEPohFaQiuBM5vy3SSEiE2I7eoDlkPtd3TXfabY4D8JZNv4sJM_A8RM__pDRZZs1kb9a-neoH3oc-xhcqikrvS4eRH-ecrlCE" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>

          {/* Logout Button */}
          <Button variant="outline" size="icon" className="rounded-lg">
            <LogOut className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;