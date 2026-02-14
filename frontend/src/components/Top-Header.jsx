import React, {useState} from 'react';
import { LogOut, UserCog, Lock, ChevronRight } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChangePasswordPopup from '../pages/Auth/Profile/ChangePasswordPopup';
import ChangeUserNamePopup from '../pages/Auth/Profile/ChangeUserNamePopup';

const TopHeader = () => {
  const navigate = useNavigate();
  const [showPassModal, setShowPassModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user_auth');
    localStorage.removeItem('user_role');

    localStorage.clear();

    navigate("/login", { replace: true });
  };
  return (
    <>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-10 h-10 border cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuADNpmrtRneVZTmFcMaHxkNCSghvNfLTrJty5dFOgiBEpgE15p-8C5nFcUU4WdUC96T5RRcbpWHYwBMA2FnZrKftuUVOA4w4Gj-x4xQsg9jMifs1WtQGcTDCU1dDcX5RVpIkCCvxr2QLCDgUkDMuhcU98UZWrViEtNWDNOw3qzZOQBEPohFaQiuBM5vy3SSEiE2I7eoDlkPtd3TXfabY4D8JZNv4sJM_A8RM__pDRZZs1kb9a-neoH3oc-xhcqikrvS4eRH-ecrlCE" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2">
              <DropdownMenuItem 
                className="flex items-center gap-3 p-2.5 cursor-pointer group"
                onClick={() => setShowUserModal(true)}
              >
                <div className="size-8 rounded-lg bg-slate-50 group-hover:bg-primary/10 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                  <UserCog size={18} />
                </div>
                <span className="text-sm font-medium">Change Username</span>
                <ChevronRight size={16} className="ml-auto text-slate-300" />
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="flex items-center gap-3 p-2.5 cursor-pointer group"
                onClick={() => setShowPassModal(true)}
              >
                <div className="size-8 rounded-lg bg-slate-50 group-hover:bg-primary/10 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <span className="text-sm font-medium">Change Password</span>
                <ChevronRight size={16} className="ml-auto text-slate-300" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          {/* <div className="cursor-pointer" onClick={handleLogout}>
            <Avatar>
              <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuADNpmrtRneVZTmFcMaHxkNCSghvNfLTrJty5dFOgiBEpgE15p-8C5nFcUU4WdUC96T5RRcbpWHYwBMA2FnZrKftuUVOA4w4Gj-x4xQsg9jMifs1WtQGcTDCU1dDcX5RVpIkCCvxr2QLCDgUkDMuhcU98UZWrViEtNWDNOw3qzZOQBEPohFaQiuBM5vy3SSEiE2I7eoDlkPtd3TXfabY4D8JZNv4sJM_A8RM__pDRZZs1kb9a-neoH3oc-xhcqikrvS4eRH-ecrlCE" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div> */}

          {/* Logout Button */}
          <Button variant="outline" size="icon" className="rounded-lg" onClick={handleLogout}>
            <LogOut className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </Button>
        </div>
      </div>
    </header>

    {/* Modals */}
    <ChangePasswordPopup open={showPassModal} onOpenChange={setShowPassModal} />
    <ChangeUserNamePopup 
      open={showUserModal} 
      onOpenChange={setShowUserModal} 
      currentUsername="rahul_reception"
    />
    </>
  );
};

export default TopHeader;
