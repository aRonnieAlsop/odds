const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createShuffledDeck() {
  const deck = [];
  for (let i = 0; i < 6; i++) {
    for (let rank of ranks) {
      for (let j = 0; j < 4; j++) {
        deck.push(rank);
      }
    }
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
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

function isSoftHand(hand) {
  return hand.includes('A') && calculateHandValue(hand) <= 21;
}

function isPair(hand) {
  return hand.length === 2 && hand[0] === hand[1];
}

function getPlayerAction(playerHand, dealerUpcard) {
  const dealerValue = ['J', 'Q', 'K'].includes(dealerUpcard) ? 10 :
                      dealerUpcard === 'A' ? 11 : parseInt(dealerUpcard);
  const playerValue = calculateHandValue(playerHand);

  if (isPair(playerHand)) {
    const pairCard = playerHand[0];
    switch (pairCard) {
      case 'A':
      case '8': return 'split';
      case '10': return 'stay';
      case '9': return dealerValue === 7 || dealerValue >= 10 ? 'stay' : 'split';
      case '7': return dealerValue <= 7 ? 'split' : 'hit';
      case '6': return dealerValue <= 6 ? 'split' : 'hit';
      case '4': return dealerValue === 5 || dealerValue === 6 ? 'split' : 'hit';
      case '3':
      case '2': return dealerValue <= 7 ? 'split' : 'hit';
    }
  }

  if (isSoftHand(playerHand)) {
    switch (playerValue) {
      case 13:
      case 14: return dealerValue >= 5 && dealerValue <= 6 ? 'double' : 'hit';
      case 15:
      case 16: return dealerValue >= 4 && dealerValue <= 6 ? 'double' : 'hit';
      case 17: return dealerValue >= 3 && dealerValue <= 6 ? 'double' : 'hit';
      case 18:
        return dealerValue >= 9 || dealerValue === 2 ? 'hit' :
               dealerValue >= 3 && dealerValue <= 6 ? 'double' : 'stay';
      case 19:
      case 20:
      case 21: return 'stay';
    }
  }

  if (playerValue >= 17) return 'stay';
  if (playerValue <= 11) return 'hit';

  switch (playerValue) {
    case 12: return dealerValue >= 4 && dealerValue <= 6 ? 'stay' : 'hit';
    case 13:
    case 14:
    case 15:
    case 16: return dealerValue >= 2 && dealerValue <= 6 ? 'stay' : 'hit';
    default: return 'hit';
  }
}

function playOneRound(deck) {
  const playerHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];
  const dealerHasAce = dealerHand.includes('A');
  const dealerHasTenValue = dealerHand.some(card => ['10', 'J', 'Q', 'K'].includes(card));
  console.log("\n--- New Round ---");

  if (dealerHasAce && dealerHasTenValue) {
    console.log(`Dealer has Blackjack with ${dealerHand.join(', ')}. Player loses.`);
    return 'lose';
  }

  const playerHasAce = playerHand.includes('A');
  const playerHasTenValue = playerHand.some(card => ['10', 'J', 'Q', 'K'].includes(card));
  if (playerHasAce && playerHasTenValue) {
    console.log(`Player has Blackjack with ${playerHand.join(', ')}. Player wins!`);
    return 'win';
  }

  console.log(`Dealer is showing: ${dealerHand[1]}`);
  console.log(`Player's hand: ${playerHand.join(', ')} (value: ${calculateHandValue(playerHand)})`);

  const dealerUpcard = dealerHand[1];
  const action = getPlayerAction(playerHand, dealerUpcard);

  if (action === 'hit' || action === 'double') {
    const newCard = deck.pop();
    playerHand.push(newCard);
    const newValue = calculateHandValue(playerHand);
    console.log(`Player ${action === 'double' ? 'doubles and' : 'hits and'} gets ${newCard}. New hand: ${playerHand.join(', ')} (value: ${newValue})`);
    if (newValue > 21) {
      console.log("Player busts.");
      return 'lose';
    }
  } else if (action === 'split') {
    console.log("Player splits (simplified: treated as a hit).");
    const newCard = deck.pop();
    playerHand.push(newCard);
    const newValue = calculateHandValue(playerHand);
    console.log(`New card: ${newCard}. Hand now: ${playerHand.join(', ')} (value: ${newValue})`);
    if (newValue > 21) return 'lose';
  } else {
    console.log("Player stays.");
  }

  const playerValue = calculateHandValue(playerHand);
  console.log(`\nDealer reveals hidden card: ${dealerHand[0]}`);
  let dealerValue = calculateHandValue(dealerHand);
  console.log(`Dealer's hand: ${dealerHand.join(', ')} (value: ${dealerValue})`);

  while (dealerValue < 17) {
    const newCard = deck.pop();
    dealerHand.push(newCard);
    dealerValue = calculateHandValue(dealerHand);
    console.log(`Dealer hits and gets ${newCard}. Hand: ${dealerHand.join(', ')} (value: ${dealerValue})`);
  }

  if (dealerValue > 21) {
    console.log("Dealer busts. Player wins!");
    return 'win';
  }
  if (dealerValue > playerValue) {
    console.log("Dealer wins.");
    return 'lose';
  }
  if (dealerValue < playerValue) {
    console.log("Player wins.");
    return 'win';
  }
  console.log("Push (tie).");
  return 'push';
}

function runBlackjackSimulation() {
  let bankroll = 200;
  const minBet = 15;
  const target = 1200;
  let rounds = 0;
  let deck = createShuffledDeck();

  while (bankroll >= minBet && bankroll < target) {
    if (deck.length < 60) deck = createShuffledDeck();
    const result = playOneRound(deck);
    if (result === 'win') bankroll += minBet;
    else if (result === 'lose') bankroll -= minBet;
    rounds++;
  }

  console.log(`\n🏁 Simulation over. Final bankroll: $${bankroll} after ${rounds} rounds.`);
}


runBlackjackSimulation();
