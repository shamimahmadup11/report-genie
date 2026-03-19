import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Pencil } from "lucide-react";
import type { Patient } from "@/data/mockData";

const PatientsPage = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useAppStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Patient | null>(null);
  const [form, setForm] = useState({ name: "", age: "", gender: "Male" as Patient["gender"], phone: "", address: "" });

  const resetForm = () => {
    setForm({ name: "", age: "", gender: "Male", phone: "", address: "" });
    setEditing(null);
  };

  const handleSave = () => {
    if (!form.name || !form.age) return;
    if (editing) {
      updatePatient(editing.id, { ...form, age: Number(form.age) });
    } else {
      addPatient({ ...form, age: Number(form.age) });
    }
    setOpen(false);
    resetForm();
  };

  const handleEdit = (p: Patient) => {
    setEditing(p);
    setForm({ name: p.name, age: String(p.age), gender: p.gender, phone: p.phone, address: p.address });
    setOpen(true);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Patients</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Patient</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Patient" : "New Patient"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Age</Label>
                  <Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Gender</Label>
                  <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v as Patient["gender"] })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</Label>
                <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1" />
              </div>
              <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Add"} Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border border-border rounded-md">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age/Gender</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Registered</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td className="font-medium">{p.name}</td>
                <td className="font-mono text-xs">{p.age}Y / {p.gender.charAt(0)}</td>
                <td className="text-xs">{p.phone}</td>
                <td className="text-xs text-muted-foreground">{p.address}</td>
                <td className="text-xs text-muted-foreground">{p.createdAt}</td>
                <td className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(p)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deletePatient(p.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsPage;
