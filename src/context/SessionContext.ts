import { createContext } from 'react';

export interface Account {
    id: string;
    name: string;
    email: string;
}

export type AccountModal = 'signin' | 'signup' | null;

interface SessionValue {
    account: Account | null;
    loading: boolean;
    sessionError: string;
    accountModal: AccountModal;
    openAccount: (accountModal: AccountModal) => void;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const SessionContext = createContext<SessionValue | null>(null);
