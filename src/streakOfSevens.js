let bankroll = 4000;
const lossPerSeven = 10 * 10; // $10 on each #

let sevens = 0;

while (bankroll > 0) {
  bankroll -= lossPerSeven;
  sevens++;
}

console.log(`It would take ${sevens} consecutive 7s to reduce a $4,000 bankroll to $0 with $10 bets on all 10 positions.`);
