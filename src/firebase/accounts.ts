import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { accountClient } from './client';

function requireAccountClient() {
    if (!accountClient) {
        throw new Error(
            'Account services are not available yet. Please try again later.',
        );
    }
    return accountClient;
}

export async function createAccount(
    name: string,
    email: string,
    password: string,
) {
    const client = requireAccountClient();
    await setPersistence(client, browserLocalPersistence);
    const { user } = await createUserWithEmailAndPassword(
        client,
        email,
        password,
    );
    await updateProfile(user, { displayName: name });
    return user;
}

export async function enterAccount(email: string, password: string) {
    const client = requireAccountClient();
    await setPersistence(client, browserLocalPersistence);
    return (await signInWithEmailAndPassword(client, email, password)).user;
}

export async function leaveAccount() {
    await signOut(requireAccountClient());
}
