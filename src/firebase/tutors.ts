import {
    get,
    limitToFirst,
    orderByKey,
    query,
    ref,
    startAfter,
} from 'firebase/database';
import type { QueryConstraint } from 'firebase/database';
import { requireDatabase } from './client';
import { collectTeacherPage } from '../utils/collectTeacherPage';
import type { Teacher, TutorFilters } from '../types/teacher';

async function readTeacherBatch(
    cursor: string | null,
    limit: number,
): Promise<Teacher[]> {
    const constraints: QueryConstraint[] = [orderByKey(), limitToFirst(limit)];
    if (cursor) constraints.push(startAfter(cursor));
    const snapshot = await get(
        query(ref(requireDatabase(), 'teachers'), ...constraints),
    );
    const teachers: Teacher[] = [];
    snapshot.forEach((entry) => {
        teachers.push({ ...entry.val(), id: entry.key });
    });
    return teachers;
}

export function fetchTeacherPage(
    filters: TutorFilters,
    cursor: string | null,
    signal?: AbortSignal,
) {
    return collectTeacherPage(readTeacherBatch, filters, cursor, signal);
}

export async function fetchSavedTeachers(ids: string[]): Promise<Teacher[]> {
    const database = requireDatabase();
    const teachers = await Promise.all(
        ids.map(async (id) => {
            const snapshot = await get(ref(database, `teachers/${id}`));
            return snapshot.exists()
                ? ({ ...snapshot.val(), id } as Teacher)
                : null;
        }),
    );
    return teachers.filter((teacher): teacher is Teacher => teacher !== null);
}
