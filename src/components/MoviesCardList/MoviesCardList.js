import "./MoviesCardList.css"
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom';

export function MoviesCardList(props) {
const location = useLocation();
const movies = props.movies;

console.log(location)
    return(
    <section className="moviesCardList">
        <ul className="moviesCardList__list">
        {movies.map((movie) => {
                     return(
                        <MoviesCard
                        movieCard={movie}
                        key={movie.id}
                        image={`${location.pathname === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}` : `${movie.image}`}`}
                        nameRU={movie.nameRU}
                        duration={movie.duration}
                        button={props.button}
                        trailer={movie.trailerLink}
                        onClick={props.onClick}
                        />
                     )
                 })
            }
        </ul>
    </section>
    )
    }