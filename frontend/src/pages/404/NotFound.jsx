import React from 'react';
import { 
  Search, 
  Folder, 
  LayoutDashboard, 
  Headset, 
  Hospital, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  FileText 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 antialiased flex flex-col items-center justify-center transition-colors duration-300">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <Hospital className="text-primary-foreground w-6 h-6" />
          </div>
          <span className="font-extrabold text-xl tracking-tight">HMS</span>
        </div>
      </nav>

      <main className="max-w-2xl w-full px-6 flex flex-col items-center text-center">
        
        {/* Illustration Section */}
        <div className="mb-8 relative">
          <div className="w-44 h-44 bg-primary/5 rounded-full flex items-center justify-center relative">
            {/* Animated Ring */}
            <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-ping opacity-20" />
            <div className="absolute inset-2 border border-primary/5 rounded-full" />
            
            {/* Main Visual */}
            <div className="relative z-10 p-6 bg-background rounded-2xl shadow-xl border border-border">
               <Search className="w-16 h-16 text-primary/80" />
            </div>

            {/* Floaties */}
            <div className="absolute -top-2 -right-2 bg-card p-2 rounded-lg shadow-md border border-border animate-bounce duration-[3000ms]">
              <Folder className="text-primary w-6 h-6" />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-card p-2 rounded-lg shadow-md border border-border">
              <ShieldCheck className="text-primary w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-black text-muted-foreground/10 tracking-tighter leading-none select-none">
            404
          </h1>
          <div className="-mt-8 md:-mt-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Resource Not Found
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              The page you are trying to access does not exist, may have been moved, or requires proper medical authorization.
            </p>
          </div>
        </div>

        {/* Action Buttons using Shadcn Button */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base gap-2 shadow-lg shadow-primary/20">
            <LayoutDashboard className="w-5 h-5" />
            Go to Dashboard
          </Button>
          
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-base gap-2">
            <Headset className="w-5 h-5" />
            Contact Admin
          </Button>
        </div>

        {/* Quick Links with Tooltips */}
        <TooltipProvider>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <QuickLink icon={<FileText size={14}/>} label="Patient Records" />
            <QuickLink icon={<Users size={14}/>} label="Staff Directory" />
            <QuickLink icon={<BookOpen size={14}/>} label="System Help" />
          </div>
        </TooltipProvider>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-8 flex flex-col items-center gap-2">
        <Separator className="w-12 bg-primary/30" />
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            HMS v1.0 | Local Node: 127.0.0.1
          </p>
          <p className="text-[9px] text-muted-foreground/40 mt-1 italic">
            Secure Internal Network Access Only
          </p>
        </div>
      </footer>
    </div>
  );
};

// Sub-component for clean mapping
const QuickLink = ({ icon, label }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        {icon}
        {label}
      </a>
    </TooltipTrigger>
    <TooltipContent>
      <p>Open {label}</p>
    </TooltipContent>
  </Tooltip>
);

export default NotFoundPage;