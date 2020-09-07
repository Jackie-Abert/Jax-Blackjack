import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/start.css";
import "./css/welcome_user.css";
import GameItem from "./GameItem";
import BlackjackApiService from './services/blackjack-api-service'

export default class WelcomeUser extends Component {
  constructor() {
    super();
  this.state = {
    games:[]
  }
}
  
  componentDidMount() {
    BlackjackApiService.getGames()
    .then(data => {
      console.log(data);
      this.setState({ 
        games: data.map((game, index) => (
          <GameItem
            array={index}
            key={game.id}
            bank={game.bank}
            wins={game.wins}
            losses={game.losses}
            moneytotal={game.moneytotal}
          />
        ))
       })
    })
  }
  render() {
    console.log(this.state.games)
    return (
      <div className="welcome_user_page">
        <header>
          <h1>BlackJack</h1>
        </header>
        <span className="welcome_user_buttons">
          <Link to="/game">
            <button className="new_game_button">New Game</button>
          </Link>
          <Link to="/">
            <button className="logoff_button">Log Off</button>
          </Link>
        </span>
        <ul>
          {this.state.games}
        </ul>
      </div>
    );
  }
}
