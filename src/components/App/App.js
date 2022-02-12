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
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);

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
            localStorage.setItem("savedMovies", []);
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

  //Поиск и фильтр фильмов
  function handleMoviesSearch(searchParams) {
    setIsLoading(true);
    let filterResults
    if (!localStorage.movies) {
      try {
        moviesApi.getMovies().then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
          filterResults = res.filter((movie) => {
            return movie.nameRU
              .toLowerCase()
              .includes(searchParams.trim().toLowerCase());
          });
        });
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
         moviesRender(filterResults, limit);
      setFilteredMovies(filterResults)
    setTimeout(() => setIsLoading(false), 1000);
    //проверка длины массива для отриосвки карточек
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
  //устанавливаем новое кол-во отображаемых карточек при изменении ширины
  React.useEffect(() => {
    setLimit(windowSizeHandler)
  }, [width])
  //перерисовываем карточки
  React.useEffect(() => {
    moviesRender(filteredMovies, limit)
  }, [limit])

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
  

 //Логика лайка !!!В РАЗРАБОТКЕ
  const saveMovie =(cardMovie) => {
  console.log(cardMovie)
  mainApi.createMovie(cardMovie.id)
  .then((savedCard) => {
    likedMovies.push(savedCard)
    localStorage.setItem("savedMovies", [savedCard,...likedMovies])
  })
  .catch(err => console.log(err));
  }
//Отрисовка сохраненных фильмов
React.useEffect(() => {
 setLikedMovies(localStorage.getItem("savedMovies"))
}, [])

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
            isLoading={isLoading}
            moreResults={moreResults}
            showMoreResults={showMore}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            movies={likedMovies}
            component={likedMovies}
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
