import { useAppStore } from "@/store/appStore";
import { Users, FileText, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { patients, reports, currentUser } = useAppStore();
  const navigate = useNavigate();

  const todayReports = reports.filter(
    (r) => r.createdAt.split("T")[0] === new Date().toISOString().split("T")[0]
  ).length;

  const abnormalCount = reports.reduce(
    (acc, r) => acc + r.results.filter((t) => t.flag !== "Normal").length, 0
  );

  const totalTests = reports.reduce((acc, r) => acc + r.results.length, 0);

  const stats = [
    { label: "Total Patients", value: patients.length, icon: Users, color: "text-primary" },
    { label: "Total Reports", value: reports.length, icon: FileText, color: "text-primary" },
    { label: "Today's Reports", value: todayReports, icon: Activity, color: "text-flag-normal" },
    { label: "Total Tests Done", value: totalTests, icon: TrendingUp, color: "text-primary" },
    { label: "Abnormal Flags", value: abnormalCount, icon: AlertTriangle, color: "text-destructive" },
  ];

  const recentReports = reports.slice(0, 8);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-1">Welcome back, {currentUser?.name || "Admin"}</p>
        </div>
      </div>

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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <button onClick={() => navigate("/patients")} className="stat-card hover:border-primary/50 transition-colors text-left">
          <p className="text-sm font-semibold">Add Patient</p>
          <p className="text-xs text-muted-foreground">Register a new patient</p>
        </button>
        <button onClick={() => navigate("/generate")} className="stat-card hover:border-primary/50 transition-colors text-left">
          <p className="text-sm font-semibold">Generate Report</p>
          <p className="text-xs text-muted-foreground">Create a new lab report</p>
        </button>
        <button onClick={() => navigate("/reports")} className="stat-card hover:border-primary/50 transition-colors text-left">
          <p className="text-sm font-semibold">View Reports</p>
          <p className="text-xs text-muted-foreground">Browse all generated reports</p>
        </button>
      </div>

      <div className="bg-card border border-border rounded-md">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="section-title text-base">Recent Reports</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Patient</th>
              <th>Tests</th>
              <th>Flags</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((r) => {
              const abnormal = r.results.filter((t) => t.flag !== "Normal").length;
              return (
                <tr key={r.id} onClick={() => navigate(`/report/${r.id}`)}>
                  <td className="font-mono text-xs">{r.reportId}</td>
                  <td>{r.patientName}</td>
                  <td className="font-mono text-xs">{r.results.length}</td>
                  <td>
                    {abnormal > 0 ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-bold bg-destructive/10 text-destructive">
                        {abnormal} abnormal
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-flag-normal/10 text-flag-normal">
                        All normal
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-flag-normal/10 text-flag-normal">
                      {r.status}
                    </span>
                  </td>
                  <td className="text-muted-foreground text-xs">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
            {recentReports.length === 0 && (
              <tr><td colSpan={6} className="text-center text-muted-foreground py-8">No reports yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
