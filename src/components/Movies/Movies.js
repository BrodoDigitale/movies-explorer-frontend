import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import React from "react";

export function Movies(props) {

  /*const [allMovies, setAllMovies] = React.useState(props.movies)
  const limit = 12;
  const [moviesToRender, setMoviesToRender] = React.useState([])
  const [index,setIndex] = React.useState(limit);
  const[ showMore, setShowMore ] = React.useState(true)

  React.useEffect(() => {
    if (allMovies.length > limit) {
      setMoviesToRender(allMovies.slice(limit + 1))
      console.log(allMovies)
      console.log(moviesToRender)
    } else {
      setShowMore(false)
    }
  }, [allMovies]);*/

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
        button="movies__like-button_active" />
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
