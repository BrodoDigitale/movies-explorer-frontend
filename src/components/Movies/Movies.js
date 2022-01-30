import "./Movies.css"
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { movies } from "../../utils/utils";

export function Movies(props) {

    return(
    <>
        <Header 
        loggedIn = {props.loggedIn}
        />
        <main className="movies">
            <SearchForm />
            {movies.map((movie) => {
                console.log(movie)
                     return(
                        <MoviesCard
                        key={movie._id}
                        image={movie.image}
                        nameRU={movie.nameRU}
                        duration={movie.duration}
                        />
                     )
                 })
            }
        </main>
        <Footer/>
     </>
    )
}