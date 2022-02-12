import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import React from "react";

export function Movies(props) {

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm 
        onSearch={props.onSearch} 
        />
        <Preloader
        isLoading={props.isLoading}
        />
        <MoviesCardList 
        movies={props.movies}
        button="movies__like-button" 
        onClick={props.onLike}
        />
        <button
          className={`movies__button ${props.moreResults ? 'movies__button_on' : null}`}
          type="button"
          onClick={props.showMoreResults}
          aria-label="Показать ещё фильмы"
        >
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
}
