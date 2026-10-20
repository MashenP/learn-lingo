import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { onValue, ref } from 'firebase/database';
import toast from 'react-hot-toast';
import { databaseClient } from '../firebase/client';
import { writeSavedTeacher } from '../firebase/savedTutors';
import { errorMessage } from '../utils/errorMessage';
import { SavedContext } from './SavedContext';
import { useSession } from './useSession';

interface SavedSnapshot {
    userId: string;
    ids: string[];
    error: string;
}

function SavedProvider({ children }: { children: ReactNode }) {
    const { account, openAccount } = useSession();
    const userId = account?.id;
    const [snapshot, setSnapshot] = useState<SavedSnapshot | null>(null);
    const [attempt, setAttempt] = useState(0);
    const [busyIds, setBusyIds] = useState<Set<string>>(new Set());
    const pending = useRef(new Set<string>());
    const current = snapshot?.userId === userId ? snapshot : null;
    const ids = current?.ids ?? [];

    useEffect(() => {
        if (!userId || !databaseClient) return;
        let active = true;
        const unsubscribe = onValue(
            ref(databaseClient, `users/${userId}/favorites`),
            (data) => {
                if (!active) return;
                const entries = data.val() as Record<string, unknown> | null;
                setSnapshot({
                    userId,
                    ids: entries
                        ? Object.keys(entries).filter(
                              (id) => entries[id] === true,
                          )
                        : [],
                    error: '',
                });
            },
            (error) => {
                if (active)
                    setSnapshot({
                        userId,
                        ids: [],
                        error: errorMessage(error),
                    });
            },
        );
        return () => {
            active = false;
            unsubscribe();
        };
    }, [userId, attempt]);

    async function toggleSaved(teacherId: string) {
        if (!userId) {
            toast('Log in or register to save your favorite teachers.');
            openAccount('signin');
            return;
        }
        if (!current || current.error) return;
        const requestKey = `${userId}:${teacherId}`;
        if (pending.current.has(requestKey)) return;
        pending.current.add(requestKey);
        setBusyIds(new Set(pending.current));
        try {
            await writeSavedTeacher(
                userId,
                teacherId,
                !ids.includes(teacherId),
            );
        } catch (error) {
            toast.error(errorMessage(error));
        } finally {
            pending.current.delete(requestKey);
            setBusyIds(new Set(pending.current));
        }
    }

    function retry() {
        setAttempt((value) => value + 1);
    }

    return (
        <SavedContext.Provider
            value={{
                ids,
                ready: !userId || Boolean(current),
                error: current?.error ?? '',
                busyIds,
                toggleSaved,
                retry,
            }}
        >
            {children}
        </SavedContext.Provider>
    );
}

export default SavedProvider;
