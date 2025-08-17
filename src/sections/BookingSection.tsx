'use client'

import React, { useState } from 'react';
import BaseInput from '@/components/BaseInput';
import DatePicker from '@/components/DatePicker';
import AutoCompleteInput from '@/components/AutoCompleteInput';
import Button from '@/components/Button';
import { useTranslations } from '@/hooks/useTranslations';

// TODO: СДЕЛАТЬ ВСЕ ЭТО

type BookingFormData = {
    departureCountry: string;
    departureCity: string;
    arrivalCountry: string;
    arrivalCity: string;
    date: string;
    fullName: string;
    phone: string;
};

const BookingSection = () => {
    const t = useTranslations('booking');
    const [formData, setFormData] = useState<BookingFormData>({
        departureCountry: '',
        departureCity: '',
        arrivalCountry: '',
        arrivalCity: '',
        date: '',
        fullName: '',
        phone: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

    // Списки для автодополнения из локалей
    const countries = t.raw('suggestions.countries') as string[];
    const cities = t.raw('suggestions.cities') as string[];

    const handleInputChange = (field: keyof BookingFormData, value: string) => {
        setFormData((prev: BookingFormData) => ({
            ...prev,
            [field]: value
        }));

        // Очищаем ошибку при вводе
        if (errors[field]) {
            setErrors((prev: Partial<Record<keyof BookingFormData, string>>) => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Простая валидация
        const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

        if (!formData.departureCountry) newErrors.departureCountry = t('errors.required');
        if (!formData.departureCity) newErrors.departureCity = t('errors.required');
        if (!formData.arrivalCountry) newErrors.arrivalCountry = t('errors.required');
        if (!formData.arrivalCity) newErrors.arrivalCity = t('errors.required');
        if (!formData.date) newErrors.date = t('errors.required');
        if (!formData.fullName) newErrors.fullName = t('errors.required');
        if (!formData.phone) newErrors.phone = t('errors.required');

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Здесь будет отправка формы
        console.log(t('log.submitted'), formData);
        alert(t('alert.submitted'));
    };

    return (
        <section id="booking" className="py-8 w-full">
            <div className="">
                <div className="w-full">
                    <h2 className="text-[40px] font-regular text-center text-foreground mb-8 max-sm:text-[30px]">
                        {t('title')}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <AutoCompleteInput
                                label={t('fields.departureCountry.label')}
                                placeholder={t('fields.departureCountry.placeholder')}
                                value={formData.departureCountry}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('departureCountry', e.target.value)}
                                onSuggestionSelect={(suggestion: string) => handleInputChange('departureCountry', suggestion)}
                                suggestions={countries}
                                error={errors.departureCountry}
                            />

                            <AutoCompleteInput
                                label={t('fields.departureCity.label')}
                                placeholder={t('fields.departureCity.placeholder')}
                                value={formData.departureCity}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('departureCity', e.target.value)}
                                onSuggestionSelect={(suggestion: string) => handleInputChange('departureCity', suggestion)}
                                suggestions={cities}
                                error={errors.departureCity}
                            />

                            <AutoCompleteInput
                                label={t('fields.arrivalCountry.label')}
                                placeholder={t('fields.arrivalCountry.placeholder')}
                                value={formData.arrivalCountry}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('arrivalCountry', e.target.value)}
                                onSuggestionSelect={(suggestion: string) => handleInputChange('arrivalCountry', suggestion)}
                                suggestions={countries}
                                error={errors.arrivalCountry}
                            />

                            <AutoCompleteInput
                                label={t('fields.arrivalCity.label')}
                                placeholder={t('fields.arrivalCity.placeholder')}
                                value={formData.arrivalCity}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('arrivalCity', e.target.value)}
                                onSuggestionSelect={(suggestion: string) => handleInputChange('arrivalCity', suggestion)}
                                suggestions={cities}
                                error={errors.arrivalCity}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <DatePicker
                                label={t('fields.date.label')}
                                placeholder={t('fields.date.placeholder')}
                                value={formData.date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('date', e.target.value)}
                                error={errors.date}
                            />

                            <BaseInput
                                label={t('fields.fullName.label')}
                                placeholder={t('fields.fullName.placeholder')}
                                value={formData.fullName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('fullName', e.target.value)}
                                error={errors.fullName}
                            />

                            <BaseInput
                                label={t('fields.phone.label')}
                                placeholder={t('fields.phone.placeholder')}
                                type="tel"
                                value={formData.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                                error={errors.phone}
                            />

                            <div className="flex items-end">
                                <Button
                                    type="submit"
                                    size='sm'
                                    className="w-full"
                                >
                                    {t('submitLabel')}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default BookingSection;
