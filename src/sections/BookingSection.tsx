'use client'

import React, { useState } from 'react';
import BaseInput from '../components/BaseInput';
import DatePicker from '../components/DatePicker';
import AutoCompleteInput from '../components/AutoCompleteInput';
import Button from '@/components/Button';

// TODO: СДЕЛАТЬ ВСЕ ЭТО

const BookingSection = () => {
    const [formData, setFormData] = useState({
        departureCountry: '',
        departureCity: '',
        arrivalCountry: '',
        arrivalCity: '',
        date: '',
        fullName: '',
        phone: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Примеры данных для автодополнения
    const countries = ['Україна', 'Польща', 'Німеччина', 'Франція', 'Італія', 'Іспанія', 'Нідерланди', 'Бельгія'];
    const cities = ['Київ', 'Львів', 'Харків', 'Одеса', 'Дніпро', 'Варшава', 'Берлін', 'Париж', 'Рим', 'Мадрид'];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Очищаем ошибку при вводе
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Простая валидация
        const newErrors: Record<string, string> = {};

        if (!formData.departureCountry) newErrors.departureCountry = 'Обов\'язкове поле';
        if (!formData.departureCity) newErrors.departureCity = 'Обов\'язкове поле';
        if (!formData.arrivalCountry) newErrors.arrivalCountry = 'Обов\'язкове поле';
        if (!formData.arrivalCity) newErrors.arrivalCity = 'Обов\'язкове поле';
        if (!formData.date) newErrors.date = 'Обов\'язкове поле';
        if (!formData.fullName) newErrors.fullName = 'Обов\'язкове поле';
        if (!formData.phone) newErrors.phone = 'Обов\'язкове поле';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Здесь будет отправка формы
        console.log('Форма отправлена:', formData);
        alert('Форма отправлена! (пока что это заглушка)');
    };

    return (
        <section className="py-8 w-full">
            <div className="">
                <div className="w-full">
                    <h2 className="text-[40px] font-regular text-center text-foreground mb-8 max-sm:text-[30px]">
                        БРОНЮВАННЯ МІСЦЬ
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <AutoCompleteInput
                                label="Країна відправлення"
                                placeholder="Введіть країну"
                                value={formData.departureCountry}
                                onChange={(e) => handleInputChange('departureCountry', e.target.value)}
                                onSuggestionSelect={(suggestion) => handleInputChange('departureCountry', suggestion)}
                                suggestions={countries}
                                error={errors.departureCountry}
                            />

                            <AutoCompleteInput
                                label="Місто відправлення"
                                placeholder="Введіть місто"
                                value={formData.departureCity}
                                onChange={(e) => handleInputChange('departureCity', e.target.value)}
                                onSuggestionSelect={(suggestion) => handleInputChange('departureCity', suggestion)}
                                suggestions={cities}
                                error={errors.departureCity}
                            />

                            <AutoCompleteInput
                                label="Країна прибуття"
                                placeholder="Введіть країну"
                                value={formData.arrivalCountry}
                                onChange={(e) => handleInputChange('arrivalCountry', e.target.value)}
                                onSuggestionSelect={(suggestion) => handleInputChange('arrivalCountry', suggestion)}
                                suggestions={countries}
                                error={errors.arrivalCountry}
                            />

                            <AutoCompleteInput
                                label="Місто прибуття"
                                placeholder="Введіть місто"
                                value={formData.arrivalCity}
                                onChange={(e) => handleInputChange('arrivalCity', e.target.value)}
                                onSuggestionSelect={(suggestion) => handleInputChange('arrivalCity', suggestion)}
                                suggestions={cities}
                                error={errors.arrivalCity}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <DatePicker
                                label="Дата поїздки"
                                placeholder="дд.мм.рррр"
                                value={formData.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                error={errors.date}
                            />

                            <BaseInput
                                label="Ім'я та прізвище"
                                placeholder="Введіть повне ім'я"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                error={errors.fullName}
                            />

                            <BaseInput
                                label="Номер телефону"
                                placeholder="+380"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                error={errors.phone}
                            />

                            <div className="flex items-end">
                                <Button
                                    type="submit"
                                    size='sm'
                                    className="w-full"
                                >
                                    Забронювати
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
