import SearchFilters from '../../components/SearchFilters/SearchFilters';
import TutorResults from '../../components/TutorResults/TutorResults';
import { useTutorFilters } from '../../hooks/useTutorFilters';
import { useSavedTeachers } from '../../context/useSavedTeachers';
import css from '../Directory.module.css';

function TutorsPage() {
    const { filters, changeFilter, resetFilters } = useTutorFilters();
    const { error, retry } = useSavedTeachers();
    return (
        <section className={css.page} aria-labelledby="teachers-title">
            <div className={`container ${css.container}`}>
                <h1 className="visuallyHidden" id="teachers-title">
                    Find your language teacher
                </h1>
                <SearchFilters
                    filters={filters}
                    onChange={changeFilter}
                    onReset={resetFilters}
                />
                {error && (
                    <p className={css.notice} role="alert">
                        Favorites are unavailable. {error}
                        <button type="button" onClick={retry}>
                            Try again
                        </button>
                    </p>
                )}
                <TutorResults key={JSON.stringify(filters)} filters={filters} />
            </div>
        </section>
    );
}

export default TutorsPage;
