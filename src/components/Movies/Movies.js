import "./Movies.css"
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export function Movies(props) {

    return(
    <>
        <Header 
        loggedIn = {props.loggedIn}
        />
        <main className="movies">
            <SearchForm />
            <Preloader />
            <MoviesCardList />
        </main>
        <Footer/>
     </>
    )
}