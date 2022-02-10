import "./MoviesCardList.css"
import { MoviesCard } from "../MoviesCard/MoviesCard";


export function MoviesCardList(props) {
const movies = props.movies;
    return(
    <section className="moviesCardList">
        <ul className="moviesCardList__list">
        {movies.map((movie) => {
                     return(
                        <MoviesCard
                        key={movie.id}
                        image={`https://api.nomoreparties.co/${movie.image.url}`}
                        nameRU={movie.nameRU}
                        duration={movie.duration}
                        button={props.button}
                        trailer={props.trailerLink}
                        />
                     )
                 })
            }
        </ul>
    </section>
    )
    }