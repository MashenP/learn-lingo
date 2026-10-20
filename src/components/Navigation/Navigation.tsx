import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSession } from '../../context/useSession';
import { errorMessage } from '../../utils/errorMessage';
import type { Palette } from '../../data/palettes';
import PaletteSwitcher from '../PaletteSwitcher/PaletteSwitcher';
import css from './Navigation.module.css';

interface NavigationProps {
    palette: Palette;
    onPaletteChange: (palette: Palette) => void;
}

function Navigation({ palette, onPaletteChange }: NavigationProps) {
    const { account, loading, signOut, openAccount } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!menuOpen) return;
        function closeOutside(event: PointerEvent) {
            if (
                event.target instanceof Node &&
                !headerRef.current?.contains(event.target)
            )
                setMenuOpen(false);
        }
        function closeOnEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') setMenuOpen(false);
        }
        document.addEventListener('pointerdown', closeOutside);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('pointerdown', closeOutside);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [menuOpen]);

    async function logOut() {
        setLeaving(true);
        try {
            await signOut();
            setMenuOpen(false);
            toast.success('You have logged out.');
        } catch (error) {
            toast.error(errorMessage(error));
        } finally {
            setLeaving(false);
        }
    }

    return (
        <header className={css.header} ref={headerRef}>
            <div className={css.content}>
                <Link
                    className={css.logo}
                    to="/"
                    aria-label="LearnLingo home"
                    onClick={() => setMenuOpen(false)}
                >
                    <svg
                        width={28}
                        height={28}
                        aria-hidden="true"
                        focusable="false"
                    >
                        <use href="/sprite.svg#icon-ukraine" />
                    </svg>
                    LearnLingo
                </Link>
                <nav
                    className={`${css.navigation} ${menuOpen ? css.open : ''}`}
                    aria-label="Main navigation"
                    id="main-navigation"
                >
                    <ul className={css.list}>
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? `${css.link} ${css.active}`
                                        : css.link
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/teachers"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${css.link} ${css.active}`
                                        : css.link
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Teachers
                            </NavLink>
                        </li>
                        {account && (
                            <li>
                                <NavLink
                                    to="/favorites"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${css.link} ${css.active}`
                                            : css.link
                                    }
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Favorites
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className={css.actions}>
                        {loading ? (
                            <span role="status">Restoring session…</span>
                        ) : account ? (
                            <>
                                <span className={css.user} title={account.name}>
                                    {account.name}
                                </span>
                                <button
                                    className={css.login}
                                    disabled={leaving}
                                    type="button"
                                    onClick={() => {
                                        void logOut();
                                    }}
                                >
                                    {leaving ? 'Logging out…' : 'Log out'}
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className={css.login}
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        openAccount('signin');
                                    }}
                                >
                                    <svg
                                        width={20}
                                        height={20}
                                        aria-hidden="true"
                                        focusable="false"
                                    >
                                        <use href="/sprite.svg#icon-log-in-01" />
                                    </svg>
                                    Log in
                                </button>
                                <button
                                    className={css.register}
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        openAccount('signup');
                                    }}
                                >
                                    Registration
                                </button>
                            </>
                        )}
                    </div>
                </nav>
                <PaletteSwitcher
                    palette={palette}
                    onPaletteChange={onPaletteChange}
                />
                <button
                    className={css.menuToggle}
                    type="button"
                    aria-label={
                        menuOpen ? 'Close navigation' : 'Open navigation'
                    }
                    aria-expanded={menuOpen}
                    aria-controls="main-navigation"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        width={28}
                        height={28}
                        aria-hidden="true"
                        focusable="false"
                    >
                        <use
                            href={`/sprite.svg#${menuOpen ? 'icon-x-icon' : 'icon-burger'}`}
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
}

export default Navigation;
