let bankroll = 200;
const betAmount = 10;
const maxRounds = 1000;
const cashOutLimit = 1000;

const betNumbers = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
const payouts = {
  2: 30,
  3: 14,
  4: 9,
  5: 6,
  6: 1.1,
  8: 1.1,
  9: 6,
  10: 9,
  11: 14,
  12: 30,
};


let activeBets = {};

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  return rollDie() + rollDie();
}

function placeAllBets() {
  for (let num of betNumbers) {
    if (!activeBets[num]) {
      if (bankroll >= betAmount) {
        bankroll -= betAmount;
        activeBets[num] = true;
        console.log(`Placed $${betAmount} on ${num}.`);
      } else {
        console.log(`Not enough money to bet on ${num}.`);
      }
    }
  }
}

function playRound(round) {
  placeAllBets();
  const roll = rollDice();
  console.log(`\n=== Round ${round} ===`);
  console.log(`Rolled: ${roll}`);
  if (roll === 7) {
    console.log("7 rolled! All bets lost.");
    activeBets = {};
  } else if (activeBets[roll]) {
    const payout = betAmount * payouts[roll];
    bankroll += payout;
    console.log(`Hit ${roll}! Won $${payout.toFixed(2)}. Bankroll: $${bankroll.toFixed(2)}`);
  } else {
    console.log(`No hit. Bankroll: $${bankroll.toFixed(2)}`);
  }
}

let round = 1;
while (
  (bankroll >= betAmount || Object.keys(activeBets).length > 0) &&
  round <= maxRounds &&
  bankroll < cashOutLimit
) {
  playRound(round);
  round++;
}

console.log(`\nSimulation complete after ${round - 1} rounds.`);
console.log(`Final bankroll: $${bankroll.toFixed(2)}`);

if (bankroll >= cashOutLimit) {
  console.log("💰 Cash-out goal reached!");
} else if (bankroll < betAmount && Object.keys(activeBets).length === 0) {
  console.log("💸 Bankroll depleted.");
} else {
  console.log("🛑 Max rounds reached.");
}
