let js = "amazing";
// if (js === "amazing") alert("JavaScript is FUN!!!");
js = "boring";
console.log(20 + 5);

const calcAvg = (a, b, c) => (a + b + c) / 3;

const calcAvgSpread = (...args) => args.reduce((acc, curr) => acc + curr, 0) / args.length;

function calculateAverage() {
  console.log(arguments);
  return [...arguments].reduce((acc, curr) => acc + curr, 0) / arguments.length;
}

console.log(calcAvg(5, 4, 3));
console.log("calcAvgSpread", calcAvgSpread(5, 4, 3));
console.log("calculateAverage", calculateAverage(5, 4, 3));
