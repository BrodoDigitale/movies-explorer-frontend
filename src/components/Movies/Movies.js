import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { movies } from "../../utils/utils";

export function Movies(props) {

    return(
    <>
        <Header 
        loggedIn = {props.loggedIn}
        />
        <main>
            <SearchForm />
            <Preloader />
            <MoviesCardList 
            movies = {movies}
            />
        </main>
        <Footer/>
     </>
    )
}