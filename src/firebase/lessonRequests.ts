import { push, ref, serverTimestamp, set } from 'firebase/database';
import { accountClient, requireDatabase } from './client';

export interface LessonRequest {
    name: string;
    email: string;
    phone: string;
    reason: string;
}

export async function sendLessonRequest(
    teacherId: string,
    values: LessonRequest,
) {
    const request = push(ref(requireDatabase(), 'lessonRequests'));
    await set(request, {
        ...values,
        teacherId,
        userId: accountClient?.currentUser?.uid ?? null,
        createdAt: serverTimestamp(),
    });
}
