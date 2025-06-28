const wheel = [
  0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1,
  37, // represents '00'
  27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2
];

let bankroll = 0;
let wins = 0;
let losses = 0;
const startingBet = 725;
const iterations = 10000;

function spinWheel() {
  const index = Math.floor(Math.random() * wheel.length);
  return wheel[index];
}

function playRound() {
  const result = spinWheel();
  if ([2, 3, 34, 35].includes(result)) {
    return 175;
  } else if (result >= 4 && result <= 33) {
    return 25;
  } else {
    return -startingBet;
  }
}

for (let i = 0; i < iterations; i++) {
  const result = playRound();
  bankroll += result;
  if (result > 0) {
    wins++;
  } else {
    losses++;
  }
}

console.log(`Final bankroll: $${bankroll.toFixed(2)}`);
console.log(`Average result per spin: $${(bankroll / iterations).toFixed(2)}`);
console.log(`Win rate: ${(wins / iterations * 100).toFixed(2)}%`);
console.log(`Losses: ${losses}`);
