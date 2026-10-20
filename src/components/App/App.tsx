import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { applyPalette, readPalette } from '../../data/palettes';
import type { Palette } from '../../data/palettes';
import { useSession } from '../../context/useSession';
import Navigation from '../Navigation/Navigation';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import Modal from '../Modal/Modal';
import StatusPanel from '../StatusPanel/StatusPanel';

import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import css from './App.module.css';

const SignInForm = lazy(() => import('../AccountForms/SignInForm'));
const SignUpForm = lazy(() => import('../AccountForms/SignUpForm'));
const TutorsPage = lazy(() => import('../../pages/TutorsPage/TutorsPage'));
const SavedPage = lazy(() => import('../../pages/SavedPage/SavedPage'));

function App() {
    const [palette, setPalette] = useState(readPalette);
    const { accountModal, openAccount, sessionError } = useSession();
    const { pathname } = useLocation();

    useEffect(() => {
        const title =
            pathname === '/'
                ? 'Online language teachers'
                : pathname === '/teachers'
                  ? 'Teachers'
                  : pathname === '/favorites'
                    ? 'Favorites'
                    : 'Page not found';
        document.title = `${title} | LearnLingo`;
        window.scrollTo(0, 0);
    }, [pathname]);

    function changePalette(nextPalette: Palette) {
        applyPalette(nextPalette);
        setPalette(nextPalette);
    }

    return (
        <div className={css.app}>
            <a className="skipLink" href="#main-content">
                Skip to content
            </a>
            <Navigation palette={palette} onPaletteChange={changePalette} />
            {sessionError && (
                <p className="serviceNotice" role="alert">
                    Your session could not be restored. {sessionError}
                </p>
            )}
            <main className={css.main} id="main-content" tabIndex={-1}>
                <Suspense fallback={<StatusPanel title="Loading…" />}>
                    <Routes>
                        <Route
                            path="/"
                            element={<WelcomePage palette={palette} />}
                        />
                        <Route path="/teachers" element={<TutorsPage />} />
                        <Route
                            path="/favorites"
                            element={
                                <RestrictedRoute>
                                    <SavedPage />
                                </RestrictedRoute>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </main>
            {accountModal && (
                <Modal
                    titleId="account-title"
                    onClose={() => openAccount(null)}
                >
                    <Suspense fallback={<p role="status">Loading form…</p>}>
                        {accountModal === 'signin' ? (
                            <SignInForm />
                        ) : (
                            <SignUpForm />
                        )}
                    </Suspense>
                </Modal>
            )}
            <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        </div>
    );
}

export default App;
