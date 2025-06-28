const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const deck = [];

for (let i = 0; i < 4; i++) {
  for (let rank of ranks) {
    deck.push(rank);
  }
}

console.log(deck);
console.log(`Deck size: ${deck.length}`);
