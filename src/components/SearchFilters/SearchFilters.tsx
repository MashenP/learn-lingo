import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { TutorFilters } from '../../types/teacher';
import { languages, levels, prices } from '../../data/filters';
import css from './SearchFilters.module.css';

interface SearchFiltersProps {
    filters: TutorFilters;
    onChange: (field: keyof TutorFilters, value: string) => void;
    onReset: () => void;
}

const fields = [
    {
        name: 'language' as const,
        label: 'Languages',
        placeholder: 'All languages',
        options: languages,
    },
    {
        name: 'level' as const,
        label: 'Level of knowledge',
        placeholder: 'All levels',
        options: levels,
    },
    {
        name: 'price' as const,
        label: 'Price',
        placeholder: 'Any',
        options: prices.map(String),
    },
];

function SearchFilters({ filters, onChange, onReset }: SearchFiltersProps) {
    const id = useId();
    const container = useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState<keyof TutorFilters | null>(null);
    const [highlighted, setHighlighted] = useState(0);
    const active = Object.values(filters).some(Boolean);

    useEffect(() => {
        if (!opened) return;
        const closeOutside = (event: PointerEvent) => {
            if (!container.current?.contains(event.target as Node)) {
                setOpened(null);
            }
        };
        document.addEventListener('pointerdown', closeOutside);
        return () => document.removeEventListener('pointerdown', closeOutside);
    }, [opened]);

    useEffect(() => {
        if (!opened) return;
        const list = container.current?.querySelector('[role="listbox"]');
        const option = list?.children[highlighted] as HTMLElement | undefined;
        if (list && option) {
            const top = option.offsetTop;
            const bottom = top + option.offsetHeight;
            if (top < list.scrollTop) list.scrollTop = top;
            if (bottom > list.scrollTop + list.clientHeight) {
                list.scrollTop = bottom - list.clientHeight;
            }
        }
    }, [opened, highlighted]);

    const handleKey = (
        event: KeyboardEvent<HTMLButtonElement>,
        name: keyof TutorFilters,
        options: string[],
    ) => {
        const isOpen = opened === name;
        const selected = Math.max(0, options.indexOf(filters[name]));
        if (event.key === 'Escape' || event.key === 'Tab') {
            setOpened(null);
            if (event.key === 'Escape') event.preventDefault();
            return;
        }
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            setOpened(name);
            if (event.key === 'Home') setHighlighted(0);
            else if (event.key === 'End') setHighlighted(options.length - 1);
            else if (!isOpen) setHighlighted(selected);
            else {
                const direction = event.key === 'ArrowDown' ? 1 : -1;
                setHighlighted((index) =>
                    Math.max(
                        0,
                        Math.min(options.length - 1, index + direction),
                    ),
                );
            }
        } else if (isOpen && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onChange(name, options[highlighted]);
            setOpened(null);
        }
    };

    return (
        <div
            ref={container}
            className={css.filters}
            role="group"
            aria-label="Filter teachers"
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpened(null);
                }
            }}
        >
            {fields.map(({ name, label, placeholder, options }) => {
                const values = ['', ...options];
                const isOpen = opened === name;
                const value = filters[name];
                return (
                    <div
                        key={name}
                        className={`${css.field} ${css[name] || ''}`}
                    >
                        <span id={`${id}-${name}-label`} className={css.label}>
                            {label}
                        </span>
                        <div className={css.selectContainer}>
                            <button
                                id={`${id}-${name}`}
                                type="button"
                                role="combobox"
                                aria-labelledby={`${id}-${name}-label ${id}-${name}-value`}
                                aria-expanded={isOpen}
                                aria-haspopup="listbox"
                                aria-controls={`${id}-${name}-list`}
                                aria-activedescendant={
                                    isOpen
                                        ? `${id}-${name}-option-${highlighted}`
                                        : undefined
                                }
                                className={`${css.select} ${value ? css.selected : ''}`}
                                onClick={() => {
                                    setOpened(isOpen ? null : name);
                                    setHighlighted(
                                        Math.max(0, values.indexOf(value)),
                                    );
                                }}
                                onKeyDown={(event) =>
                                    handleKey(event, name, values)
                                }
                            >
                                <span id={`${id}-${name}-value`}>
                                    {value
                                        ? name === 'price'
                                            ? `${value} $`
                                            : value
                                        : placeholder}
                                </span>
                                <svg
                                    width={20}
                                    height={20}
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <use href="/sprite.svg#icon-v" />
                                </svg>
                            </button>
                            {isOpen && (
                                <ul
                                    id={`${id}-${name}-list`}
                                    role="listbox"
                                    aria-labelledby={`${id}-${name}-label`}
                                    className={css.options}
                                >
                                    {values.map((option, index) => (
                                        <li
                                            key={option}
                                            id={`${id}-${name}-option-${index}`}
                                            role="option"
                                            aria-selected={value === option}
                                            className={`${css.option} ${value === option ? css.chosen : ''} ${highlighted === index ? css.highlighted : ''}`}
                                            onPointerMove={() =>
                                                setHighlighted(index)
                                            }
                                            onMouseDown={(event) =>
                                                event.preventDefault()
                                            }
                                            onClick={() => {
                                                onChange(name, option);
                                                setOpened(null);
                                            }}
                                        >
                                            {option || placeholder}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                );
            })}
            {active && (
                <button className={css.reset} type="button" onClick={onReset}>
                    Reset filters
                </button>
            )}
        </div>
    );
}

export default SearchFilters;
