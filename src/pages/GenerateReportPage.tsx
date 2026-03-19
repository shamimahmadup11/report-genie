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
import { CheckSquare, Square } from "lucide-react";

// Text-based urine tests that take string values
const TEXT_TESTS = new Set(["ur-color", "ur-appearance", "ur-ketones", "ur-microscopy"]);

const GenerateReportPage = () => {
  const { patients, addReport, currentUser } = useAppStore();
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

  const selectAll = () => {
    const allIds = TEST_MASTER.map((t) => t.id);
    const allSelected = allIds.every((id) => selectedTests.includes(id));
    setSelectedTests(allSelected ? [] : allIds);
  };

  const handleGenerate = () => {
    if (!patientId || selectedTests.length === 0) return;
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return;

    const results: TestResult[] = selectedTests.map((testId) => {
      const def = TEST_MASTER.find((t) => t.id === testId)!;
      const isText = TEXT_TESTS.has(testId);
      const rawVal = values[testId] || "";
      const numVal = Number(rawVal) || 0;

      let flag: TestResult["flag"] = "Normal";
      if (!isText && def.minRange !== 0 && def.maxRange !== 0) {
        if (numVal > def.maxRange) flag = "High";
        else if (numVal < def.minRange) flag = "Low";
      }

      return {
        testId,
        testName: def.name,
        category: def.category,
        value: isText ? rawVal : numVal,
        unit: def.unit,
        normalRange: isText ? "—" : `${def.minRange} - ${def.maxRange}`,
        flag: isText ? ("Normal" as const) : flag,
      };
    });

    addReport({
      patientId,
      patientName: patient.name,
      results,
      status: "Final",
      createdBy: currentUser?.id,
    });
    navigate("/reports");
  };

  const groupedTests = TEST_CATEGORIES.map((cat) => ({
    category: cat,
    tests: TEST_MASTER.filter((t) => t.category === cat),
  }));

  const allTestIds = TEST_MASTER.map((t) => t.id);
  const allSelected = allTestIds.every((id) => selectedTests.includes(id));

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="page-header">
        <h1 className="page-title">Generate Report</h1>
      </div>

      {/* Patient Selection */}
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

      {/* Select All Master */}
      <div className="flex items-center justify-between mb-4 bg-card border border-border rounded-md px-4 py-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Test Selection</h2>
          <span className="text-xs text-muted-foreground">
            ({selectedTests.length} of {allTestIds.length} selected)
          </span>
        </div>
        <Button variant={allSelected ? "outline" : "default"} size="sm" onClick={selectAll} className="gap-2">
          {allSelected ? <Square className="h-4 w-4" /> : <CheckSquare className="h-4 w-4" />}
          {allSelected ? "Deselect All" : "Select All Tests"}
        </Button>
      </div>

      {/* Test Categories */}
      <div className="flex-1 space-y-4 mb-6">
        {groupedTests.map(({ category, tests }) => {
          const catIds = tests.map((t) => t.id);
          const catAllSelected = catIds.every((id) => selectedTests.includes(id));
          const someSelected = catIds.some((id) => selectedTests.includes(id));

          return (
            <div key={category} className="bg-card border border-border rounded-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
                <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => selectCategory(category)}>
                  <Checkbox checked={catAllSelected} className="data-[state=checked]:bg-primary" />
                  <h3 className="text-sm font-semibold">{category}</h3>
                  <span className="text-[10px] text-muted-foreground">({tests.length} tests)</span>
                  {someSelected && !catAllSelected && (
                    <span className="text-[10px] text-muted-foreground">(partial)</span>
                  )}
                </div>
                <Button
                  variant={catAllSelected ? "outline" : "secondary"}
                  size="sm"
                  className="text-xs h-7 px-3"
                  onClick={() => selectCategory(category)}
                >
                  {catAllSelected ? "Deselect All" : "Select All"}
                </Button>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {tests.map((test) => {
                  const isSelected = selectedTests.includes(test.id);
                  const isText = TEXT_TESTS.has(test.id);
                  return (
                    <div
                      key={test.id}
                      className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                        isSelected ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/30"
                      }`}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleTest(test.id)}
                        className="data-[state=checked]:bg-primary"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium">{test.name}</span>
                        {!isText && (
                          <span className="text-[10px] text-muted-foreground ml-2">
                            ({test.minRange}–{test.maxRange} {test.unit})
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Input
                          type={isText ? "text" : "number"}
                          placeholder={isText ? "Enter value" : "Value"}
                          className="w-28 h-8 text-sm font-mono"
                          value={values[test.id] || ""}
                          onChange={(e) => setValues({ ...values, [test.id]: e.target.value })}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border py-4 -mx-6 px-6 mt-auto">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {selectedTests.length > 0
              ? `${selectedTests.length} test(s) selected — Enter values above and generate report`
              : "Select tests above to enter results and generate a report"}
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/reports")}>Cancel</Button>
            <Button onClick={handleGenerate} disabled={!patientId || selectedTests.length === 0} size="lg" className="px-8">
              Finalize & Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportPage;
