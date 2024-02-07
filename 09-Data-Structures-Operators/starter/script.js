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
// const [first, , third, [firstNested, secondNested]] = numbers; // can use underscore to skip but also nothing , ,
console.log({ first, third, firstNested, secondNested });

// 3. Destructuring nested objects, renaming them and assigning default values

const {
  thu: { open: openThu, close: CloseThu },
  sun: Sunday = {},
} = restaurant.openingHours;
console.log(openThu, CloseThu, Sunday);
