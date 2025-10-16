
import React from 'react';
import { Bot } from './Icons';

interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
             <div className="flex items-center text-xl font-bold text-brand-primary">
                <Bot className="w-8 h-8 mr-2"/>
                <span>HR AI Suite</span>
            </div>
        </div>
        <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
                {children}
            </ul>
        </nav>
    </aside>
);

interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    active: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, onClick, disabled = false }) => (
    <li>
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); if (!disabled) onClick(); }}
            className={`flex items-center p-3 rounded-lg font-semibold transition-colors
                ${disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : active 
                        ? 'bg-blue-50 text-brand-primary' 
                        : 'text-brand-subtle-text hover:bg-gray-100 hover:text-brand-text'}`
            }
            aria-disabled={disabled}
        >
            <span className={active && !disabled ? 'text-brand-primary' : disabled ? 'text-gray-400' : 'text-gray-500'}>{icon}</span>
            <span className="ml-3">{text}</span>
            {disabled && <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Coming Soon</span>}
        </a>
    </li>
);
