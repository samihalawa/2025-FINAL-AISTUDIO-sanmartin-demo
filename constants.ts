import { EmployeeBirthday, CandidateProfile, TimeOffRequest, EmployeeProfile, EmployeeDocument, CriterionMatch } from './types';

export const MOCK_BIRTHDAY_DATA: EmployeeBirthday[] = [
  { id: 1, name: 'Miguel Angel', birthday: '1985-07-15', email: 'miguel.angel@example.com', felicitar: 'sí' },
  { id: 2, name: 'Lucía Gómez', birthday: '1992-03-22', email: 'lucia.gomez@example.com', felicitar: 'sí' },
  { id: 3, name: 'Carlos Fernández', birthday: '1988-11-05', email: 'carlos.fernandez@example.com', felicitar: 'no' },
  { id: 4, name: 'Ana Martínez', birthday: '1995-07-15', email: 'ana.martinez@example.com', felicitar: 'sí' },
  { id: 5, name: 'David García', birthday: '1980-01-30', email: 'david.garcia@example.com', felicitar: 'sí' },
  { id: 6, name: 'Sofia Reyes', birthday: '1990-07-13', email: 'sofia.reyes@example.com', felicitar: 'sí' }, // Saturday
  { id: 7, name: 'Javier Moreno', birthday: '1987-07-14', email: 'javier.moreno@example.com', felicitar: 'sí' }, // Sunday
];

export const RAW_WORK_LOGS_TEXT = `
000002344 - ALFONSO FERNANDEZ LAYOS
01/09/2025 [L] 0005 - Obras L - J 11:04
Fichajes: 06:57 - 18:01
02/09/2025 [M] 0005 - Obras L - J 11:11
Fichajes: 06:50 - 18:01
03/09/2025 [X] 0005 - Obras L - J 11:10
Fichajes: 06:51 - 18:01
04/09/2025 [J] 0005 - Obras L - J 11:09
Fichajes: 06:50 - 17:59
05/09/2025 [V] 0005 - Obras L - J 07:15
Fichajes: 06:54 - 14:09
08/09/2025 [L] S004 - Ausencia injustificada
09/09/2025 [M] 0005 - Obras L - J 11:16
Fichajes: 06:58 - 18:14
10/09/2025 [X] 0005 - Obras L - J 11:08
Fichajes: 06:51 - 17:59
11/09/2025 [J] 0005 - Obras L - J
Fichajes: 06:50 - Falta fichaje
12/09/2025 [V] 0005 - Obras L - J 10:19
Fichajes: 06:51 - 17:10
13/09/2025 [S] 0005 - Obras L - J 06:13
Fichajes: 07:17 - 13:30
000002248 - JUAN GOMEZ FERIA
01/09/2025 [L] 0005 - Obras L - J 10:35
Fichajes: 06:19 - 16:54
02/09/2025 [M] 0005 - Obras L - J 10:31
Fichajes: 06:23 - 16:54
03/09/2025 [X] 0005 - Obras L - J 10:40
Fichajes: 06:14 - 16:54
04/09/2025 [J] 0005 - Obras L - J 10:38
Fichajes: 06:18 - 16:56
05/09/2025 [V] 0006 - Obras Viernes 06:33
Fichajes: 06:23 - 12:56
06/09/2025 [S] 0005 - Obras L - J 05:56
Fichajes: 06:09 - 12:05
08/09/2025 [L] 0005 - Obras L - J 10:38
Fichajes: 06:16 - 16:54
09/09/2025 [M] 0005 - Obras L - J 09:37
Fichajes: 06:19 - 15:56
`;

export const EMPLOYEE_ID_MAP: { [key: string]: string } = {
  "ALFONSO FERNANDEZ LAYOS": "MAD2344",
  "ANGEL COUTO GIL": "MAD2362",
  "JUAN GOMEZ FERIA": "MAD2248",
  "FCO JAVIER JIMENEZ FERNANDEZ": "MAD2301",
  "JUAN DAVID LOPEZ LONDOÑO": "MAD2363",
  "ENRIQUE FERNANDEZ -CLEMENTE VAZQUEZ": "MAD2375",
  "JOB AREVALO CHACON": "MAD2383",
};

export const EMPLOYEE_PROJECT_MAP: { [key: string]: number } = {
  "MAD2248": 2675,
  "MAD2301": 2674,
  "MAD2344": 2681,
  "MAD2362": 2675,
  "MAD2375": 2676,
  "MAD2383": 2676,
  "MAD2363": 0, // No project assigned in data, use 0 as placeholder
};

export const EMPLOYEE_HOUR_CODE_MAP: { [key: string]: { normal: string, extra: string, sabado: string, festivo: string } } = {
  "MAD2248": { normal: "HN004", extra: "HECat004", sabado: "HESab004", festivo: "HEDom004" },
  "MAD2301": { normal: "HN007", extra: "HECat007", sabado: "HESab007", festivo: "HEDom007" },
  "MAD2344": { normal: "HN006", extra: "HECat006", sabado: "HESab006", festivo: "HEDom006" },
  "MAD2362": { normal: "HN009", extra: "HECat009", sabado: "HESab009", festivo: "HEDom009" },
  "MAD2375": { normal: "HN007", extra: "HECat007", sabado: "HESab007", festivo: "HEDom007" },
  "MAD2383": { normal: "HN006", extra: "HECat006", sabado: "HESab006", festivo: "HEDom006" },
  "MAD2363": { normal: "HN006", extra: "HECat006", sabado: "HESab006", festivo: "HEDom006" }, // Assuming Capataz, not specified
};

export const HOUR_PRICE_MAP: { [key: string]: number } = {
  "HN004": 25.14, "HECat004": 19.5, "HESab004": 27.98, "HEDom004": 30.84,
  "HN006": 27.15, "HECat006": 20.98, "HESab006": 32.62, "HEDom006": 32.62,
  "HN007": 24.57, "HECat007": 20.98, "HESab007": 32.62, "HEDom007": 32.62,
  "HN009": 20.39, "HECat009": 19.49, "HESab009": 32.62, "HEDom009": 32.62,
};

export const BIRTHDAY_EMAIL_TEMPLATE = (name: string) => `
Estimado/a ${name},

Desde la dirección de San Martín, queremos desearte un muy feliz cumpleaños.

Aprovechamos la ocasión para agradecerte tu esfuerzo, dedicación y compromiso con la empresa.

¡Que tengas un día excelente!

Un cordial saludo,
Recursos Humanos
`;

export const CRITERIA_DEFINITIONS: CriterionMatch[] = [
    { shortName: "Currently Or P...", fullName: "Currently or previously held the position of 'jefe de producción' (production manager) in a construction or...", color: 'criterion-purple' },
    { shortName: "At Least 3 Yea...", fullName: "At least 3 years of professional experience in top-tier or equivalent construction/building companies", color: 'criterion-orange' },
    { shortName: "Salary < 50k...", fullName: "Salary history does not exceed €50,000/year (based on available or inferred compensation data)", color: 'criterion-blue' },
    { shortName: "Based in Madrid", fullName: "Based in Madrid", color: 'criterion-pink' },
];


export const MOCK_PERSONNEL_DATA: CandidateProfile[] = [
  { id: 1, avatarUrl: "https://i.pravatar.cc/150?u=1", name: "Federico Manuel Herre", company: "TEVA", jobTitle: "Responsable de obras", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 19 }, { status: "Match", refs: 29 }, { status: "Match", refs: 11 }] },
  { id: 2, avatarUrl: "", name: "Carlos Santos Linares", company: "SACYR", jobTitle: "Jefe de producción", url: "linkedin.com/in/ca", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 11 }, { status: "Match", refs: 1 }] },
  { id: 3, avatarUrl: "", name: "Gregorio Prado Zamor", company: "CONSTRUCCIONES RU", jobTitle: "Jefe de Producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 11 }, { status: "Match", refs: 1 }] },
  { id: 4, avatarUrl: "https://i.pravatar.cc/150?u=4", name: "Luis Mota", company: "Dragados SA", jobTitle: "Jefe de producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 1 }, { status: "Match", refs: 1 }] },
  { id: 5, avatarUrl: "", name: "Elvira M.", company: "TALLER DE CONSTRUC", jobTitle: "Jefe de producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 11 }, { status: "Match", refs: 1 }] },
  { id: 6, avatarUrl: "https://i.pravatar.cc/150?u=6", name: "Javier Martín de Pablo", company: "PROYECON GALICIA SA", jobTitle: "Jefe de producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 17 }, { status: "Match", refs: 1 }] },
  { id: 7, avatarUrl: "https://i.pravatar.cc/150?u=7", name: "Angel Lanusse", company: "FCC Construcción", jobTitle: "Jefe de obra", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 1 }, { status: "Match", refs: 1 }] },
  { id: 8, avatarUrl: "https://i.pravatar.cc/150?u=8", name: "Monica Bueno Vega", company: "EIGO GESTIÓN DE OBR", jobTitle: "Jefe de producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 1 }, { status: "Match", refs: 1 }] },
  { id: 9, avatarUrl: "https://i.pravatar.cc/150?u=9", name: "Sergio Santos Santos", company: "FCC Servicios Ciudadan", jobTitle: "Jefe de Obra y Producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 18 }, { status: "Match", refs: 1 }] },
  { id: 10, avatarUrl: "", name: "Sharon Lee Park", company: "FTC Obras y Energía S.A", jobTitle: "Jefe de producción", url: "linkedin.com/in/sh", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 6 }, { status: "Match", refs: 1 }] },
  { id: 11, avatarUrl: "https://i.pravatar.cc/150?u=11", name: "Beatriz Carracedo Her", company: "Ferrovial Construction", jobTitle: "Jefe de producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 6 }, { status: "Match", refs: 1 }] },
  { id: 12, avatarUrl: "", name: "Fernando Diez Mediav", company: "Ferrovial Construction", jobTitle: "Jefe de producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 9 }, { status: "Match", refs: 11 }, { status: "Unclear", refs: 1 }] },
  { id: 13, avatarUrl: "https://i.pravatar.cc/150?u=13", name: "Adelaida Salazar Men", company: "Azora", jobTitle: "Project Manager en Área ...", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 21 }, { status: "Match", refs: 1 }, { status: "Unclear", refs: 1 }] },
  { id: 14, avatarUrl: "", name: "Daniel Muñoz Núñez", company: "SANJOSE CONSTRUCT", jobTitle: "Jefe de producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Unclear", refs: 1 }, { status: "Match", refs: 1 }] },
  { id: 15, avatarUrl: "", name: "Rodrigo Fernandez Po", company: "Fernández Molina", jobTitle: "Jefe de obra", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 15 }, { status: "Unclear", refs: 1 }] },
  { id: 16, avatarUrl: "https://i.pravatar.cc/150?u=16", name: "Jose Antonio Madriga", company: "CONSTRUCCIONES RU", jobTitle: "Jefe de obra", url: "linkedin.com/in/jo", criteria: [{ status: "Match", refs: 2 }, { status: "Match", refs: 26 }, { status: "Unclear", refs: 1 }] },
  { id: 17, avatarUrl: "", name: "Nicolae Panaghiu", company: "Construcciones San Mar", jobTitle: "Arquitecto técnico", url: "linkedin.com/in/ni", criteria: [{ status: "Match", refs: 11 }, { status: "Match", refs: 17 }, { status: "Unclear", refs: 1 }] },
  { id: 18, avatarUrl: "", name: "SILVIA GONZALEZ GO", company: "FCC CONSTRUCCIÓN,S", jobTitle: "JEFE DE PRODUCCIÓN", url: "es.linkedin.com/in", criteria: [{ "status": "Unclear", "refs": 6 }, { "status": "Unclear", "refs": 9 }, { "status": "Match", "refs": 1 }] },
  { id: 19, avatarUrl: "https://i.pravatar.cc/150?u=19", name: "Mario Zorzo Carrillo", company: "Fernández Molina", jobTitle: "Jefe de producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 1 }, { status: "Match", refs: 26 }, { status: "Unclear", refs: 1 }] },
  { id: 20, avatarUrl: "", name: "EVA MARÍA LEÓN LU", company: "FCC CONSTRUCCION", jobTitle: "Jefe de producción", url: "es.linkedin.com/in", criteria: [{ status: "Match", refs: 7 }, { status: "Unclear", refs: 11 }, { status: "Match", refs: 1 }] }
];


export const MOCK_EMPLOYEE_PROFILE: EmployeeProfile = {
  name: "Ana Pérez",
  vacationDaysRemaining: 14,
};

export const MOCK_TIMEOFF_DATA: TimeOffRequest[] = [
  { id: 1, type: 'Vacation', startDate: '2025-08-01', endDate: '2025-08-07', status: 'Approved' },
  { id: 2, type: 'Absence', startDate: '2025-09-15', endDate: '2025-09-15', status: 'Approved', justificationFile: 'justificante_medico.pdf' },
  { id: 3, type: 'Vacation', startDate: '2025-12-22', endDate: '2025-12-29', status: 'Pending' },
  { id: 4, type: 'Vacation', startDate: '2025-06-10', endDate: '2025-06-11', status: 'Rejected' },
];

export const MOCK_DOCUMENTS_DATA: EmployeeDocument[] = [
  { id: 1, name: 'Employment Contract - 2023.pdf', category: 'Contract', url: '#' },
  { id: 2, name: 'Payslip - September 2025.pdf', category: 'Payroll', url: '#' },
  { id: 3, name: 'Payslip - August 2025.pdf', category: 'Payroll', url: '#' },
  { id: 4, name: 'Company Handbook.pdf', category: 'Policy', url: '#' },
  { id: 5, name: 'Data Protection Policy.pdf', category: 'Policy', url: '#' },
];