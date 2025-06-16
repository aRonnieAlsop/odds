let bankroll = 4000;
const startingBankroll = bankroll;
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

let activeBets = {};
let round = 0;
const maxRounds = 100000;

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  return rollDie() + rollDie();
}

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
    const payout = betAmount * payouts[roll];
    bankroll += payout;
    delete activeBets[roll];
  }
}

while (bankroll > 0 && bankroll < target && round < maxRounds) {
  playRound();
  round++;
}

console.log(`\nFinal bankroll: $${bankroll.toFixed(2)}`);
console.log(`Total rounds played: ${round}`);
console.log(bankroll >= target ? "✅ Doubled up and cashed out." : "💸 Busted before doubling.");
