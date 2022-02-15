import React from "react";
import "./App.css";
import { Route, Switch, useHistory, Redirect, /*useLocation*/ } from "react-router-dom";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

function App() {
  const history = useHistory();

  //Стейты регистрации
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
  const [registrationError, setRegistrationError] = React.useState(false);
  const [userMessage, setUserMessage] = React.useState("")
  //Стейты фильмов
  const [resultMovies, setResultMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);
 
  //Стейты поиска
  //короткометражки
  //включен ли фильтр короткометражек на основной странице
  const [shortMoviesSearch, setShortMoviesSearch] = React.useState(false)
  //включен ли фильтр короткометражек на странице с сохраненными фильмами
  const [savedShortMoviesSearch, setSavedShortMoviesSearch] = React.useState(false)
  //на странице где все фильмы
  const [shortIsOn, setShortIsOn] = React.useState(false)
  //на странице короткометражек
  const [savedMoviesShortIsOn, setSavedMoviesShortIsOn] = React.useState(false)

  //прелоадер
  const [isLoading, setIsLoading] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);

  //кол-во элементов на странице
  const [limit, setLimit] = React.useState(() => {
    if (window.innerWidth <= 480) {
      return 5;
    } else if (window.innerWidth <= 768) {
      return 8;
    } else if (window.innerWidth > 768) {
      return 12;
    }
  });
  //кол-во добавляемых элементов
  const [resultsToAdd, setResultsToAdd] = React.useState(() => {
    if (window.innerWidth <= 768) {
      return 2;
    } else if (window.innerWidth > 768) {
      return 4;
    }
  });
  //состояние кнопки "еще"
  const [moreResults, setMoreResults] = React.useState(false);

  //стейт авторизации юзера
  const [loggedIn, setIsLoggedIn] = React.useState(false);
  //Стейт юзера
  const [currentUser, setCurrentUser] = React.useState({});

  //Отрисовка сохраненных фильмов
    React.useEffect(() => {
      moviesRender(likedMovies, limit);
    }, []);

  //логика логина
  React.useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserProfile()
        .then((res) => {
          //загружаем профиль и сохраненные фильмы
          setCurrentUser(res);
          getSavedMovies()
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  //Проверка токена при загрузке страницы
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkTokenValidity(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //Логин
  function handleLogin(data) {
    if (!data.email || !data.password) {
      return;
    }
    mainApi
      .login(data)
      .then((res) => {
        if (!res) throw new Error("Неправильные имя пользователя или пароль");
        if (res) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => console.log(err));
  }
  //Логаут
  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  
  //Регистрация
  function handleRegister(data) {
    mainApi
      .register(data)
      .then((res) => {
        if (res._id) {
          setIsRegistrationSuccessful(true)
          setTimeout(() => history.push("/movies"), 5000);
        }
      })
      .catch((err) => console.log(err));
    //.finally(() => {setIsInfoToolOpen(true)})
  }
  React.useEffect(() => {
    if(isRegistrationSuccessful) {
      setUserMessage("Вы успешно зарегистрированы!")
    } else {
      setUserMessage("Что-то пошло не так...")
      setRegistrationError(true)
      setIsRegistrationSuccessful(false)
    }
    setIsRegistrationSuccessful(false)
  }, [isRegistrationSuccessful])

  //редактирование профиля
  function handleUpdateProfile(data) {
    mainApi
      .updateProfile(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }

  //Поиск и фильтр фильмов
  function handleMoviesSearch(searchParams) {
    setIsLoading(true);
    let filterResults;
    if (!localStorage.movies) {
      try {
        moviesApi.getMovies().then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
          filterResults = res.filter((movie) => {
            return movie.nameRU
              .toLowerCase()
              .includes(searchParams.trim().toLowerCase());
          });
        })
      } catch (err) {
        console.log(err);
      }
    } else {
      filterResults = JSON.parse(localStorage.getItem("movies")).filter(
        (movie) => {
          return movie.nameRU
            .toLowerCase()
            .includes(searchParams.trim().toLowerCase());
        }
      );
    }
    //устанавливаем верное кол-во карточек
    setLimit(windowSizeHandler);
    //Проверяем, стоит ли фильтр на короткометражки
    if(shortMoviesSearch) {
      const shortMovies = filterResults.filter((movie) =>  movie.duration <=40)
      setFilteredMovies(shortMovies)
    } else {
    setFilteredMovies(filterResults);
    }
    //отрисовываем карточки
    moviesRender(filterResults, limit);
    //отключаем загрузчик
    setTimeout(() => setIsLoading(false), 1000);
    //сохраняем в локал сторадж
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
  }
//Функция поиска для сохраненных фильмов
const handleSavedMoviesSearch = (searchParams) => {
  setIsLoading(true);
  const filterResults = JSON.parse(localStorage.getItem("savedMovies")).filter(
      (movie) => {
        return movie.nameRU
          .toLowerCase()
          .includes(searchParams.trim().toLowerCase());
      }
    );
  setLikedMovies(filterResults);
  //отключаем загрузчик
  setTimeout(() => setIsLoading(false), 1000);
}

  //Изменение стейта короткометражек по нажатию на переключатель на главной странице
  const shortMoviesSwitchClick = () => {
    setShortMoviesSearch(!shortMoviesSearch)
  }
  //перерисовываем отфильтрованные фильмы, если включили режим короткометражек на основной странице
  React.useEffect(() => {
    shortMoviesRenderer()
  }, [shortMoviesSearch]);

  const shortMoviesRenderer = () => {
    if (shortMoviesSearch) {
      setShortIsOn(true)
      const shortMovies = filteredMovies.filter((movie) =>  movie.duration <=40)
      moviesRender(shortMovies, limit);
    } else {
      moviesRender(filteredMovies, limit)
      setShortIsOn(false)
    }
  }
   //Изменение стейта короткометражек по нажатию на переключатель на главной странице
   const shortSavedMoviesSwitchClick = () => {
    setSavedShortMoviesSearch(!savedShortMoviesSearch)
  }
   //перерисовываем сохраненные фильмы, если включили режим короткометражек
   React.useEffect(() => {
    shortSavedMoviesRenderer()
  }, [savedShortMoviesSearch]);
  
  const shortSavedMoviesRenderer = () => {
    if (savedShortMoviesSearch) {
      setSavedMoviesShortIsOn(true)
      const savedShortMovies = likedMovies.filter((movie) =>  movie.duration <=40)
      setLikedMovies(savedShortMovies)
    } else {
      const savedMovies = JSON.parse(localStorage.getItem("savedMovies"))
      setLikedMovies(savedMovies)
      setSavedMoviesShortIsOn(false)
    }
  }

  ////проверка длины массива для отрисовки карточек
  const moviesRender = (movies, itemsToShow) => {
    if (movies.length > itemsToShow) {
      setMoreResults(true);
      setResultMovies(movies.slice(0, limit));
    } else {
      setResultMovies(movies);
      setMoreResults(false)
    }
  };
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    // Вешаем слушатель для отслеживания ширины окна
    window.addEventListener("resize", () =>
      setTimeout(() => {
        screenSetter();
      }, 1000)
    );
  }, []);
  const screenSetter = () => {
    // Записываем ширину окна в стейт
    setWidth(window.innerWidth);
  };
  //устанавливаем новое кол-во отображаемых карточек при изменении ширины
  React.useEffect(() => {
    setLimit(windowSizeHandler);
  }, [width]);
  //перерисовываем карточки при изменении ширины экрана;
  React.useEffect(() => {
    moviesRender(filteredMovies, limit)
  }, [limit])

//логика отображения нужного кол-ва карточек при изменении ширины окна
  const windowSizeHandler = () => {
    if (window.innerWidth <= 480) {
      setLimit(5);
      setResultsToAdd(2);
    } else if (window.innerWidth <= 800) {
      setLimit(8);
      setResultsToAdd(2);
    } else if (window.innerWidth > 800) {
      setLimit(12);
      setResultsToAdd(4);
    }
  };

  // логика кнопки показать еще

  const showMore = () => {
    let newLimit;
    if (limit + resultsToAdd < filteredMovies.length) {
      newLimit = limit + resultsToAdd;
      moviesRender(filteredMovies.slice(0, newLimit))
      setLimit(newLimit)
      setMoreResults(true)
    } else if (limit + resultsToAdd >= filteredMovies.length) {
      newLimit = filteredMovies.length;
      moviesRender(filteredMovies, newLimit);
      setMoreResults(false);
      //setLimit(windowSizeHandler)
    }
  };

  //Логика лайка
  const saveMovie = (cardMovie) => {
    mainApi
      .createMovie(cardMovie)
      .then((savedCard) => {
        console.log("сохранено")
        const updatedLikedMovies = [ ...likedMovies, savedCard]
        setLikedMovies(updatedLikedMovies)
        localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
      })
      .catch((err) => console.log(err));
  };


  //загрузка сохраненных фильмов с сервера при логине
  const getSavedMovies = () => {
    if(!localStorage.savedMovies) {
      mainApi.getMovies()
      .then((res) => {
        localStorage.setItem("savedMovies", JSON.stringify(res));
        setLikedMovies(res);
        console.log('с сервака')
        console.log(localStorage.savedMovies)
      })
        .catch((err) => console.log(err))
    } else {
      setLikedMovies(JSON.parse(localStorage.getItem("savedMovies")))
      console.log('с локал сторадж')
    }
        }

  //Удаление лайка
  // проверка наличия id у карточки
  const idCheck = (card) => {
    if (!card._id) {
      const thisCard = likedMovies.find((likedMovie) => likedMovie.movieId === card.id)
      return thisCard._id
    } else {
      return card._id
    }
  }
      const removeMovie = (cardMovie) => {
        //если мы на странице со всеми фильмами и еще не знаем id базы данных
        const searchId = idCheck(cardMovie)
        console.log(searchId)
        mainApi
           //удаляем фильм с сервера
          .removeMovie(searchId)
          .then(() => {
            const updatedLikedMovies = likedMovies.filter((movie) => movie._id !== cardMovie._id)
            console.log(updatedLikedMovies)
            localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
            setLikedMovies(updatedLikedMovies)
          }
          )
          .catch((err) => console.log(err));
      };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            movies={resultMovies}
            noSearchResults={nothingFound}
            onSearch={handleMoviesSearch}
            onLike={saveMovie}
            onUnlike={removeMovie}
            isLoading={isLoading}
            moreResults={moreResults}
            showMoreResults={showMore}
            savedMovies={likedMovies}
            onToggleSwitchClick = {shortMoviesSwitchClick}
            isChecked= {shortIsOn}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            movies={likedMovies}
            onSearch={handleSavedMoviesSearch}
            onUnlike={removeMovie}
            component={SavedMovies}
            isLoading={isLoading}
            loggedIn={loggedIn}
            noSearchResults={nothingFound}
            savedMovies={likedMovies}
            shortMoviesOn={shortMoviesSearch}
            onToggleSwitchClick = {shortSavedMoviesSwitchClick}
            savedIsChecked= {savedMoviesShortIsOn}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
          />
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register 
            onRegister={handleRegister}
            userMessage={userMessage}
            registrationError={registrationError}
            isRegistrationSuccessful={isRegistrationSuccessful}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
