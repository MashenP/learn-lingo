import SearchFilters from '../../components/SearchFilters/SearchFilters';
import SavedResults from '../../components/SavedResults/SavedResults';
import { useTutorFilters } from '../../hooks/useTutorFilters';
import css from '../Directory.module.css';

function SavedPage() {
    const { filters, changeFilter, resetFilters } = useTutorFilters();
    return (
        <section className={css.page} aria-labelledby="saved-title">
            <div className={`container ${css.container}`}>
                <h1 className="visuallyHidden" id="saved-title">
                    Your favorite teachers
                </h1>
                <SearchFilters
                    filters={filters}
                    onChange={changeFilter}
                    onReset={resetFilters}
                />
                <SavedResults filters={filters} />
            </div>
        </section>
    );
}

export default SavedPage;
