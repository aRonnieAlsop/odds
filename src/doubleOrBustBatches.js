const startingBankroll = 4000;
const target = startingBankroll * 2;
const betAmount = 10;
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
  12: 30
};

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  return rollDie() + rollDie();
}

function simulateSession() {
  let bankroll = startingBankroll;
  let activeBets = {};
  let round = 0;
  const maxRounds = 100000;

  function placeMissingBets() {
    for (let num of betNumbers) {
      if (!activeBets[num] && bankroll >= betAmount) {
        bankroll -= betAmount;
        activeBets[num] = true;
      }
    }
  }

  function playRound() {
    placeMissingBets();
    const roll = rollDice();
    if (roll === 7) {
      activeBets = {};
    } else if (activeBets[roll]) {
      bankroll += betAmount * payouts[roll];
      delete activeBets[roll];
    }
  }

  while (bankroll > 0 && bankroll < target && round < maxRounds) {
    playRound();
    round++;
  }

  return bankroll >= target ? "win" : "loss";
}

let wins = 0;
let losses = 0;
const simulations = 1000;

for (let i = 0; i < simulations; i++) {
  const result = simulateSession();
  if (result === "win") wins++;
  else losses++;
}

console.log(`\nOut of ${simulations} sessions:`);
console.log(`✅ Wins (doubled up): ${wins}`);
console.log(`💸 Losses (busted): ${losses}`);
console.log(`Winning percentage: ${(wins / simulations * 100).toFixed(2)}%`);
