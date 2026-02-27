import React, { useEffect, useState } from 'react';
import {
  FileText, FlaskConical, Pill, BedDouble, CreditCard,
  Radiation, Loader2, Edit2, Check, Settings2
} from 'lucide-react';
import { fetchAvailableModules, updateModuleDescription, toggleModuleStatus } from './apis';

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import DynamicNavbar from "@/components/DynamicNavbar";
import TopHeader from "@/components/Top-Header";

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
    if (lowerName.includes('op')) return <FileText className="text-primary" size={18} />;
    if (lowerName.includes('lab')) return <FlaskConical className="text-primary" size={18} />;
    if (lowerName.includes('pharmacy')) return <Pill className="text-primary" size={18} />;
    if (lowerName.includes('ipd')) return <BedDouble className="text-primary" size={18} />;
    if (lowerName.includes('billing')) return <CreditCard className="text-primary" size={18} />;
    if (lowerName.includes('radio')) return <Radiation className="text-primary" size={18} />;
    return <Settings2 className="text-primary" size={18} />;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      <div className="flex-shrink-0 h-full">
        <DynamicNavbar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <TopHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 w-full max-w-[50vw]">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-foreground">System Modules</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Enable or disable modules for this hospital instance.
                </p>
              </div>
              {!loading && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">{stats.active}</span> active,{" "}
                  <span className="font-medium text-muted-foreground">{stats.inactive}</span> inactive
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Card>
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <li key={i} className="flex items-center gap-4 px-6 py-3 animate-pulse">
                        <div className="w-9 h-9 rounded-lg bg-muted/50" />
                        <div className="flex-1 h-5 bg-muted/50 rounded w-32" />
                        <div className="h-5 bg-muted/50 rounded w-16" />
                      </li>
                    ))
                  ) : (
                    modules.map((module) => (
                      <ModuleListItem
                        key={module.id}
                        module={module}
                        icon={getModuleIcon(module.module_name)}
                      />
                    ))
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

const ModuleListItem = ({ module, icon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(module.description || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isActive, setIsActive] = useState(module.is_allowed);

  const handleSave = async () => {
    if (description === (module.description || "")) {
      setIsEditing(false);
      return;
    }
    setIsUpdating(true);
    try {
      await updateModuleDescription(module.id, description);
      setIsEditing(false);
      toast.success("Description updated.");
    } catch (err) {
      toast.error(typeof err.message === "object" ? "An error occurred" : err.message);
      setDescription(module.description || "");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggle = async (checked) => {
    setIsActive(checked);
    try {
      await toggleModuleStatus(module.id, checked);
      toast.success("Status updated.");
    } catch (err) {
      setIsActive(!checked);
      toast.error(err.message);
    }
  };

  return (
    <li className="flex flex-col">
      <div className="flex items-center gap-4 px-6 py-3 min-h-[52px] flex-wrap">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", module.is_active ? "bg-primary/10" : "bg-muted")}>
          {icon}
        </div>
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="font-medium text-foreground">{module.module_name}</span>
          {isEditing ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:max-w-md">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-sm min-h-[60px] sm:min-h-[36px] py-1.5 resize-none flex-1"
                placeholder="Description..."
              />
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" variant="secondary" onClick={handleSave} disabled={isUpdating}>
                  {isUpdating ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setIsEditing(false); setDescription(module.description || ""); }}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm text-muted-foreground truncate">
                {description || "No description"}
              </span>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-7 w-7 flex-shrink-0 text-muted-foreground">
                <Edit2 size={12} />
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto sm:ml-0">
          <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
            {isActive ? "Active" : "Inactive"}
          </Badge>
          <Switch
            checked={isActive}
            onCheckedChange={handleToggle}
            disabled={isUpdating}
            className="data-[state=checked]:bg-secondary"
          />
        </div>
      </div>
    </li>
  );
};

export default ModuleManagement;