import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, FileText, UserCheck, UserX, Plus, Trash2, ToggleLeft, ToggleRight, Shield, ShieldCheck } from "lucide-react";
import type { AppUser, UserRole } from "@/data/mockData";

const SuperAdminDashboard = () => {
  const { users, patients, reports, addUser, deleteUser, toggleUserActive, currentUser } = useAppStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" as UserRole });

  const admins = users.filter((u) => u.role === "admin");
  const activeAdmins = admins.filter((u) => u.isActive).length;
  const inactiveAdmins = admins.filter((u) => !u.isActive).length;

  const handleAdd = () => {
    if (!form.name || !form.email || !form.password) return;
    addUser({ ...form, isActive: true });
    setOpen(false);
    setForm({ name: "", email: "", password: "", role: "admin" });
  };

  const stats = [
    { label: "Total Admins", value: admins.length, icon: Users, color: "text-primary" },
    { label: "Active", value: activeAdmins, icon: UserCheck, color: "text-flag-normal" },
    { label: "Inactive", value: inactiveAdmins, icon: UserX, color: "text-destructive" },
    { label: "Total Patients", value: patients.length, icon: Users, color: "text-primary" },
    { label: "Total Reports", value: reports.length, icon: FileText, color: "text-primary" },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Super Admin Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Welcome, {currentUser?.name}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className={`text-3xl font-bold font-mono ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* User Management */}
      <div className="bg-card border border-border rounded-md">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="section-title text-base">Admin User Management</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Admin</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Admin User</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                  <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</Label>
                  <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as UserRole })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin (Lab Staff)</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAdd} className="w-full">Create Admin</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="font-medium">{u.name}</td>
                <td className="text-xs">{u.email}</td>
                <td>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-medium ${
                    u.role === "superadmin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {u.role === "superadmin" ? <ShieldCheck className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                    {u.role === "superadmin" ? "Super Admin" : "Admin"}
                  </span>
                </td>
                <td>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-bold ${
                    u.isActive ? "bg-flag-normal/10 text-flag-normal" : "bg-destructive/10 text-destructive"
                  }`}>
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="text-xs text-muted-foreground">{u.createdAt}</td>
                <td className="text-right">
                  {u.id !== currentUser?.id && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUserActive(u.id)}
                        title={u.isActive ? "Deactivate" : "Activate"}
                      >
                        {u.isActive ? <ToggleRight className="h-4 w-4 text-flag-normal" /> : <ToggleLeft className="h-4 w-4 text-destructive" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteUser(u.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
