'use strict';
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

// Set - array with unique items or for better performance at searching an item
// Array - for most cases, and when we want to manipulate data

// Objects - most cases - because we are used to it - dot notation or bracket, getting JSON object from API and possibility of function methods
// Map - when we need specifically different types of the keys or for better performance

// 24. Strings - methods indexOf(), lastIndexOf(), slice()

// indexOf() - first occurrence of character or word
// lastIndexOf() - last occurrence
// slice() - get substring of a string

// What is the best programming language?

console.log(question.slice(-1)); // get the last character of a string - ?
console.log(question.slice(0, question.indexOf(' '))); // get the first word - until first occurrence of empty space - What
console.log(question.slice(question.lastIndexOf(' ') + 1)); // get the last word - plus 1 because the empty space was included at start

// 25. Why we have all these methods on primitive type string?

// We don't - javascript converts behind the scenes primitive string type to object type String with all these methods when we try to access them

// it creates new String('Anna')

// 26. How to capitalize a string?

const firstName = 'joNaS';
const lowerCaseName = firstName.toLowerCase();
const capitalizedName = lowerCaseName[0].toUpperCase() + lowerCaseName.slice(1);
const capitalizedName2 = lowerCaseName.replace(
  lowerCaseName[0],
  lowerCaseName[0].toUpperCase()
);

console.log(capitalizedName);
console.log(capitalizedName2);

// 27. Other string method - trim

// trim() - trims all white characters at the beginning and at the end of the string

const trimmedEmail = '   jonas@EXAMPLe.com   \n'.toLowerCase().trim();
console.log(trimmedEmail);

// replace() - works only for the first occurrence - if we want to replace all we can use a regex or now there is a new method replaceAll - since 2021

const priceRanges = '22,5 / 36,7';

console.log(priceRanges.replace(',', '.')); // 22.5 / 36,7
console.log(priceRanges.replaceAll(',', '.')); // 22.5 / 36.7 :D works!
console.log(priceRanges.replaceAll(/\,/g, '.')); // 22.5 / 36.7 - we need to escape comma since it has another meaning and use g for global

// How to use padStart to mask a credit card number?

const testCardNumber = '2345556776533668';
const testCardNumber2 = 2345556776533668;
const maskCreditCard = number => {
  const stringNumber = String(number);
  return stringNumber.slice(-4).padStart(stringNumber.length, '*');
};

console.log(maskCreditCard(testCardNumber)); // ************3668
console.log(maskCreditCard(testCardNumber2)); // ************3668
