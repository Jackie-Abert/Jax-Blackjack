import React, { Component } from "react";
import "./css/game_table.css";
import "./css/start.css";
import "./css/card_flip.css";

export default class Card extends Component {
  render() {
    return (
      <div class="flip_card">
        <div className="content">
          <div className="front_of_card"></div>
          <div className="back_of_card">suit and numbers</div>
        </div>
      </div>
    );
  }
}
