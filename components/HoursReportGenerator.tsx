import React, { useState, useCallback, useMemo } from 'react';
import { RAW_WORK_LOGS_TEXT } from '../constants';
import type { ParsedWorkLog, FinalPayrollOutput } from '../types';
import { generatePayrollReport } from '../services/geminiService';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Table, TableHeader, TableRow, TableCell } from './common/Table';
import { ArrowRight, Sparkles, FileText, CheckCircle } from './common/Icons';

type Status = 'idle' | 'loading' | 'success' | 'error';

const parseRawLogs = (rawText: string): ParsedWorkLog[] => {
    const lines = rawText.trim().split('\n');
    const logs: ParsedWorkLog[] = [];
    let currentEmployee = '';

    for (const line of lines) {
        if (/^\d{9} - /.test(line)) {
            currentEmployee = line.split(' - ')[1].trim();
        } else if (/^\d{2}\/\d{2}\/\d{4}/.test(line)) {
            const dateMatch = line.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
            if (!dateMatch || !currentEmployee) continue;
            
            const [, day, month, year] = dateMatch;
            const date = `${year}-${month}-${day}`;
            
            const dayOfWeekMatch = line.match(/\[([LMXJVS])\]/);
            const dayOfWeek = dayOfWeekMatch ? dayOfWeekMatch[1] : '';

            const hoursMatch = line.match(/(\d{2}:\d{2})$/);
            const totalHours = hoursMatch ? hoursMatch[1] : null;

            const isAbsence = line.includes('Ausencia');
            const isMissing = line.includes('Falta fichaje');

            logs.push({
                employeeName: currentEmployee,
                date,
                dayOfWeek,
                totalHours: isAbsence || isMissing ? null : totalHours,
                isAbsence,
                isMissing,
            });
        }
    }
    return logs;
};


const InputData: React.FC<{ rawText: string }> = ({ rawText }) => (
    <Card>
        <div className="p-6">
            <h3 className="text-xl font-semibold text-brand-text mb-1 flex items-center">
                <FileText className="w-5 h-5 mr-3 text-brand-primary" />
                1. Input Data: Clock-in Report
            </h3>
            <p className="text-brand-subtle-text mb-6">Raw text data from the time tracking system ("Fichajes.csv").</p>
            <pre className="bg-gray-50 p-4 rounded-lg text-xs text-gray-600 overflow-x-auto max-h-96">
                {rawText}
            </pre>
        </div>
    </Card>
);

const OutputDataTable: React.FC<{ data: FinalPayrollOutput[] }> = ({ data }) => (
     <Card>
        <div className="p-6">
            <h3 className="text-xl font-semibold text-brand-text mb-1 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                3. Output: Payroll Import File
            </h3>
            <p className="text-brand-subtle-text mb-6">Structured data ready for import into the payroll system, with all rules and calculations applied.</p>
        </div>
        <div className="overflow-x-auto">
            <Table>
                <thead>
                    <TableRow header>
                        <TableHeader>Fecha</TableHeader>
                        <TableHeader>Cod. Empleado</TableHeader>
                        <TableHeader>Obra</TableHeader>
                        <TableHeader>Tipo de Hora</TableHeader>
                        <TableHeader>Unidades</TableHeader>
                        <TableHeader>Precio</TableHeader>
                        <TableHeader>Importe</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.Fecha}</TableCell>
                            <TableCell><span className="font-mono bg-gray-100 px-2 py-1 rounded">{row['Cod. Empleado']}</span></TableCell>
                            <TableCell>{row.obra}</TableCell>
                            <TableCell><span className="font-semibold text-sm">{row['tipo de hora']}</span></TableCell>
                            <TableCell>{row.unidades.toFixed(2)}</TableCell>
                            <TableCell>{row.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</TableCell>
                            <TableCell><span className="font-bold text-brand-text">{row.importe.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span></TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </div>
    </Card>
);


const HoursReportGenerator: React.FC = () => {
    const [status, setStatus] = useState<Status>('idle');
    const [outputData, setOutputData] = useState<FinalPayrollOutput[]>([]);
    const [error, setError] = useState<string | null>(null);

    const parsedLogs = useMemo(() => parseRawLogs(RAW_WORK_LOGS_TEXT), []);

    const handleGenerateReport = useCallback(async () => {
        setStatus('loading');
        setError(null);
        setOutputData([]);
        try {
            const result = await generatePayrollReport(parsedLogs);
            setOutputData(result);
            setStatus('success');
        } catch (err) {
            setStatus('error');
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    }, [parsedLogs]);

    return (
        <div className="space-y-6 lg:space-y-8">
            <InputData rawText={RAW_WORK_LOGS_TEXT} />

            <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-brand-text mb-2 flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
                    2. AI Processing Step
                </h3>
                <p className="text-brand-subtle-text max-w-2xl mb-6">
                    Click the button to send the parsed log data to the AI. It will apply all business rules, perform the necessary calculations and data lookups, and generate the final import file.
                </p>
                <Button onClick={handleGenerateReport} disabled={status === 'loading'} size="large">
                    {status === 'loading' ? 'AI is Analyzing...' : 'Generate Payroll Import File with AI'}
                    {status !== 'loading' && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
                 {status === 'error' && (
                    <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-md border border-red-200 text-sm">
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </div>

            {status === 'success' && outputData.length > 0 && (
                <OutputDataTable data={outputData} />
            )}
        </div>
    );
};

export default HoursReportGenerator;
