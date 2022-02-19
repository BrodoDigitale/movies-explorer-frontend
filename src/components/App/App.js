import React from "react";
import "./App.css";
import { Route, Switch, useHistory, useLocation, Redirect } from "react-router-dom";
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
  const location = useLocation();

  //стейты для авторизации и регистрации
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");
  const [registrationError, setRegistrationError] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");
  //стейты обновлениия профиля
  const [profileUpdateMessage, setProfileUpdateMessage] = React.useState("");
  const [profileErrorMessage, setProfileErrorMessage] = React.useState("");
  const [isProfileUpdateSuccessful, setIsProfileUpdateSuccessful] =
    React.useState(false);

  //Стейты фильмов
  const [resultMovies, setResultMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);

  //Стейты поиска
  const [previousSearchWord, setPreviousSearchWord] = React.useState('');
  //короткометражки
  //необходимо ли искать только короткометражки на основной странице
  const [shortMoviesSearch, setShortMoviesSearch] = React.useState(false);
  //необходимо ли искать только короткометражки на странице с сохраненными фильмами
  const [savedShortMoviesSearch, setSavedShortMoviesSearch] =
    React.useState(false);
  //отобразить короткометражки из найденных результатов странице где все фильмы
  const [shortIsOn, setShortIsOn] = React.useState(false);
  //отобразить короткометражки из найденных результатов на странице сохраненных
  const [savedMoviesShortIsOn, setSavedMoviesShortIsOn] = React.useState(false);

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

  //кол-во добавляемых элементов при клике "еще"
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

  //Логин
  function handleLogin(data) {
    if (!data.email || !data.password) {
      return;
    }
    setIsLoading(true)
    mainApi
      .login(data)
      .then((res) => {
        if (!res) throw new Error("Неправильные имя пользователя или пароль");
        else {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setIsLoading(false)
        }
      })
      .catch((err) => {
        setLoginErrorMessage("Не удалось войти, пожалуйста, проверьте данные");
        setIsLoading(false)
        setLoginError(true);
        console.log(err);
      });
  }
  //загрузка профиля и фильмов при логине
  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)
      Promise.all([mainApi.getUserProfile(localStorage.getItem("jwt")), mainApi.getMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          const userMovies = movies.filter((movie) => movie.owner === user._id);
          localStorage.setItem("savedMovies", JSON.stringify(userMovies));
          setLikedMovies(userMovies);
          history.push("/movies");
          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false)
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
              //проверка, какой был последний поиск
              if(localStorage.searchWord) {
                const previousSearchWord = JSON.parse(localStorage.getItem("searchWord"))
                setPreviousSearchWord(previousSearchWord)
                handleMoviesSearch(previousSearchWord)
                //проверка, стоял ли фильтр короткометражек
                if(localStorage.shortIsOn) {
                  setShortMoviesSearch(true)
                }
              }
          }
          //обнуляем сохраненный фильтр короткометражек
          localStorage.removeItem("shortIsOn")
        })
          .catch((err) => console.log(err));
      } 
    }, []);


  //Логаут
  function handleLogout() {
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
    setFilteredMovies([]);
    setResultMovies([]);
    setRegistrationError("");
    setLoginErrorMessage("");
    setPreviousSearchWord("")
    setShortIsOn(false)
    setMoreResults(false)
    history.push("/");
  }

  //Регистрация
  function handleRegister(signupData) {
    setIsLoading(true)
    mainApi
      .register(signupData)
      .then((res) => {
        if (res._id) {
          setCurrentUser(res);
          setIsRegistrationSuccessful(true);
          setUserMessage("Вы успешно зарегистрированы!");
          setIsLoading(false)
          setTimeout(() => handleLogin(signupData), 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setRegistrationError("Что-то пошло не так...");
        console.log(err);
      });
  }

  //редактирование профиля
  function handleUpdateProfile(data) {
    setProfileUpdateMessage("");
    setProfileErrorMessage("");
    setIsLoading(true)
    mainApi
      .updateProfile(data)
      .then((res) => {
        setIsProfileUpdateSuccessful(true);
        setCurrentUser(res);
        setProfileUpdateMessage("Данные успешно изменены");
        setIsLoading(false)
        setTimeout(() => setProfileUpdateMessage(""), 3000);
      })
      .catch((err) => {
        setIsProfileUpdateSuccessful(false);
        setIsLoading(false)
        setProfileErrorMessage("Что-то пошло не так...");
        setTimeout(() => setProfileErrorMessage(""), 3000);
        console.log(err);
      });
  }

  //поиск и фильтр фильмов
  function handleMoviesSearch(searchParams) {
    setNothingFound(false);
    setIsLoading(true);
    //сохраняем поисковое слово
    localStorage.setItem("searchWord", JSON.stringify(searchParams))
    let filterResults;
    //Если это первый поиск, и в локал сторадж ничего нет
    if (!localStorage.movies) {
      //получаем фильмы с апи
      moviesApi
        .getMovies()
        //фильтруем по поисковому запросу
        .then((res) => {
          //сохраняем все фильмы перед фильтром для последующих поисков
          localStorage.setItem("movies", JSON.stringify(res));
          filterResults = res.filter((movie) => {
            return movie.nameRU
              .toLowerCase()
              .includes(searchParams.trim().toLowerCase());
          });
          //устанавливаем верное кол-во карточек
          setLimit(windowSizeHandler);
          //отключаем загрузчик
          setTimeout(() => setIsLoading(false), 500);
          //проверяем, стоит ли фильтр на короткометражки
          if (shortMoviesSearch) {
            const shortMovies = filterResults.filter(
              (movie) => movie.duration <= 40
            );
            setFilteredMovies(shortMovies);
            if (shortMovies.length === 0) {
              setNothingFound(true);
            }
          } else {
            setFilteredMovies(filterResults);
            if (filterResults.length === 0) {
              setNothingFound(true);
            }
          }
          //отрисовываем карточки
          moviesRender(filterResults, limit);
          //сохраняем в локал сторадж отфильтрованный результат
          localStorage.setItem(
            "filteredMovies",
            JSON.stringify(filterResults)
          );
        })
        .catch((err) => console.log(err));
    } else {
      //Если фильмы уже получены, делаем все то же самое, только берем фильмы из локал сторадж
      filterResults = JSON.parse(localStorage.getItem("movies")).filter(
        (movie) => {
          return movie.nameRU
            .toLowerCase()
            .includes(searchParams.trim().toLowerCase());
        }
      );
      setLimit(windowSizeHandler);
      setTimeout(() => setIsLoading(false), 500);
      if (shortMoviesSearch) {
        const shortMovies = filterResults.filter(
          (movie) => movie.duration <= 40
        );
        setFilteredMovies(shortMovies);
        if (shortMovies.length === 0) {
          setNothingFound(true);
        }
      } else {
        setFilteredMovies(filterResults);
        if (filterResults.length === 0) {
          setNothingFound(true);
        }
      }
      moviesRender(filterResults, limit);
      localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
  
    }
  }

  //Функция поиска для сохраненных фильмов
  const handleSavedMoviesSearch = (searchParams) => {
    setNothingFound(false);
    setIsLoading(true);
    const filterResults = JSON.parse(
      localStorage.getItem("savedMovies")
    ).filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(searchParams.trim().toLowerCase());
    });
    setLikedMovies(filterResults);
    if (filterResults.length === 0) {
      setNothingFound(true);
    }
    //отключаем загрузчик
    setTimeout(() => setIsLoading(false), 500);
  };

  //Изменение стейта короткометражек по нажатию на переключатель на главной странице
  const shortMoviesSwitchClick = () => {
    setShortMoviesSearch(!shortMoviesSearch);
  };

  //перерисовываем отфильтрованные фильмы, если включили режим короткометражек на основной странице
  React.useEffect(() => {
    shortMoviesRenderer();
  }, [shortMoviesSearch]);

  //отрисовка фильмов с условиием короткометражек
  const shortMoviesRenderer = () => {
    setNothingFound(false);
    if (shortMoviesSearch) {
      setShortIsOn(true);
      localStorage.setItem("shortIsOn", "true");
      const shortMovies = filteredMovies.filter(
        (movie) => movie.duration <= 40
      );
      moviesRender(shortMovies, limit);
      if (shortMovies.length === 0) {
        setNothingFound(true);
      }
    } else {
      const allFilteredMovies = JSON.parse(localStorage.getItem("filteredMovies"))
      moviesRender(allFilteredMovies, limit);
      setShortIsOn(false);
    }
  };

  //изменение стейта короткометражек по нажатию на переключатель на главной странице
  const shortSavedMoviesSwitchClick = () => {
    setSavedShortMoviesSearch(!savedShortMoviesSearch);
  };

  //перерисовываем сохраненные фильмы, если включили режим короткометражек
  React.useEffect(() => {
    shortSavedMoviesRenderer();
  }, [savedShortMoviesSearch]);

  //отрисовка сохраненных фильмов с фильтром короткометражек
  const shortSavedMoviesRenderer = () => {
    setNothingFound(false);
    if (savedShortMoviesSearch) {
      setSavedMoviesShortIsOn(true);
      const savedShortMovies = likedMovies.filter(
        (movie) => movie.duration <= 40
      );
      setLikedMovies(savedShortMovies);
      if (savedShortMovies.length === 0) {
        setNothingFound(true);
      }
    } else {
      const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      setLikedMovies(savedMovies);
      setSavedMoviesShortIsOn(false);
    }
  };

  //проверка длины массива для отрисовки карточек
  const moviesRender = (movies, itemsToShow) => {
    //предовращаем рендеринг, если юзер не залогинен
    if(movies) {
      if (movies.length > itemsToShow) {
        setMoreResults(true);
        setResultMovies(movies.slice(0, limit));
      } else {
        setResultMovies(movies);
        setMoreResults(false);
      }
    }
  };
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    // отслеживаем ширину окна
    window.addEventListener("resize", () =>
      setTimeout(() => {
        screenSetter();
      }, 1000)
    );
  }, []);
  const screenSetter = () => {
    // записываем ширину окна в стейт
    setWidth(window.innerWidth);
  };

  //устанавливаем новое кол-во отображаемых карточек при изменении ширины
  React.useEffect(() => {
    setLimit(windowSizeHandler);
  }, [width]);
  //перерисовываем карточки при изменении ширины экрана;
  React.useEffect(() => {
    moviesRender(filteredMovies, limit);
  }, [limit]);

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
      moviesRender(filteredMovies.slice(0, newLimit));
      setLimit(newLimit);
      setMoreResults(true);
    } else if (limit + resultsToAdd >= filteredMovies.length) {
      newLimit = filteredMovies.length;
      moviesRender(filteredMovies, newLimit);
      setMoreResults(false);
    }
  };

  //логика лайка
  const saveMovie = (cardMovie) => {
    mainApi
      .createMovie(cardMovie)
      .then((savedCard) => {
        console.log("сохранено");
        const updatedLikedMovies = [...likedMovies, savedCard];
        setLikedMovies(updatedLikedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
      })
      .catch((err) => console.log(err));
  };

  //Удаление лайка
  // проверка наличия id у карточки
  const idCheck = (card) => {
    if (!card._id) {
      const thisCard = likedMovies.find(
        (likedMovie) => likedMovie.movieId === card.id
      );
      return thisCard._id;
    } else {
      return card._id;
    }
  };
  const removeMovie = (cardMovie) => {
    //если мы на странице со всеми фильмами и еще не знаем id базы данных
    const searchId = idCheck(cardMovie);
    mainApi
      //удаляем фильм с сервера
      .removeMovie(searchId)
      .then(() => {
        let updatedLikedMovies;
        if (location.pathname === "/movies") {
          updatedLikedMovies = likedMovies.filter(
            (movie) => movie.movieId !== cardMovie.id
          );
        } else {
          updatedLikedMovies = likedMovies.filter(
            (movie) => movie._id !== cardMovie._id
          );
        }
        localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
        setLikedMovies(updatedLikedMovies);
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
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
            isNothingFound={nothingFound}
            onSearch={handleMoviesSearch}
            onLike={saveMovie}
            onUnlike={removeMovie}
            isLoading={isLoading}
            moreResults={moreResults}
            showMoreResults={showMore}
            savedMovies={likedMovies}
            onToggleSwitchClick={shortMoviesSwitchClick}
            isChecked={shortIsOn}
            previousSearchWord={previousSearchWord}
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
            isNothingFound={nothingFound}
            savedMovies={likedMovies}
            shortMoviesOn={shortMoviesSearch}
            onToggleSwitchClick={shortSavedMoviesSwitchClick}
            savedIsChecked={savedMoviesShortIsOn}
          />
          <ProtectedRoute
            exact
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
            profileUpdateMessage={profileUpdateMessage}
            profileErrorMessage={profileErrorMessage}
            isProfileUpdateSuccessful={isProfileUpdateSuccessful}
            isLoading={isLoading}
          />
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              loginError={loginError}
              loginErrorMessage={loginErrorMessage}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              userMessage={userMessage}
              registrationError={registrationError}
              isRegistrationSuccessful={isRegistrationSuccessful}
              isLoading={isLoading}
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
