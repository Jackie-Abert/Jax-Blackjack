import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MenuButton extends Component {
  
  
  render(){
    return (
    <div className={this.state.hidden}>
      <Link to="/WelcomeUser">
        <button className="main_menu_button">Main Menu</button>
      </Link>
      <Link to="/login">
        <button className="logoff_button">Log Off</button>
      </Link>
    </div>
  );}
}
