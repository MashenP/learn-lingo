import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const configuration = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(configuration).every(
    (value) => typeof value === 'string' && value.trim() !== '',
);

const app = isFirebaseConfigured
    ? getApps().length
        ? getApp()
        : initializeApp(configuration)
    : null;

export const accountClient = app ? getAuth(app) : null;
export const databaseClient = app ? getDatabase(app) : null;

export function requireDatabase() {
    if (!databaseClient) {
        throw new Error(
            'The teacher service is not available yet. Please try again later.',
        );
    }
    return databaseClient;
}
