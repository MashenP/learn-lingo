import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

function NotFoundPage() {
    return (
        <section className={css.page} aria-labelledby="not-found-title">
            <div className="container">
                <div className={css.content}>
                    <p className={css.code} aria-hidden="true">
                        404
                    </p>
                    <h1 className={css.title} id="not-found-title">
                        Page not found
                    </h1>
                    <p className={css.description}>
                        This page is missing, but your language journey can
                        continue. Let’s get you back home.
                    </p>
                    <Link className={css.btn} to="/">
                        Back to home
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFoundPage;
