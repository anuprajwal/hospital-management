import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit3, Ban, CheckCircle2, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getPrices, editPrice, deletePrice } from "./apis"; // Ensure your api file is named apis.js
import TopHeader from '@/components/Top-Header';
import DynamicNavbar from '@/components/DynamicNavbar';

const PricingManagement = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: '', status: 'all', page: 1 });
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPrices(filters.page, limit, filters.name, filters.status);
      setServices(res || []);
      setTotalRecords(res.total_records || 0);
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleToggleStatus = async (service) => {
    try {
      const updatedData = { 
        name: service.name, 
        price: service.price, 
        status: !service.status 
      };
      await editPrice(service.id, updatedData);
      fetchData();
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  const handleDelete = async (pricingId) => {
    if (window.confirm("Are you sure you want to delete this pricing item? This action cannot be undone.")) {
      try {
        await deletePrice(pricingId);
        fetchData(); // Refresh list after deletion
      } catch (err) {
        console.error("Delete Error:", err);
        alert("Failed to delete the record.");
      }
    }
  };

  const totalPages = Math.ceil(totalRecords / limit);


  return (
    <div className="flex flex-col h-screen bg-slate-50/50">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-white hidden lg:block overflow-y-auto">
          <DynamicNavbar />
        </aside>
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black tracking-tight">Pricing & Charges</h1>
                <p className="text-muted-foreground text-sm font-medium">Manage hospital service rates and status.</p>
              </div>
              <Button onClick={() => navigate('/create-price')} className="gap-2 h-11 px-6 font-bold shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4" /> Create New Pricing
              </Button>
            </div>

            <Card className="border-none shadow-sm bg-white dark:bg-zinc-900">
              <CardContent className="p-4 flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-[250px]">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground mb-1 block">Search Item Name</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      value={filters.name} 
                      onChange={(e) => setFilters({...filters, name: e.target.value, page: 1})}
                      placeholder="e.g. Consultation..." 
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
                <div className="w-72">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground mb-1 block">Filter By Status</label>
                  <Tabs value={filters.status} onValueChange={(val) => setFilters({...filters, status: val, page: 1})}>
                    <TabsList className="grid w-full grid-cols-3 h-11">
                      <TabsTrigger value="all" className="font-bold">All</TabsTrigger>
                      <TabsTrigger value="active" className="font-bold">Active</TabsTrigger>
                      <TabsTrigger value="inactive" className="font-bold">Inactive</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold uppercase text-[11px]">Service Name</TableHead>
                    <TableHead className="font-bold uppercase text-[11px]">Price</TableHead>
                    <TableHead className="font-bold uppercase text-[11px]">Status</TableHead>
                    <TableHead className="text-right font-bold uppercase text-[11px] pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-20 font-medium text-muted-foreground">Fetching records...</TableCell></TableRow>
                  ) : services.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-medium">No pricing items found.</TableCell></TableRow>
                  ) : (
                    services.map((s) => (
                      <TableRow key={s.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-bold text-slate-700 dark:text-slate-200">{s.name}</TableCell>
                        <TableCell className="font-black text-lg">₹ {s.price}</TableCell>
                        <TableCell>
                          <Badge className={`uppercase text-[10px] font-bold ${s.status ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            {s.status ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6 space-x-2">
                          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate(`/edit-price/${s.id}`, { state: s })}>
                            <Edit3 className="w-4 h-4 text-slate-500 hover:text-primary" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9" 
                            onClick={() => handleToggleStatus(s)}
                            title={s.status ? "Block Item" : "Activate Item"}
                          >
                            {s.status ? <Ban className="w-4 h-4 text-red-400 hover:text-red-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500 hover:text-emerald-700" />}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-destructive hover:bg-destructive/10" 
                            onClick={() => handleDelete(s.id)}
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center mt-6 pb-10">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Showing {services.length} of {totalRecords} Records
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="h-10 px-6 font-bold"
                  disabled={filters.page === 1} 
                  onClick={() => setFilters({...filters, page: filters.page - 1})}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  className="h-10 px-6 font-bold"
                  disabled={filters.page >= totalPages} 
                  onClick={() => setFilters({...filters, page: filters.page + 1})}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PricingManagement;