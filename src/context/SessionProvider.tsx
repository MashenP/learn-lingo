import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { accountClient } from '../firebase/client';
import {
    createAccount,
    enterAccount,
    leaveAccount,
} from '../firebase/accounts';
import { errorMessage } from '../utils/errorMessage';
import { SessionContext } from './SessionContext';
import type { Account, AccountModal } from './SessionContext';

function describeAccount(user: User): Account {
    return {
        id: user.uid,
        name: user.displayName || 'Learner',
        email: user.email || '',
    };
}

function SessionProvider({ children }: { children: ReactNode }) {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(Boolean(accountClient));
    const [sessionError, setSessionError] = useState('');
    const [accountModal, openAccount] = useState<AccountModal>(null);

    useEffect(() => {
        if (!accountClient) return;
        return onAuthStateChanged(
            accountClient,
            (user) => {
                setAccount(user ? describeAccount(user) : null);
                setLoading(false);
                setSessionError('');
            },
            (error) => {
                setSessionError(errorMessage(error));
                setLoading(false);
            },
        );
    }, []);

    async function signIn(email: string, password: string) {
        setAccount(describeAccount(await enterAccount(email, password)));
    }

    async function signUp(name: string, email: string, password: string) {
        setAccount(describeAccount(await createAccount(name, email, password)));
    }

    async function signOut() {
        await leaveAccount();
        setAccount(null);
    }

    return (
        <SessionContext.Provider
            value={{
                account,
                loading,
                sessionError,
                accountModal,
                openAccount,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export default SessionProvider;
