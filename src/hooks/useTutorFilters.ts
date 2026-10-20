import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { TutorFilters } from '../types/teacher';
import { languages, levels, prices } from '../data/filters';

export function useTutorFilters() {
    const [params, setParams] = useSearchParams();
    const language = params.get('language') ?? '';
    const level = params.get('level') ?? '';
    const price = params.get('price') ?? '';
    const filters = useMemo<TutorFilters>(
        () => ({
            language: languages.includes(language) ? language : '',
            level: levels.includes(level) ? level : '',
            price: prices.map(String).includes(price) ? price : '',
        }),
        [language, level, price],
    );

    function changeFilter(field: keyof TutorFilters, value: string) {
        setParams((current) => {
            const next = new URLSearchParams(current);
            if (value) next.set(field, value);
            else next.delete(field);
            return next;
        });
    }

    function resetFilters() {
        setParams((current) => {
            const next = new URLSearchParams(current);
            ['language', 'level', 'price'].forEach((field) =>
                next.delete(field),
            );
            return next;
        });
    }

    return { filters, changeFilter, resetFilters };
}
