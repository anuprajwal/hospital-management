import React from 'react';
import { Package as PackageIcon, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const PackageForm = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center animate-in fade-in zoom-in duration-500">
      <Card className="max-w-md w-full border-2 border-dashed border-primary/30 bg-primary/5 overflow-hidden">
        <CardContent className="p-12 text-center space-y-4">
          <div className="relative inline-block">
            <PackageIcon size={64} className="text-primary/40" />
            <Clock size={24} className="text-primary absolute bottom-0 right-0 animate-bounce" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Health Packages</h2>
          <p className="text-muted-foreground font-medium">
            We are building a robust system to bundle multiple tests and consultations into custom packages.
          </p>
          <div className="inline-block px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            Coming Soon
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageForm;