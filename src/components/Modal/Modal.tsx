import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
    titleId: string;
    children: ReactNode;
    onClose: () => void;
    wide?: boolean;
}

function Modal({ titleId, children, onClose, wide = false }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        const root = document.getElementById('root');
        const previousInert = root?.inert ?? false;
        document.body.style.overflow = 'hidden';
        if (root) root.inert = true;
        modalRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            if (root) root.inert = previousInert;
            if (
                previousFocus instanceof HTMLElement &&
                previousFocus.isConnected
            ) {
                previousFocus.focus();
            }
        };
    }, []);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }
            if (event.key !== 'Tab') return;

            const modal = modalRef.current;
            if (!modal) return;
            const elements = Array.from(
                modal.querySelectorAll<HTMLElement>(
                    'button, a[href], input, select, textarea, [tabindex]',
                ),
            ).filter(
                (element) =>
                    element.tabIndex >= 0 &&
                    !element.matches(':disabled') &&
                    element.getClientRects().length > 0,
            );
            const first = elements[0];
            const last = elements.at(-1);

            if (!first || !last) {
                event.preventDefault();
                modal.focus();
            } else if (
                event.shiftKey &&
                (document.activeElement === first ||
                    document.activeElement === modal)
            ) {
                event.preventDefault();
                last.focus();
            } else if (
                !event.shiftKey &&
                (document.activeElement === last ||
                    document.activeElement === modal)
            ) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return createPortal(
        <div
            className={css.backdrop}
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                ref={modalRef}
                className={`${css.modal} ${wide ? css.wide : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
            >
                <div className={css.content}>
                    <button
                        className={css.close}
                        type="button"
                        aria-label="Close modal"
                        onClick={onClose}
                    >
                        <svg
                            width={32}
                            height={32}
                            aria-hidden="true"
                            focusable="false"
                        >
                            <use href="/sprite.svg#icon-x-icon" />
                        </svg>
                    </button>
                    {children}
                </div>
            </div>
        </div>,
        document.body,
    );
}

export default Modal;
