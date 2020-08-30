let suits = ["diamonds", "hearts", "spades", "clubs"];
let faceValue = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
let key = 1;
function deckOfCards() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < faceValue.length; j++) {
      let numValue = faceValue[j];
      if (
        faceValue[j] === "J" ||
        faceValue[j] === "Q" ||
        faceValue[j] === "K" ||
        faceValue[j] === "A"
      ) {
        numValue = "10";
      }
      let card = {
        key: key++,
        suit: suits[i],
        faceValue: faceValue[j],
        numberValue: numValue,
      };
      deck.push(card);
    }
  }
  console.log(deck);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
  return deck;
}
deckOfCards();