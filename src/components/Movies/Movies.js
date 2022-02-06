import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { movies } from "../../utils/utils";
import "./Movies.css";

export function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm />
        <Preloader />
        <MoviesCardList movies={movies} button="movies__like-button_active" />
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
