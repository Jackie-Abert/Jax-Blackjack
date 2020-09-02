import React, { Component } from "react";
import { Link } from "react-router-dom";
import ValidationError from './ValidationError'

import "./css/new_account.css";
import "./css/start.css";

export default class NewAccount extends Component {
  
  state = {
    name: {
        value: "",
        touched: false
    },
    password: {
        value: "",
        touched: false
    },
    confirmPassword: {
        value: "",
        touched: false
    }
  }
  checkName(name) {
    this.setState({
      name: { value : name, touched: true}
    })
  }
  checkPassword(password) {
    this.setState({
      password: { value : password, touched: true}
    })
  }
  checkConfirmPassword(confirmPassword) {
    this.setState({
      confirmPassword: { value : confirmPassword, touched: true}
    })
  }

  validateName() {
    const name = this.state.name
    if(name.value.length < 3 || !name.value.match(/[A-Za-z]/)) {
      return 'Must be valid name'
    }
  }
  validatePassword() {
    const password = this.state.password
    if(password.value.length < 8 || !password.value.match(/\d/)) {
      return 'Password must contain numbers and letters'
    }
  }
  validateConfirmPassword() {
    const password = this.state.password.value
    const confirmPassword = this.state.confirmPassword.value
    console.log(password, confirmPassword)
    if(confirmPassword !== password) {
      return 'Passwords must match'
    }
  }
  
  
  render() {
    const nameError = this.validateName();
    const passwordError = this.validatePassword();
    const confirmPasswordError = this.validateConfirmPassword();
    return (
      <div className="newAccount_page">
        <header>
          <h1>BlackJack</h1>
        </header>
        <form className="newAccount_page_form">
          <label className="name">Name:</label>
          {this.state.name.touched && <ValidationError message={nameError} />}
          <input className="name"name='name'
          onChange={e => this.checkName(e.target.value)}></input>
          <label className="password">Password:</label>
          {this.state.password.touched && <ValidationError message={passwordError} />}
          <input className="password" password='password'
          onChange={e => this.checkPassword(e.target.value)}></input>
          <label className="password">Confirm Password:</label>
          {this.state.confirmPassword.touched && <ValidationError message={confirmPasswordError} />}
          <input className="password" name='confirmPassword'
          onChange={e => this.checkConfirmPassword(e.target.value)}></input>
          <span>
            <button className="submit_button">Submit</button>
            <Link to="/">
              <button className="goback_button">Go Back</button>
            </Link>
          </span>
        </form>
      </div>
    );
  }
}
