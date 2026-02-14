import React, {useState, useEffect} from 'react';
import {
  Plus,
  Stethoscope,
  FlaskConical,
  Pill,
  Bed,
  ReceiptText,
  ScanLine,
  Info,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TopHeader from "@/components/Top-Header"
import Sidebar from "@/components/Navbar"
import { useNavigate } from 'react-router-dom';
import { fetchAvailableModules } from './apis';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const iconMap = {
  "Out-Patient": Stethoscope,
  "LAB (Laboratory)": FlaskConical,
  "Pharmacy": Pill,
  "IPD (In-Patient)": Bed,
  "Billing": ReceiptText,
  "Radiology": ScanLine,
};

const HospitalModules = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getModules = async () => {
      try {
        setLoading(true);
        const data = await fetchAvailableModules();
        setModules(data.modules);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getModules();
  }, []);

  return (
    <div
      className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      <div className="flex h-screen flex-col">
        <TopHeader />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-slate-50/30 dark:bg-transparent">
            <div className="max-w-6xl mx-auto">

              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    Hospital Modules
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                    Configure operational departments and system workflows.
                  </p>
                </div>
              </div>

              {/* Error State */}
              {error && (
                <Alert variant="destructive" className="mb-8">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Module Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  // Loading State (Shadcn Skeletons)
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="border-2 border-slate-100 dark:border-slate-800">
                      <CardHeader><Skeleton className="h-12 w-12 rounded-xl" /></CardHeader>
                      <CardContent>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </CardContent>
                      <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
                    </Card>
                  ))
                ) : (
                  // Success State
                  modules.map((module) => {
                    const IconComponent = iconMap[module.module_name] || Info;
                    return (
                      <Card
                        key={module.module_name}
                        className={cn(
                          "group transition-all duration-300 border-2 border-slate-100 dark:border-slate-800",
                          module.is_allowed ? "hover:border-primary hover:shadow-xl" : "opacity-60 grayscale-[0.5]"
                        )}
                      >
                        <CardHeader className="pb-4">
                          <div className={cn(
                            "w-12 h-12 flex items-center justify-center rounded-xl text-white shadow-lg bg-primary",
                            !module.is_allowed && "bg-slate-400 shadow-none"
                          )}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                        </CardHeader>

                        <CardContent>
                          <CardTitle className="text-xl font-bold mb-2">{module.module_name}</CardTitle>
                          <CardDescription className="text-sm leading-relaxed">
                            {module.description}
                          </CardDescription>
                        </CardContent>

                        <CardFooter>
                          <Button
                            disabled={!module.is_allowed}
                            variant={module.is_allowed ? "default" : "secondary"}
                            className="w-full font-bold transition-all"
                            onClick={() => navigate(`/form-edit?module_id=${module.id}`)}
                          >
                            {module.is_allowed ? "Configure" : "Locked"}
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })
                )}
              </div>

              {/* Info Footer (Hidden during loading) */}
              {!loading && (
                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                      <Info className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Need custom modules?</h4>
                      <p className="text-sm text-slate-500">Contact system support for specialized department plugins.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HospitalModules;