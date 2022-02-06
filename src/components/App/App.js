import React from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile"
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import {mainApi} from "../../utils/MainApi";


 
function App() {
  const history = useHistory();
   //стейт авторизации юзера
   const [loggedIn, setIsLoggedIn] = React.useState(true);

      //Регистрация
      function handleRegister(data) {
        mainApi.register(data)
            .then((res) => {
            if(res._id) {
                //setIsRegistrationSuccessful(true)
                history.push('/signin')
                }
            })
            .catch(err => console.log(err))
            //.finally(() => {setIsInfoToolOpen(true)})
    }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn}/>
        </Route>
        <Route path="/movies">
          <Movies loggedIn={loggedIn}/>
        </Route>
        <Route path="/saved-movies">
          <SavedMovies loggedIn={loggedIn}/>
        </Route>
        <Route path="/profile">
          <Profile 
          loggedIn={loggedIn}
          />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register
          onRegister={handleRegister}
          />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
