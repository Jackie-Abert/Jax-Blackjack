check(dealerHand) {
    dealerHand.reduce(function(sum, card){ return sum + card.numberValue; }, 0)
    console.log(dealerHand)
  }