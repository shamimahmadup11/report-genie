import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlaskConical } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAppStore((s) => s.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(username, password)) {
      setError("Invalid credentials. Use admin / admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm bg-card border border-border rounded-md p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <FlaskConical className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">PRECISION LABS</span>
        </div>
        <p className="text-xs text-muted-foreground text-center mb-6">
          Admin Portal — Enter your credentials
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <p className="text-[11px] text-muted-foreground text-center mt-4">Demo: admin / admin123</p>
      </div>
    </div>
  );
};

export default LoginPage;
