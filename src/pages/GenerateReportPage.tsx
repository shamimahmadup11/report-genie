import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TEST_MASTER, TEST_CATEGORIES } from "@/data/testMaster";
import type { TestResult } from "@/data/mockData";

const GenerateReportPage = () => {
  const { patients, addReport } = useAppStore();
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});

  const toggleTest = (id: string) => {
    setSelectedTests((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const selectCategory = (cat: string) => {
    const ids = TEST_MASTER.filter((t) => t.category === cat).map((t) => t.id);
    const allSelected = ids.every((id) => selectedTests.includes(id));
    if (allSelected) {
      setSelectedTests((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedTests((prev) => [...new Set([...prev, ...ids])]);
    }
  };

  const handleGenerate = () => {
    if (!patientId || selectedTests.length === 0) return;
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return;

    const results: TestResult[] = selectedTests.map((testId) => {
      const def = TEST_MASTER.find((t) => t.id === testId)!;
      const val = Number(values[testId] || 0);
      let flag: TestResult["flag"] = "Normal";
      if (val > def.maxRange) flag = "High";
      else if (val < def.minRange) flag = "Low";
      return {
        testId,
        testName: def.name,
        category: def.category,
        value: val,
        unit: def.unit,
        normalRange: `${def.minRange} - ${def.maxRange}`,
        flag,
      };
    });

    addReport({ patientId, patientName: patient.name, results, status: "Final" });
    navigate("/reports");
  };

  const groupedTests = TEST_CATEGORIES.map((cat) => ({
    category: cat,
    tests: TEST_MASTER.filter((t) => t.category === cat),
  }));

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Generate Report</h1>
      </div>

      <div className="bg-card border border-border rounded-md p-6 mb-6">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Patient</Label>
        <Select value={patientId} onValueChange={setPatientId}>
          <SelectTrigger className="mt-1 max-w-md">
            <SelectValue placeholder="Choose a patient..." />
          </SelectTrigger>
          <SelectContent>
            {patients.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name} — {p.age}Y/{p.gender.charAt(0)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 mb-6">
        {groupedTests.map(({ category, tests }) => {
          const catIds = tests.map((t) => t.id);
          const allSelected = catIds.every((id) => selectedTests.includes(id));
          const someSelected = catIds.some((id) => selectedTests.includes(id));

          return (
            <div key={category} className="bg-card border border-border rounded-md">
              <div
                className="flex items-center gap-3 px-4 py-3 border-b border-border cursor-pointer hover:bg-muted/30"
                onClick={() => selectCategory(category)}
              >
                <Checkbox checked={allSelected} className="data-[state=checked]:bg-primary" />
                <h3 className="text-sm font-semibold">{category}</h3>
                {someSelected && !allSelected && (
                  <span className="text-[10px] text-muted-foreground">(partial)</span>
                )}
              </div>

              {someSelected && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tests.map((test) => {
                    const isSelected = selectedTests.includes(test.id);
                    return (
                      <div key={test.id} className="flex items-center gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleTest(test.id)}
                          className="data-[state=checked]:bg-primary"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm">{test.name}</span>
                          <span className="text-[10px] text-muted-foreground ml-2">
                            ({test.minRange}–{test.maxRange} {test.unit})
                          </span>
                        </div>
                        {isSelected && (
                          <Input
                            type="number"
                            placeholder="Value"
                            className="w-24 h-8 text-sm font-mono"
                            value={values[test.id] || ""}
                            onChange={(e) => setValues({ ...values, [test.id]: e.target.value })}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate("/reports")}>Cancel</Button>
        <Button onClick={handleGenerate} disabled={!patientId || selectedTests.length === 0}>
          Finalize & Generate Report
        </Button>
      </div>
    </div>
  );
};

export default GenerateReportPage;
