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

function isSoftHand(hand) {
  return hand.includes('A') && calculateHandValue(hand) <= 21;
}

function isPair(hand) {
  return hand.length === 2 && hand[0] === hand[1];
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

function getPlayerAction(playerHand, dealerUpcard) {
  const dealerValue = ['J', 'Q', 'K'].includes(dealerUpcard) ? 10 :
                      dealerUpcard === 'A' ? 11 : parseInt(dealerUpcard);
  const playerValue = calculateHandValue(playerHand);

  if (isPair(playerHand)) {
    const pairCard = playerHand[0];
    switch (pairCard) {
      case 'A':
      case '8':
        return 'split';
      case '10':
        return 'stay';
      case '9':
        return dealerValue === 7 || dealerValue >= 10 ? 'stay' : 'split';
      case '7':
        return dealerValue <= 7 ? 'split' : 'hit';
      case '6':
        return dealerValue <= 6 ? 'split' : 'hit';
      case '4':
        return dealerValue === 5 || dealerValue === 6 ? 'split' : 'hit';
      case '3':
      case '2':
        return dealerValue <= 7 ? 'split' : 'hit';
    }
  }

  if (isSoftHand(playerHand)) {
    switch (playerValue) {
      case 13:
      case 14:
        return dealerValue >= 5 && dealerValue <= 6 ? 'double' : 'hit';
      case 15:
      case 16:
        return dealerValue >= 4 && dealerValue <= 6 ? 'double' : 'hit';
      case 17:
        return dealerValue >= 3 && dealerValue <= 6 ? 'double' : 'hit';
      case 18:
        return dealerValue >= 9 || dealerValue === 2 ? 'hit' :
               dealerValue >= 3 && dealerValue <= 6 ? 'double' : 'stay';
      case 19:
      case 20:
      case 21:
        return 'stay';
    }
  }

  //hard total rules
  if (playerValue >= 17) return 'stay';
  if (playerValue <= 11) return 'hit';

  switch (playerValue) {
    case 12:
      return dealerValue >= 4 && dealerValue <= 6 ? 'stay' : 'hit';
    case 13:
    case 14:
    case 15:
    case 16:
      return dealerValue >= 2 && dealerValue <= 6 ? 'stay' : 'hit';
    default:
      return 'hit';
  }
}

let action;

if (!dealerHasAce || !dealerHasTenValue) {
  const dealerUpcard = dealerHand[1];
  action = getPlayerAction(playerHand, dealerUpcard);

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
  } } else if (action === 'split') {
  const splitHands = [[playerHand[0], deck.pop()], [playerHand[1], deck.pop()]];
  console.log(`player splits. Hands: [${splitHands[0].join(', ')}] and [${splitHands[1].join(', ')}]`);

  for (let i = 0; i < splitHands.length; i++) {
    const handValue = calculateHandValue(splitHands[i]);
    console.log(`Hand ${i + 1}: ${splitHands[i].join(', ')} (value: ${handValue})`);

    while (calculateHandValue(splitHands[i]) < 17) {
      const newCard = deck.pop();
      splitHands[i].push(newCard);
      const val = calculateHandValue(splitHands[i]);
      console.log(`Hand ${i + 1} hits and gets ${newCard}. New hand: ${splitHands[i].join(', ')} (value: ${val})`);
      if (val > 21) {
        console.log(`Hand ${i + 1} busts.`);
        break;
      }
    }
  }

  console.log("Skipping dealer logic due to split hands.");
  return;
} else if (action === 'double') {
  const newCard = deck.pop();
  playerHand.push(newCard);
  const newValue = calculateHandValue(playerHand);
  console.log(`player doubles down and gets ${newCard}. Final hand: ${playerHand.join(', ')} (value: ${newValue})`);
  if (newValue > 21) {
    console.log("player busts.");
  }
}



// dealer plays only if player didn't bust or split
if (action !== 'split' && calculateHandValue(playerHand) <= 21) {
  console.log(`\nDealer reveals hidden card: ${dealerHand[0]}`);
  let dealerValue = calculateHandValue(dealerHand);
  console.log(`Dealer's full hand: ${dealerHand.join(', ')} (value: ${dealerValue})`);

  //dealer hits until value >= 17
  while (dealerValue < 17) {
    const newCard = deck.pop();
    dealerHand.push(newCard);
    dealerValue = calculateHandValue(dealerHand);
    console.log(`Dealer hits and gets ${newCard}. New hand: ${dealerHand.join(', ')} (value: ${dealerValue})`);
  }

  //results
  const finalPlayerValue = calculateHandValue(playerHand);

  if (dealerValue > 21) {
    console.log("Dealer busts! Player wins.");
  } else if (dealerValue > finalPlayerValue) {
    console.log("Dealer wins.");
  } else if (dealerValue < finalPlayerValue) {
    console.log("Player wins.");
  } else {
    console.log("Push (tie).");
  }
}

