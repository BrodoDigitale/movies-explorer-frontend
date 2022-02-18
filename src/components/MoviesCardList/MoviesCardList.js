import React from "react";
import "./MoviesCardList.css"
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom';


export function MoviesCardList(props) {
const location = useLocation();

const movies = props.movies;
 
const calcDuration = (time) => {
    const hours = Math.floor(time / 60)
    const minutes = time % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`
}
 
    return(
    <section className="moviesCardList">
        <ul className="moviesCardList__list">
            {location.pathname === '/movies' ? (
                        movies.map((movie) => {
                            return(
                               <MoviesCard
                               key={movie.id}
                               movieCard={movie}
                               image={`https://api.nomoreparties.co/${movie.image.url}`}
                               nameRU={movie.nameRU}
                               duration= {calcDuration(movie.duration)}
                               button={props.button}
                               trailer={movie.trailerLink}
                               onLike={props.onLike}
                               onUnlike={props.onUnlike}
                               savedMovies={props.savedMovies}
                               />
                        )})
                            ) : (
                                movies.map((movie) => {
                                    return(
                                       <MoviesCard
                                       key={movie._id}
                                       movieCard={movie}
                                       image={movie.image}
                                       nameRU={movie.nameRU}
                                       duration={calcDuration(movie.duration)}
                                       button={props.button}
                                       trailer={movie.trailerLink}
                                       onUnlike={props.onUnlike}
                                       />
                                    )}

                        )
                   
            )}
        </ul>
    </section>
    )
    }