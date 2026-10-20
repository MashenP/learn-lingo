import { useEffect, useRef, useState } from 'react';
import { fetchTeacherPage } from '../../firebase/tutors';
import { errorMessage } from '../../utils/errorMessage';
import type { TeacherPage, TutorFilters } from '../../types/teacher';
import TutorCard from '../TutorCard/TutorCard';
import StatusPanel from '../StatusPanel/StatusPanel';
import css from './TutorResults.module.css';

interface TutorResultsProps {
    filters: TutorFilters;
}

function TutorResults({ filters }: TutorResultsProps) {
    const [page, setPage] = useState<TeacherPage>({
        teachers: [],
        cursor: null,
        hasMore: false,
    });
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState('');
    const [attempt, setAttempt] = useState(0);
    const controller = useRef<AbortController | null>(null);
    const pending = useRef(false);

    useEffect(() => {
        const request = new AbortController();
        controller.current = request;
        fetchTeacherPage(filters, null, request.signal)
            .then((result) => {
                if (request.signal.aborted) return;
                setPage(result);
                setError('');
                setLoading(false);
            })
            .catch((reason) => {
                if (request.signal.aborted) return;
                setError(errorMessage(reason));
                setLoading(false);
            });
        return () => request.abort();
    }, [filters, attempt]);

    async function loadMore() {
        if (pending.current || !page.hasMore) return;
        pending.current = true;
        setLoadingMore(true);
        setError('');
        const signal = controller.current?.signal;
        try {
            const result = await fetchTeacherPage(filters, page.cursor, signal);
            if (signal?.aborted) return;
            setPage((previous) => ({
                ...result,
                teachers: [...previous.teachers, ...result.teachers],
            }));
        } catch (reason) {
            if (!signal?.aborted) setError(errorMessage(reason));
        } finally {
            pending.current = false;
            if (!signal?.aborted) setLoadingMore(false);
        }
    }

    function retry() {
        setLoading(true);
        setError('');
        setAttempt((value) => value + 1);
    }

    if (loading) return <StatusPanel title="Finding your teachers…" />;
    if (error && page.teachers.length === 0) {
        return (
            <StatusPanel title={error} error>
                <button className="btn" type="button" onClick={retry}>
                    Try again
                </button>
            </StatusPanel>
        );
    }
    if (page.teachers.length === 0) {
        return (
            <StatusPanel title="No teachers match these filters.">
                <p>Try another language, level, or hourly rate.</p>
            </StatusPanel>
        );
    }

    return (
        <>
            <p className="visuallyHidden" role="status">
                Showing {page.teachers.length} teachers.
            </p>
            <ul
                className={css.list}
                aria-label="Teachers"
                aria-busy={loadingMore}
            >
                {page.teachers.map((teacher) => (
                    <li key={teacher.id}>
                        <TutorCard
                            teacher={teacher}
                            selectedLevel={filters.level}
                        />
                    </li>
                ))}
            </ul>
            {error && (
                <p className={css.error} role="alert">
                    {error}
                </p>
            )}
            {page.hasMore && (
                <button
                    className={`btn ${css.more}`}
                    type="button"
                    disabled={loadingMore}
                    onClick={() => {
                        void loadMore();
                    }}
                >
                    {loadingMore
                        ? 'Loading…'
                        : error
                          ? 'Try loading more'
                          : 'Load more'}
                </button>
            )}
        </>
    );
}

export default TutorResults;
