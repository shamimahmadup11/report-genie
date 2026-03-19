import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/appStore";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useRef } from "react";

const ReportViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports, patients } = useAppStore();
  const printRef = useRef<HTMLDivElement>(null);

  const report = reports.find((r) => r.id === id);
  const patient = report ? patients.find((p) => p.id === report.patientId) : null;

  if (!report) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Report not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/reports")}>
          Back to Reports
        </Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // Group results by category
  const grouped = report.results.reduce<Record<string, typeof report.results>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  return (
    <div>
      <div className="page-header print:hidden">
        <Button variant="ghost" size="sm" onClick={() => navigate("/reports")}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button size="sm" onClick={handlePrint}>
          <Download className="h-4 w-4 mr-1" /> Print / PDF
        </Button>
      </div>

      <div ref={printRef} className="report-paper print:shadow-none print:p-0">
        {/* Header */}
        <div className="flex justify-between border-b-2 border-primary pb-5 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-primary">PRECISION LABS</h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              ISO 9001:2015 Certified Diagnostic Center
            </p>
            <p className="text-[11px] text-muted-foreground">NABL Accredited Laboratory</p>
          </div>
          <div className="text-right text-[11px] text-muted-foreground">
            <p>123 Medical Drive, Health City</p>
            <p>Mumbai — 400001</p>
            <p>Contact: +91 98765 43210</p>
            <p>Email: reports@precisionlabs.in</p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-y-1.5 text-sm mb-6 bg-muted/50 p-4 rounded-md border border-border">
          <div>
            <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Patient Name: </span>
            <span className="font-medium">{patient?.name || report.patientName}</span>
          </div>
          <div>
            <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Report ID: </span>
            <span className="font-mono text-xs">{report.reportId}</span>
          </div>
          <div>
            <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Age/Gender: </span>
            <span>{patient ? `${patient.age}Y / ${patient.gender}` : "—"}</span>
          </div>
          <div>
            <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Date: </span>
            <span>{new Date(report.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
          </div>
          {patient?.phone && (
            <div>
              <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Phone: </span>
              <span className="text-xs">{patient.phone}</span>
            </div>
          )}
          <div>
            <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status: </span>
            <span className="font-medium">{report.status}</span>
          </div>
        </div>

        {/* Results */}
        {Object.entries(grouped).map(([category, tests]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/30 pb-1 mb-0">
              {category}
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground/20">
                  <th className="py-2 text-left font-semibold text-xs">Test Name</th>
                  <th className="py-2 text-center font-semibold text-xs">Result</th>
                  <th className="py-2 text-left font-semibold text-xs">Units</th>
                  <th className="py-2 text-left font-semibold text-xs">Reference Range</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2.5 font-medium">{test.testName}</td>
                    <td className={`py-2.5 text-center font-mono font-bold ${
                      test.flag === "High" ? "flag-high" : test.flag === "Low" ? "flag-low" : ""
                    }`}>
                      {test.value}
                      {test.flag !== "Normal" && (
                        <span className="text-[10px] ml-1">({test.flag.charAt(0)})</span>
                      )}
                    </td>
                    <td className="py-2.5 text-muted-foreground">{test.unit}</td>
                    <td className="py-2.5 text-muted-foreground font-mono text-xs">{test.normalRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Footer */}
        <div className="flex justify-between items-end mt-16 pt-6 border-t border-border">
          <div className="text-center">
            <QRCodeSVG
              value={`${window.location.origin}/report/${report.id}`}
              size={72}
              level="H"
              className="mx-auto"
            />
            <p className="text-[9px] mt-1.5 text-muted-foreground">Scan to Verify</p>
          </div>
          <div className="text-center">
            <div className="border-t border-foreground pt-2 w-44">
              <p className="font-bold text-sm">Dr. A.K. Sharma</p>
              <p className="text-[11px] text-muted-foreground">MD, Pathologist</p>
              <p className="text-[10px] text-muted-foreground">Reg. No: MCI-45678</p>
            </div>
          </div>
        </div>

        <p className="text-[9px] text-muted-foreground text-center mt-8">
          This is a computer-generated report. Values marked (H) are above normal range and (L) are below normal range.
          Please consult your physician for interpretation.
        </p>
      </div>
    </div>
  );
};

export default ReportViewPage;
