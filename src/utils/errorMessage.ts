import { FirebaseError } from 'firebase/app';

export function errorMessage(error: unknown): string {
    if (error instanceof FirebaseError) {
        switch (error.code) {
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return 'The email or password is incorrect.';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists. Please log in.';
            case 'auth/weak-password':
            case 'auth/password-does-not-meet-requirements':
                return 'Choose a stronger password that meets the account requirements.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please wait and try again.';
            case 'auth/network-request-failed':
                return 'Check your internet connection and try again.';
            case 'auth/operation-not-allowed':
                return 'Email and password sign-in must be enabled in Firebase.';
            case 'PERMISSION_DENIED':
            case 'database/permission-denied':
                return 'Access was denied. Check the Firebase database rules.';
            default:
                return 'The request could not be completed. Please try again.';
        }
    }
    return error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again.';
}
