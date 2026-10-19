import { Link } from 'react-router-dom';
import PageIntro from '../../components/PageIntro/PageIntro';

function NotFoundPage() {
    return (
        <PageIntro title="Page not found">
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Back to home</Link>
        </PageIntro>
    );
}

export default NotFoundPage;
