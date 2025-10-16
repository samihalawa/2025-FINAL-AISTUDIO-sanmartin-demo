export interface EmployeeBirthday {
  id: number;
  name: string;
  birthday: string; // YYYY-MM-DD
  email: string;
  felicitar: 'sí' | 'no';
}

export interface ParsedWorkLog {
  employeeName: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // 'L', 'M', 'X', 'J', 'V', 'S', 'D'
  totalHours: string | null; // "HH:mm"
  isAbsence: boolean;
  isMissing: boolean;
}

export interface FinalPayrollOutput {
  Fecha: string; // "DD/MM/YYYY"
  'Cod. Empleado': string;
  'tipo de hora': string;
  unidades: number;
  precio: number;
  importe: number;
  obra: number;
  'centro de coste': number;
}


export interface CriterionMatch {
  shortName: string;
  fullName: string;
  color: string;
}

export interface CandidateCriterion {
  status: 'Match' | 'Unclear';
  refs: number;
}

export interface CandidateProfile {
  id: number;
  avatarUrl?: string;
  name: string;
  company: string;
  jobTitle: string;
  url: string;
  criteria: CandidateCriterion[];
  professionalSummary?: string;
  experienceSummary?: string;
}


export type TimeOffStatus = 'Approved' | 'Pending' | 'Rejected';

export interface TimeOffRequest {
  id: number;
  type: 'Vacation' | 'Absence';
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  status: TimeOffStatus;
  justificationFile?: string;
}

export interface EmployeeProfile {
    name: string;
    vacationDaysRemaining: number;
}

export interface EmployeeDocument {
  id: number;
  name: string;
  category: 'Contract' | 'Payroll' | 'Policy';
  url: string;
}