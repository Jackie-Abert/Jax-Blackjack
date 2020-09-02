import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "./services/token-service";
import AuthApiService from "./services/auth-api-service";
import "./css/log_in.css";
import "./css/start.css";

export default class Login extends Component {
  
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  state = { error: null };

  handleSubmitBasicAuth = (ev) => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    console.log("login form submitted");
    console.log({ user_name, password });
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    );
    user_name.value = "";
    password.value = "";
    this.props.onLoginSuccess();
  };
  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  render() {
    return (
      <div className="login_page" onSubmit={this.handleSubmitBasicAuth}>
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
              <button className="login_login_button" type="submit">
                Log In
              </button>
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
