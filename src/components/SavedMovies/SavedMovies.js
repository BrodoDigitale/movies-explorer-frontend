import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { savedMovies } from "../../utils/utils";

export function SavedMovies(props) {
    return(
    <>
        <Header 
        loggedIn = {props.loggedIn}
        />
        <main>
            <SearchForm />
            <MoviesCardList
            movies={savedMovies}
            button="movie__unlike-button"
            />
        </main>
        <Footer/>
     </>
    )
}