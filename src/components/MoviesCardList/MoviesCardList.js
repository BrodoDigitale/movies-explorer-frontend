import "./MoviesCardList.css"
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { movies } from "../../utils/utils";


export function MoviesCardList() {
  
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
        <button className="moviesCardList__button" type="button" aria-label="Показать ещё фильмы">Ещё</button>
    </section>
    )
    }