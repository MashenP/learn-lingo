import type { ReactNode } from 'react';
import css from './StatusPanel.module.css';

interface StatusPanelProps {
    title: string;
    children?: ReactNode;
    error?: boolean;
}

function StatusPanel({ title, children, error = false }: StatusPanelProps) {
    return (
        <div className={css.panel} role={error ? 'alert' : 'status'}>
            <p className={css.title}>{title}</p>
            {children}
        </div>
    );
}

export default StatusPanel;
