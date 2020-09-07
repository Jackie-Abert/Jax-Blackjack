import React, { Component } from "react";
import "./css/game_table.css";
import "./css/start.css";
import "./css/card_flip.css";
import "./css/menu_button.css";
import Card from "./Card";
import { Link } from "react-router-dom";
import DeckManager from "./Content/DeckManager";

export default class GamePage extends Component {
  state = {
    wins: 0,
    losses: 0,
    monneytotal: 0,
    bank: 10000,
    thisdeck: [],
    playerHandScore: 0,
    dealerHandScore: 0,
    playerHand: [],
    dealerHand: [],
    bet: 0,
    pot: 0,
    buttonPlayDisabled: true,
    buttonStayDisabled: true,
    buttonHitDisabled: true,
    defaultValue: true,
    endMessage: "",
    ishidden: "hidden",
    hiddenRules: "hiddenRules",
    hiddenMenu: "hiddenMenu",
    gameStarted: false,
  };
  //this starts the GamePage, renders the deck. need to add a function that
  //adds a new shuffled deck if the old deck gets to a certain number so
  //the game does not break

  handleStartGame = () => {
    let newDeck = DeckManager.deckOfCards();
    let emptyCard = [{ suit: "cardback", numberValue: 0 }];

    this.setState({
      buttonPlayDisabled: true,
      buttonStayDisabled: false,
      buttonHitDisabled: false,
      gameStarted: true,
    });

    let newPlayerHand = [];
    let newDealerHand = [];
    newPlayerHand.push(newDeck.pop());
    newDealerHand.push(emptyCard.pop());
    newPlayerHand.push(newDeck.pop());
    newDealerHand.push(newDeck.pop());
    this.setState(
      {
        thisdeck: newDeck,
        playerHand: newPlayerHand,
        dealerHand: newDealerHand,
      },
      () => this.startCheck(this.state.playerHand, this.state.dealerHand)
    );
  };

  //this checks the initial state of the game to see if
  //player or deal have blackjack
  //need to hide dealer hand info from dom till player stays
  // also need to hide dealer card till stay. will do this from state.
  //minor details
  startCheck(playerHand, dealerHand) {
    let sumPlayerHand = this.check(this.state.playerHand);
    let sumDealerHand = this.check(this.state.dealerHand);
    let newBank = this.state.bank - this.state.bet;
    this.setState({
      playerHandScore: sumPlayerHand,
      dealerHandScore: sumDealerHand,
      bank: newBank,
    });
    if (sumPlayerHand === 21) {
      let winnings =
        Math.round(this.state.pot * 1.5 + this.state.pot) + this.state.bank;
      let newWin = this.state.wins + 1;
      this.setState({
        buttonPlayDisabled: false,
        buttonStayDisabled: true,
        buttonHitDisabled: true,
        endMessage: "Blackjack!",
        bank: winnings,
        ishidden: null,
        wins: newWin,
      });
      //pot is multiplied by 1.5 and returned to the bank
    }
  }
  //this takes in the array of the deck and reduces it to a single value
  check(hand) {
    return hand.reduce((a, b) => {
      return a + b.numberValue;
    }, 0);
  }
  //this checks the players hand to see if they have busted
  checkPlayer() {
    let sumPlayerHand = this.check(this.state.playerHand);
    if (sumPlayerHand > 21) {
      let newLoss = this.state.losses + 1;
      this.setState({
        playerHandScore: sumPlayerHand,
        buttonPlayDisabled: false,
        buttonStayDisabled: true,
        buttonHitDisabled: true,
        endMessage: "Bust! Dealer wins.",
        ishidden: null,
        losses: newLoss,
      });
    } else {
      this.setState({
        playerHandScore: sumPlayerHand,
      });
    }
  }
  //this checks the dealers hand to see if they have busted
  checkDealer() {
    let sumDealerHand = this.check(this.state.dealerHand);
    if (sumDealerHand > 21) {
      let winnings = this.state.pot * 2 + this.state.bank;
      let newWin = this.state.wins + 1;
      this.setState({
        dealerHandScore: sumDealerHand,
        buttonPlayDisabled: false,
        buttonStayDisabled: true,
        buttonHitDisabled: true,
        endMessage: "Dealer busts! Player Wins.",
        bank: winnings,
        ishidden: null,
        wins: newWin,
      });
    } else {
      return this.setState({
        dealerHandScore: sumDealerHand,
      });
    }
  }

  //player takes a card, this checks the player hand
  handleHit = () => {
    let card = this.state.thisdeck.pop();
    let newPlayerHand = [...this.state.playerHand, card];
    let newBank = this.state.bank - this.state.bet;
    this.setState(
      {
        playerHand: newPlayerHand,
        bank: newBank,
        pot: this.state.pot + this.state.bet,
        defaultValue: true,
      },
      () => this.checkPlayer()
    );
  };

  //this function is supposed to be the ai after the player hits stay
  //it is supposed to loop through and deal cards untill player busts
  //or is >= 17, whatever comes first

  // this is where the app breaks. when the player
  // stays and the dealer doesn't have to draw another
  // card, the end game message and button do not appear.
  // they only show up when the screen is resized
  //it's between this and "end game"

  handleDealer = () => {
    let dealerSum = this.check(this.state.dealerHand);
    let newHand = this.state.dealerHand;
    while (dealerSum < 17) {
      let card = this.state.thisdeck.pop();
      newHand.push(card);
      dealerSum = this.check(newHand);
    }
    this.setState(
      {
        dealerHandScore: dealerSum,
        dealerHand: newHand,
      },
      () => this.checkDealer()
    );
    this.endGame();
  };

  //this handles the stay button, runs the ai for dealer and ends the game
  handleStay = () => {
    let newDealerHand = this.state.dealerHand;
    let card = this.state.thisdeck.pop();
    newDealerHand.splice(0, 1);
    newDealerHand.unshift(card);
    let dealerSum = this.check(newDealerHand);
    
    if(dealerSum === 21) {
      let newLoss = this.state.losses + 1;
      this.setState({
        buttonPlayDisabled: false,
        buttonStayDisabled: true,
        buttonHitDisabled: true,
        endMessage: "Dealer has blackjack.",
        ishidden: null,
        losses: newLoss,
      });
    } else{
    this.setState(
      {
        dealerHandScore: dealerSum,
        dealerHand: newDealerHand,
        buttonPlayDisabled: false,
        buttonStayDisabled: true,
        buttonHitDisabled: true,
        defaultValue: true,
      },
      () => this.handleDealer(this.state.dealerHand)
    );
  };
}
  //add to bank
  //this renders a button to end the game
  //also throws up an end game message

  ///////this is sometimes not letting message and button not render to the dom
  /////// without resizing the window, why????????
  endGame = () => {
    let dealer = this.check(this.state.dealerHand);
    console.log(dealer);
    let player = this.check(this.state.playerHand);
    console.log(player);
    let newendMessage = "";
    let winnings = this.state.bank;
    let newWin = this.state.wins;
    let newLoss = this.state.losses;

    if (player > dealer) {
      newendMessage = "Player Wins!";
      newWin = this.state.wins + 1;
      winnings = this.state.pot * 2 + this.state.bank;
    }

    if (player < dealer) {
      newendMessage = "Dealer Wins";
      newLoss = this.state.losses + 1;
    } else if (player === dealer) {
      newendMessage = "Draw";
    }
    return this.setState({
      bank: winnings,
      wins: newWin,
      losses: newLoss,
      endMessage: newendMessage,
      ishidden: null,
    });
  };
  //this is the button that clears the board and resets the state

  handleNewGame = () => {
    this.setState({
      deck: [],
      playerHandScore: 0,
      dealerHandScore: 0,
      playerHand: [],
      dealerHand: [],
      bet: 0,
      pot: 0,
      buttonPlayDisabled: true,
      buttonStayDisabled: true,
      buttonHitDisabled: true,
      defaultValue: true,
      endMessage: "",
      gameStarted: false,
      ishidden: "hidden",
    });
  };
  //this works with the dropdown bet menu, needs to add money to the bank
  //not adding properly, not accumulating money to state.
  handleChange = (e) => {
    if (e.target.value !== "0") {
      this.setState({
        buttonPlayDisabled: false,
        bet: Number(e.target.value),
        pot: Number(e.target.value),
      });
    }
  };
  handleButtonClickMenu = () => {
    if (this.state.hiddenMenu === "hiddenMenu") {
      this.setState({ hiddenMenu: "showMenu" });
    } else {
      this.setState({ hiddenMenu: "hiddenMenu" });
    }
  };
  handleButtonClickRules = () => {
    if (this.state.hiddenRules === "hiddenRules") {
      this.setState({ hiddenRules: "showRules" });
    } else {
      this.setState({ hiddenRules: "hiddenRules" });
    }
  };
  render() {
    const playerDeal = this.state.playerHand.map((card) => <Card {...card} />);
    const dealerDeal = this.state.dealerHand.map((card) => <Card {...card} />);
    return (
      <div>
        <div className="start_page">
          <header className="game_page_header">
            <button
              className="menu_button"
              onClick={() => this.handleButtonClickMenu()}
            >
              Menu
            </button>
            <div className={this.state.hiddenMenu} id="hidden_menu">
              <Link to="/WelcomeUser">
                <button className="main_menu_button">Main Menu</button>
              </Link>
              <Link to="/login">
                <button className="logoff_button">Log Off</button>
              </Link>
            </div>

            <h1>BlackJack</h1>
            <button
              className="game_rules"
              onClick={() => this.handleButtonClickRules()}
            >
              ?
            </button>
            <div className={this.state.hiddenRules}>
              <div className="game_rules_page">
                <h2>Game Rules</h2>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </p>
                <button
                  className="close_page_button"
                  onClick={() => this.handleButtonClickRules()}
                >
                  Close
                </button>
              </div>
            </div>
          </header>
          <span className="game_table">
            <span className="hidden_endgame_message">
              {this.state.endMessage}
              <button
                name="endgame"
                id="hidden_endgame_button"
                className={this.state.ishidden}
                onClick={this.handleNewGame}
              >
                End Game
              </button>
            </span>
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
                <select
                  className="bet_select"
                  id="bet"
                  onChange={this.handleChange}
                >
                  <option value="0" defaultValue>
                    Bet
                  </option>
                  <option value="1">$1</option>
                  <option value="5">$5</option>
                  <option value="10">$10</option>
                  <option value="25">$25</option>
                  <option value="50">$50</option>
                  <option value="100">$100</option>
                </select>
                <h2>Pot: ${this.state.pot}</h2>
              </span>
              <span className="bank">
                <h2>Bank: ${this.state.bank}</h2>
              </span>
            </span>
            <span className="play_buttons_span">
              <button
                className="start_button"
                onClick={this.handleStartGame}
                disabled={
                  this.state.buttonPlayDisabled || this.state.gameStarted
                }
              >
                Play
              </button>
              <button
                className="start_button"
                onClick={this.handleHit}
                disabled={this.state.buttonHitDisabled}
              >
                Hit
              </button>
              <button
                className="stay_button"
                onClick={this.handleStay}
                disabled={this.state.buttonStayDisabled}
              >
                Stay
              </button>
            </span>
          </span>
        </footer>
      </div>
    );
  }
}
