const wheel = [
  0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1,
  37, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2
];

const redNumbers = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18,
  19, 21, 23, 25, 27, 30, 32, 34, 36
]);

const row1 = new Set([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]);
const row3 = new Set([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]);

function spin() {
  const num = wheel[Math.floor(Math.random() * wheel.length)];
  let payout = 0;

  if (num >= 1 && num <= 12) payout += 750;
  if (num >= 13 && num <= 24) payout += 750;
  if (row1.has(num)) payout += 750;
  if (row3.has(num)) payout += 750;

  return payout - 1000;
}

let grandTotal = 0;

for (let i = 0; i < 1000; i++) {
  let sessionTotal = 0;
  for (let j = 0; j < 100; j++) {
    sessionTotal += spin();
  }
  grandTotal += sessionTotal;
}

console.log(`Average net after 100 spins (over 1000 trials): $${(grandTotal / 1000).toFixed(2)}`);
