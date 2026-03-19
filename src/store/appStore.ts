import { create } from 'zustand';
import { Patient, Report, SAMPLE_PATIENTS, SAMPLE_REPORTS } from '@/data/mockData';
import { TEST_MASTER, TestDefinition } from '@/data/testMaster';

interface AppState {
  patients: Patient[];
  reports: Report[];
  isAuthenticated: boolean;
  
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt'>) => void;
  updatePatient: (id: string, data: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  
  addReport: (report: Omit<Report, 'id' | 'reportId' | 'createdAt'>) => void;
  deleteReport: (id: string) => void;
}

let patientCounter = SAMPLE_PATIENTS.length + 1;
let reportCounter = SAMPLE_REPORTS.length + 1;

export const useAppStore = create<AppState>((set, get) => ({
  patients: SAMPLE_PATIENTS,
  reports: SAMPLE_REPORTS,
  isAuthenticated: false,

  login: (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => set({ isAuthenticated: false }),

  addPatient: (data) => {
    const id = `p${patientCounter++}`;
    const patient: Patient = {
      ...data,
      id,
      createdAt: new Date().toISOString().split('T')[0],
    };
    set((s) => ({ patients: [...s.patients, patient] }));
  },

  updatePatient: (id, data) => {
    set((s) => ({
      patients: s.patients.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }));
  },

  deletePatient: (id) => {
    set((s) => ({ patients: s.patients.filter((p) => p.id !== id) }));
  },

  addReport: (data) => {
    const id = `r${reportCounter}`;
    const reportId = `REP-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${String(reportCounter++).padStart(3, '0')}`;
    const report: Report = {
      ...data,
      id,
      reportId,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ reports: [report, ...s.reports] }));
  },

  deleteReport: (id) => {
    set((s) => ({ reports: s.reports.filter((r) => r.id !== id) }));
  },
}));
