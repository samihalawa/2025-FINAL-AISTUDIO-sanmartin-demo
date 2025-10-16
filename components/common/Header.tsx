
import React from 'react';

interface HeaderProps {
    title: string;
    description: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-brand-text">{title}</h1>
            <p className="text-brand-subtle-text mt-1">{description}</p>
        </header>
    );
};
