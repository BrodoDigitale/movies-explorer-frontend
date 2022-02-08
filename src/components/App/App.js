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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { savedMovies } from "../../utils/utils";

function App() {
  const history = useHistory();
  //стейт авторизации юзера
  const [loggedIn, setIsLoggedIn] = React.useState(false);

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
    //задания стейта юзера при монтировании
    const [currentUser, setCurrentUser] = React.useState({});
  
    React.useEffect(() => {
      if (loggedIn) {
        mainApi
          .getUserProfile()
          .then((res) => {
            setCurrentUser(res);
            console.log(currentUser);
          })
          .catch((err) => console.log(err));
      }
    },[loggedIn])
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
      localStorage.removeItem('jwt');
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
      mainApi.updateProfile(data)
      .then((res)=> {
          setCurrentUser(res)
      })
      .catch(err => console.log(err));
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
            exact path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            />
            <ProtectedRoute
            exact path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
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
