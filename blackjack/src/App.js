import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Start from "./Start";
import Login from "./Login";
import Register from "./Register";
import GamePage from "./GamePage";
import Welcome from "./Welcome";
import DeleteGame from "./DeleteGame";

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route component={Register} path="/register">
          </Route>
          <Route component={Login} path="/login">
          </Route>
          <Route component={Welcome} path="/welcome">
          </Route>
          <Route component={GamePage} path="/game/:id">
          </Route>
          <Route component={DeleteGame} path="/delete/:id">
          </Route>
          <Route path="/">
            <Start />
          </Route>
        </Switch>
      </div>
    );
  }
}
