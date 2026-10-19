import { Link, NavLink } from 'react-router-dom';
import type { Palette } from '../../data/palettes';
import PaletteSwitcher from '../PaletteSwitcher/PaletteSwitcher';
import css from './Navigation.module.css';

interface NavigationProps {
    palette: Palette;
    onPaletteChange: (palette: Palette) => void;
}

function Navigation({ palette, onPaletteChange }: NavigationProps) {
    return (
        <header className={css.header}>
            <div className={`container ${css.content}`}>
                <Link className={css.logo} to="/" aria-label="LearnLingo home">
                    <svg width="28" height="28" aria-hidden="true">
                        <use href="/sprite.svg#icon-ukraine" />
                    </svg>
                    LearnLingo
                </Link>
                <nav aria-label="Main navigation">
                    <ul className={css.list}>
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    isActive ? `${css.link} ${css.active}` : css.link
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/teachers"
                                className={({ isActive }) =>
                                    isActive ? `${css.link} ${css.active}` : css.link
                                }
                            >
                                Teachers
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/favorites"
                                className={({ isActive }) =>
                                    isActive ? `${css.link} ${css.active}` : css.link
                                }
                            >
                                Favorites
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <PaletteSwitcher palette={palette} onPaletteChange={onPaletteChange} />
            </div>
        </header>
    );
}

export default Navigation;
