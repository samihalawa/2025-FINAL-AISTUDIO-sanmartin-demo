
import React from 'react';

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <table className="w-full text-sm text-left text-brand-subtle-text">
    {children}
  </table>
);

export const TableHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <th scope="col" className={`px-6 py-3 font-semibold text-brand-text uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

export const TableRow: React.FC<{ children: React.ReactNode, header?: boolean, className?: string }> = ({ children, header = false, className }) => (
  <tr className={`${header ? 'bg-gray-50' : 'bg-white border-b border-gray-200 last:border-b-0 hover:bg-gray-50'} ${className}`}>
    {children}
  </tr>
);

export const TableCell: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <td className={`px-6 py-4 font-medium text-brand-text whitespace-nowrap ${className}`}>
    {children}
  </td>
);
