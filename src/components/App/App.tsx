import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { applyPalette, readPalette } from '../../data/palettes';
import type { Palette } from '../../data/palettes';
import Navigation from '../Navigation/Navigation';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import TutorsPage from '../../pages/TutorsPage/TutorsPage';
import SavedPage from '../../pages/SavedPage/SavedPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import css from './App.module.css';

function App() {
    const [palette, setPalette] = useState(readPalette);

    function changePalette(nextPalette: Palette) {
        applyPalette(nextPalette);
        setPalette(nextPalette);
    }

    return (
        <div className={css.app}>
            <a className="skipLink" href="#main-content">Skip to content</a>
            <Navigation palette={palette} onPaletteChange={changePalette} />
            <main className={css.main} id="main-content" tabIndex={-1}>
                <Routes>
                    <Route path="/" element={<WelcomePage palette={palette} />} />
                    <Route path="/teachers" element={<TutorsPage />} />
                    <Route path="/favorites" element={<SavedPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
