import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/log_in.css";
import "./css/start.css";

export default class Login extends Component {
  render() {
    return (
      <div className="login_page">
        <header>
          <h1>BlackJack</h1>
        </header>
        <form className="login_page_form">
          <label className="name">Name:</label>
          <input
            className="name"
            required
            name="user_name"
            id="Login__user_name"
          ></input>
          <label className="password">Password:</label>
          <input
            className="password"
            required
            name="password"
            type="password"
            id="Login__password"
          ></input>
          <span>
            <Link to="WelcomeUser">
              <button className="login_login_button" type="submit">
                Log In
              </button>
            </Link>
            <Link to="/">
              <button className="goback_button" type="submit">
                Go Back
              </button>
            </Link>
          </span>
        </form>
        <footer></footer>
      </div>
    );
  }
}
