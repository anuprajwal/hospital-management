import React from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit3, 
  Ban, 
  CheckCircle2, 
  Stethoscope, 
  Microscope, 
  Package, 
  AlertCircle 
} from 'lucide-react';

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const services = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    category: "Test",
    description: "Standard hematology panel measuring red cells, white cells, and platelets.",
    price: "₹ 850",
    status: "active",
    icon: <Microscope className="w-5 h-5" />
  },
  {
    id: 2,
    name: "Specialist Consultation",
    category: "Consultation",
    description: "30-minute session with a Senior Consultant (Cardiology, Neurology, or Oncology).",
    price: "₹ 1,500",
    status: "active",
    icon: <Stethoscope className="w-5 h-5" />
  },
  {
    id: 3,
    name: "Executive Health Checkup",
    category: "Package",
    description: "Comprehensive full body screening: 60+ tests, cardiac profile, and GP review.",
    price: "₹ 12,499",
    status: "active",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 4,
    name: "Laparoscopic Appendix",
    category: "Procedure",
    description: "Service currently unavailable. Reviewing cost of surgical consumables.",
    price: "₹ 45,000",
    status: "inactive",
    icon: <AlertCircle className="w-5 h-5" />
  }
];

const PricingManagement = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* Header Section */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur px-6 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1.5 rounded-lg">
              <Plus className="w-5 h-5 text-primary-foreground rotate-45" />
            </div>
            <h2 className="text-lg font-bold">Hospital Admin</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Global search..."
                className="pl-8 w-[200px] lg:w-[300px] bg-muted/50"
              />
            </div>
            <div className="flex items-center gap-3 border-l pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold leading-none">Dr. Sarah Smith</p>
                <p className="text-xs text-muted-foreground mt-1">Administrator</p>
              </div>
              <Avatar>
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhc5iVtLXgyE5hR2Rzv9WhGWepN_B9ruyNGE_jWke9FkHJLPaUazksUGml7tZGu9duOabfUJxjUDrOBy4rpUtiy3Pbt6ia19i8I9zyB7Zll0mDLaq51S0d74eO97o7SQMYhvFJvKRqbhStjOxO-Dj0GPX1p1QBSxHGCchvL8x_gl32CH2TZk_2T9C2Ozc0CNOycVj_3dcjdK7_ymrE8zzfrngJG--3Zi4YgLLx-iG6eGbx8z9Sx9dE46Zxk-pVpkqZKRoKfo6b2kQ" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:px-20 py-10 container max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          
          {/* Page Title & Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Pricing & Charges</h1>
              <p className="text-muted-foreground">Manage tests, packages, and hospital expenses.</p>
            </div>
            <Button className="shadow-lg shadow-primary/20 gap-2">
              <Plus className="w-4 h-4" /> Create New Pricing
            </Button>
          </div>

          {/* Filter Toolbar */}
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardContent className="p-4 flex flex-wrap items-end gap-4">
              <div className="space-y-1.5 flex-1 min-w-[200px]">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Category</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-muted/40">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="package">Package</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 flex-[2] min-w-[280px]">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Search Service</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9 bg-muted/40" placeholder="Search by name or description..." />
                </div>
              </div>

              <div className="space-y-1.5 flex-1 min-w-[240px]">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Status</label>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Table Representation */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[300px]">Service Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id} className={service.status === 'inactive' ? 'opacity-60 grayscale-[0.5]' : ''}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${service.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {service.icon}
                        </div>
                        <div>
                          <p className={`font-bold ${service.status === 'inactive' ? 'line-through' : ''}`}>
                            {service.name}
                          </p>
                          <Badge variant={service.status === 'active' ? "secondary" : "outline"} className="text-[10px] px-1 py-0 h-4 mt-1">
                            {service.category}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-md">
                      {service.description}
                    </TableCell>
                    <TableCell className="font-extrabold text-lg tracking-tight">
                      {service.price}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className={`h-8 w-8 ${service.status === 'active' ? 'text-muted-foreground hover:text-destructive' : 'text-green-600 hover:bg-green-50'}`}>
                          {service.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Pagination */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Showing <span className="font-bold text-foreground">5</span> of <span className="font-bold text-foreground">124</span> results</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingManagement;