import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

export function Movies(props) {

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm 
        onSearch={props.onSearch} 
        />
        <Preloader />
        <MoviesCardList 
        movies={props.movies} 
        isLoading={props.isLoading}
        button="movies__like-button_active" />
        <button
          className="movies__button"
          type="button"
          aria-label="Показать ещё фильмы"
        >
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
}
