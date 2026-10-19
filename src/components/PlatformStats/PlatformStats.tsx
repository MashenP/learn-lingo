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
            <ul className={css.list}>
                {statistics.map(({ value, label }) => (
                    <li className={css.item} key={label}>
                        <p className={css.count}>{value}</p>
                        <p className={css.text}>{label}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default PlatformStats;
