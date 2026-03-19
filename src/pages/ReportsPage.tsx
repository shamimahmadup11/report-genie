import { useAppStore } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Trash2 } from "lucide-react";

const ReportsPage = () => {
  const { reports, deleteReport } = useAppStore();
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
        <Button size="sm" onClick={() => navigate("/generate")}>
          <Plus className="h-4 w-4 mr-1" /> Generate Report
        </Button>
      </div>

      <div className="bg-card border border-border rounded-md">
        <table className="data-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Patient</th>
              <th>Tests</th>
              <th>Flags</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => {
              const abnormal = r.results.filter((t) => t.flag !== "Normal").length;
              return (
                <tr key={r.id}>
                  <td className="font-mono text-xs">{r.reportId}</td>
                  <td className="font-medium">{r.patientName}</td>
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
                    <span className="text-xs font-medium text-muted-foreground">{r.status}</span>
                  </td>
                  <td className="text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/report/${r.id}`)}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteReport(r.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              );
            })}
            {reports.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted-foreground py-8">
                  No reports yet. Generate your first report.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
