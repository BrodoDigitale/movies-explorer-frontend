import React from "react";
import { Route, Switch } from "react-router-dom";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Login } from "../Login/Login";
import "./App.css";

 
function App() {
   //стейт авторизации юзера
   const [loggedIn, setIsLoggedIn] = React.useState(true);

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
        <Route path="/profile"></Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup"></Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
