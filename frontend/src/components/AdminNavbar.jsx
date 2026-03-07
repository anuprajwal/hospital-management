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
  { name: 'Configure Forms', icon: LayoutDashboard, href: '/', active: true },
  { name: 'Acconunts Management', icon: Users, href: '/users' },
  { name: 'Create-Price', icon: ShieldCheck, href: '/create-price' },
  { name: 'Pricing', icon: Database, href: '/view-prices' },
//   { name: 'Backup', icon: CloudUpload, href: '#' },
];

const Sidebar = () => {
  return (
    <aside className="w-60 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background flex flex-col h-full">
      <div className="p-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-center w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <img src="/Logo.jpeg" alt="HMS" className="w-14 h-14 object-cover" />
        </div>
        <h2 className="text-lg font-bold tracking-tight">HMS</h2>
      </div>
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

export default Sidebar;