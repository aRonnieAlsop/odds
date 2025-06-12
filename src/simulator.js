const betAmount = 10;
const maxRounds = 1000;
const cashOutLimit = 1000;
const SIMULATIONS_PER_BATCH = 1000;
const BATCHES = 100;

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

function runSimulationOnce() {
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

let allRatios = [];

for (let b = 0; b < BATCHES; b++) {
  let results = { cashout: 0, broke: 0, max_rounds: 0 };
  for (let i = 0; i < SIMULATIONS_PER_BATCH; i++) {
    const outcome = runSimulationOnce();
    results[outcome]++;
  }
  const wins = results.cashout;
  const losses = results.broke;
  const ratio = losses === 0 ? wins : (wins / losses).toFixed(2);
  console.log(`Batch ${b + 1} - Wins: ${wins}, Losses: ${losses}, Ratio: ${ratio}:1`);
  allRatios.push(parseFloat(ratio));
}

const avgRatio = (allRatios.reduce((a, b) => a + b, 0) / allRatios.length).toFixed(2);
console.log(`\nAverage win-to-loss ratio across all batches: ${avgRatio}:1`);
