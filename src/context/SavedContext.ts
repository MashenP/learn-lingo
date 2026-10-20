import { createContext } from 'react';

interface SavedValue {
    ids: string[];
    ready: boolean;
    error: string;
    busyIds: Set<string>;
    toggleSaved: (teacherId: string) => Promise<void>;
    retry: () => void;
}

export const SavedContext = createContext<SavedValue | null>(null);
