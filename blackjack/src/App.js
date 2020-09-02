import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Start from "./Start";
import Login from "./Login";
import NewAccount from "./NewAccount";
import GamePage from "./GamePage";
import WelcomeUser from "./WelcomeUser";
import DeleteGame from "./DeleteGame";

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/newAccount">
            <NewAccount />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/WelcomeUser">
            <WelcomeUser />
          </Route>
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/delete">
            <DeleteGame />
          </Route>
          <Route path="/">
            <Start />
          </Route>
        </Switch>
      </div>
    );
  }
}
