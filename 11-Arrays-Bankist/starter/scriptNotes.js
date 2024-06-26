'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// 1. How to use slice method to get the last element of an array?

// SLICE - does NOT mutate the original array - creates a new one
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.slice(-1)); // [5] but this returns the new array with the last item so we also need to access it [0] to get the actual last item
console.log(numbers.slice(-1)[0]); // 5

// we can create a shallow copy of an array instead of using spread operator - use slice

console.log(numbers.slice()); //  [1, 2, 3, 4, 5] - so calling slice without any args

// SPLICE - mutates the original array - used to replace or remove some elements

// console.log(numbers.splice(2)); // [3, 4, 5]
console.log(numbers); // [1, 2] - it mutates the original arr and removed all extracted elements

// use case of splice - remove the last element of the arr

// numbers.splice(-1);

// REVERSE - reverse the order of elements in the array - IT MUTATES the original array

console.log(numbers.reverse());
console.log(numbers); // [5, 4, 3, 2, 1]

// CONCAT - merges two arrays into one - DOES NOT MUTATE

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log(arr1.concat(arr2)); // [1, 2, 3, 4, 5, 6]
console.log([...arr1, ...arr2]); // [1, 2, 3, 4, 5, 6] - exact same thing is done with spread operator

// How to get the last item of an array using the new (2020) .at method?

console.log(numbers.at(-1)); // just pass the index
console.log(numbers.at(0)); // equals numbers[0]

// works also for strings

console.log('Adam'.at(-1)); // m

// FOREACH

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// FOREACH on Maps and Sets

// forEach also works for them!

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
  console.log(map);
});

const currenciesUnique = new Set(['USD', 'USD', 'PLN', 'EUR', 'EUR']);

currenciesUnique.forEach((value, key, map) => {
  console.log(`${key}: ${value}`); // USD: USD key === value because there is no key nor index in Set! - so we can omit it _
  console.log(map);
});

// omit the key
currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}: ${value}`);
  console.log(map);
});

// How to convert a map into an array? - just spread it !!!

console.log([...currencies.entries()]); // this will produce an array of arrays

console.log([...currencies]); // this will ALSO produce an array of arrays
