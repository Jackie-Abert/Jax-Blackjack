import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/start.css";


export default class Start extends Component {

  render() {
    return (
      <div className="start_page">
        <header>
          <h1>BlackJack</h1>
        </header>
        <span className="start_page_buttons">
        <Link to='/newAccount'><button className="create_account_button">Create Account</button></Link>
        <Link to='/login'><button className="login_button">Log In</button></Link>
        </span>
      </div>
    );
  }
}
