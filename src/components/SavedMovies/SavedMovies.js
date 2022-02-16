import "./SavedMovies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm
          onSavedMoviesSearch={props.onSearch}
          onToggleSwitchClick={props.onToggleSwitchClick}
          shortMoviesOn={props.shortMoviesOn}
          savedIsChecked={props.savedIsChecked}
        />
        <Preloader 
        isLoading={props.isLoading}
        isNothingFound={props.isNothingFound}
        />
        <MoviesCardList
          movies={props.movies}
          button={"movies__unlike-button"}
          onUnlike={props.onUnlike}
          savedMovies={props.savedMovies}
        />
      </main>
      <Footer />
    </>
  );
}
