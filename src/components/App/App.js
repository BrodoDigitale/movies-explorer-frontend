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
  const [apiMovies, setApiMovies] = React.useState([]);
  const [resultMovies, setResultMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  //Стейты поиска
  const [isLoading, setIsLoading] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);

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
          moviesApi.getMovies()
          .then((res)=> {
            localStorage.setItem("movies", JSON.stringify(res));
            /*const apiMovies = JSON.parse(localStorage.getItem("movies") || "[]");
            setMovies(apiMovies);
          })
          .catch(err => console.log(err));
      }
      }, [loggedIn]); 


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
  // Получение фильмов

  function getMovies() {
    moviesApi.getMovies().then((res) => {
      localStorage.setItem("movies", JSON.stringify(res));
      setApiMovies(res);
    });
  }

  //Поиск фильмов
  const searchMovies = (moviesList, searchWord) => {
    console.log(moviesList);
    console.log(searchWord);
   let result;
   result = moviesList.filter((movie) => {
       return movie.nameRU.toLowerCase().includes(searchWord.trim().toLowerCase())
    })
    console.log(result);
    setResultMovies(result);
    
  }

  //Отрисовка фильмов
  function handleMoviesSearch(searchParams) {
    setIsLoading(true);
 
      moviesApi.getMovies()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res))
        setApiMovies(res)
        searchMovies(apiMovies, searchParams);
      })
      .catch((err) => console.log(err));
    
  }

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
