export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  address: string;
  createdAt: string;
}

export interface TestResult {
  testId: string;
  testName: string;
  category: string;
  value: number;
  unit: string;
  normalRange: string;
  flag: "Normal" | "High" | "Low";
}

export interface Report {
  id: string;
  reportId: string;
  patientId: string;
  patientName: string;
  results: TestResult[];
  status: "Final" | "Draft";
  createdAt: string;
}

export const SAMPLE_PATIENTS: Patient[] = [
  { id: "p1", name: "Rajesh Kumar", age: 45, gender: "Male", phone: "+91 98765 43210", address: "12 MG Road, Mumbai", createdAt: "2025-03-15" },
  { id: "p2", name: "Priya Sharma", age: 32, gender: "Female", phone: "+91 87654 32109", address: "45 Nehru Nagar, Delhi", createdAt: "2025-03-14" },
  { id: "p3", name: "Amit Patel", age: 58, gender: "Male", phone: "+91 76543 21098", address: "78 Sector 5, Noida", createdAt: "2025-03-13" },
  { id: "p4", name: "Sunita Devi", age: 67, gender: "Female", phone: "+91 65432 10987", address: "23 Civil Lines, Jaipur", createdAt: "2025-03-12" },
  { id: "p5", name: "Vikram Singh", age: 29, gender: "Male", phone: "+91 54321 09876", address: "56 Park Street, Kolkata", createdAt: "2025-03-10" },
];

export const SAMPLE_REPORTS: Report[] = [
  {
    id: "r1",
    reportId: "REP-240315-001",
    patientId: "p1",
    patientName: "Rajesh Kumar",
    status: "Final",
    createdAt: "2025-03-15T10:30:00",
    results: [
      { testId: "cbc-hgb", testName: "Hemoglobin", category: "Complete Blood Count", value: 11.2, unit: "g/dL", normalRange: "12 - 17", flag: "Low" },
      { testId: "cbc-wbc", testName: "WBC Count", category: "Complete Blood Count", value: 7500, unit: "cells/μL", normalRange: "4000 - 11000", flag: "Normal" },
      { testId: "cbc-plt", testName: "Platelet Count", category: "Complete Blood Count", value: 250, unit: "×10³/μL", normalRange: "150 - 400", flag: "Normal" },
      { testId: "bs-fasting", testName: "Blood Sugar (Fasting)", category: "Blood Sugar", value: 126, unit: "mg/dL", normalRange: "70 - 100", flag: "High" },
      { testId: "bs-hba1c", testName: "HbA1c", category: "Blood Sugar", value: 6.8, unit: "%", normalRange: "4 - 5.6", flag: "High" },
      { testId: "lip-cholesterol", testName: "Total Cholesterol", category: "Lipid Profile", value: 220, unit: "mg/dL", normalRange: "0 - 200", flag: "High" },
      { testId: "lip-hdl", testName: "HDL Cholesterol", category: "Lipid Profile", value: 42, unit: "mg/dL", normalRange: "40 - 60", flag: "Normal" },
      { testId: "lip-triglycerides", testName: "Triglycerides", category: "Lipid Profile", value: 180, unit: "mg/dL", normalRange: "0 - 150", flag: "High" },
    ],
  },
  {
    id: "r2",
    reportId: "REP-240314-002",
    patientId: "p2",
    patientName: "Priya Sharma",
    status: "Final",
    createdAt: "2025-03-14T14:00:00",
    results: [
      { testId: "thy-t3", testName: "T3", category: "Thyroid Profile", value: 190, unit: "ng/dL", normalRange: "80 - 200", flag: "Normal" },
      { testId: "thy-t4", testName: "T4", category: "Thyroid Profile", value: 13.5, unit: "μg/dL", normalRange: "5.1 - 14.1", flag: "Normal" },
      { testId: "thy-tsh", testName: "TSH", category: "Thyroid Profile", value: 6.2, unit: "μIU/mL", normalRange: "0.4 - 4", flag: "High" },
    ],
  },
  {
    id: "r3",
    reportId: "REP-240313-003",
    patientId: "p3",
    patientName: "Amit Patel",
    status: "Final",
    createdAt: "2025-03-13T09:15:00",
    results: [
      { testId: "kft-urea", testName: "Urea", category: "Kidney Function Test", value: 25, unit: "mg/dL", normalRange: "7 - 20", flag: "High" },
      { testId: "kft-creatinine", testName: "Creatinine", category: "Kidney Function Test", value: 1.8, unit: "mg/dL", normalRange: "0.6 - 1.2", flag: "High" },
      { testId: "kft-uric-acid", testName: "Uric Acid", category: "Kidney Function Test", value: 6.5, unit: "mg/dL", normalRange: "3.5 - 7.2", flag: "Normal" },
      { testId: "kft-sodium", testName: "Sodium", category: "Kidney Function Test", value: 140, unit: "mEq/L", normalRange: "136 - 145", flag: "Normal" },
      { testId: "kft-potassium", testName: "Potassium", category: "Kidney Function Test", value: 5.3, unit: "mEq/L", normalRange: "3.5 - 5", flag: "High" },
    ],
  },
];
