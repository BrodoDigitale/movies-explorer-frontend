import "./SavedMovies.css";
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
        <main className="movies">
            <SearchForm />
            <MoviesCardList
            movies={savedMovies}
            button="movies__unlike-button"
            />
        </main>
        <Footer/>
     </>
    )
}