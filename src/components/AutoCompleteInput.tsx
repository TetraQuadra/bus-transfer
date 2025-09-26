'use client'

import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BaseInput from './BaseInput';

type SuggestionItem = string | { value: string; hint?: string };

interface AutoCompleteInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    suggestions?: SuggestionItem[];
    onSuggestionSelect?: (value: string) => void;
    openOnFocus?: boolean;
    maxItems?: number;
}

const AutoCompleteInput = forwardRef<HTMLInputElement, AutoCompleteInputProps>(
    ({ label, error, className = '', suggestions = [], onSuggestionSelect, openOnFocus = true, maxItems = 8, ...props }, ref) => {
        const [showSuggestions, setShowSuggestions] = useState(false);
        const [filtered, setFiltered] = useState<Array<{ value: string; hint?: string }>>([]);
        const [activeIndex, setActiveIndex] = useState(-1);
        const inputRef = useRef<HTMLInputElement | null>(null);

        const normalizedSuggestions = useMemo(() => {
            return suggestions.map((s) => (typeof s === 'string' ? { value: s } : s));
        }, [suggestions]);

        const filterSuggestions = useCallback((query: string) => {
            const q = query.trim().toLowerCase();
            if (!q) {
                const base = normalizedSuggestions.slice(0, maxItems);
                setFiltered(base);
                setShowSuggestions(base.length > 0);
                setActiveIndex(base.length ? 0 : -1);
                return;
            }
            const res = normalizedSuggestions
                .filter((s) => s.value.toLowerCase().startsWith(q))
                .slice(0, maxItems);
            setFiltered(res);
            setShowSuggestions(res.length > 0);
            setActiveIndex(res.length ? 0 : -1);
        }, [normalizedSuggestions, maxItems]);

        useEffect(() => {
            const isFocused = typeof window !== 'undefined' && inputRef.current === document.activeElement;
            if (!isFocused) return;
            const current = (props.value as string | undefined) ?? inputRef.current?.value ?? '';
            filterSuggestions(current);
        }, [normalizedSuggestions, props.value, filterSuggestions]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            filterSuggestions(value);
            if (props.onChange) props.onChange(e);
        };

        const handleSuggestionClick = (s: { value: string; hint?: string }) => {
            onSuggestionSelect?.(s.value);
            setShowSuggestions(false);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!showSuggestions || filtered.length === 0) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex((i) => (i + 1) % filtered.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const choice = filtered[activeIndex] ?? filtered[0];
                if (choice) handleSuggestionClick(choice);
            } else if (e.key === 'Escape') {
                setShowSuggestions(false);
            }
        };

        return (
            <div className="relative">
                <BaseInput
                    ref={(node) => {
                        if (typeof ref === 'function') ref(node as HTMLInputElement | null);
                        else if (ref && 'current' in (ref as { current: HTMLInputElement | null })) (ref as { current: HTMLInputElement | null }).current = node;
                        inputRef.current = node;
                    }}
                    label={label}
                    error={error}
                    className={className}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={(e) => {
                        if (openOnFocus) filterSuggestions((e.target as HTMLInputElement).value || '');
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    {...props}
                />

                {showSuggestions && filtered.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                        {filtered.map((s, index) => (
                            <div
                                key={`${s.value}-${index}`}
                                className={`px-4 py-2 cursor-pointer transition-colors ${index === activeIndex ? 'bg-blue-50 border-l-2 border-blue-500' : 'hover:bg-gray-50'}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleSuggestionClick(s)}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <div className="text-foreground font-medium">{s.value}</div>
                                {s.hint && <div className="text-xs text-gray-500 mt-1">{s.hint}</div>}
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
