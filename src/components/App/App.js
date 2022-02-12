import React from "react";
import "./App.css";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
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
  //Стейты фильмов
  const [resultMovies, setResultMovies] = React.useState([]);
  React.useEffect(() => setResultMovies([]), [])
  //const [filtereMovies, setResultMovies] = React.useState([]);
  //const [savedMovies, setSavedMovies] = React.useState([]);
  //Стейты для рендера нужного кол-ва фильмов

  //Стейты поиска
  //прелоадер
  const [isLoading, setIsLoading] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);
  //кол-во элементов на странице
  const [limit, setLimit] = React.useState(() => {
    if (window.innerWidth <= 480) {
      return 5
    } else if (window.innerWidth <= 768) {
      return 8
    } else if (window.innerWidth > 768) {
      return 12
    }
  })
  //кол-во добавляемых элементов
  const [resultsToAdd, setResultsToAdd] = React.useState(() => {
    if (window.innerWidth <= 768) {
      return 2
    } else if (window.innerWidth > 768) {
      return 4
    }
  })
  //состояние кнопки "еще"
  const [moreResults, setMoreResults] = React.useState(false);

  //стейт авторизации юзера
  const [loggedIn, setIsLoggedIn] = React.useState(false);
  //Стейт юзера
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserProfile()
        .then((res) => {
          setCurrentUser(res);
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
          //setIsRegistrationSuccessful(true)
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
    //.finally(() => {setIsInfoToolOpen(true)})
  }

  //редактирование профиля
  function handleUpdateProfile(data) {
    mainApi
      .updateProfile(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }

  //Сохранение фильмов
  /*React.useEffect(() => {
      if(loggedIn) {
         setIsLoading(true);
          moviesApi.getMovies()
          .then((res)=> {
            localStorage.setItem("movies", JSON.stringify(res));
            //const apiMovies = JSON.parse(localStorage.getItem("movies") || "[]");
            setApiMovies(res);
            setIsLoading(false);
          })
          .catch(err => console.log(err));
      }
      }, [loggedIn]); 
    

      /*
            const apiMovies = JSON.parse(localStorage.getItem("movies")
      return const searchResult = apiMovies.filter(movie => {
        return movie.nameRu.includes(searchParams)

                return movies.filter(searchParams => {
            return movie.nameRu.includes(searchParams.toLowerCase());
        });
    }

           
       if(result.length > 0) {
         setResultMovies(result);
       } else {
         setNothingFound(true);
       }

               if(result.length > 0) {
          setResultMovies(result);
          console.log(resultMovies)
        } else {
          setNothingFound(true);
        }
      */

  /*if (apiMovies.length > 0) {
       searchMovies(apiMovies, searchParams);
    } else */
  //const moreMovies = JSON.parse(localStorage.getItem("filteredMovies"))

let filteredMovies

  //Поиск и фильтр фильмов
  function handleMoviesSearch(searchParams) {
    setIsLoading(true);
    if (!localStorage.movies) {
      try {
        moviesApi.getMovies().then((res) => {
          console.log(res)
          localStorage.setItem("movies", JSON.stringify(res));
          filteredMovies = res.filter((movie) => {
            return movie.nameRU
              .toLowerCase()
              .includes(searchParams.trim().toLowerCase());
          });
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      filteredMovies = JSON.parse(localStorage.getItem("movies")).filter(
        (movie) => {
          return movie.nameRU
            .toLowerCase()
            .includes(searchParams.trim().toLowerCase());
        }
      );
    }
    setTimeout(() => setIsLoading(false), 1000);
    //проверка длины массива для отриосвки карточек
    moviesRender(filteredMovies, limit);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies))
  }

  ////проверка длины массива для отриосвки карточек
  const moviesRender = (movies, itemsToShow) => {
    if (movies.length > itemsToShow) {
     setMoreResults(true);
     setResultMovies(movies.slice(0, limit));
    } else {
      setResultMovies(movies);
    }
  };


  //const allFilteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
  //console.log(allFilteredMovies)

  //ресайз
  //отображение в зависисмости от разрешения
  /*const [width, setWidth] = React.useState(window.innerWidth)
  const handleResize = () => {
    // стейт ширины
    setWidth(window.innerWidth)
  }

   const handleResize = () => {
    // Записываем сайт в стейт
    setScreenWidth(window.innerWidth)
  }
     // Вешаем слушатель на ресайз
    window.addEventListener('resize', () =>
      setTimeout(() => {
        handleResize()
      }, 1000),
    )
  }, [])
  // Дёрнем этот юзЭффект если изменится стейт ширины экрана и выставим актуальное количество карточек
 
  */

  const [width, setWidth] = React.useState(window.innerWidth)
  React.useEffect(() => {
    // Вешаем слушатель
    window.addEventListener('resize', () =>
      setTimeout(() => {
        screenSetter()
      }, 1000),
    )
  }, [])
  const screenSetter = () => {
    // Записываем сайт в стейт
    setWidth(window.innerWidth)
  }
  React.useEffect(() => {
    windowSizeHandler()
    moviesRender(filteredMovies, limit)
  }, [width])

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
 
  filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"))

  const showMore = () => {
    let newLimit = limit
    if (limit + resultsToAdd < filteredMovies.length) {
      newLimit = limit + resultsToAdd
      moviesRender(filteredMovies.slice(0, newLimit))
      setLimit(newLimit)
    } else if (limit + resultsToAdd >= filteredMovies.length) {
      newLimit = filteredMovies.length
      moviesRender(filteredMovies, newLimit)
      setMoreResults(false);
      setLimit(windowSizeHandler)
    }
  };
  /*React.useEffect(() => {
    if (window.innerWidth <= 480) {
      setLimit(5)
      setResultsToAdd(2)
    } else if (window.innerWidth <= 768) {
      setLimit(8)
      setResultsToAdd(2)
    } else if (window.innerWidth > 768) {
      setLimit(12)
      setResultsToAdd(4)
    }
  }, [isLoading]);*/

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
            isLoading={isLoading}
            moreResults={moreResults}
            showMoreResults={showMore}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            noSearchResults={nothingFound}
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
            <Register onRegister={handleRegister} />
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
