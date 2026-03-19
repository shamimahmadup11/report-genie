import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlaskConical } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAppStore((s) => s.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, password);
    if (err) setError(err);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm bg-card border border-border rounded-md p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <FlaskConical className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">PRECISION LABS</span>
        </div>
        <p className="text-xs text-muted-foreground text-center mb-6">
          Lab Portal — Enter your credentials
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" placeholder="you@precisionlabs.in" />
          </div>
          <div>
            <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <div className="mt-4 space-y-1 text-[11px] text-muted-foreground text-center">
          <p>Super Admin: super@precisionlabs.in / super123</p>
          <p>Admin: meena@precisionlabs.in / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
