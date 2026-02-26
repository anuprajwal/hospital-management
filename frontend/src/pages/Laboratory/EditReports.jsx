import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RotateCcw, CheckCircle, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { toast } from "sonner";

import { updateTest } from './apis';
import { getPrices } from '../HospitalAdmin/Pricing/apis';
import TopHeader from '@/components/Top-Header';
import Navbar from '@/components/DynamicNavbar';

export default function LabTestEntry() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.testData;

  const [saving, setSaving] = useState(false);
  const [testData, setTestData] = useState(initialData || {});
  const [comments, setComments] = useState(initialData?.comments || "");

  const [parameters, setParameters] = useState(() => {
    // 1. Check for existing results first
    if (initialData?.test_results) {
      try {
        const existingResults = typeof initialData.test_results === 'string' 
          ? JSON.parse(initialData.test_results) 
          : initialData.test_results;
  
        // If data exists, map it to the UI structure
        if (Array.isArray(existingResults) && existingResults.length > 0) {
          return existingResults.map(res => ({
            label: res.parameter_name,
            value: res.test_results || "0.0", // Show 0.0 if field is empty
            range: res.acceptable_range,
            status: calculateStatus(res.test_results, res.acceptable_range)
          }));
        }
      } catch (e) {
        console.error("Error parsing existing test_results", e);
      }
    }
  
    // 2. Fallback to template parameters if no results exist
    const baseParams = typeof initialData?.parameters === 'string'
      ? JSON.parse(initialData.parameters)
      : (initialData?.parameters || []);
  
    return baseParams.map(p => ({
      label: p.parameter_name || p.label,
      range: p.normal_value || p.range,
      value: "0.0", // Default for new entries
      status: "Pending"
    }));
  });

  // 1. Helper to calculate status based on range (e.g., "45-56")
  const calculateStatus = (val, rangeStr) => {
    if (!val || !rangeStr || !rangeStr.includes('-')) return 'Pending';
    
    const value = parseFloat(val);
    const [min, max] = rangeStr.split('-').map(Number);
    
    if (isNaN(value) || isNaN(min) || isNaN(max)) return 'Pending';
    if (value < min) return 'Low';
    if (value > max) return 'High';
    return 'Normal';
  };

  useEffect(() => {
    const syncParameters = async () => {
      if (!testData?.test_name) return;
  
      try {
        const response = await getPrices(1, 10, testData.test_name, 'true');
        const catalogItem = response.data?.find(item => item.name === testData.test_name);
  
        if (catalogItem && catalogItem.parameters) {
          let existingResults = [];
          if (initialData?.test_results) {
            existingResults = typeof initialData.test_results === 'string'
              ? JSON.parse(initialData.test_results)
              : initialData.test_results;
          }
  
          const mergedParams = catalogItem.parameters.map((catParam) => {
            const savedResult = existingResults.find(
              (res) => res.parameter_name === catParam.parameter_name
            );
  
            const finalValue = savedResult ? savedResult.test_results : "0.0";
            const finalRange = catParam.normal_value;
  
            return {
              label: catParam.parameter_name,
              range: finalRange,
              value: finalValue, 
              status: calculateStatus(finalValue, finalRange),
            };
          });
  
          console.log("Parameters Synced Successfully:", mergedParams);
          setParameters(mergedParams);
        } else {
          console.warn("Test blueprint not found in catalog.");
        }
      } catch (error) {
        console.error("Syncing Error:", error);
        toast.error("Failed to sync parameter blueprint.");
      }
    };
  
    syncParameters();
  }, [testData.test_name]);

  const handleStatusUpdate = async (newStatus) => {
    const statusMap = {
      'Processing': 'test processing',
      'Completed': 'test completed'
    };
    
    const dbStatus = statusMap[newStatus] || newStatus;

    setSaving(true);
    try {
      await updateTest(testData.id, { status: dbStatus });
      setTestData({ ...testData, status: dbStatus });
      toast.success(`Status updated to ${dbStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveResults = async () => {
    const incomplete = parameters.some(p => !p.value || p.value.trim() === "");
    
    if (incomplete) {
      return toast.error("Cannot upload: All parameter values must be filled.");
    }

    setSaving(true);
    try {
      const testResultsPayload = parameters.map(p => ({
        parameter_name: p.label,
        test_results: p.value,
        acceptable_range: p.range
      }));

      await updateTest(testData.id, { 
        test_results: JSON.stringify(testResultsPayload),
        status: 'test completed', 
        comments: comments 
      });

      toast.success("Results uploaded and test completed!");
      navigate('/test-list'); 
    } catch (err) {
      toast.error("Failed to upload results. Check connection.");
    } finally {
      setSaving(false);
    }
  };

  if (!initialData) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-zinc-950">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
            
            <div className="flex justify-between items-end border-b pb-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {testData.test_name}
                </h1>
                <p className="text-sm text-muted-foreground font-mono">LAB REF ID: {testData.id}</p>
              </div>
              <Badge className="mb-1 h-7 px-4 font-bold bg-primary/10 text-primary border-none">
                {testData.status}
              </Badge>
            </div>

            <Card className="border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
              <CardHeader className="flex flex-row justify-between items-center border-b bg-slate-50/50 dark:bg-zinc-900/50 py-4">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-500">Parameter Analysis</CardTitle>
                <Button onClick={handleSaveResults} disabled={saving} className="gap-2 font-bold rounded-xl h-9 px-6 shadow-lg shadow-primary/20">
                  <Save size={16} /> Save Results
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/30 dark:bg-zinc-900/30">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[30%] font-bold text-slate-700 dark:text-slate-300 pl-8">Test Parameter</TableHead>
                      <TableHead className="w-[20%] font-bold text-slate-700 dark:text-slate-300">Reference Range</TableHead>
                      <TableHead className="w-[25%] text-center font-bold text-slate-700 dark:text-slate-300">Result Value</TableHead>
                      <TableHead className="w-[15%] text-right pr-8 font-bold text-slate-700 dark:text-slate-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
  {parameters.length > 0 ? (
    parameters.map((param, index) => (
      <ResultRow 
        key={index}
        label={param.label}
        range={param.range}
        value={param.value}
        status={param.status}
        onValueChange={(newVal) => {
          const updated = [...parameters];
          updated[index].value = newVal;
          // Trigger the calculation logic here
          updated[index].status = calculateStatus(newVal, updated[index].range);
          setParameters(updated);
        }}
      />
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
        No parameters found for this test.
      </TableCell>
    </TableRow>
  )}
</TableBody>
                </Table>
                
                <div className="p-8 bg-slate-50/50 dark:bg-zinc-900/20 border-t space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Clinical Observations & Comments</label>
                  <Textarea 
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Enter clinical notes here..."
                    className="bg-white dark:bg-zinc-900 border-2 rounded-2xl min-h-[120px] focus-visible:ring-primary font-medium"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 pt-4">
              <Button 
                variant="outline" 
                disabled={saving}
                onClick={() => handleStatusUpdate('Processing')}
                className="rounded-xl font-bold h-12 px-8 border-2"
              >
                <RotateCcw className="size-4 mr-2" /> Mark Processing
              </Button>
              <Button 
                disabled={saving}
                onClick={() => handleStatusUpdate('Completed')}
                className="rounded-xl font-black h-12 px-8 bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-200 dark:shadow-none"
              >
                <CheckCircle className="size-4 mr-2" /> Finalize & Complete
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ResultRow({ label, range, value, status, onValueChange }) {
  
  const getBadgeStyle = (s) => {
    switch (s) {
      case 'Normal': return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case 'High': return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case 'Low': return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      default: return "bg-slate-100 text-slate-400";
    }
  };

  const getinputStyle = (s) => {
    if (s === 'High') return "border-red-200 bg-red-50/30 text-red-700";
    if (s === 'Low') return "border-amber-200 bg-amber-50/30 text-amber-700";
    if (s === 'Normal') return "border-green-200 bg-green-50/30 text-green-700";
    return "bg-white dark:bg-zinc-900";
  };

  return (
    <TableRow className="border-b last:border-0 hover:bg-slate-50/30 dark:hover:bg-zinc-900/30 transition-colors">
      <TableCell className="pl-8 py-5 font-bold text-slate-800 dark:text-slate-200">{label}</TableCell>
      <TableCell className="py-5 font-mono text-xs text-muted-foreground">{range}</TableCell>
      <TableCell className="py-5">
        <div className="flex justify-center">
          <Input 
            value={value} 
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="0.0"
            className={`h-11 w-32 font-black text-center text-lg rounded-xl border-2 transition-all ${getinputStyle(status)}`} 
          />
        </div>
      </TableCell>
      <TableCell className="pr-8 py-5 text-right">
        <Badge className={`px-3 py-1 rounded-full text-[10px] font-black tracking-tight border-none ${getBadgeStyle(status)}`}>
          {status}
        </Badge>
      </TableCell>
    </TableRow>
  );
}