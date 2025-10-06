'use client'

import React, { forwardRef } from 'react';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="flex flex-col">
                {label && (
                    <label className="text-foreground font-medium mb-2 text-sm pl-4">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-3 
            border border-gray-300 
            rounded-lg 
            bg-white 
            text-foreground 
            placeholder-gray-500
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:border-transparent
            transition-all 
            duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${props.type === 'date' ? 'appearance-none' : ''}
            ${className}
          `}
                    style={props.type === 'date' ? {
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield',
                        minHeight: '48px'
                    } : undefined}
                    {...props}
                />
                {error && (
                    <span className="text-red-500 text-sm h-[0px]">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

BaseInput.displayName = 'BaseInput';

export default BaseInput;
