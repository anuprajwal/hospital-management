import React from 'react';
import { 
  Plus, 
  Search, 
  ListFilter, 
  ChevronLeft, 
  ChevronRight, Trash2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";



const users = [
    {
      name: "Dr. Julianne Danvers",
      initials: "JD",
      uid: "8820-MED-99",
      role: "Doctor",
      created: "Oct 14, 2023 • 09:30 AM",
      status: "active",
      variant: "primary"
    },
    {
      name: "Marcus Knight",
      initials: "MK",
      uid: "4412-ADM-01",
      role: "Reception",
      created: "Nov 02, 2023 • 02:15 PM",
      status: "active",
      variant: "teal"
    },
    {
      name: "Brendan Walker",
      initials: "BW",
      uid: "2190-STF-05",
      role: "Pharmacist",
      created: "Sep 28, 2023 • 11:20 AM",
      status: "frozen",
      variant: "slate"
    },
    {
      name: "Sarah Rogers",
      initials: "SR",
      uid: "0001-SYS-99",
      role: "Admin",
      created: "Jan 12, 2023 • 08:00 AM",
      status: "active",
      variant: "purple"
    },
    {
      name: "Tom Chang",
      initials: "TC",
      uid: "3345-NRS-22",
      role: "Nurse",
      created: "Dec 19, 2023 • 06:45 PM",
      status: "active",
      variant: "orange"
    }
  ];

const UserManagement = () => {
    const variantStyles = {
        primary: "bg-primary/10 text-primary border-primary/20",
        teal: "bg-emerald-100/50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400",
        purple: "bg-purple-100/50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400",
        orange: "bg-orange-100/50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
        slate: "bg-slate-100 text-slate-500 border-slate-200"
      };
  return (
    <div
        class="bg-background-light dark:bg-background-dark min-h-screen font-display text-slate-800 dark:text-slate-200">
        
        <main class="max-w-7xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Users & Access Control
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage hospital staff credentials and system permission levels.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2 px-5 font-semibold">
          <Plus className="w-4 h-4" />
          Create New User
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center mb-6 shadow-sm">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Search username, ID, or email..."
            className="w-full pl-10 bg-slate-50 dark:bg-slate-800 border-transparent focus-visible:ring-primary focus-visible:border-primary"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48 bg-slate-50 dark:bg-slate-800 border-transparent">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="nurse">Nurse</SelectItem>
              <SelectItem value="reception">Reception</SelectItem>
              <SelectItem value="pharmacist">Pharmacist</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            size="icon" 
            className="border-slate-200 dark:border-slate-800 shrink-0"
          >
            <ListFilter className="w-4 h-4 text-slate-500" />
          </Button>
        </div>
      </div>


      <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.uid}
          className={cn(
            "bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-6 shadow-sm transition-all",
            user.status === "active" ? "hover:shadow-md" : "opacity-60 grayscale-[0.5]"
          )}
        >
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <Avatar className="w-14 h-14 border-2 border-slate-100 dark:border-slate-800">
              <AvatarFallback className={cn("font-bold text-lg", variantStyles[user.variant])}>
                {user.initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
                {user.name}
              </h3>
              {user.status === "frozen" && (
                <Badge variant="destructive" className="text-[10px] font-black uppercase px-1.5 py-0 h-4">
                  Frozen
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              UID: {user.uid}
            </p>
          </div>

          {/* Role Badge */}
          <div className="hidden lg:block w-32">
            <Badge variant="outline" className={cn("uppercase tracking-wide text-[10px] font-bold", variantStyles[user.variant])}>
              {user.role}
            </Badge>
          </div>

          {/* Created Date */}
          <div className="hidden md:block w-48 text-sm text-slate-500">
            <p className="text-xs uppercase font-bold text-slate-400 mb-0.5">Created On</p>
            {user.created}
          </div>

          {/* Status & Actions */}
          <div className="flex items-center gap-6 ml-auto">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
              <Switch 
                checked={user.status === "active"} 
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>

      {/* Footer / Pagination Section */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 gap-4">
        <p className="text-sm text-slate-500">
          Showing <span className="font-bold text-slate-900 dark:text-white">5</span> of{" "}
          <span className="font-bold text-slate-900 dark:text-white">128</span> users
        </p>

        <Pagination className="justify-end w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                className="border border-slate-200 dark:border-slate-800 opacity-50 pointer-events-none" 
              />
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext 
                href="#" 
                className="border border-slate-200 dark:border-slate-800"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
    </div>
  );
};

export default UserManagement;