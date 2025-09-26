'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { City } from '@/const/cities';

interface SelectedRoute {
    fromCity: City;
    toCity: City;
}

interface BookingContextType {
    selectedRoute: SelectedRoute | null;
    setSelectedRoute: (route: SelectedRoute | null) => void;
    lastValidRoute: SelectedRoute | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [selectedRoute, setSelectedRoute] = useState<SelectedRoute | null>(null);
    const [lastValidRoute, setLastValidRoute] = useState<SelectedRoute | null>(null);

    const handleSetSelectedRoute = useCallback((route: SelectedRoute | null) => {
        setSelectedRoute(route);
        // Сохраняем последний валидный маршрут
        if (route) {
            setLastValidRoute(route);
        }
    }, []);

    return (
        <BookingContext.Provider value={{
            selectedRoute,
            setSelectedRoute: handleSetSelectedRoute,
            lastValidRoute
        }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBookingContext() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBookingContext must be used within a BookingProvider');
    }
    return context;
}

// Опциональный хук для использования контекста без обязательного провайдера
export function useOptionalBookingContext() {
    const context = useContext(BookingContext);
    return context;
}
