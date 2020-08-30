import React, { Component } from "react";
import { Link } from "react-router-dom";
import './css/start.css';
import './css/welcome_user.css';

export default class GameItem extends Component {
  render() {
    return (
      <li class="game_list_item">
        <h2>Game 2</h2>
        <div class="game_list_hidden_accordion">
          <ul class="hidden_accordion_list">
            <li>Games Won: 15/25</li>
            <li>Total winnings: $30,000</li>
            <li>Money in bank: $27,000</li>
          </ul>
          <Link to='/game'><button class="play_game_button">Play</button></Link>
          {/* link to the actual game id will go after /game */}
          <Link to='/delete'><button class="game_delete_button">Delete</button></Link>
          
        </div>
      </li>
    );
  }
}
