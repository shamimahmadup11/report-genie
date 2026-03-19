import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { FlaskConical, LayoutDashboard, Users, FileText, FilePlus, LogOut, ShieldCheck, Menu, X } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useState } from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { logout, currentUser } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isSuperAdmin = currentUser?.role === "superadmin";

  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    ...(isSuperAdmin ? [{ to: "/admin-management", label: "User Management", icon: ShieldCheck }] : []),
    { to: "/patients", label: "Patients", icon: Users },
    { to: "/reports", label: "Reports", icon: FileText },
    { to: "/generate", label: "Generate Report", icon: FilePlus },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
        <FlaskConical className="h-5 w-5 text-primary" />
        <span className="text-sm font-bold tracking-tight">PRECISION LABS</span>
      </div>

      {currentUser && (
        <div className="px-5 py-3 border-b border-border">
          <p className="text-xs font-medium truncate">{currentUser.name}</p>
          <p className="text-[10px] text-muted-foreground">
            {currentUser.role === "superadmin" ? "Super Admin" : "Admin"}
          </p>
        </div>
      )}

      <nav className="flex-1 py-3 px-3 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <RouterNavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </RouterNavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => { logout(); setMobileOpen(false); }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground w-full transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 bg-card border-r border-border flex-col print:hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border flex items-center justify-between px-4 py-3 print:hidden">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold">PRECISION LABS</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 print:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col pt-14">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:pt-0 pt-14">
        <div className="max-w-6xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
