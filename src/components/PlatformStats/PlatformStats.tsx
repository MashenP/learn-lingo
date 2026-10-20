import css from './PlatformStats.module.css';

const statistics = [
    { value: '32,000 +', label: 'Experienced tutors' },
    { value: '300,000 +', label: '5-star tutor reviews' },
    { value: '120 +', label: 'Subjects taught' },
    { value: '200 +', label: 'Tutor nationalities' },
];

function PlatformStats() {
    return (
        <section className="container" aria-label="LearnLingo in numbers">
            <div className={css.frame}>
                <svg
                    className={css.border}
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 1312 116"
                    preserveAspectRatio="none"
                >
                    <use href="/sprite.svg#stats-border" />
                </svg>
                <ul className={css.list}>
                    {statistics.map(({ value, label }) => (
                        <li className={css.item} key={label}>
                            <p className={css.count}>{value}</p>
                            <p className={css.text}>{label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default PlatformStats;
