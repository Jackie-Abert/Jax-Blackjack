import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/start.css";
import "./css/welcome_user.css";
import './css/game_item.css'

export default class GameItem extends Component {
  state = {
    hidden:'hidden'
  };
  handleButtonClick = () => {
      console.log('click')
      if(this.state.hidden === 'hidden') {
        this.setState({hidden:'show'});
    } else {
      this.setState({hidden:'hidden'})
    }
  }

  render() {
    const { id, array, wins, losses, bank } = this.props
    return (
      <div>
        <button className="game_list_item" onClick={() => this.handleButtonClick()}>
          
          <h2>Game {array + 1}</h2>
        </button>
          <div className={this.state.hidden}>
            <ul className="hidden_accordion_list">
              <li>Total games played: {wins + losses}</li>
              <li>Wins: {wins} Losses: {losses}</li>
              <li>Money in bank: {bank}</li>
            </ul>
            <Link to="/game">
              <button className="play_game_button">Play</button>
            </Link>
            {/* link to the actual game id will go after /game */}
            <Link to="/delete">
              <button className="game_delete_button">Delete</button>
            </Link>
          </div>
      </div>
    );
  }
}