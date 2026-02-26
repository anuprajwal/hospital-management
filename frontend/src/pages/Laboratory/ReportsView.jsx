import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  Hospital, 
  User, 
  Fingerprint, 
  Calendar,
  AlertCircle,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const reportData = [
  { parameter: "Hemoglobin", result: "14.2", unit: "g/dL", range: "13.5 - 17.5", flag: "Normal" },
  { parameter: "RBC Count", result: "4.8", unit: "10^6/µL", range: "4.5 - 5.9", flag: "Normal" },
  { parameter: "WBC Count", result: "11.5", unit: "10^3/µL", range: "4.5 - 11.0", flag: "High" },
  { parameter: "Platelets", result: "250", unit: "10^3/µL", range: "150 - 450", flag: "Normal" },
  { parameter: "Hematocrit", result: "42", unit: "%", range: "41 - 50", flag: "Normal" },
];

export default function LabReportView() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans print:bg-white">
      <div className="max-w-5xl mx-auto px-4 py-6 md:px-10 print:p-0">
        
        {/* Top Navigation Bar (Hidden on Print) */}
        <header className="flex items-center justify-between mb-8 border-b pb-4 print:hidden">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="size-5" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight uppercase">Blood Test - CBC</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Report ID: #RPT-2023-99283</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none px-3 py-1 font-bold gap-1">
              <CheckCircle2 className="size-3.5" />
              Test Completed
            </Badge>
            <Button onClick={handlePrint} className="font-bold gap-2 shadow-lg shadow-primary/20">
              <Download className="size-4" />
              Download PDF Report
            </Button>
          </div>
        </header>

        {/* Printable Report Container */}
        <Card className="shadow-2xl border-slate-200 dark:border-zinc-800 overflow-hidden print:shadow-none print:border-none rounded-xl">
          
          {/* Hospital Header Section */}
          <div className="relative h-48 bg-primary/5 dark:bg-primary/10 flex items-end p-8 border-b">
            <div className="absolute top-8 right-8 text-right hidden md:block">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Laboratory Report</p>
              <p className="text-muted-foreground text-xs font-medium mt-1">Accredited ISO 15189</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="size-20 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
                <Hospital className="size-10" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">City General Hospital</h2>
                <p className="text-muted-foreground mt-2 font-medium">Main Laboratory Department, Medical Plaza Ext. 4</p>
              </div>
            </div>
          </div>

          {/* Patient Info Section */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-50/50 dark:bg-zinc-900/50">
            <InfoBlock 
              label="Patient Name" 
              value="Johnathan Doe" 
              sub="Male, 34 Years" 
              icon={<User className="size-4 text-primary" />} 
            />
            <InfoBlock 
              label="Patient ID / Case" 
              value="PID-99283-X" 
              sub="Referral: Dr. Sarah Smith" 
              icon={<Fingerprint className="size-4 text-primary" />} 
            />
            <div className="space-y-2">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Dates</p>
              <div className="space-y-1">
                <p className="text-xs font-medium"><span className="text-muted-foreground">Collected:</span> Oct 24, 2023, 08:30 AM</p>
                <p className="text-xs font-medium"><span className="text-muted-foreground">Reported:</span> Oct 25, 2023, 11:15 AM</p>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="px-8 py-8">
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-100 dark:bg-zinc-800">
                  <TableRow>
                    <TableHead className="font-bold uppercase text-[11px] text-slate-900 dark:text-white">Parameter</TableHead>
                    <TableHead className="text-center font-bold uppercase text-[11px] text-slate-900 dark:text-white">Result</TableHead>
                    <TableHead className="font-bold uppercase text-[11px] text-slate-900 dark:text-white">Unit</TableHead>
                    <TableHead className="font-bold uppercase text-[11px] text-slate-900 dark:text-white">Normal Range</TableHead>
                    <TableHead className="text-right font-bold uppercase text-[11px] text-slate-900 dark:text-white">Flag</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((row, i) => (
                    <TableRow key={i} className={row.flag === "High" ? "bg-primary/[0.03] dark:bg-primary/[0.07]" : ""}>
                      <TableCell className={`font-bold ${row.flag === "High" ? "text-primary" : ""}`}>{row.parameter}</TableCell>
                      <TableCell className="text-center">
                        <span className={`text-base font-black ${row.flag === "High" ? "text-primary underline underline-offset-4" : ""}`}>
                          {row.result}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs font-medium">{row.unit}</TableCell>
                      <TableCell className="text-muted-foreground text-xs font-medium italic">{row.range}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={row.flag === "High" ? "default" : "secondary"} className="uppercase text-[10px] font-black tracking-tighter">
                          {row.flag}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Clinical Interpretation Section */}
            <div className="mt-8 p-5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border-l-4 border-primary">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="size-4 text-primary" />
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Technician Notes & Interpretation</p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                The WBC count is slightly elevated, suggesting a potential inflammatory response or mild infection. 
                Hemoglobin and platelet levels are within normal physiological ranges. 
                Correlation with clinical symptoms is advised.
              </p>
            </div>
          </div>

          {/* Signatures Section */}
          <div className="px-8 pb-12 pt-8 grid grid-cols-1 md:grid-cols-2 gap-16">
            <SignatureBlock 
              name="Dr. Sarah Smith" 
              title="Pathologist (Reg No: MD-12004)" 
              label="Doctor Signature" 
              signatureText="Sarah Smith"
            />
            <SignatureBlock 
              name="Robert Johnson" 
              title="Sr. Lab Technician (MLT-882)" 
              label="Lab Technician Signature" 
              isVerified 
            />
          </div>

          {/* Report Footer */}
          <footer className="bg-slate-50 dark:bg-zinc-900 py-5 px-8 border-t flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
            <span>Computer Generated Report - Valid without seal</span>
            <span>Page 01 of 01</span>
            <span>© City General Hospital 2026</span>
          </footer>
        </Card>

        {/* Footer Help Link (Hidden on Print) */}
        <div className="mt-8 flex justify-center print:hidden">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Need help understanding your results? 
            <Button variant="link" className="text-primary font-black p-0 h-auto gap-1">
              View Result Guide <ExternalLink className="size-3" />
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Internal Helper Components
function InfoBlock({ label, value, sub, icon }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
        {label}
      </p>
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-base font-bold tracking-tight">{value}</p>
      </div>
      <p className="text-xs text-muted-foreground font-medium">{sub}</p>
    </div>
  );
}

function SignatureBlock({ name, title, label, signatureText, isVerified }) {
  return (
    <div className="space-y-4">
      <div className="h-20 flex items-end justify-center">
        <div className="w-full border-b-2 border-slate-200 dark:border-zinc-800 relative">
          {signatureText && (
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-3xl font-serif text-slate-300 italic opacity-40 select-none">
              {signatureText}
            </span>
          )}
          {isVerified && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
              <ShieldCheck className="size-10 text-slate-400" />
              <span className="text-[8px] font-black uppercase tracking-tighter">Verified Digitally</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-black tracking-tight">{name}</p>
        <p className="text-xs text-muted-foreground font-medium">{title}</p>
        <p className="text-[10px] font-black text-primary uppercase mt-2 tracking-widest">{label}</p>
      </div>
    </div>
  );
}