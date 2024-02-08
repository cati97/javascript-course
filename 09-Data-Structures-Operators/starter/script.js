'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// 1. Destructuring arrays to swap places

let [primary, secondary] = [
  restaurant.starterMenu[0],
  restaurant.starterMenu[1],
]; // cannot be const because later we try to reassign doing this [secondary, primary]

console.log({ primary, secondary }); // {primary: 'Focaccia', secondary: 'Bruschetta'}

// swapping
[secondary, primary] = [primary, secondary];

console.log({ primary, secondary }); // {primary: 'Bruschetta', secondary: 'Focaccia'}

// 2. Destructuring nested arrays

const numbers = [1, 2, 3, [8, 9]];
const [first, _, third, [firstNested, secondNested]] = numbers;
console.log(_); // it is a regular variable name!
// const [first, , third, [firstNested, secondNested]] = numbers; // can use underscore to skip but also nothing , ,
console.log({ first, third, firstNested, secondNested });

// 3. Destructuring nested objects, renaming them and assigning default values

const {
  thu: { open: openThu, close: CloseThu },
  sun: Sunday = {},
} = restaurant.openingHours;
console.log(openThu, CloseThu, Sunday);

// 4. Spread operator - on the right side - where we enumerate multiple VALUES

// Spread creates a shallow copy of an object or array

const copyMainCourses = [...restaurant.mainMenu];

const extendedMenu = ['Gnocchi', ...restaurant.mainMenu, 'Sandwich'];

console.log(extendedMenu); //  ['Gnocchi', 'Pizza', 'Pasta', 'Risotto', 'Sandwich']

const copyObjRestaurant = { ...restaurant, foundedIn: '1999' };
console.log(copyObjRestaurant);

// 5. Rest operator - on the left side - where we enumerate multiple VARIABLES

const [firstNum, , ...restNumbers] = numbers; // Identifier '_' has already been declared - so it is better to use empty space!
console.log(firstNum, restNumbers); // restNumbers is [3, [8, 9]] - all elements AFTER - NOT skipped elements

// 6. Spread in functions (as passing multiple arguments to a functions) vs Rest parameters

const calcSum = (...numbers) => {
  // rest parameters - collecting all passed VALUES into an array - instead of explicitly naming VARIABLES - a, b, c, d
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

console.log(calcSum(1, 2, 3)); // passing one by one

const randomNumbers = [7, 5, 4, 2];

console.log(calcSum(...randomNumbers)); // spreading in place of passing value by value

// 7. Rest parameters for one mandatory arg and rest optional

const getIngredients = function (mandatoryIng, ...others) {
  console.log({ mandatoryIng, others });
};

// {
//   "mandatoryIng": "Cheese",
//   "others": [
//       "Mushrooms",
//       "Olives"
//   ]
// }

getIngredients('Cheese', 'Mushrooms', 'Olives');

// 8. Destructuring parameters directly inside a function

const calcArea = ({ length = 0, width = 0 }) => {
  return length * width;
};

const rectangle = {
  length: 50,
  width: 100,
};

console.log(calcArea(rectangle));

// 9. Nullish operator - works like or but treats 0 and '' like normal truthy values!!

// Falsy values are only null and undefined

const guestNum = 0; // real possible value

console.log(guestNum || 10); // 10 because guestNum 0 is treated as falsy value

console.log(guestNum ?? 10); // 0 because guestNum 0 is treated as truthy value

// 10. Or assignment operator ||= // Add assignment operator &&=

let num = 0;
// num = num || 50;
// num ||= 50;
console.log(num); // 50

// 11. Nullish assignment operator ??=
num ??= 50;
console.log(num); // 0 - because now 0 is true

// 12. for - of loop for easier looping over an array

for (const item of numbers) {
  console.log(item);
}

for (const [i, el] of numbers.entries()) {
  // can only destructure if of entries()
  console.log(i, el);
}

console.log(numbers.entries()); // Object [Array Iterator] {}
console.log([...numbers.entries()]); // [ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, [ 8, 9 ] ] ] - to unpack the iterator!

// 13. Shorthand for object methods

const person = {
  firstName: 'Anna',
  lastName: 'Smith',
  getFullName: function () {
    // before new shorthand syntax
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(person.getFullName());

const person2 = {
  firstName: 'Anna',
  lastName: 'Smith',
  getFullName() {
    // NEW shorthand syntax
    return `${this.firstName} ${this.lastName}`;
  },
  getAge(birthYear, currentYear) {
    return currentYear - birthYear;
  },
};

console.log(person2.getFullName());

// 14. Optional chaining works also for methods!!

// if we want to check if a method exists before calling it we can do:

console.log(person2.getFull?.() || "Method doesn't exist");
// console.log(person2.getFull()); //  person2.getFull is not a function

// Chaining operator ? goes AFTER the method name we are not sure about if it exists!

console.log(person?.middleName?.value); // Cannot read properties of undefined (reading 'value')
// the error is thrown only when we are trying to access a property of undefined

console.log(person2.getAge?.(1997, 2024) || 'No getAge method');

// 15. Optional chaining works also on arrays

const users = [
  {
    name: 'John',
  },
];

console.log(users[0]?.name);

// 16. Sets are iterable (which doesn't mean the exact same array methods are available)

// the most frequent use case - to remove duplicates from an array - then convert it back to array

const names = ['Anna', 'Peter', 'Anna', 'Peter', 'Peter', 'John'];
const uniqueNames = new Set(names);
console.log(uniqueNames);

// set operations - we cannot access set elements like in an array - just checking if it exists - has

// add
uniqueNames.add('Margaret', 'Margaret'); // will only add once
console.log(uniqueNames); // Set(4) {'Anna', 'Peter', 'John', 'Margaret' }

uniqueNames.forEach(el => console.log(el)); // forEach is available on sets
//uniqueNames.map(el => el); // map is NOT available on sets - uniqueNames.map is not a function

// delete

uniqueNames.delete('Margaret');
console.log(uniqueNames);

// has - if it includes this element
console.log(uniqueNames.has('Margaret')); // false
console.log(uniqueNames.has('Peter')); // true

console.log(uniqueNames.size); // 3 - size not length as in arrays!

uniqueNames.clear(); // clear the entire set

const uniqueNamesArray = [...uniqueNames]; // or directly spread and create Set - const uniqueNames = [...new Set(names)]

// 17. Map - key can be ANY type - even an array or object

const usersMap = new Map();

// set and get
usersMap.set('name', 'John'); // first key, second value
usersMap.set(true, 'We are open');
usersMap.set(25, 'age');
usersMap.set([2, 3], 'numbers'); // this doesn't make much sense but it is possible

console.log(usersMap); // Map(1) {'name' => 'John'}

console.log(usersMap.get('name')); // John

// delete, size, has are the same as Set

console.log(usersMap.has('name')); // true

console.log(usersMap.size); // 1

usersMap.delete('name');
console.log(usersMap);

// 18. How to specify keys and values in new Map

const questionMap = new Map([
  ['question', 'What is the best programming language?'],
  [1, 'Javascript'],
  [2, 'Java'],
  [3, 'Python'],
  ['correct', 1],
  [true, 'Correct answer :D'],
  [false, 'Wrong answer :('],
]);

// 19. How to convert an object to a map?

Object.entries(person); // comes with [[]] nested arrays structure key value pairs as we need when creating new Map

const personMap = new Map(Object.entries(person));
console.log(personMap);

// 20. Quiz app

const question = questionMap.get('question');

let options = '';

for (const [key, value] of questionMap) {
  if (typeof key === 'number') {
    options += `${key}.1 ${value} \n`;
  }
}
console.log(options);
// const answer = Number(prompt(`${question} \n${options}`));

// const isCorrectAnswer = answer === questionMap.get('correct');

// console.log(questionMap.get(isCorrectAnswer)); // using power of boolean as key

// 21. Convert Map to an array - actually a 2D array

const mapArray = [...questionMap];
console.log(mapArray);

// 22. keys and values on the map

console.log([...questionMap.keys()]); // must unpack with spread - otherwise it is an Iterator
console.log([...questionMap.values()]);

// 23. When to use what? - object, array, Map, Set
