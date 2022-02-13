import React from "react";
import "./MoviesCardList.css"
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom';


export function MoviesCardList(props) {
const location = useLocation();

const movies = props.movies;
    //Стейт лайка карточки



    return(
    <section className="moviesCardList">
        <ul className="moviesCardList__list">
        {movies.map((movie) => {
                     return(
                        <MoviesCard
                        key={movie.id}
                        movieCard={movie}
                        image={`${location.pathname === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}` : `${movie.image}`}`}
                        nameRU={movie.nameRU}
                        duration={movie.duration}
                        button={props.button}
                        trailer={movie.trailerLink}
                        onLike={props.onLike}
                        onUnlike={props.onUnlike}
                        savedMovies={props.savedMovies}
                        />
                     )
                 })
            }
        </ul>
    </section>
    )
    }