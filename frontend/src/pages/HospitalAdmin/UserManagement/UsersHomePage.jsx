import React, { useEffect, useState, useCallback } from 'react';
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
import CreateUserModal from './CreateUsers';
import DeleteUserDialog from './DeleteAlert';
import { fetchUsersOverview, changeUserStatus, deleteUserAccount } from "./apis"


const UserManagement = () => {

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({ total: 0, limit: 5, offset: 0 });
  const [filters, setFilters] = useState({ search: "", role: "all" });

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    
    // Prepare params for API
    const params = {
      limit: pagination.limit,
      offset: pagination.offset,
    };
    if (filters.search) params.search = filters.search;
    if (filters.role !== "all") params.role = filters.role;

    const result = await fetchUsersOverview(params);
    
    if (result.ok) {
      setUserList(result.data.users);
      setPagination(prev => ({ ...prev, total: result.data.total_users }));
    }
    setIsLoading(false);
  }, [pagination.limit, pagination.offset, filters]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Approve" ? "Frozen" : "active";
    const result = await changeUserStatus(userId, newStatus);
    if (result.ok) {
      setUserList(prev => prev.map(u => u.uid === userId ? { ...u, status: newStatus } : u));
    }
  };

  const handleDelete = async (userId) => {
    const result = await deleteUserAccount(userId);
    if (result.ok) {
      setUserList(prev => prev.filter(u => u.uid !== userId));
    }
  };


  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
    setPagination(prev => ({ ...prev, offset: 0 })); // Reset to page 1 on search
  };

  const handleRoleChange = (value) => {
    setFilters(prev => ({ ...prev, role: value }));
    setPagination(prev => ({ ...prev, offset: 0 })); // Reset to page 1 on filter
  };

  const handlePageChange = (newOffset) => {
    setPagination(prev => ({ ...prev, offset: newOffset }));
  };


  const variantStyles = {
    primary: "bg-primary/10 text-primary border-primary/20",
    teal: "bg-emerald-100/50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400",
    purple: "bg-purple-100/50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400",
    orange: "bg-orange-100/50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
    slate: "bg-slate-100 text-slate-500 border-slate-200"
  };

  console.log(userList)


  return (
    <div
      className="bg-background-light dark:bg-background-dark min-h-screen font-display text-slate-800 dark:text-slate-200">

      <main className="max-w-7xl mx-auto px-6 py-8">
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
          <CreateUserModal
            triggerElement={
              <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2 px-5 font-semibold">
                <Plus className="w-4 h-4" />
                Create New User
              </Button>
            }
          />
        </div>


        {/* Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center mb-6 shadow-sm">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search username or ID..."
              className="pl-10"
            />
          </div>

          <Select value={filters.role} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Receptionist">Receptionist</SelectItem>
              <SelectItem value="Lab_Incharge">Lab Technician</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">Loading Users...</div>
        ) : (
          <div className="space-y-4">
            {userList.map((user) => (
              <div
                key={user.id}
                className={cn(
                  "bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-6 shadow-sm transition-all",
                  user.status === "Approve" ? "hover:shadow-md" : "opacity-60 grayscale-[0.5]"
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
                      {user.user_name}
                    </h3>
                    {user.status === "Frozen" && (
                      <Badge variant="destructive" className="text-[10px] font-black uppercase px-1.5 py-0 h-4">
                        Frozen
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    UID: {user.id}
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
                  {user.created_at}
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-6 ml-auto">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                    <Switch
                      checked={user.status === "Approve"}
                      onCheckedChange={() => handleToggleStatus(user.id, user.status)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  <DeleteUserDialog
                    onConfirm={() => handleDelete(user.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}




        {/* Footer / Pagination Section */}
        <div className="mt-8 flex items-center justify-between border-t pt-6">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold">{userList.length}</span> of{" "}
            <span className="font-bold">{pagination.total}</span> users
          </p>

          <Pagination className="justify-end w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <Button 
                    variant="ghost" 
                    disabled={pagination.offset === 0}
                    onClick={() => handlePageChange(pagination.offset - pagination.limit)}
                >
                    <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
              </PaginationItem>

              <PaginationItem>
                <Button 
                    variant="ghost" 
                    disabled={pagination.offset + pagination.limit >= pagination.total}
                    onClick={() => handlePageChange(pagination.offset + pagination.limit)}
                >
                    Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;