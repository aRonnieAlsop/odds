const maxRounds = 1000;
const cashOutLimit = 1000;
const TRIALS = 10000;

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

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  return rollDie() + rollDie();
}

function runSession(betAmount) {
  let bankroll = 200;
  let activeBets = {};
  let round = 1;

  function placeAllBets() {
    for (let num of betNumbers) {
      if (!activeBets[num]) {
        if (bankroll >= betAmount) {
          bankroll -= betAmount;
          activeBets[num] = true;
        }
      }
    }
  }

  function playRound() {
    placeAllBets();
    const roll = rollDice();
    if (roll === 7) {
      activeBets = {};
    } else if (activeBets[roll]) {
      const payout = betAmount * payouts[roll];
      bankroll += payout;
    }
  }

  while (
    (bankroll >= betAmount || Object.keys(activeBets).length > 0) &&
    round <= maxRounds &&
    bankroll < cashOutLimit
  ) {
    playRound();
    round++;
  }

  return bankroll >= cashOutLimit ? 'cashout' : 'broke';
}

let tens = { cashout: 0, broke: 0 };
let twenties = { cashout: 0, broke: 0 };

for (let i = 0; i < TRIALS; i++) {
  const result10 = runSession(10);
  tens[result10]++;
  const result20 = runSession(20);
  twenties[result20]++;
}

const pct = (wins, total) => ((wins / total) * 100).toFixed(2);

console.log(`$10 bets: ${tens.cashout} wins (${pct(tens.cashout, TRIALS)}%), ${tens.broke} losses`);
console.log(`$20 bets: ${twenties.cashout} wins (${pct(twenties.cashout, TRIALS)}%), ${twenties.broke} losses`);
