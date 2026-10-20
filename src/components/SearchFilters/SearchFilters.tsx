import { useId } from 'react';
import type { TutorFilters } from '../../types/teacher';
import { languages, levels, prices } from '../../data/filters';
import css from './SearchFilters.module.css';

interface SearchFiltersProps {
    filters: TutorFilters;
    onChange: (field: keyof TutorFilters, value: string) => void;
    onReset: () => void;
}

function SearchFilters({ filters, onChange, onReset }: SearchFiltersProps) {
    const id = useId();
    const active = Object.values(filters).some(Boolean);
    return (
        <div className={css.filters} role="group" aria-label="Filter teachers">
            <div className={css.field}>
                <label htmlFor={`${id}-language`}>Languages</label>
                <div className={css.selectContainer}>
                    <select
                        id={`${id}-language`}
                        value={filters.language}
                        className={filters.language ? css.selected : ''}
                        onChange={(event) =>
                            onChange('language', event.target.value)
                        }
                    >
                        <option value="">All languages</option>
                        {languages.map((language) => (
                            <option key={language} value={language}>
                                {language}
                            </option>
                        ))}
                    </select>
                    <svg
                        width={20}
                        height={20}
                        aria-hidden="true"
                        focusable="false"
                    >
                        <use href="/sprite.svg#icon-v" />
                    </svg>
                </div>
            </div>
            <div className={`${css.field} ${css.level}`}>
                <label htmlFor={`${id}-level`}>Level of knowledge</label>
                <div className={css.selectContainer}>
                    <select
                        id={`${id}-level`}
                        value={filters.level}
                        className={filters.level ? css.selected : ''}
                        onChange={(event) =>
                            onChange('level', event.target.value)
                        }
                    >
                        <option value="">All levels</option>
                        {levels.map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                    <svg
                        width={20}
                        height={20}
                        aria-hidden="true"
                        focusable="false"
                    >
                        <use href="/sprite.svg#icon-v" />
                    </svg>
                </div>
            </div>
            <div className={`${css.field} ${css.price}`}>
                <label htmlFor={`${id}-price`}>Price</label>
                <div className={css.selectContainer}>
                    <select
                        id={`${id}-price`}
                        value={filters.price}
                        className={filters.price ? css.selected : ''}
                        onChange={(event) =>
                            onChange('price', event.target.value)
                        }
                    >
                        <option value="">Any</option>
                        {prices.map((price) => (
                            <option key={price} value={price}>
                                {price} $
                            </option>
                        ))}
                    </select>
                    <svg
                        width={20}
                        height={20}
                        aria-hidden="true"
                        focusable="false"
                    >
                        <use href="/sprite.svg#icon-v" />
                    </svg>
                </div>
            </div>
            {active && (
                <button className={css.reset} type="button" onClick={onReset}>
                    Reset filters
                </button>
            )}
        </div>
    );
}

export default SearchFilters;
