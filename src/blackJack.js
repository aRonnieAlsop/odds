const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const deck = [];

// creating one deck out of 6 decks
for (let i = 0; i < 6; i++) {
  for (let rank of ranks) {
    for (let j = 0; j < 4; j++) {
      deck.push(rank);
    }
  }
}

// shuffling deck
for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
}

// deal
const playerHand = [deck.pop()];
const dealerHand = [deck.pop()];
playerHand.push(deck.pop());
dealerHand.push(deck.pop());

//check first for dealer blackjack
const dealerHasAce = dealerHand.includes('A');
const dealerHasTenValue = dealerHand.some(card => ['10', 'J', 'Q', 'K'].includes(card));

if (dealerHasAce && dealerHasTenValue) {
  console.log("Dealer has Blackjack. Hand over.");
} else {
  //check for player blackjack
  const playerHasAce = playerHand.includes('A');
  const playerHasTenValue = playerHand.some(card => ['10', 'J', 'Q', 'K'].includes(card));
  if (playerHasAce && playerHasTenValue) {
    console.log("Player has Blackjack! Player wins.");
  } else {
    const dealerUpcard = dealerHand[1]; //show dealer's 2nd card face up
    console.log(`Dealer is showing: ${dealerUpcard}`);
    console.log("No Blackjacks. Begin player decision-making...");
  }
}


