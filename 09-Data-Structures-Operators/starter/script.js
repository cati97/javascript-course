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
