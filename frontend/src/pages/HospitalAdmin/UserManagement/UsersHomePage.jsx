import React, { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Trash2,
  Info,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getInitials } from "@/lib/utils";
import CreateUserModal from './CreateUsers';
import DeleteUserDialog from './DeleteAlert';
import { fetchUsersOverview, changeUserStatus, deleteUserAccount } from "./apis";
import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, limit: 5, offset: 0 });
  const [filters, setFilters] = useState({ search: "", role: "all" });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsUser, setDetailsUser] = useState(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    const params = { limit: pagination.limit, offset: pagination.offset };
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
    const newStatus = currentStatus === "Approve" ? "Frozen" : "Approve";
    const result = await changeUserStatus(userId, newStatus);
    if (result.ok) {
      setUserList(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    }
  };

  const handleDelete = async (userId) => {
    const result = await deleteUserAccount(userId);
    if (result.ok) {
      setUserList(prev => prev.filter(u => u.id !== userId));
    }
    setDeleteOpen(false);
    setDeleteUserId(null);
  };

  const openDeleteDialog = (userId) => {
    setDeleteUserId(userId);
    setDeleteOpen(true);
  };

  const openDetailsDialog = (user) => {
    setDetailsUser(user);
    setDetailsOpen(true);
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
    setPagination(prev => ({ ...prev, offset: 0 }));
  };

  const handleRoleChange = (value) => {
    setFilters(prev => ({ ...prev, role: value }));
    setPagination(prev => ({ ...prev, offset: 0 }));
  };

  const handlePageChange = (newOffset) => {
    setPagination(prev => ({ ...prev, offset: newOffset }));
  };

  const toggleSelectAll = (checked) => {
    if (checked) setSelectedIds(new Set(userList.map(u => u.id)));
    else setSelectedIds(new Set());
  };

  const toggleSelectOne = (id, checked) => {
    if (checked) setSelectedIds(prev => new Set([...prev, id]));
    else setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const variantStyles = {
    primary: "bg-primary/10 text-primary border-primary/20",
    teal: "bg-emerald-100/50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400",
    purple: "bg-purple-100/50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400",
    orange: "bg-orange-100/50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
    slate: "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      <div className="flex-shrink-0 h-full">
        <DynamicNavbar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="w-full">
            {/* Toolbar: title left, actions right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Users & Access</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Manage staff accounts and permissions.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CreateUserModal
                  triggerElement={
                    <Button variant="secondary" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add User
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Filters */}
            <Card className="mb-4">
              <CardContent className="p-3 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    value={filters.search}
                    onChange={handleSearchChange}
                    placeholder="Search by name or ID..."
                    className="pl-9 h-9"
                  />
                </div>
                <Select value={filters.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-full sm:w-40 h-9">
                    <SelectValue placeholder="All roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                    <SelectItem value="Lab_Incharge">Lab Technician</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <Table className="text-[15px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-10 pr-0">
                      <Checkbox
                        checked={userList.length > 0 && selectedIds.size === userList.length}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="font-medium text-muted-foreground">User</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Role</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Created</TableHead>
                    <TableHead className="font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><div className="h-4 w-4 rounded bg-muted/50 animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-32 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-20 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-16 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell><div className="h-5 w-24 bg-muted/50 rounded animate-pulse" /></TableCell>
                        <TableCell />
                      </TableRow>
                    ))
                  ) : (
                    userList.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="pr-0">
                          <Checkbox
                            checked={selectedIds.has(user.id)}
                            onCheckedChange={(c) => toggleSelectOne(user.id, c)}
                            aria-label={`Select ${user.user_name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-border">
                              <AvatarFallback className={cn("text-xs font-semibold text-foreground", variantStyles[user.variant])}>
                                {user.initials ?? getInitials(user.user_name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">{user.user_name}</div>
                              <div className="text-xs text-muted-foreground">UID: {user.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn("text-xs font-normal", variantStyles[user.variant])}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.created_at}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {user.status === "Frozen" ? (
                              <Badge variant="destructive" className="text-xs">Frozen</Badge>
                            ) : (
                              <Badge className="bg-muted text-muted-foreground text-xs">Active</Badge>
                            )}
                            <Switch
                              checked={user.status === "Approve"}
                              onCheckedChange={() => handleToggleStatus(user.id, user.status)}
                              className="data-[state=checked]:bg-secondary"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => openDetailsDialog(user)}
                              aria-label="View user details"
                            >
                              <Info className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    openDeleteDialog(user.id);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>

            {/* Pagination */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Showing {userList.length} of {pagination.total} users
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={pagination.offset === 0}
                      onClick={() => handlePageChange(pagination.offset - pagination.limit)}
                    >
                      <PaginationPrevious className="h-4 w-4" />
                      Previous
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={pagination.offset + pagination.limit >= pagination.total}
                      onClick={() => handlePageChange(pagination.offset + pagination.limit)}
                    >
                      Next
                      <PaginationNext className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </main>
      </div>

      <DeleteUserDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeleteUserId(null);
        }}
        onConfirm={() => deleteUserId != null && handleDelete(deleteUserId)}
      />

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User details</DialogTitle>
          </DialogHeader>
          {detailsUser && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border border-border">
                  <AvatarFallback className={cn("text-lg font-semibold text-foreground", variantStyles[detailsUser.variant])}>
                    {detailsUser.initials ?? getInitials(detailsUser.user_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{detailsUser.user_name}</p>
                  <p className="text-sm text-muted-foreground">UID: {detailsUser.id}</p>
                </div>
              </div>
              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between gap-4 py-2 border-b border-border">
                  <dt className="text-muted-foreground">Role</dt>
                  <dd>
                    <Badge variant="secondary" className={cn("text-xs", variantStyles[detailsUser.variant])}>
                      {detailsUser.role}
                    </Badge>
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-border">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>
                    {detailsUser.status === "Frozen" ? (
                      <Badge variant="destructive" className="text-xs">Frozen</Badge>
                    ) : (
                      <Badge className="bg-muted text-muted-foreground text-xs">Active</Badge>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-2">
                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="text-foreground">{detailsUser.created_at}</dd>
                </div>
              </dl>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
