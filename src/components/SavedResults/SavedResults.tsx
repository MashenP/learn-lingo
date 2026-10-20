import { useEffect, useState } from 'react';
import { useSavedTeachers } from '../../context/useSavedTeachers';
import { fetchSavedTeachers } from '../../firebase/tutors';
import { matchesFilters } from '../../utils/collectTeacherPage';
import { errorMessage } from '../../utils/errorMessage';
import type { Teacher, TutorFilters } from '../../types/teacher';
import TutorCard from '../TutorCard/TutorCard';
import StatusPanel from '../StatusPanel/StatusPanel';
import css from '../TutorResults/TutorResults.module.css';

interface SavedResultsProps {
    filters: TutorFilters;
}

function SavedResults({ filters }: SavedResultsProps) {
    const { ids, ready, error: savedError, retry } = useSavedTeachers();
    const key = JSON.stringify(ids);
    const [attempt, setAttempt] = useState(0);
    const [result, setResult] = useState<{
        key: string;
        teachers: Teacher[];
        error: string;
    } | null>(null);

    useEffect(() => {
        if (!ready || savedError) return;
        let active = true;
        const teacherIds = JSON.parse(key) as string[];
        fetchSavedTeachers(teacherIds)
            .then((teachers) => {
                if (active) setResult({ key, teachers, error: '' });
            })
            .catch((error) => {
                if (active)
                    setResult({
                        key,
                        teachers: [],
                        error: errorMessage(error),
                    });
            });
        return () => {
            active = false;
        };
    }, [key, ready, savedError, attempt]);

    if (savedError)
        return (
            <StatusPanel title={savedError} error>
                <button className="btn" onClick={retry} type="button">
                    Try again
                </button>
            </StatusPanel>
        );
    if (!ready) return <StatusPanel title="Loading your favorites…" />;
    if (ids.length === 0)
        return (
            <StatusPanel title="Your next favorite teacher is waiting.">
                <p>Save teachers from the directory to find them here.</p>
            </StatusPanel>
        );
    if (result?.key !== key)
        return <StatusPanel title="Loading your favorites…" />;
    if (result.error)
        return (
            <StatusPanel title={result.error} error>
                <button
                    className="btn"
                    type="button"
                    onClick={() => setAttempt((value) => value + 1)}
                >
                    Try again
                </button>
            </StatusPanel>
        );
    const teachers = result.teachers.filter((teacher) =>
        matchesFilters(teacher, filters),
    );
    if (!teachers.length)
        return (
            <StatusPanel title="No saved teachers match these filters."></StatusPanel>
        );
    return (
        <ul className={css.list} aria-label="Favorite teachers">
            {teachers.map((teacher) => (
                <li key={teacher.id}>
                    <TutorCard
                        teacher={teacher}
                        selectedLevel={filters.level}
                    />
                </li>
            ))}
        </ul>
    );
}

export default SavedResults;
