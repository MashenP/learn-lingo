import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize/modern-normalize.css';
import './index.css';
import App from './components/App/App';
import SessionProvider from './context/SessionProvider';
import SavedProvider from './context/SavedProvider';
import { applyPalette, readPalette } from './data/palettes';

applyPalette(readPalette());

const root = document.getElementById('root');
if (!root) throw new Error('Root element was not found');

createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <SessionProvider>
                <SavedProvider>
                    <App />
                </SavedProvider>
            </SessionProvider>
        </BrowserRouter>
    </StrictMode>,
);
