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
            <span className={css.label} id="color-scheme-label">
                Color scheme
            </span>
            <div
                className={css.options}
                role="group"
                aria-labelledby="color-scheme-label"
            >
                {palettes.map(({ id, label, color }) => (
                    <button
                        className={css.option}
                        key={id}
                        type="button"
                        style={{ backgroundColor: color }}
                        aria-label={`${label} color scheme`}
                        aria-pressed={palette === id}
                        title={`${label} color scheme`}
                        onClick={() => onPaletteChange(id)}
                    >
                        {palette === id && (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                            >
                                <use href="/sprite.svg#icon-check" />
                            </svg>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PaletteSwitcher;
