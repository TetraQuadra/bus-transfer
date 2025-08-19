'use client'

import React, { useEffect, useMemo, useState } from 'react';
import BaseInput from '@/components/BaseInput';
import DatePicker from '@/components/DatePicker';
import AutoCompleteInput from '@/components/AutoCompleteInput';
import Button from '@/components/Button';
import { useTranslations } from '@/hooks/useTranslations';
import { ALL_CITIES, findCityByName, isUkraineCity, normalizeToken } from '@/const/cities';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

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

type BookingSectionProps = {
    initialDepartureCountry?: string;
    initialArrivalCountry?: string;
    initialDepartureCity?: string;
    initialArrivalCity?: string;
};

const BookingSection = ({
    initialDepartureCountry,
    initialArrivalCountry,
    initialDepartureCity,
    initialArrivalCity,
}: BookingSectionProps) => {
    const t = useTranslations('booking');
    const router = useRouter();
    const [formData, setFormData] = useState<BookingFormData>({
        departureCountry: initialDepartureCountry || '',
        departureCity: initialDepartureCity || '',
        arrivalCountry: initialArrivalCountry || '',
        arrivalCity: initialArrivalCity || '',
        date: '',
        fullName: '',
        phone: ''
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            departureCountry: initialDepartureCountry || prev.departureCountry,
            arrivalCountry: initialArrivalCountry || prev.arrivalCountry,
            departureCity: initialDepartureCity || prev.departureCity,
            arrivalCity: initialArrivalCity || prev.arrivalCity,
        }));
    }, [initialDepartureCountry, initialArrivalCountry, initialDepartureCity, initialArrivalCity]);

    const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
    const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

    // Списки для автодополнения из локалей
    const countries = t.raw('suggestions.countries') as string[];
    const locale = useLocale();
    const supported = ['uk', 'ru', 'en'] as const;
    const lang = (supported as readonly string[]).includes(locale) ? (locale as 'uk' | 'ru' | 'en') : 'uk';

    // Маппинг code -> локализованное имя страны (индексация по массиву countries)
    const countryDisplayNameByCode = useMemo(() => {
        const indexMap: Record<'ukraine' | 'poland' | 'germany' | 'belgium' | 'netherlands', number> = {
            ukraine: 0,
            poland: 1,
            germany: 2,
            netherlands: 3,
            belgium: 4
        };
        return (code: string) => countries[indexMap[code as keyof typeof indexMap]] ?? '';
    }, [countries]);

    // Локализованные названия городов по странам
    const allCityNames = useMemo(() => ALL_CITIES.map(c => c.names[lang]), [lang]);
    const cityNamesByCountry = useMemo(() => {
        return ALL_CITIES.reduce<Record<string, string[]>>((acc, city) => {
            const list = acc[city.country] ?? [];
            list.push(city.names[lang]);
            acc[city.country] = list;
            return acc;
        }, {});
    }, [lang]);

    const countryMap = useMemo(() => {
        const entries = [
            ['ukraine', ['украина', 'україна', 'ukraine']],
            ['poland', ['польша', 'польща', 'poland']],
            ['germany', ['германия', 'німеччина', 'germany']],
            ['belgium', ['бельгия', 'бельгія', 'belgium']],
            ['netherlands', ['нидерланды', 'нідерланди', 'netherlands']]
        ] as const;
        const map = new Map<string, string>();
        entries.forEach(([code, arr]) => arr.forEach(name => map.set(normalizeToken(name), code)));
        return map;
    }, []);

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

    // Подсказки для городов зависят от введённой страны
    const departureCountryCode = useMemo(() => countryMap.get(normalizeToken(formData.departureCountry || '')), [countryMap, formData.departureCountry]);
    const arrivalCountryCode = useMemo(() => countryMap.get(normalizeToken(formData.arrivalCountry || '')), [countryMap, formData.arrivalCountry]);

    const departureCitySuggestions = useMemo(() => {
        if (departureCountryCode && cityNamesByCountry[departureCountryCode]) return cityNamesByCountry[departureCountryCode];
        return allCityNames;
    }, [departureCountryCode, cityNamesByCountry, allCityNames]);

    const arrivalCitySuggestions = useMemo(() => {
        if (arrivalCountryCode && cityNamesByCountry[arrivalCountryCode]) return cityNamesByCountry[arrivalCountryCode];
        return allCityNames;
    }, [arrivalCountryCode, cityNamesByCountry, allCityNames]);

    const invalidDirection = useMemo(() => {
        if (!departureCountryCode || !arrivalCountryCode) return false;
        const depIsUa = departureCountryCode === 'ukraine';
        const arrIsUa = arrivalCountryCode === 'ukraine';
        // обоe EU или обе Ukraine — запрещено
        return (depIsUa && arrIsUa) || (!depIsUa && !arrIsUa);
    }, [departureCountryCode, arrivalCountryCode]);

    // Live: проверка соответствия города выбранной стране
    const resolveCity = useMemo(() => (value: string) => ALL_CITIES.find(c => c.names[lang] === value) || findCityByName(value || ''), [lang]);
    const depSelectedCity = useMemo(() => resolveCity(formData.departureCity), [formData.departureCity, resolveCity]);
    const arrSelectedCity = useMemo(() => resolveCity(formData.arrivalCity), [formData.arrivalCity, resolveCity]);
    const depCityMismatch = useMemo(() => !!(depSelectedCity && departureCountryCode && depSelectedCity.country !== departureCountryCode), [depSelectedCity, departureCountryCode]);
    const arrCityMismatch = useMemo(() => !!(arrSelectedCity && arrivalCountryCode && arrSelectedCity.country !== arrivalCountryCode), [arrSelectedCity, arrivalCountryCode]);

    // Live: проверка даты в прошлом
    const dateInPast = useMemo(() => {
        const raw = formData.date;
        if (!raw) return false;
        const [dd, mm, yyyy] = raw.split(/[./-]/).map(Number);
        if (!yyyy || !mm || !dd) return false;
        const selected = new Date(yyyy, mm - 1, dd);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected < today;
    }, [formData.date]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

        if (!formData.departureCity) newErrors.departureCity = t('errors.required');
        if (!formData.arrivalCity) newErrors.arrivalCity = t('errors.required');
        if (!formData.date) newErrors.date = t('errors.required');
        else {
            // Проверка даты: не раньше сегодняшней
            const [dd, mm, yyyy] = formData.date.split(/[./-]/).map(Number);
            if (yyyy && mm && dd) {
                const selected = new Date(yyyy, mm - 1, dd);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selected < today) newErrors.date = t('errors.dateInPast');
            }
        }
        if (!formData.fullName) newErrors.fullName = t('errors.required');
        if (!formData.phone) newErrors.phone = t('errors.required');

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const fromCity = ALL_CITIES.find(c => c.names[lang] === formData.departureCity) || findCityByName(formData.departureCity || '');
        const toCity = ALL_CITIES.find(c => c.names[lang] === formData.arrivalCity) || findCityByName(formData.arrivalCity || '');

        // Сопоставление города и выбранной страны
        const depCode = countryMap.get(normalizeToken(formData.departureCountry || ''));
        const arrCode = countryMap.get(normalizeToken(formData.arrivalCountry || ''));
        if (fromCity && depCode && fromCity.country !== depCode) {
            newErrors.departureCity = t('errors.cityCountryMismatch');
        }
        if (toCity && arrCode && toCity.country !== arrCode) {
            newErrors.arrivalCity = t('errors.cityCountryMismatch');
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (fromCity && toCity) {
            const fromIsUa = isUkraineCity(fromCity);
            const toIsUa = isUkraineCity(toCity);
            if (fromIsUa === toIsUa) {
                setErrors(prev => ({ ...prev, arrivalCity: t('errors.directionConstraint') }));
                return;
            }
            const slug = `${fromCity.slug}-${toCity.slug}`;
            router.push(`/book/${slug}`);
            console.log(t('log.submitted'), formData);
            return;
        }

        // если города не распознаны, пробуем по странам
        if ((depCode === 'ukraine' && arrCode && arrCode !== 'ukraine') || (arrCode === 'ukraine' && depCode && depCode !== 'ukraine')) {
            const direction = (depCode === 'ukraine' ? arrCode : depCode) as string;
            router.push(`/book/${direction}`);
            console.log(t('log.submitted'), formData);
            return;
        }

        // не смогли распознать
        if (!fromCity) newErrors.departureCity = t('errors.invalidCity');
        if (!toCity) newErrors.arrivalCity = t('errors.invalidCity');
        setErrors(newErrors);
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
                                required
                            />

                            <AutoCompleteInput
                                label={t('fields.departureCity.label')}
                                placeholder={t('fields.departureCity.placeholder')}
                                value={formData.departureCity}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('departureCity', e.target.value)}
                                onSuggestionSelect={(suggestion: string) => {
                                    handleInputChange('departureCity', suggestion);
                                    const city = ALL_CITIES.find(c => c.names[lang] === suggestion) || findCityByName(suggestion);
                                    if (city) {
                                        handleInputChange('departureCountry', countryDisplayNameByCode(city.country));
                                    }
                                }}
                                suggestions={departureCitySuggestions}
                                error={errors.departureCity || (depCityMismatch ? t('errors.cityCountryMismatch') : '')}
                                required
                            />

                            <AutoCompleteInput
                                label={t('fields.arrivalCountry.label')}
                                placeholder={t('fields.arrivalCountry.placeholder')}
                                value={formData.arrivalCountry}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('arrivalCountry', e.target.value)}
                                onSuggestionSelect={(suggestion: string) => handleInputChange('arrivalCountry', suggestion)}
                                suggestions={countries}
                                error={errors.arrivalCountry}
                                required
                            />

                            <AutoCompleteInput
                                label={t('fields.arrivalCity.label')}
                                placeholder={t('fields.arrivalCity.placeholder')}
                                value={formData.arrivalCity}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('arrivalCity', e.target.value)}
                                onSuggestionSelect={(suggestion: string) => {
                                    handleInputChange('arrivalCity', suggestion);
                                    const city = ALL_CITIES.find(c => c.names[lang] === suggestion) || findCityByName(suggestion);
                                    if (city) {
                                        handleInputChange('arrivalCountry', countryDisplayNameByCode(city.country));
                                    }
                                }}
                                suggestions={arrivalCitySuggestions}
                                error={errors.arrivalCity || (arrCityMismatch ? t('errors.cityCountryMismatch') : '')}
                                required
                            />
                            {(invalidDirection || dateInPast) && (
                                <div className="md:col-span-2 lg:col-span-4 -mt-2">
                                    <div className="w-full rounded-md border border-red-300 bg-red-50 text-red-700 text-sm px-3 py-2" role="alert" aria-live="polite">
                                        {invalidDirection ? t('errors.directionConstraint') : t('errors.dateInPast')}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <DatePicker
                                label={t('fields.date.label')}
                                placeholder={t('fields.date.placeholder')}
                                value={formData.date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('date', e.target.value)}
                                error={errors.date}
                                required
                            />

                            <BaseInput
                                label={t('fields.fullName.label')}
                                placeholder={t('fields.fullName.placeholder')}
                                value={formData.fullName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('fullName', e.target.value)}
                                error={errors.fullName}
                                required
                            />

                            <BaseInput
                                label={t('fields.phone.label')}
                                placeholder={t('fields.phone.placeholder')}
                                type="tel"
                                value={formData.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                                error={errors.phone}
                                required
                            />

                            <div className="flex items-end">
                                <Button
                                    type="submit"
                                    size='sm'
                                    className="w-full"
                                    disabled={hasErrors || invalidDirection}
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
