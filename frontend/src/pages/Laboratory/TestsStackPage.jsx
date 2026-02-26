import React, { useState, useEffect, useCallback } from 'react';
import {
  RefreshCw,
  Search,
  Calendar,
  CheckCircle2,
  ExternalLink, Loader2, AlertCircle
} from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';

import { fetchPatientTests } from './apis';

const StatusBadge = ({ status }) => {
  const styles = {
    "Processing": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-none",
    "Payment Done": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none",
    "Completed": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none",
  };

  return (
    <Badge className={`${styles[status] || 'bg-slate-100'} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5`}>
      {status === "Completed" ? <CheckCircle2 size={14} /> : <span className="w-2 h-2 rounded-full bg-current animate-pulse" />}
      {status}
    </Badge>
  );
};

const LabTestPanel = () => {
  // State Management
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  // Filter States
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const loadTests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPatientTests({
        status: statusFilter,
        search: searchQuery,
        page: page,
        limit: 10
      });
      setTests(result.data);
      setTotalRecords(result.total);
    } catch (err) {
      setError("Failed to load laboratory tests. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery, page]);

  useEffect(() => {
    // Debounce search to avoid spamming API on every keystroke
    const timer = setTimeout(() => {
      loadTests();
    }, 400);
    return () => clearTimeout(timer);
  }, [loadTests]);

  const handleClearFilters = () => {
    setStatusFilter("all");
    setSearchQuery("");
    setPage(1);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-zinc-950 font-sans">
      {/* Sidebar - (Keep your existing Sidebar code) */}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-zinc-900/50 border-b border-slate-200 dark:border-slate-800 px-8 py-6 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Lab Test Panel</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {loading ? "Updating records..." : `Showing ${tests.length} of ${totalRecords} records`}
              </p>
            </div>
            <Button onClick={loadTests} disabled={loading} variant="outline" className="rounded-xl font-bold gap-2">
              <RefreshCw size={18} className={`${loading ? 'animate-spin' : ''} text-primary`} />
              Refresh
            </Button>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
            <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setPage(1); }}>
              <SelectTrigger className="w-full md:w-64 bg-slate-50 dark:bg-zinc-800/50 rounded-xl h-11 font-medium">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Payment Done">Payment Done</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <Input
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="w-full pl-10 h-11 bg-slate-50 dark:bg-zinc-800/50 rounded-xl"
                placeholder="Search by Test ID or Name"
              />
            </div>
            <Button variant="ghost" onClick={handleClearFilters} className="text-muted-foreground font-bold hover:text-primary">
              Clear Filters
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1 p-8">
          <div className="space-y-4 max-w-6xl mx-auto pb-8">
            {/* Loading State */}
            {loading && tests.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p className="font-medium">Fetching laboratory data...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
                <CardContent className="p-6 flex items-center gap-3 text-red-600">
                  <AlertCircle size={20} />
                  <p className="font-bold">{error}</p>
                  <Button variant="link" onClick={loadTests} className="text-red-600 font-bold p-0 ml-auto">Retry</Button>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {!loading && tests.length === 0 && !error && (
              <div className="text-center py-20 border-2 border-dashed rounded-3xl border-slate-200">
                <p className="text-slate-400 font-medium">No tests found matching your criteria.</p>
              </div>
            )}

            {/* Data Results */}
            {tests.map((test) => (
              <Card key={test.id} className="transition-all hover:shadow-md border-slate-200 dark:border-zinc-800">
                <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{test.test_name}</span>
                      <Badge variant="secondary" className="font-mono text-[10px] px-1.5 py-0">{test.id}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                      <Calendar size={14} className="text-primary" />
                      {test.created_on}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <StatusBadge status={test.status} />

                    <Button
                      onClick={() => navigate('/test-entry', { state: { testData: test } })} // Pass data here
                      className="rounded-lg h-10 px-6 font-bold shadow-sm gap-2"
                    >
                      Open Test
                      <ExternalLink size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Simple Pagination Controls */}
            {totalRecords > 10 && (
              <div className="flex justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  disabled={page === 1 || loading}
                  onClick={() => setPage(p => p - 1)}
                >Previous</Button>
                <Button
                  variant="outline"
                  disabled={tests.length < 10 || loading}
                  onClick={() => setPage(p => p + 1)}
                >Next</Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};


export default LabTestPanel;