import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../../context/useSession';
import StatusPanel from '../StatusPanel/StatusPanel';

function RestrictedRoute({ children }: { children: ReactNode }) {
    const { account, loading } = useSession();
    if (loading) return <StatusPanel title="Restoring your session…" />;
    if (!account) return <Navigate to="/" replace />;
    return children;
}

export default RestrictedRoute;
