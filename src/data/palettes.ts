export const palettes = [
    { id: 'yellow', label: 'Yellow', color: '#f4c550' },
    { id: 'green', label: 'Green', color: '#9fbaae' },
    { id: 'blue', label: 'Blue', color: '#9fb7ce' },
    { id: 'pink', label: 'Pink', color: '#e0a39a' },
    { id: 'peach', label: 'Peach', color: '#f0aa8d' },
] as const;

export type Palette = (typeof palettes)[number]['id'];

const storageKey = 'learnlingo-palette';

export function readPalette(): Palette {
    try {
        const savedPalette = localStorage.getItem(storageKey);
        return palettes.find(({ id }) => id === savedPalette)?.id ?? 'blue';
    } catch {
        return 'blue';
    }
}

export function applyPalette(palette: Palette) {
    document.documentElement.dataset.palette = palette;

    try {
        localStorage.setItem(storageKey, palette);
    } catch {
        return;
    }
}
