import React from "react";
import "./MoviesCardList.css"
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom';


export function MoviesCardList(props) {
const location = useLocation();

const movies = props.movies;
   

    return(
    <section className="moviesCardList">
        <span className={`movieCardList__nothingFoundMsg
             ${props.isNothingFound ? `movieCardList__nothingFoundMsg_active` : null}`}>
            К сожалению, по вашему запросу ничего не найдено
            </span>
        <ul className="moviesCardList__list">
            {location.pathname === '/movies' ? (
                        movies.map((movie) => {
                            return(
                               <MoviesCard
                               key={movie.id}
                               movieCard={movie}
                               image={`https://api.nomoreparties.co/${movie.image.url}`}
                               nameRU={movie.nameRU}
                               duration={movie.duration}
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
                                       duration={movie.duration}
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