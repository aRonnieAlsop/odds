g
let grandTotal = 0;

for (let i = 0; i < 1000; i++) {
  let sessionTotal = 0;
  for (let j = 0; j < 100; j++) {
    sessionTotal += spin();
  }
  grandTotal += sessionTotal;
}

console.log(`Average net after 100 spins (over 1000 trials): $${(grandTotal / 1000).toFixed(2)}`);
