import { ref, remove, set } from 'firebase/database';
import { requireDatabase } from './client';

export async function writeSavedTeacher(
    userId: string,
    teacherId: string,
    saved: boolean,
) {
    const entry = ref(
        requireDatabase(),
        `users/${userId}/favorites/${teacherId}`,
    );
    if (saved) {
        await set(entry, true);
    } else {
        await remove(entry);
    }
}
