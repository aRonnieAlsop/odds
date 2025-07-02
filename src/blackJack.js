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


function calculateHandValue(hand) {
  let value = 0;
  let aceCount = 0;

  for (let card of hand) {
    if (card === 'A') {
      value += 11;
      aceCount += 1;
    } else if (['K', 'Q', 'J'].includes(card)) {
      value += 10;
    } else {
      value += parseInt(card);
    }
  }

  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount -= 1;
  }

  return value;
}

const playerValue = calculateHandValue(playerHand);
console.log(`Player's hand: ${playerHand.join(', ')} (value: ${playerValue})`);

function getPlayerAction(playerValue, dealerUpcard) {
  const dealerValue = ['J', 'Q', 'K'].includes(dealerUpcard) ? 10 :
                      dealerUpcard === 'A' ? 11 : parseInt(dealerUpcard);

  if (playerValue >= 17) return 'stay';
  if (playerValue <= 11) return 'hit';

  switch (playerValue) {
    case 12:
      return dealerValue >= 4 && dealerValue <= 6 ? 'stand' : 'hit';
    case 13:
    case 14:
    case 15:
    case 16:
      return dealerValue >= 2 && dealerValue <= 6 ? 'stand' : 'hit';
    default:
      return 'hit';
  }
}

if (!dealerHasAce || !dealerHasTenValue) {
  const dealerUpcard = dealerHand[1];
  const action = getPlayerAction(playerValue, dealerUpcard);

  if (action === 'hit') {
    const newCard = deck.pop();
    playerHand.push(newCard);
    const newValue = calculateHandValue(playerHand);
    console.log(`player hits and gets ${newCard}. New hand: ${playerHand.join(', ')} (value: ${newValue})`);
    if (newValue > 21) {
      console.log("player busts.");
    } else {
      console.log("player stays.");
    }
  } else if (action === 'stay') {
    console.log("player stays.");
  }
}
