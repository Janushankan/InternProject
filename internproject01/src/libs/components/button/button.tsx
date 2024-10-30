import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'customPink';
    icon?:boolean;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'customPink',icon=false }) => {
    const colorClasses: Record<string, string> = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-300',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-300',
        customPink: 'bg-pink-500 hover:bg-pink-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-300'
    };
      
    return (
        <button
            onClick={onClick}
            aria-label={text}
            className={`flex items-center px-4 py-2 rounded ${colorClasses[variant]}`}
        >
            {icon && (<PlusIcon className="w-5 h-5 mr-2" />)}
            {text}
        </button>
    );
};
