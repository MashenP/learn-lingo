import type { ReactNode } from 'react';
import css from './PageIntro.module.css';

interface PageIntroProps {
    title: string;
    children: ReactNode;
}

function PageIntro({ title, children }: PageIntroProps) {
    return (
        <section className={css.page}>
            <div className="container">
                <h1 className={css.title}>{title}</h1>
                <div className={css.content}>{children}</div>
            </div>
        </section>
    );
}

export default PageIntro;
