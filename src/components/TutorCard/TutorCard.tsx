import { useId, useState } from 'react';
import { useSession } from '../../context/useSession';
import { useSavedTeachers } from '../../context/useSavedTeachers';
import type { Teacher } from '../../types/teacher';
import Avatar from '../Avatar/Avatar';
import LessonBooking from '../LessonBooking/LessonBooking';
import css from './TutorCard.module.css';

interface TutorCardProps {
    teacher: Teacher;
    selectedLevel?: string;
}

function TutorCard({ teacher, selectedLevel }: TutorCardProps) {
    const { account, loading: sessionLoading } = useSession();
    const { ids, ready, error, busyIds, toggleSaved } = useSavedTeachers();
    const [expanded, setExpanded] = useState(false);
    const [booking, setBooking] = useState(false);
    const detailsId = useId();
    const saved = ids.includes(teacher.id);
    const busy = busyIds.has(`${account?.id}:${teacher.id}`);
    const fullName = `${teacher.name} ${teacher.surname}`;

    return (
        <article className={css.card}>
            <div className={css.avatarContainer}>
                <Avatar src={teacher.avatar_url} name={fullName} />
                <svg
                    className={css.avatarBadge}
                    width={12}
                    height={12}
                    aria-hidden="true"
                    focusable="false"
                >
                    <use href="/sprite.svg#icon-online" />
                </svg>
            </div>
            <div className={css.content}>
                <div className={css.header}>
                    <div className={css.nameContainer}>
                        <p className={css.muted}>Languages</p>
                        <h2 className={css.title}>{fullName}</h2>
                    </div>
                    <ul className={css.metrics} aria-label="Teacher statistics">
                        <li>
                            <svg
                                width={16}
                                height={16}
                                className={css.lineIcon}
                                aria-hidden="true"
                                focusable="false"
                            >
                                <use href="/sprite.svg#icon-book" />
                            </svg>{' '}
                            Lessons online
                        </li>
                        <li>Lessons done: {teacher.lessons_done}</li>
                        <li>
                            <svg
                                width={16}
                                height={16}
                                aria-hidden="true"
                                focusable="false"
                            >
                                <use href="/sprite.svg#icon-star" />
                            </svg>{' '}
                            Rating: {teacher.rating}
                        </li>
                        <li>
                            Price / 1 hour:{' '}
                            <span className={css.price}>
                                {teacher.price_per_hour}$
                            </span>
                        </li>
                    </ul>
                </div>
                <button
                    className={`${css.heart} ${saved ? css.saved : ''}`}
                    type="button"
                    aria-label={`${saved ? 'Remove' : 'Save'} ${fullName} ${saved ? 'from' : 'to'} favorites`}
                    aria-pressed={saved}
                    disabled={
                        sessionLoading ||
                        busy ||
                        Boolean(account && (!ready || error))
                    }
                    onClick={() => {
                        void toggleSaved(teacher.id);
                    }}
                >
                    <svg
                        width={26}
                        height={26}
                        aria-hidden="true"
                        focusable="false"
                    >
                        <use href="/sprite.svg#icon-heart" />
                    </svg>
                </button>
                <div className={css.description}>
                    <p>
                        <span className={css.muted}>Speaks: </span>
                        <span className={css.languages}>
                            {teacher.languages.join(', ')}
                        </span>
                    </p>
                    <p>
                        <span className={css.muted}>Lesson Info: </span>
                        {teacher.lesson_info}
                    </p>
                    <p>
                        <span className={css.muted}>Conditions: </span>
                        {teacher.conditions.join(' ')}
                    </p>
                </div>
                {!expanded && (
                    <button
                        className={css.readMore}
                        type="button"
                        aria-expanded={false}
                        aria-controls={detailsId}
                        onClick={() => setExpanded(true)}
                    >
                        Read more
                    </button>
                )}
                <div id={detailsId} hidden={!expanded}>
                    <p className={css.experience}>{teacher.experience}</p>
                    <ul
                        className={css.reviews}
                        aria-label={`Student reviews for ${fullName}`}
                    >
                        {teacher.reviews.map((review, index) => (
                            <li
                                className={css.review}
                                key={`${review.reviewer_name}-${index}`}
                            >
                                <div className={css.reviewHeader}>
                                    <span
                                        className={css.initial}
                                        aria-hidden="true"
                                    >
                                        {review.reviewer_name.charAt(0)}
                                    </span>
                                    <div className={css.reviewDetails}>
                                        <p className={css.muted}>
                                            {review.reviewer_name}
                                        </p>
                                        <p className={css.rating}>
                                            <svg
                                                width={16}
                                                height={16}
                                                aria-hidden="true"
                                                focusable="false"
                                            >
                                                <use href="/sprite.svg#icon-star" />
                                            </svg>
                                            {review.reviewer_rating.toFixed(1)}
                                        </p>
                                    </div>
                                </div>
                                <p>{review.comment}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <ul className={css.levels} aria-label="Student levels">
                    {teacher.levels.map((level, index) => (
                        <li
                            className={`${css.level} ${(selectedLevel ? selectedLevel === level : index === 0) ? css.selected : ''}`}
                            key={level}
                        >
                            #{level}
                        </li>
                    ))}
                </ul>
                {expanded && (
                    <button
                        className={`btn ${css.book}`}
                        type="button"
                        onClick={() => setBooking(true)}
                    >
                        Book trial lesson
                    </button>
                )}
            </div>
            {booking && (
                <LessonBooking
                    teacher={teacher}
                    onClose={() => setBooking(false)}
                />
            )}
        </article>
    );
}

export default TutorCard;
