import { create } from 'zustand';
import { Patient, Report, AppUser, UserRole, SAMPLE_PATIENTS, SAMPLE_REPORTS, PRESET_USERS } from '@/data/mockData';
import { TEST_MASTER } from '@/data/testMaster';
import type { TestResult } from '@/data/mockData';

interface AppState {
  patients: Patient[];
  reports: Report[];
  users: AppUser[];
  currentUser: AppUser | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => string | null;
  logout: () => void;

  addPatient: (patient: Omit<Patient, 'id' | 'createdAt'>) => void;
  updatePatient: (id: string, data: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  addReport: (report: Omit<Report, 'id' | 'reportId' | 'createdAt'>) => void;
  deleteReport: (id: string) => void;

  addUser: (user: Omit<AppUser, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, data: Partial<AppUser>) => void;
  deleteUser: (id: string) => void;
  toggleUserActive: (id: string) => void;
}

let patientCounter = SAMPLE_PATIENTS.length + 1;
let reportCounter = SAMPLE_REPORTS.length + 1;
let userCounter = PRESET_USERS.length + 1;

export const useAppStore = create<AppState>((set, get) => ({
  patients: SAMPLE_PATIENTS,
  reports: SAMPLE_REPORTS,
  users: PRESET_USERS,
  currentUser: null,
  isAuthenticated: false,

  login: (email, password) => {
    const user = get().users.find((u) => u.email === email && u.password === password);
    if (!user) return "Invalid credentials";
    if (!user.isActive) return "Account is deactivated. Contact Super Admin.";
    set({ isAuthenticated: true, currentUser: user });
    return null;
  },

  logout: () => set({ isAuthenticated: false, currentUser: null }),

  addPatient: (data) => {
    const id = `p${patientCounter++}`;
    const patient: Patient = { ...data, id, createdAt: new Date().toISOString().split('T')[0] };
    set((s) => ({ patients: [...s.patients, patient] }));
  },

  updatePatient: (id, data) => {
    set((s) => ({ patients: s.patients.map((p) => (p.id === id ? { ...p, ...data } : p)) }));
  },

  deletePatient: (id) => {
    set((s) => ({ patients: s.patients.filter((p) => p.id !== id) }));
  },

  addReport: (data) => {
    const id = `r${reportCounter}`;
    const reportId = `REP-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${String(reportCounter++).padStart(3, '0')}`;
    const report: Report = { ...data, id, reportId, createdAt: new Date().toISOString() };
    set((s) => ({ reports: [report, ...s.reports] }));
  },

  deleteReport: (id) => {
    set((s) => ({ reports: s.reports.filter((r) => r.id !== id) }));
  },

  addUser: (data) => {
    const id = `u${userCounter++}`;
    const user: AppUser = { ...data, id, createdAt: new Date().toISOString().split('T')[0] };
    set((s) => ({ users: [...s.users, user] }));
  },

  updateUser: (id, data) => {
    set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, ...data } : u)) }));
  },

  deleteUser: (id) => {
    set((s) => ({ users: s.users.filter((u) => u.id !== id) }));
  },

  toggleUserActive: (id) => {
    set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)) }));
  },
}));
