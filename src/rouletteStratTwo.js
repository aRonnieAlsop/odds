const wheel = [
  0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1,
  37, // represents '00'
  27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2
];

const redNumbers = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18,
  19, 21, 23, 25, 27, 30, 32, 34, 36
]);

function spinWheel() {
  const index = Math.floor(Math.random() * wheel.length);
  const num = wheel[index];
  const display = num === 37 ? '00' : num;
  let color;

  if (num === 0 || num === 37) {
    color = 'green';
  } else if (redNumbers.has(num)) {
    color = 'red';
  } else {
    color = 'black';
  }

  console.log(`Spin result: ${display} (${color})`);
}

spinWheel();