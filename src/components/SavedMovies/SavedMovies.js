import "./SavedMovies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export function SavedMovies(props) {
    return(
    <>
        <Header 
        loggedIn = {props.loggedIn}
        />
        <main className="movies">
            <SearchForm />
            <MoviesCardList
            movies={props.movies}
            button={"movies__unlike-button"}
            onClick={props.onUnlike}
            />
        </main>
        <Footer/>
     </>
    )
}