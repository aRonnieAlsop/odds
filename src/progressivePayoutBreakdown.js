const betAmount = 10;
const maxRounds = 1000;
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

function runUntilWin() {
  let bankroll = 200;
  let activeBets = {};
  let buyIns = 1;
  let target = 2200;
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

  while (true) {
    while (
      (bankroll >= betAmount || Object.keys(activeBets).length > 0) &&
      round <= maxRounds &&
      bankroll < target
    ) {
      playRound();
      round++;
    }
    if (bankroll >= target) break;
    bankroll += 200;
    target += 200;
    buyIns++;
  }

  return buyIns;
}

let buyInCounts = {};

for (let i = 0; i < TRIALS; i++) {
  const count = runUntilWin();
  buyInCounts[count] = (buyInCounts[count] || 0) + 1;
}

const sorted = Object.keys(buyInCounts).sort((a, b) => a - b);
console.log(`Out of ${TRIALS} trials:`);

for (const key of sorted) {
  const count = buyInCounts[key];
  const pct = ((count / TRIALS) * 100).toFixed(2);
  console.log(`${key} buy-in(s): ${count} times (${pct}%)`);
}

