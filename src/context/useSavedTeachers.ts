import { useContext } from 'react';
import { SavedContext } from './SavedContext';

export function useSavedTeachers() {
    const saved = useContext(SavedContext);
    if (!saved) throw new Error('SavedProvider is missing.');
    return saved;
}
