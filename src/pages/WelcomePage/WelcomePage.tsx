import { Link } from 'react-router-dom';
import PlatformStats from '../../components/PlatformStats/PlatformStats';
import type { Palette } from '../../data/palettes';
import css from './WelcomePage.module.css';

interface WelcomePageProps {
    palette: Palette;
}

function WelcomePage({ palette }: WelcomePageProps) {
    const imagePath = `/images/hero-${palette}`;

    return (
        <section className={css.page} aria-labelledby="welcome-title">
            <div className={`container ${css.content}`}>
                <div className={css.textContainer}>
                    <h1 className={css.title} id="welcome-title">
                        Unlock your potential with the best{' '}
                        <span className={css.highlight}>language</span> tutors
                    </h1>
                    <p className={css.description}>
                        Embark on an Exciting Language Journey with Expert Language Tutors:
                        Elevate your language proficiency to new heights by connecting
                        with highly qualified and experienced tutors.
                    </p>
                    <Link className={css.btn} to="/teachers">Get started</Link>
                </div>
                <div className={css.imageContainer}>
                    <img
                        className={css.image}
                        src={`${imagePath}.webp`}
                        srcSet={`${imagePath}.webp 1x, ${imagePath}@2x.webp 2x`}
                        width={568}
                        height={530}
                        alt="Woman using a laptop"
                        fetchPriority="high"
                    />
                </div>
            </div>
            <PlatformStats />
        </section>
    );
}

export default WelcomePage;
