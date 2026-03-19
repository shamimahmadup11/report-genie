import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { FlaskConical, LayoutDashboard, Users, FileText, FilePlus, LogOut } from "lucide-react";
import { useAppStore } from "@/store/appStore";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/generate", label: "Generate Report", icon: FilePlus },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const logout = useAppStore((s) => s.logout);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-card border-r border-border flex flex-col print:hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
          <FlaskConical className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold tracking-tight">PRECISION LABS</span>
        </div>

        <nav className="flex-1 py-3 px-3 space-y-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <RouterNavLink
                key={item.to}
                to={item.to}
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
            onClick={logout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground w-full transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
