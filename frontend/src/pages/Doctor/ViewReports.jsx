// // import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Printer, FlaskConical, Calendar, AlertCircle } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import TopHeader from '@/components/Top-Header';
// import DynamicNavbar from '@/components/DynamicNavbar';

// const TestResultsView = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   // Receive the entire array of tests
//   const { allTests } = location.state || { allTests: [] };

//   if (!allTests || allTests.length === 0) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center gap-4">
//         <AlertCircle className="size-12 text-muted-foreground" />
//         <p className="font-bold">No test records selected to view.</p>
//         <Button onClick={() => navigate(-1)}>Go Back</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950 font-sans">
//       <TopHeader />
//       <div className="flex flex-1 overflow-hidden">
//         <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-zinc-900 hidden lg:block">
//           <DynamicNavbar />
//         </aside>

//         <main className="flex-1 overflow-y-auto p-6 lg:p-10">
//           <div className="max-w-[900px] mx-auto space-y-10">
//             {/* Header Actions */}
//             <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl border shadow-sm sticky top-0 z-10">
//               <Button variant="ghost" onClick={() => navigate(-1)} className="font-bold gap-2">
//                 <ArrowLeft size={16} /> Return to Consultation
//               </Button>
//               <h1 className="font-black uppercase tracking-tight text-xl">Cumulative Diagnostic Report</h1>
//               <Button className="gap-2 font-bold" onClick={() => window.print()}>
//                 <Printer size={16} /> Print All
//               </Button>
//             </div>

//             {/* Loop through every test one below the other */}
//             {allTests.map((test) => {
//               // Parse results for this specific test
//               const results = test.test_results 
//                 ? (typeof test.test_results === 'string' ? JSON.parse(test.test_results) : test.test_results)
//                 : [];

//               return (
//                 <div key={test.id} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
//                   <Card className="border-t-4 border-t-primary shadow-sm overflow-hidden">
//                     <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b flex flex-row justify-between items-center py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
//                           <FlaskConical size={20} />
//                         </div>
//                         <div>
//                           <CardTitle className="text-lg font-black uppercase tracking-tight">
//                             {test.name || test.test_name}
//                           </CardTitle>
//                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
//                             Ref ID: #LAB-{test.id || 'NEW'}
//                           </p>
//                         </div>
//                       </div>
//                       <Badge className={`px-4 py-1 font-black uppercase text-[10px] border-none ${
//                         test.status === 'test completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
//                       }`}>
//                         {test.status || 'Pending'}
//                       </Badge>
//                     </CardHeader>
                    
//                     <CardContent className="p-0">
//                       {test.status === 'test completed' && results.length > 0 ? (
//                         <Table>
//                           <TableHeader className="bg-slate-50/30">
//                             <TableRow className="hover:bg-transparent">
//                               <TableHead className="font-black uppercase text-[10px] pl-8">Parameter</TableHead>
//                               <TableHead className="font-black uppercase text-[10px] text-center">Result</TableHead>
//                               <TableHead className="font-black uppercase text-[10px] text-right pr-8">Ref. Range</TableHead>
//                             </TableRow>
//                           </TableHeader><TableBody>
//                             {results.map((res, idx) => (
//                               <TableRow key={idx} className="hover:bg-slate-50/30 transition-colors">
//                                 <TableCell className="pl-8 py-4 font-bold text-slate-700 dark:text-slate-300">
//                                   {res.parameter_name}
//                                 </TableCell>
//                                 <TableCell className="py-4 text-center">
//                                   <span className="font-black text-primary">
//                                     {res.test_results}
//                                   </span>
//                                 </TableCell>
//                                 <TableCell className="pr-8 py-4 text-right font-mono text-xs text-muted-foreground">
//                                   {res.acceptable_range}
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       ) : (
//                         <div className="p-10 text-center space-y-2">
//                           <p className="text-sm font-bold text-muted-foreground italic">
//                             No result data available for this entry.
//                           </p>
//                           <Badge variant="outline" className="text-[9px] uppercase font-bold">
//                             Current Status: {test.status || 'In Queue'}
//                           </Badge>
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </div>
//               );
//             })}

//             <div className="text-center pt-10">
//               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic border-t pt-4">
//                 *** End of Unified Diagnostic Record ***
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default TestResultsView;

import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, FlaskConical, Calendar, User, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TopHeader from '@/components/Top-Header';
import DynamicNavbar from '@/components/DynamicNavbar';

const TestResultsView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract allTests from the navigation state
  const { allTests } = location.state || {};

  console.log("all:", allTests)

  // Normalize the data source: handle both {data: []} and direct array formats
  const testsToDisplay = useMemo(() => {
    if (allTests?.data) return allTests.data;
    if (Array.isArray(allTests)) return allTests;
    return [];
  }, [allTests]);

  if (testsToDisplay.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <AlertCircle className="size-12 text-slate-300" />
        <p className="font-bold text-slate-500">No diagnostic records found to display.</p>
        <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950 font-sans">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 border-r bg-white dark:bg-zinc-900 hidden lg:block">
          <DynamicNavbar />
        </aside>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[900px] mx-auto space-y-10">
            
            {/* Action Bar */}
            <div className="flex justify-between items-center sticky top-0 z-20 bg-slate-50/80 backdrop-blur-md py-2">
              <Button variant="ghost" onClick={() => navigate(-1)} className="font-bold gap-2 hover:bg-white">
                <ArrowLeft size={16} /> Back to Consultation
              </Button>
              <Button className="gap-2 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20" onClick={() => window.print()}>
                <Printer size={16} /> Print All Reports
              </Button>
            </div>

            {/* Render each test as a separate card */}
            {testsToDisplay.map((test) => {
              // Safely parse the test_results JSON string
              let parsedResults = [];
              try {
                if (test.test_results) {
                  parsedResults = typeof test.test_results === 'string' 
                    ? JSON.parse(test.test_results) 
                    : test.test_results;
                }
              } catch (e) {
                console.error("Error parsing results for test ID:", test.id, e);
              }

              return (
                <Card key={test.id} className="border-t-4 border-t-primary shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader className="bg-white dark:bg-zinc-900 border-b flex flex-row justify-between items-center py-5 px-8">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FlaskConical size={18} className="text-primary" />
                        <CardTitle className="text-xl font-black uppercase tracking-tight">
                          {test.test_name || test.name}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        <span className="flex items-center gap-1"><User size={10}/> ID: #LAB-{test.id}</span>
                        <span className="flex items-center gap-1"><Calendar size={10}/> {test.created_on || "Recent"}</span>
                      </div>
                    </div>
                    <Badge className={`px-4 py-1 font-black uppercase text-[10px] border-none shadow-sm ${
                      test.status === 'test completed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {test.status || 'Pending'}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    {/* Only show table if status is completed and results exist */}
                    {test.status === 'test completed' && parsedResults.length > 0 ? (
                      <Table>
                        <TableHeader className="bg-slate-50/50 dark:bg-zinc-900/50">
                          <TableRow className="hover:bg-transparent border-b">
                            <TableHead className="font-black uppercase text-[10px] pl-8 py-4">Parameter</TableHead>
                            <TableHead className="font-black uppercase text-[10px] text-center py-4">Result Value</TableHead>
                            <TableHead className="font-black uppercase text-[10px] text-right pr-8 py-4">Ref. Range</TableHead>
                          </TableRow>
                        </TableHeader><TableBody>
                          {parsedResults.map((res, idx) => (
                            <TableRow key={idx} className="hover:bg-slate-50/30 dark:hover:bg-zinc-900/30 transition-colors border-b last:border-0">
                              <TableCell className="pl-8 py-5 font-bold text-slate-800 dark:text-slate-200">
                                {res.parameter_name}
                              </TableCell>
                              <TableCell className="py-5 text-center">
                                <span className="inline-block min-w-[60px] bg-primary/5 dark:bg-primary/10 px-3 py-1.5 rounded-lg font-black text-primary border border-primary/10">
                                  {res.test_results}
                                </span>
                              </TableCell>
                              <TableCell className="pr-8 py-5 text-right font-mono text-xs text-muted-foreground font-bold">
                                {res.acceptable_range}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="p-16 text-center space-y-3">
                        <AlertCircle className="size-8 text-slate-200 mx-auto" />
                        <p className="text-sm font-bold text-muted-foreground italic">
                          No parameter details are available for this record yet.
                        </p>
                        <p className="text-[10px] uppercase font-black text-slate-400">Current Status: {test.status}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            <div className="text-center pt-10 border-t">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] italic">
                *** End of Unified Diagnostic Record ***
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestResultsView;