import React from "react";
import "./css/game_table.css";
import "./css/start.css";
import "./css/card_flip.css";

import Card from "./Card";

export default function NewAccount() {
  return (
    <div>
      <div className="start_page">
        <header className='game_page_header'>
        <button class="menu_button">Menu</button>
          <h1>BlackJack</h1>
          <button class="game_rules">?</button>
        </header>
        <span className="game_table">
          <div className="dealer_cards">
            <Card />
            <Card />
          </div>
          <p>Dealer Cards Total: 0</p>
          <div className="player_cards">
            <Card />
            <Card />
          </div>
          <p>Player Cards Total: 0</p>
        </span>
      </div>
      <footer className="flex_footer">
        <span className="bet_pot_container">
          <span className="test_container">
            <span className="test_flex_container">
              <select className="bet_select">
                <option value="0">Bet</option>
                <option value="1">$1</option>
                <option value="5">$5</option>
                <option value="10">$10</option>
                <option value="25">$25</option>
                <option value="50">$50</option>
                <option value="100">$100</option>
              </select>
              <h2>Pot: $0</h2>
            </span>
            <span className="bank">
              <h2>Bank: $50,000</h2>
            </span>
          </span>
          <span className="play_buttons_span">
            <button className="start_button">Start</button>
            <button className="stay_button">Stay</button>
          </span>
        </span>
      </footer>
    </div>
  );
}
