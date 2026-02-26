import React from 'react';
import { 
  ReceiptText, 
  Printer, 
  Download, 
  Store, 
  User, 
  Calendar, 
  BadgeCheck,
  CreditCard,
  History,
  Info
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const receiptItems = [
  { name: "Paracetamol 500mg", batch: "B-902", exp: "12/26", qty: 10, price: 2.00 },
  { name: "Amoxicillin 250mg", batch: "A-441", exp: "05/27", qty: 6, price: 12.00 },
  { name: "Vitamin C Strips", batch: "V-112", exp: "01/28", qty: 2, price: 15.00 },
];

export default function PharmacyReceipt() {
  const subtotal = receiptItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center py-10 px-4 font-sans print:p-0 print:bg-white">
      
      {/* Action Bar (Hidden on Print) */}
      <Card className="no-print w-full max-w-[800px] mb-6 shadow-sm border-slate-200 dark:border-zinc-800">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <ReceiptText className="size-5 text-primary" />
            <span className="font-black text-sm uppercase tracking-tight">Pharmacy Receipt Preview</span>
          </div>
          <div className="flex gap-3">
            <Button onClick={handlePrint} className="font-bold gap-2 shadow-lg shadow-primary/20">
              <Printer className="size-4" /> Print Receipt
            </Button>
            <Button variant="secondary" className="font-bold gap-2">
              <Download className="size-4" /> PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Receipt Container */}
      <Card className="w-full max-w-[800px] shadow-2xl border-slate-200 dark:border-zinc-800 p-2 print:shadow-none print:border-none rounded-2xl overflow-hidden">
        <CardContent className="p-8 md:p-12 flex flex-col gap-10">
          
          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-start border-b border-slate-100 dark:border-zinc-800 pb-10 gap-8">
            <div className="flex items-center gap-5">
              <div className="size-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                <Store className="size-10" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                  City Hospital & Medical Center
                </h1>
                <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mt-1">Pharmacy Division | Tax Invoice</p>
              </div>
            </div>
            <div className="text-left md:text-right space-y-1">
              <p className="font-bold text-sm">123 Healthcare Lane, Medical District</p>
              <p className="text-muted-foreground text-xs font-medium">Bangalore, KA 560001</p>
              <p className="text-muted-foreground text-xs font-medium">Contact: +91 98765 43210</p>
              <Badge variant="outline" className="text-[10px] font-mono mt-2 border-slate-200 uppercase">GSTIN: 29AAAAA0000A1Z5</Badge>
            </div>
          </header>

          {/* Info Grid */}
          <section className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
            <ReceiptInfo label="Receipt No" value="R-2304" isPrimary />
            <ReceiptInfo label="Date" value="25 Feb 2026" />
            <ReceiptInfo label="Patient Name" value="John Doe" />
            <ReceiptInfo label="Prescription ID" value="PR-9034" />
            <ReceiptInfo label="Pharmacist" value="Rajesh K." />
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Payment Status</p>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold">Paid via UPI</span>
              </div>
            </div>
          </section>

          {/* Medicine Table */}
          <section className="border rounded-xl overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-zinc-900">
                <TableRow>
                  <TableHead className="font-black text-[11px] uppercase tracking-widest px-6">Medicine Name</TableHead>
                  <TableHead className="text-center font-black text-[11px] uppercase tracking-widest">Qty</TableHead>
                  <TableHead className="text-right font-black text-[11px] uppercase tracking-widest">Unit Price</TableHead>
                  <TableHead className="text-right font-black text-[11px] uppercase tracking-widest px-6">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receiptItems.map((item, i) => (
                  <TableRow key={i} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/50">
                    <TableCell className="px-6 py-4">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground mt-1">Batch: {item.batch} | Exp: {item.exp}</p>
                    </TableCell>
                    <TableCell className="text-center font-bold">{item.qty}</TableCell>
                    <TableCell className="text-right font-medium text-muted-foreground">₹ {item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right px-6 font-bold">₹ {(item.qty * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {/* Totals & Footer */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Info className="size-4" />
                <p className="text-[11px] italic leading-relaxed">
                  Medicines once sold will not be taken back. Check expiry date before use.
                </p>
              </div>
              <Badge variant="secondary" className="gap-1.5 font-bold py-1.5 px-3 uppercase text-[10px] tracking-widest border-none">
                <BadgeCheck className="size-3.5" />
                Computer Generated Receipt
              </Badge>
            </div>

            <div className="w-full md:w-72 space-y-3">
              <div className="flex justify-between text-sm font-medium text-muted-foreground px-1">
                <span>Subtotal</span>
                <span>₹ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-muted-foreground px-1">
                <span>Tax (GST 5%)</span>
                <span>₹ {tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between px-1 py-1">
                <span className="text-xl font-black tracking-tight">Grand Total</span>
                <span className="text-xl font-black tracking-tight text-primary">₹ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <footer className="mt-6 flex flex-col sm:flex-row justify-between items-end gap-10">
            <div className="text-sm font-medium text-muted-foreground italic">
              "Thank you for visiting. Get well soon!"
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-48 h-px bg-slate-900 dark:bg-zinc-100" />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest">Pharmacist Signature</p>
                <p className="text-[11px] text-muted-foreground mt-1">(Rajesh K.)</p>
              </div>
            </div>
          </footer>
        </CardContent>
      </Card>
      
      {/* Legal Footer */}
      <div className="w-full max-w-[800px] mt-8 px-4 text-[10px] text-muted-foreground text-center uppercase tracking-[0.2em] font-medium leading-loose">
        Invoice is valid subject to successful payment clearance. Professional prescription required for Schedule H drugs.
      </div>
    </div>
  );
}

// Helper component for info grid
function ReceiptInfo({ label, value, isPrimary }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className={`text-base font-bold tracking-tight ${isPrimary ? 'text-primary' : ''}`}>{value}</span>
    </div>
  );
}