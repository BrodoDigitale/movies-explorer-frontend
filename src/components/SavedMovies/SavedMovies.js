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
            <SearchForm
            onToggleSwitchClick={props.onToggleSwitchClick}
            />
            <MoviesCardList
            movies={props.movies}
            button={"movies__unlike-button"}
            onUnlike={props.onUnlike}
            savedMovies={props.savedMovies}
            />
        </main>
        <Footer/>
     </>
    )
}