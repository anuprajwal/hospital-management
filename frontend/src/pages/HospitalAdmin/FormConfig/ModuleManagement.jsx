import React, { useEffect, useState } from 'react';
import { 
    Hospital, LayoutGrid, Users, Settings2, FileText, LogOut, 
    Search, Bell, FlaskConical, Pill, BedDouble, CreditCard, 
    Radiation, Plus, Loader2, AlertCircle, Edit2, Check, X 
} from 'lucide-react';
import { fetchAvailableModules, updateModuleDescription, toggleModuleStatus } from './apis'; 

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import DynamicNavbar from "@/components/DynamicNavbar"

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ active: 0, inactive: 0 });

  const loadModules = async () => {
    try {
      setLoading(true);
      const data = await fetchAvailableModules();
      const moduleList = data.modules || [];
      setModules(moduleList);
      
      const activeCount = moduleList.filter(m => m.is_active).length;
      setStats({ active: activeCount, inactive: moduleList.length - activeCount });
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load modules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModules();
  }, []);

  const getModuleIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('op')) return <FileText className="text-primary" />;
    if (lowerName.includes('lab')) return <FlaskConical className="text-primary" />;
    if (lowerName.includes('pharmacy')) return <Pill className="text-primary" />;
    if (lowerName.includes('ipd')) return <BedDouble className="text-primary" />;
    if (lowerName.includes('billing')) return <CreditCard className="text-primary" />;
    if (lowerName.includes('radio')) return <Radiation className="text-primary" />;
    return <Settings2 className="text-primary" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 flex">
      {/* Sidebar - Same as before */}
      <DynamicNavbar/>

      <main className="flex-1 ml-72">
        <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-border px-8 py-6 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h2 className="text-2xl font-extrabold tracking-tight">System Modules Control</h2>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input className="pl-10 w-64 bg-slate-100 dark:bg-slate-900 border-none" placeholder="Search modules..." />
                </div>
                <Button variant="outline" size="icon"><Bell size={18} /></Button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Status Bar */}
          <Card className="shadow-sm border-primary/10">
            <CardContent className="h-16 flex items-center justify-between px-8 py-0">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-medium">Active:</span>
                  <span className="text-lg font-bold text-primary">{loading ? "..." : stats.active}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-medium">Inactive:</span>
                  <span className="text-lg font-bold text-slate-400">{loading ? "..." : stats.inactive}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <Card key={i} className="h-[250px] animate-pulse bg-muted" />)
            ) : (
              modules.map((module) => (
                <ModuleCard 
                  key={module.id}
                  module={module}
                  icon={getModuleIcon(module.module_name)}
                />
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

// --- Updated Stateful ModuleCard ---

const ModuleCard = ({ module, icon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(module.description || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isActive, setIsActive] = useState(module.is_allowed);

  const handleSave = async () => {
    // Prevent empty calls or redundant updates
    if (description === module.description) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      // Use the imported API function
      const responseData = await updateModuleDescription(module.id, description);
      
      setIsEditing(false);
      
      toast.success(responseData.message || "Module description updated successfully.");
      
      // Optional: If you want the parent to reflect the change without a refresh
      // module.description = description; 
    } catch (err) {
      toast.error(typeof err.message === 'object' ? "An error occurred" : err.message);

      // Revert local state to the original description on failure
      setDescription(module.description);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggle = async (checked) => {
    // Optimistically update the UI
    setIsActive(checked);
    
    try {
      const responseData = await toggleModuleStatus(module.id, checked);
      toast.success(responseData.message || `${module.module_name} status updated.`);

    } catch (err) {
      // Revert UI state on failure
      setIsActive(!checked);
      toast.error(err.message);
    }
  };

  return (
    <Card className={`transition-all flex flex-col justify-between min-h-[250px] ${!module.is_active && "opacity-75 grayscale-[0.3]"}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${module.is_active ? "bg-primary/10" : "bg-muted"}`}>
            {icon}
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg">{module.module_name}</CardTitle>
            <Badge variant={isActive ? "default" : "secondary"} className="text-[10px]">
                {isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
        {!isEditing && (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-8 w-8 text-muted-foreground">
            <Edit2 size={14} />
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="mt-2">
          {isEditing ? (
            <div className="space-y-2">
              <Textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="text-sm min-h-[80px] resize-none"
                placeholder="Enter module description..."
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} disabled={isUpdating} className="h-8 grow">
                  {isUpdating ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} className="mr-1" />}
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setIsEditing(false); setDescription(module.description); }} className="h-8">
                  <X size={14} />
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {description || "No description provided."}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
          <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            {module.updated_at || "Just now"}
          </span>
          <Switch 
            checked={isActive} 
            onCheckedChange={handleToggle}
            disabled={isUpdating} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleManagement;