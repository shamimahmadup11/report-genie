export interface TestDefinition {
  id: string;
  name: string;
  category: string;
  unit: string;
  minRange: number;
  maxRange: number;
}

export const TEST_CATEGORIES = [
  "Complete Blood Count",
  "Blood Sugar",
  "Liver Function Test",
  "Kidney Function Test",
  "Lipid Profile",
  "Thyroid Profile",
  "Urine Test",
  "Other Tests",
] as const;

export const TEST_MASTER: TestDefinition[] = [
  // CBC
  { id: "cbc-wbc", name: "WBC Count", category: "Complete Blood Count", unit: "cells/μL", minRange: 4000, maxRange: 11000 },
  { id: "cbc-rbc", name: "RBC Count", category: "Complete Blood Count", unit: "million/μL", minRange: 4.5, maxRange: 5.5 },
  { id: "cbc-hgb", name: "Hemoglobin", category: "Complete Blood Count", unit: "g/dL", minRange: 12, maxRange: 17 },
  { id: "cbc-hct", name: "Hematocrit", category: "Complete Blood Count", unit: "%", minRange: 36, maxRange: 50 },
  { id: "cbc-plt", name: "Platelet Count", category: "Complete Blood Count", unit: "×10³/μL", minRange: 150, maxRange: 400 },
  { id: "cbc-esr", name: "ESR", category: "Complete Blood Count", unit: "mm/hr", minRange: 0, maxRange: 20 },
  { id: "cbc-mcv", name: "MCV", category: "Complete Blood Count", unit: "fL", minRange: 80, maxRange: 100 },
  { id: "cbc-mch", name: "MCH", category: "Complete Blood Count", unit: "pg", minRange: 27, maxRange: 33 },

  // Blood Sugar
  { id: "bs-fasting", name: "Blood Sugar (Fasting)", category: "Blood Sugar", unit: "mg/dL", minRange: 70, maxRange: 100 },
  { id: "bs-pp", name: "Blood Sugar (PP)", category: "Blood Sugar", unit: "mg/dL", minRange: 70, maxRange: 140 },
  { id: "bs-random", name: "Blood Sugar (Random)", category: "Blood Sugar", unit: "mg/dL", minRange: 70, maxRange: 200 },
  { id: "bs-hba1c", name: "HbA1c", category: "Blood Sugar", unit: "%", minRange: 4, maxRange: 5.6 },

  // LFT
  { id: "lft-bilirubin-total", name: "Bilirubin (Total)", category: "Liver Function Test", unit: "mg/dL", minRange: 0.1, maxRange: 1.2 },
  { id: "lft-bilirubin-direct", name: "Bilirubin (Direct)", category: "Liver Function Test", unit: "mg/dL", minRange: 0, maxRange: 0.3 },
  { id: "lft-bilirubin-indirect", name: "Bilirubin (Indirect)", category: "Liver Function Test", unit: "mg/dL", minRange: 0.1, maxRange: 0.9 },
  { id: "lft-sgot", name: "SGOT (AST)", category: "Liver Function Test", unit: "U/L", minRange: 5, maxRange: 40 },
  { id: "lft-sgpt", name: "SGPT (ALT)", category: "Liver Function Test", unit: "U/L", minRange: 7, maxRange: 56 },
  { id: "lft-alp", name: "Alkaline Phosphatase", category: "Liver Function Test", unit: "U/L", minRange: 44, maxRange: 147 },
  { id: "lft-protein", name: "Total Protein", category: "Liver Function Test", unit: "g/dL", minRange: 6, maxRange: 8.3 },
  { id: "lft-ag-ratio", name: "Albumin/Globulin Ratio", category: "Liver Function Test", unit: "ratio", minRange: 1.1, maxRange: 2.5 },

  // KFT
  { id: "kft-urea", name: "Urea", category: "Kidney Function Test", unit: "mg/dL", minRange: 7, maxRange: 20 },
  { id: "kft-creatinine", name: "Creatinine", category: "Kidney Function Test", unit: "mg/dL", minRange: 0.6, maxRange: 1.2 },
  { id: "kft-uric-acid", name: "Uric Acid", category: "Kidney Function Test", unit: "mg/dL", minRange: 3.5, maxRange: 7.2 },
  { id: "kft-sodium", name: "Sodium", category: "Kidney Function Test", unit: "mEq/L", minRange: 136, maxRange: 145 },
  { id: "kft-potassium", name: "Potassium", category: "Kidney Function Test", unit: "mEq/L", minRange: 3.5, maxRange: 5 },

  // Lipid Profile
  { id: "lip-cholesterol", name: "Total Cholesterol", category: "Lipid Profile", unit: "mg/dL", minRange: 0, maxRange: 200 },
  { id: "lip-hdl", name: "HDL Cholesterol", category: "Lipid Profile", unit: "mg/dL", minRange: 40, maxRange: 60 },
  { id: "lip-ldl", name: "LDL Cholesterol", category: "Lipid Profile", unit: "mg/dL", minRange: 0, maxRange: 100 },
  { id: "lip-vldl", name: "VLDL Cholesterol", category: "Lipid Profile", unit: "mg/dL", minRange: 5, maxRange: 40 },
  { id: "lip-triglycerides", name: "Triglycerides", category: "Lipid Profile", unit: "mg/dL", minRange: 0, maxRange: 150 },

  // Thyroid
  { id: "thy-t3", name: "T3 (Triiodothyronine)", category: "Thyroid Profile", unit: "ng/dL", minRange: 80, maxRange: 200 },
  { id: "thy-t4", name: "T4 (Thyroxine)", category: "Thyroid Profile", unit: "μg/dL", minRange: 5.1, maxRange: 14.1 },
  { id: "thy-tsh", name: "TSH", category: "Thyroid Profile", unit: "μIU/mL", minRange: 0.4, maxRange: 4 },

  // Urine
  { id: "ur-ph", name: "Urine pH", category: "Urine Test", unit: "", minRange: 4.5, maxRange: 8 },
  { id: "ur-protein", name: "Urine Protein", category: "Urine Test", unit: "mg/dL", minRange: 0, maxRange: 14 },
  { id: "ur-sugar", name: "Urine Sugar", category: "Urine Test", unit: "mg/dL", minRange: 0, maxRange: 15 },

  // Others
  { id: "oth-vitb12", name: "Vitamin B12", category: "Other Tests", unit: "pg/mL", minRange: 200, maxRange: 900 },
  { id: "oth-vitd", name: "Vitamin D", category: "Other Tests", unit: "ng/mL", minRange: 30, maxRange: 100 },
  { id: "oth-crp", name: "CRP", category: "Other Tests", unit: "mg/L", minRange: 0, maxRange: 3 },
  { id: "oth-calcium", name: "Calcium", category: "Other Tests", unit: "mg/dL", minRange: 8.5, maxRange: 10.5 },
  { id: "oth-iron", name: "Serum Iron", category: "Other Tests", unit: "μg/dL", minRange: 60, maxRange: 170 },
  { id: "oth-ferritin", name: "Ferritin", category: "Other Tests", unit: "ng/mL", minRange: 12, maxRange: 300 },
  { id: "oth-tibc", name: "TIBC", category: "Other Tests", unit: "μg/dL", minRange: 250, maxRange: 370 },
];
