const betAmount = 10;
const maxRounds = 1000;
const cashOutLimit = 1000;
const TRIALS = 100000;

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

function runSession() {
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

  if (bankroll >= cashOutLimit) return 'cashout';
  if (bankroll < betAmount && Object.keys(activeBets).length === 0) return 'broke';
  return 'max_rounds';
}

let totalFailures = 0;
let secondChanceWins = 0;

for (let i = 0; i < TRIALS; i++) {
  const first = runSession();
  if (first === 'broke') {
    totalFailures++;
    const second = runSession();
    if (second === 'cashout') secondChanceWins++;
  }
}

const pct = ((secondChanceWins / totalFailures) * 100).toFixed(2);

console.log(`Trials with initial loss: ${totalFailures}`);
console.log(`Second-chance wins: ${secondChanceWins}`);
console.log(`Probability of winning after a $200 loss: ${pct}%`);
