import { useId, useLayoutEffect, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import css from './AccountForms.module.css';

interface PasswordInputProps<TValues extends FieldValues> {
    control: Control<TValues>;
    name: FieldPath<TValues>;
    error?: string;
    creating?: boolean;
}

function PasswordInput<TValues extends FieldValues>({
    control,
    name,
    error,
    creating = false,
}: PasswordInputProps<TValues>) {
    const { field } = useController({ control, name });
    const [visible, setVisible] = useState(false);
    const id = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const toggled = useRef(false);

    useLayoutEffect(() => {
        if (!toggled.current) return;
        const input = inputRef.current;
        input?.focus();
        if (input)
            input.setSelectionRange(input.value.length, input.value.length);
    }, [visible]);

    function toggleVisibility() {
        const input = inputRef.current;
        if (input) field.onChange(input.value);
        toggled.current = true;
        setVisible((previous) => !previous);
    }

    return (
        <div className={css.field}>
            <label className="visuallyHidden" htmlFor={id}>
                Password
            </label>
            <div className={css.password}>
                <input
                    key={visible ? 'visible' : 'hidden'}
                    className={css.input}
                    id={id}
                    name={field.name}
                    ref={(input) => {
                        inputRef.current = input;
                        field.ref(input);
                    }}
                    value={String(field.value ?? '')}
                    onChange={field.onChange}
                    onBlur={(event) => {
                        field.onChange(event.currentTarget.value);
                        field.onBlur();
                    }}
                    type={visible ? 'text' : 'password'}
                    autoComplete={
                        creating ? 'new-password' : 'current-password'
                    }
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="Password"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
                <button
                    className={css.passwordToggle}
                    type="button"
                    onPointerDown={(event) => event.preventDefault()}
                    onClick={toggleVisibility}
                    aria-label={visible ? 'Hide password' : 'Show password'}
                    aria-pressed={visible}
                    aria-controls={id}
                >
                    <svg
                        width={20}
                        height={20}
                        aria-hidden="true"
                        focusable="false"
                    >
                        <use
                            href={`/sprite.svg#${visible ? 'icon-eye-open' : 'icon-eye-off'}`}
                        />
                    </svg>
                </button>
            </div>
            {error && (
                <p className={css.error} id={`${id}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
}

export default PasswordInput;
