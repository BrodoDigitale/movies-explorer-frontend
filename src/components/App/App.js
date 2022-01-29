import React from "react";
import { Route, Switch } from "react-router-dom";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { PageNotFound } from "../PageNotFound/PageNotFound";
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
          <Movies/>
        </Route>
        <Route path="/saved-movies"></Route>
        <Route path="/profile"></Route>
        <Route path="signin"></Route>
        <Route path="signup"></Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
