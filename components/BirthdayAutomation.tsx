import React, { useState, useMemo } from 'react';
import { MOCK_BIRTHDAY_DATA, BIRTHDAY_EMAIL_TEMPLATE } from '../constants';
import type { EmployeeBirthday } from '../types';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Table, TableHeader, TableRow, TableCell } from './common/Table';
import { CheckCircle, XCircle, Mail, Calendar } from './common/Icons';

const BirthdayAutomation: React.FC = () => {
  // To demonstrate the weekend logic, we fix the date to a Monday.
  // The logic itself will work with new Date() for the real current date.
  const [today] = useState(new Date('2024-07-15T10:00:00Z'));
  const [triggered, setTriggered] = useState(false);

  const employeesWithBirthdayToday = useMemo(() => {
    const datesToCheck: Date[] = [today];
    // getUTCDay() returns Sunday = 0, Monday = 1, etc.
    const dayOfWeek = today.getUTCDay();

    // If it's Monday, also check for birthdays on the past Saturday and Sunday.
    if (dayOfWeek === 1) {
      const saturday = new Date(today);
      saturday.setUTCDate(today.getUTCDate() - 2);
      datesToCheck.push(saturday);

      const sunday = new Date(today);
      sunday.setUTCDate(today.getUTCDate() - 1);
      datesToCheck.push(sunday);
    }

    const birthdayEmployees = MOCK_BIRTHDAY_DATA.map(emp => {
      // Use UTC to avoid timezone issues with date comparisons
      const [year, month, day] = emp.birthday.split('-').map(Number);
      const birthDate = new Date(Date.UTC(year, month - 1, day));
      return { ...emp, birthDate };
    });

    return birthdayEmployees.filter(emp => {
      return datesToCheck.some(checkDate => {
        return emp.birthDate.getUTCMonth() === checkDate.getUTCMonth() &&
               emp.birthDate.getUTCDate() === checkDate.getUTCDate();
      });
    });
  }, [today]);


  const employeesToCongratulate = useMemo(() => {
    return employeesWithBirthdayToday.filter(emp => emp.felicitar === 'sí');
  }, [employeesWithBirthdayToday]);

  const handleRunCheck = () => {
    setTriggered(true);
  };

  const todayFormatted = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="lg:col-span-2">
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-brand-text mb-1">Employee Birthday List</h3>
            <p className="text-brand-subtle-text mb-6">This list represents the data from your Excel file.</p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <thead>
                <TableRow header>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Birthday</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Send Greeting?</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {MOCK_BIRTHDAY_DATA.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{new Date(employee.birthday + 'T00:00:00').toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      {employee.felicitar === 'sí' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-1.5" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                           <XCircle className="w-4 h-4 mr-1.5" /> No
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-brand-text mb-1">Automation Control</h3>
            <p className="text-brand-subtle-text mb-4">Simulate the daily automated check.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
              <p className="text-sm text-blue-700">Automation Run Date</p>
              <p className="text-lg font-bold text-blue-900 flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" /> {todayFormatted}
              </p>
            </div>
            <Button onClick={handleRunCheck} className="w-full">
              Run Daily Birthday Check
            </Button>

            {triggered && (
              <div className="mt-6">
                <h4 className="font-semibold text-brand-text mb-3">Automation Log</h4>
                {employeesToCongratulate.length > 0 ? (
                  <ul className="space-y-3">
                    {employeesToCongratulate.map(emp => {
                        const empBirthday = new Date(emp.birthday + 'T00:00:00Z');
                        const isWeekendBirthday = empBirthday.getUTCDay() === 0 || empBirthday.getUTCDay() === 6;
                        const isMondayRun = today.getUTCDay() === 1;

                        return (
                            <li key={emp.id} className="p-3 bg-green-50 rounded-md border border-green-200">
                                <p className="text-sm font-medium text-green-800 flex items-center">
                                <Mail className="w-4 h-4 mr-2" /> Greeting sent to {emp.name}.
                                </p>
                                {isMondayRun && isWeekendBirthday && (
                                <p className="text-xs text-green-600 ml-6">
                                    Birthday on {empBirthday.toLocaleDateString('es-ES', { weekday: 'long' })} sent on Monday.
                                </p>
                                )}
                            </li>
                        );
                    })}
                    {employeesWithBirthdayToday.filter(e => e.felicitar === 'no').map(emp => (
                         <li key={emp.id} className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
                            <p className="text-sm font-medium text-yellow-800">
                                Skipped {emp.name} (flagged not to send).
                            </p>
                        </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-3 bg-gray-100 rounded-md text-center">
                    <p className="text-sm text-brand-subtle-text">No birthdays to celebrate today or none are marked for greetings.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
         {triggered && employeesToCongratulate.length > 0 && (
            <Card className="mt-6">
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-brand-text mb-4">Email Preview</h3>
                    <div className="bg-white p-4 border rounded-lg shadow-sm">
                        <pre className="text-sm whitespace-pre-wrap font-sans text-gray-700">
                            {BIRTHDAY_EMAIL_TEMPLATE(employeesToCongratulate[0].name)}
                        </pre>
                    </div>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
};

export default BirthdayAutomation;