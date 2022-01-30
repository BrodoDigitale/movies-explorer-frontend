import "./Movies.css"
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export function Movies(props) {

    return(
    <>
        <Header 
        loggedIn = {props.loggedIn}
        />
        <main className="movies">
            <SearchForm />
            <MoviesCardList />
        </main>
        <Footer/>
     </>
    )
}