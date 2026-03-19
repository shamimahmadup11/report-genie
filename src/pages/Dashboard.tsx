import { useAppStore } from "@/store/appStore";
import { Users, FileText, Activity, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const patients = useAppStore((s) => s.patients);
  const reports = useAppStore((s) => s.reports);

  const todayReports = reports.filter(
    (r) => r.createdAt.split("T")[0] === new Date().toISOString().split("T")[0]
  ).length;

  const abnormalCount = reports.reduce(
    (acc, r) => acc + r.results.filter((t) => t.flag !== "Normal").length,
    0
  );

  const stats = [
    { label: "Total Patients", value: patients.length, icon: Users, color: "text-primary" },
    { label: "Total Reports", value: reports.length, icon: FileText, color: "text-primary" },
    { label: "Today's Reports", value: todayReports, icon: Activity, color: "text-flag-normal" },
    { label: "Abnormal Flags", value: abnormalCount, icon: TrendingUp, color: "text-destructive" },
  ];

  const recentReports = reports.slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((r) => (
              <tr key={r.id}>
                <td className="font-mono text-xs">{r.reportId}</td>
                <td>{r.patientName}</td>
                <td className="font-mono text-xs">{r.results.length}</td>
                <td>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-flag-normal/10 text-flag-normal">
                    {r.status}
                  </span>
                </td>
                <td className="text-muted-foreground text-xs">{new Date(r.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
