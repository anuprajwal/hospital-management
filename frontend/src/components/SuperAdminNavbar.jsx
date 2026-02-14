import React from 'react';
import { 
    LayoutGrid, 
  Users, 
  Settings2, 
  FileText, 
  Hospital
} from 'lucide-react';


const Sidebar = () => {
  return (
    
    <aside className="w-72 bg-white dark:bg-slate-950 border-r border-border flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg text-primary"><Hospital size={28} /></div>
          <div>
            <h1 className="text-lg font-bold leading-tight">HMS Admin</h1>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Super Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 px-4 mt-4 space-y-1">
            {/* <SidebarItem icon={<LayoutGrid size={20}/>} label="Hospital Builder" /> */}
            <SidebarItem icon={<Users size={20}/>} href="/users" label="Users & Access" />
            <SidebarItem icon={<Settings2 size={20}/>} href="/module-management" label="System Modules" active />
            {/* <SidebarItem icon={<FileText size={20}/>} label="Audit Logs" /> */}
        </nav>
      </aside>
  );
};

const SidebarItem = ({ icon, href, label, active = false }) => (
    <a href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-slate-100"}`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </a>
);

export default Sidebar;