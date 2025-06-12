let bankroll = 200;
const betAmount = 10;

const betNumbers = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
const payouts = {
  2: 30,
  3: 15,
  4: 10,
  5: 7,
  6: 1.17,
  8: 1.17,
  9: 7,
  10: 10,
  11: 15,
  12: 30,
};

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  return rollDie() + rollDie();
}

function canAffordBets() {
  return bankroll >= betAmount * betNumbers.length;
}

function playRound() {
  if (!canAffordBets()) {
    console.log("Not enough money to place all bets.");
    return false;
  }

  bankroll -= betAmount * betNumbers.length; 
  const roll = rollDice();
  console.log(`\nRolled: ${roll}`);

  if (roll === 7) {
    console.log("7! House wins all bets.");
  } else if (betNumbers.includes(roll)) {
    const payout = betAmount * payouts[roll];
    bankroll += payout + betAmount; 
    console.log(`Hit ${roll}! Won $${payout.toFixed(2)}. Bankroll: $${bankroll.toFixed(2)}`);
  } else {
    console.log(`Rolled ${roll}, no hit. Bankroll: $${bankroll.toFixed(2)}`);
  }

  return true;
}


let round = 1;
while (canAffordBets()) {
  console.log(`\n=== Round ${round} ===`);
  const keepGoing = playRound();
  if (!keepGoing) break;
  round++;
}

console.log(`\nGame over. Final bankroll: $${bankroll.toFixed(2)}`);
