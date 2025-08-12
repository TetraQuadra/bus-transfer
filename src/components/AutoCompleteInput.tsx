'use client'

import React, { forwardRef, useState } from 'react';
import BaseInput from './BaseInput';

interface AutoCompleteInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    suggestions?: string[];
    onSuggestionSelect?: (suggestion: string) => void;
}

const AutoCompleteInput = forwardRef<HTMLInputElement, AutoCompleteInputProps>(
    ({ label, error, className = '', suggestions = [], onSuggestionSelect, ...props }, ref) => {
        const [showSuggestions, setShowSuggestions] = useState(false);
        const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            if (value.length > 0) {
                const filtered = suggestions.filter(suggestion =>
                    suggestion.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredSuggestions(filtered);
                setShowSuggestions(filtered.length > 0);
            } else {
                setShowSuggestions(false);
            }

            if (props.onChange) {
                props.onChange(e);
            }
        };

        const handleSuggestionClick = (suggestion: string) => {
            if (onSuggestionSelect) {
                onSuggestionSelect(suggestion);
            }
            setShowSuggestions(false);
        };

        return (
            <div className="relative">
                <BaseInput
                    ref={ref}
                    label={label}
                    error={error}
                    className={className}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    {...props}
                />

                {showSuggestions && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-foreground"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

AutoCompleteInput.displayName = 'AutoCompleteInput';

export default AutoCompleteInput;
