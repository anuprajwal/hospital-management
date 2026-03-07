import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SuperAdminSidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 h-full flex flex-col bg-card border-r border-border">
      <div className="p-5 flex items-center gap-3 border-b border-border">
        <div className="flex items-center justify-center w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <img src="/Logo.jpeg" alt="HMS" className="w-14 h-14 object-cover" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-foreground">HMS</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Super Admin</p>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <NavLink
          to="/users"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )
          }
        >
          <Users size={18} />
          Users & Access
        </NavLink>
        <NavLink
          to="/module-management"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )
          }
        >
          <Settings2 size={18} />
          System Modules
        </NavLink>
      </nav>
    </aside>
  );
};

export default SuperAdminSidebar;