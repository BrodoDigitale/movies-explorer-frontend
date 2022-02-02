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
                        key={movie._id}
                        image={movie.image}
                        nameRU={movie.nameRU}
                        duration={movie.duration}
                        />
                     )
                 })
            }
        </ul>
    </section>
    )
    }