import React from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Main } from "../Main/Main";
import { PageNotFound } from "../PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <>
            <div className="page">
              <Header />
              <Main />
              <Footer />
            </div>
          </>
        </Route>
        <Route path="/movies"></Route>
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
