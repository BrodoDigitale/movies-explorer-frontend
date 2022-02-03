import "./PageNotFound.css"
import { useHistory } from 'react-router-dom';

export function PageNotFound() {
    const history = useHistory();

    return(
    <main className="pageNotFound">
        <div className="pageNotFound__title-wrapper">
        <h1 className="pageNotFound__header">404</h1>
        <p className="pageNotFound__text">Страница не найдена</p>
        </div>
        <button className="pageNotFound__button" to={history.goBack}>Назад</button>
    </main>
    )
}