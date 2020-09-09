import React, { Component } from "react";
import "./../css/start.css";
import "./../css/welcome_user.css";
import BlackjackApiService from "../services/blackjack-api-service";
import { Link, Redirect } from "react-router-dom";

export default class LoadGameButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = (ev) => {
    ev.preventDefault();
    const id = this.props.id;
    const game = this.props
    console.log(id)
    BlackjackApiService.getGame(id)
      .then(() => {
        this.props.history.push("/game/" + id);
      })
      .catch();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button className="play_game_button">Play</button>
      </form>
    );
  }
}
