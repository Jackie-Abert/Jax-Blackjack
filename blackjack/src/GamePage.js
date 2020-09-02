import React, { Component } from "react";
import "./css/game_table.css";
import "./css/start.css";
import "./css/card_flip.css";
import Card from "./Card";

let playerHand = [];
let dealerHand = [];

export default class GamePage extends Component {
  constructor(props) {
    super(props);
    this.deck = [
      { key: 41, suit: "clubs", faceValue: "3", numberValue: 3 },
      { key: 17, suit: "hearts", faceValue: "5", numberValue: 5 },
      { key: 10, suit: "diamonds", faceValue: "J", numberValue: 10 },
      { key: 33, suit: "spades", faceValue: "8", numberValue: 8 },
      { key: 51, suit: "clubs", faceValue: "K", numberValue: 10 },
      { key: 8, suit: "diamonds", faceValue: "9", numberValue: 9 },
      { key: 46, suit: "clubs", faceValue: "8", numberValue: 8 },
      { key: 20, suit: "hearts", faceValue: "8", numberValue: 8 },
      { key: 30, suit: "spades", faceValue: "5", numberValue: 5 },
      { key: 12, suit: "diamonds", faceValue: "K", numberValue: 10 },
      { key: 34, suit: "spades", faceValue: "9", numberValue: 9 },
      { key: 1, suit: "diamonds", faceValue: "2", numberValue: 2 },
      { key: 4, suit: "diamonds", faceValue: "5", numberValue: 2 },
      { key: 16, suit: "hearts", faceValue: "4", numberValue: 4 },
      { key: 15, suit: "hearts", faceValue: "3", numberValue: 3 },
      { key: 29, suit: "spades", faceValue: "4", numberValue: 4 },
      { key: 21, suit: "hearts", faceValue: "9", numberValue: 3 },
      { key: 49, suit: "clubs", faceValue: "J", numberValue: 5 },
      { key: 48, suit: "clubs", faceValue: "10", numberValue: 3 },
      { key: 26, suit: "hearts", faceValue: "A", numberValue: 4 },
      { key: 23, suit: "hearts", faceValue: "1", numberValue: 1 },
    ];
  }
  state = {
    bank: 10000,
    potValue: 0,
    playerHandScore: 0,
    dealerHandScore: 0,
    playerHand: [],
    dealerHand: [],
    bet:0,
    pot:0,
    buttonPlayDisabled:false,
    buttonStayDisabled:true,
    buttonHitDisabled:true
  };
  handleStartGame = () => {
    this.setState({
      buttonPlayDisabled:true,
      buttonStayDisabled:false,
      buttonHitDisabled:false,
    });
    //card table is empty, these need to be created as they are dealt
    //the only one that will be flipped over for now will be the dealers
    //on the left because time
    let newPlayerHand = [];
    let newDealerHand = [];
    newPlayerHand.push(this.deck.pop());
    newDealerHand.push(this.deck.pop());
    newPlayerHand.push(this.deck.pop());
    newDealerHand.push(this.deck.pop());
    this.setState(
      {
        playerHand: newPlayerHand,
        dealerHand: newDealerHand,
      },
      () => this.startCheck(playerHand, dealerHand)
    );
  };
  startCheck(playerHand, dealerHand) {
    let sumPlayerHand = this.check(this.state.playerHand);
    let sumDealerHand = this.check(this.state.dealerHand);
    let newBank = this.state.bank - this.state.bet
    console.log(sumPlayerHand, sumDealerHand);
    this.setState({
      playerHandScore: sumPlayerHand,
      dealerHandScore: sumDealerHand,
      bank:newBank,
    });
    if (sumPlayerHand === 21 && sumDealerHand !== 21) {
      console.log("Blackjack");
      //money gets added to bank
      //state gets updated to server
    }
    if (sumPlayerHand === 21 && sumDealerHand === 21) {
      console.log("Even");
      //money gets taken out of bank because the house always wins
      //state gets updated to server
    }
  }
  // }
  check(deck) {
    return deck.reduce((a, b) => {
      return a + b.numberValue;
    }, 0);
  }

  checkPlayer() {
    let sumPlayerHand = this.check(this.state.playerHand);
    if (sumPlayerHand > 21) {
      console.log("Bust");
      this.setState({
        playerHandScore: sumPlayerHand,
      });
      //you lose, money gets taken out of the pot never to return
      //game state as is gets updated to the server
      //game table gets cleared
      //play button gets reactivated
    } else {
      this.setState({
        playerHandScore: sumPlayerHand,
      });
    }
  }
  checkDealer() {
    let sumDealerHand = this.check(this.state.dealerHand);
    if (sumDealerHand > 21) {
      console.log("Bust");
      this.setState({
        dealerHandScore: sumDealerHand,
      });
      //you lose, money gets taken out of the pot never to return
      //game state as is gets updated to the server
      //game table gets cleared
      //play button gets reactivated
    } else {
      this.setState({
        dealerHandScore: sumDealerHand,
      });
    }
  }
  handleChange = (e) => {
    this.setState({
      bet:e.target.value
    })
  }
  handleHit = () => {
    let card = this.deck.pop();
    let newPlayerHand = [...this.state.playerHand, card];
    let newBank = this.state.bank - this.state.bet
    let newBet = this.state.bet
    this.setState(
      {
        playerHand: newPlayerHand,
        bank:newBank,
        bet:newBet
      },
      () => this.checkPlayer()
    );
  };

  handleStay = () => {
      this.setState({
        buttonPlayDisabled:false,
        buttonStayDisabled:true,
        buttonHitDisabled:true,
      }, () => this.handleDealer());
    
  };
  handleDealer = () => {
    let dealerSum = this.check(this.state.dealerHand);
    for (let i = 0; i< this.state.dealerHand.length; i++){
      console.log('running')//this is running as many times as I want it to but it is not pushing anything but the last card into the dom.
      if(dealerSum < 17) {
      let card = this.deck.pop();
      let newDealerHand = [...this.state.dealerHand, card];
      this.setState({
        dealerHand: newDealerHand,
      },() => this.checkDealer(dealerHand));
    }
  } 
}

  render() {
    const playerDeal = this.state.playerHand.map((card) => <Card {...card} />);
    const dealerDeal = this.state.dealerHand.map((card) => <Card {...card} />);
    console.log();
    return (
      <div>
        <div className="start_page">
          <header className="game_page_header">
            <button className="menu_button">Menu</button>
            <h1>BlackJack</h1>
            <button className="game_rules">?</button>
          </header>
          <span className="game_table">
            <div className="dealer_cards">{dealerDeal}</div>
            <p>Dealer Cards Total: {this.state.dealerHandScore}</p>
            <div className="player_cards">{playerDeal}</div>
            <p>Player Cards Total: {this.state.playerHandScore}</p>
          </span>
        </div>
        <footer className="flex_footer">
          <span className="bet_pot_container">
            <span className="test_container">
              <span className="test_flex_container">
                <select className="bet_select" id="bet" onChange={this.handleChange}>
                  <option value="0">Bet</option>
                  <option value="1">$1</option>
                  <option value="5">$5</option>
                  <option value="10">$10</option>
                  <option value="25">$25</option>
                  <option value="50">$50</option>
                  <option value="100">$100</option>
                </select>
                <h2>Pot: ${this.state.bet}</h2>
              </span>
              <span className="bank">
                <h2>Bank: ${this.state.bank}</h2>
              </span>
            </span>
            <span className="play_buttons_span">
              <button className="start_button" onClick={this.handleStartGame} disabled={this.state.buttonPlayDisabled}>
                Play
              </button>

              <button className="start_button" onClick={this.handleHit} disabled={this.state.buttonHitDisabled}>
                Hit
              </button>
              <button className="stay_button" onClick={this.handleStay} disabled={this.state.buttonStayDisabled}>
                Stay
              </button>
            </span>
          </span>
        </footer>
      </div>
    );
  }
}
