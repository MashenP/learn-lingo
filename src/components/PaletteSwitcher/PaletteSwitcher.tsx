import { palettes } from '../../data/palettes';
import type { Palette } from '../../data/palettes';
import css from './PaletteSwitcher.module.css';

interface PaletteSwitcherProps {
    palette: Palette;
    onPaletteChange: (palette: Palette) => void;
}

function PaletteSwitcher({ palette, onPaletteChange }: PaletteSwitcherProps) {

    return (
        <div className={css.container}>
            <span className={css.label} id="palette-label">Palette</span>
            <div className={css.options} role="group" aria-labelledby="palette-label">
                {palettes.map(({ id, label, color }) => (
                    <button
                        className={css.option}
                        key={id}
                        type="button"
                        style={{ backgroundColor: color }}
                        aria-label={`${label} palette`}
                        aria-pressed={palette === id}
                        title={`${label} palette`}
                        onClick={() => onPaletteChange(id)}
                    >
                        {palette === id && (
                            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="m4 8 3 3 5-6" />
                            </svg>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PaletteSwitcher;
