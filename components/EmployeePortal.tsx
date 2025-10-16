import React, { useState } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Table, TableHeader, TableRow, TableCell } from './common/Table';
import { MOCK_EMPLOYEE_PROFILE, MOCK_TIMEOFF_DATA, MOCK_DOCUMENTS_DATA } from '../constants';
import type { TimeOffRequest, TimeOffStatus, EmployeeDocument } from '../types';
import { Plane, Calendar, FileUp, CheckCircle, CircleHelp, XCircle, FileText, Download } from './common/Icons';

const StatusBadge: React.FC<{ status: TimeOffStatus }> = ({ status }) => {
  const statusMap = {
    Approved: {
      icon: <CheckCircle className="w-4 h-4 mr-1.5" />,
      className: 'bg-green-100 text-green-800',
    },
    Pending: {
      icon: <CircleHelp className="w-4 h-4 mr-1.5" />,
      className: 'bg-yellow-100 text-yellow-800',
    },
    Rejected: {
      icon: <XCircle className="w-4 h-4 mr-1.5" />,
      className: 'bg-red-100 text-red-800',
    },
  };
  const { icon, className } = statusMap[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {icon} {status}
    </span>
  );
};

const CategoryBadge: React.FC<{ category: 'Contract' | 'Payroll' | 'Policy' }> = ({ category }) => {
  const categoryMap = {
    Contract: 'bg-indigo-100 text-indigo-800',
    Payroll: 'bg-pink-100 text-pink-800',
    Policy: 'bg-gray-100 text-gray-800',
  };
  const className = categoryMap[category];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {category}
    </span>
  );
};

const EmployeePortal: React.FC = () => {
    const [employeeProfile, setEmployeeProfile] = useState(MOCK_EMPLOYEE_PROFILE);
    const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>(MOCK_TIMEOFF_DATA);
    const [documents] = useState<EmployeeDocument[]>(MOCK_DOCUMENTS_DATA);
    
    // State for vacation form
    const [vacationStart, setVacationStart] = useState('');
    const [vacationEnd, setVacationEnd] = useState('');

    // State for absence form
    const [absenceDate, setAbsenceDate] = useState('');
    const [justificationFile, setJustificationFile] = useState<File | null>(null);

    const handleVacationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!vacationStart || !vacationEnd) return;
        
        const newRequest: TimeOffRequest = {
            id: timeOffRequests.length + 1,
            type: 'Vacation',
            startDate: vacationStart,
            endDate: vacationEnd,
            status: 'Pending',
        };
        setTimeOffRequests(prev => [...prev, newRequest].sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()));
        setVacationStart('');
        setVacationEnd('');
    };

     const handleAbsenceSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!absenceDate || !justificationFile) return;

         const newRequest: TimeOffRequest = {
            id: timeOffRequests.length + 1,
            type: 'Absence',
            startDate: absenceDate,
            endDate: absenceDate,
            status: 'Approved', // Justifications are auto-approved for demo
            justificationFile: justificationFile.name,
        };
        setTimeOffRequests(prev => [...prev, newRequest].sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()));
        setAbsenceDate('');
        setJustificationFile(null);
        // Reset file input
        const fileInput = document.getElementById('justification-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

  return (
    <div className="space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-brand-text">Welcome, {employeeProfile.name}!</h3>
                    <p className="text-brand-subtle-text">Here's your dashboard.</p>
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p className="text-sm font-medium text-blue-700">Available Vacation Days</p>
                        <p className="text-4xl font-bold text-brand-primary mt-1">{employeeProfile.vacationDaysRemaining}</p>
                    </div>
                </div>
            </Card>
            <Card className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 overflow-hidden">
                {/* Vacation Request Form */}
                <form onSubmit={handleVacationSubmit} className="p-6 bg-white">
                    <h3 className="text-lg font-semibold text-brand-text flex items-center mb-4">
                        <Plane className="w-5 h-5 mr-2 text-brand-primary" />
                        Request Vacation
                    </h3>
                    <div className="space-y-4">
                        <div>
                             <label htmlFor="vacation-start" className="block text-sm font-medium text-brand-subtle-text mb-1">Start Date</label>
                             <input type="date" id="vacation-start" value={vacationStart} onChange={e => setVacationStart(e.target.value)} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"/>
                        </div>
                        <div>
                             <label htmlFor="vacation-end" className="block text-sm font-medium text-brand-subtle-text mb-1">End Date</label>
                             <input type="date" id="vacation-end" value={vacationEnd} onChange={e => setVacationEnd(e.target.value)} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"/>
                        </div>
                        <Button type="submit" className="w-full">Submit Request</Button>
                    </div>
                </form>

                {/* Absence Justification Form */}
                 <form onSubmit={handleAbsenceSubmit} className="p-6 bg-white">
                    <h3 className="text-lg font-semibold text-brand-text flex items-center mb-4">
                        <FileUp className="w-5 h-5 mr-2 text-brand-primary" />
                        Submit Absence Justification
                    </h3>
                    <div className="space-y-4">
                        <div>
                             <label htmlFor="absence-date" className="block text-sm font-medium text-brand-subtle-text mb-1">Date of Absence</label>
                             <input type="date" id="absence-date" value={absenceDate} onChange={e => setAbsenceDate(e.target.value)} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"/>
                        </div>
                        <div>
                             <label htmlFor="justification-file" className="block text-sm font-medium text-brand-subtle-text mb-1">Justification Document</label>
                             <input type="file" id="justification-file" onChange={e => setJustificationFile(e.target.files ? e.target.files[0] : null)} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"/>
                        </div>
                        <Button type="submit" className="w-full">Upload Justification</Button>
                    </div>
                </form>
            </Card>
        </div>
      
        <Card>
            <div className="p-6">
                 <h3 className="text-xl font-semibold text-brand-text">Request History</h3>
                 <p className="text-brand-subtle-text">Your past and pending time-off requests.</p>
            </div>
            <div className="overflow-x-auto">
                 <Table>
                    <thead>
                        <TableRow header>
                            <TableHeader>Type</TableHeader>
                            <TableHeader>Dates</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Attachments</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {timeOffRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>
                                    <span className={`font-semibold ${request.type === 'Vacation' ? 'text-blue-600' : 'text-purple-600'}`}>
                                        {request.type}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {formatDate(request.startDate)}
                                    {request.startDate !== request.endDate && ` - ${formatDate(request.endDate)}`}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={request.status} />
                                </TableCell>
                                <TableCell className="text-sm text-brand-subtle-text">
                                    {request.justificationFile || 'N/A'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Card>

        <Card>
            <div className="p-6">
                 <h3 className="text-xl font-semibold text-brand-text flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-brand-primary" />
                    My Documents
                 </h3>
                 <p className="text-brand-subtle-text">Access your contracts, payslips, and company policies.</p>
            </div>
            <div className="overflow-x-auto">
                 <Table>
                    <thead>
                        <TableRow header>
                            <TableHeader>Document Name</TableHeader>
                            <TableHeader>Category</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell>{doc.name}</TableCell>
                                <TableCell>
                                  <CategoryBadge category={doc.category} />
                                </TableCell>
                                <TableCell>
                                    <a href={doc.url} download={doc.name} className="inline-flex items-center text-brand-primary hover:underline font-semibold text-sm">
                                      <Download className="w-4 h-4 mr-2" />
                                      Download
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Card>
    </div>
  );
};

export default EmployeePortal;
