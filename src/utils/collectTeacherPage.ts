import type { Teacher, TeacherPage, TutorFilters } from '../types/teacher.ts';

export const teachersPerPage = 4;
export type ReadBatch = (
    cursor: string | null,
    limit: number,
) => Promise<Teacher[]>;

export function matchesFilters(teacher: Teacher, filters: TutorFilters) {
    return (
        (!filters.language || teacher.languages.includes(filters.language)) &&
        (!filters.level || teacher.levels.includes(filters.level)) &&
        (!filters.price || teacher.price_per_hour === Number(filters.price))
    );
}

export async function collectTeacherPage(
    readBatch: ReadBatch,
    filters: TutorFilters,
    cursor: string | null = null,
    signal?: AbortSignal,
): Promise<TeacherPage> {
    const matches: Teacher[] = [];
    const batchSize = Object.values(filters).some(Boolean)
        ? 24
        : teachersPerPage + 1;
    let scannedCursor = cursor;

    while (true) {
        signal?.throwIfAborted();
        const batch = await readBatch(scannedCursor, batchSize);
        signal?.throwIfAborted();

        for (const teacher of batch) {
            if (matchesFilters(teacher, filters)) {
                matches.push(teacher);
            }
            if (matches.length > teachersPerPage) {
                return {
                    teachers: matches.slice(0, teachersPerPage),
                    cursor: matches[teachersPerPage - 1].id,
                    hasMore: true,
                };
            }
        }

        if (batch.length < batchSize) {
            return {
                teachers: matches,
                cursor: matches.at(-1)?.id ?? cursor,
                hasMore: false,
            };
        }
        const nextCursor = batch.at(-1)?.id ?? null;
        if (!nextCursor || nextCursor === scannedCursor) {
            throw new Error('The teacher page cursor did not advance.');
        }
        scannedCursor = nextCursor;
    }
}
