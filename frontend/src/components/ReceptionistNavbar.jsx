import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Database, 
  CloudUpload 
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const navItems = [
  { name: 'Appointments', icon: LayoutDashboard, href: '/appointment-dashboard', active: true },
//   { name: 'Acconunts Management', icon: Users, href: '/users' },
//   { name: 'Permissions', icon: ShieldCheck, href: '#' },
//   { name: 'Database Logs', icon: Database, href: '#' },
//   { name: 'Backup', icon: CloudUpload, href: '#' },
];

const ReceptionistSidebar = () => {
  return (
    <aside className="w-60 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background flex flex-col h-full">
      <ScrollArea className="flex-1 py-6">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 group",
                item.active 
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                item.active ? "text-primary" : "text-slate-500 group-hover:text-primary"
              )} />
              {item.name}
            </a>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default ReceptionistSidebar;