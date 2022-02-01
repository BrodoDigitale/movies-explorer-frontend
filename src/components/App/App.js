import React from "react";
import { Route, Switch } from "react-router-dom";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile"
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import "./App.css";

 
function App() {
   //стейт авторизации юзера
   const [loggedIn, setIsLoggedIn] = React.useState(false);

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
          <Register />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
