'use client'

import React, { forwardRef } from 'react';
import BaseInput from './BaseInput';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <BaseInput
                ref={ref}
                type="date"
                label={label}
                error={error}
                className={className}
                {...props}
            />
        );
    }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
