'use strict';

// 1. ES5 way of setting default parameters values in a function - possible but bad practice

const passport = '4564566677';
const age = 25;

const person = {
  passport,
  age,
};

const getOnBoard = (passport, age) => {
  // VERY BAD PRACTICE in ES6
  passport = passport || '1234566677'; // default
  age = age || 18;
  person.age = 100; // will change the global obj
};

getOnBoard();

console.log({ passport, age, person });

// passport and age are not touched because they are primitive types - new variables were actually created in the function
// person: {passport: '4564566677', age: 100} // but person was just a reference passed to a function so it was overwritten

// 2. ES6 - Default parameters can also include expressions and refer to previous parameter defined BEFORE it

const getOnBoard2 = (passport = '1234566677', age = 18 * 2) => {
  console.log(passport, age);
};

// We can do this! - but passport param must be defined before age
const getOnBoard3 = (passport = '1234566677', age = 18 * Number(passport)) => {
  console.log(passport, age);
};

// 3. How to skip an argument in the middle in function?

function greet(name = '', age = 18, country = 'Poland') {
  console.log(`Hey, ${name}, you are ${age} old and from ${country}`);
}

greet('Anna', undefined, 'England'); // age won't be undefined but it will take the default value

// 4. What are first class functions?

// It means that functions are just objects that we can assign to variable and pass as arg to a function

// 5. What are higher order functions?

// The functions that either take a function as parameter or return a function

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

function calculate(a, b, fn) {
  console.log(fn(a, b));
  console.log(fn.name); // we can know which function was called
}

calculate(2, 5, add);
calculate(2, 5, subtract);

// 6. What are common function methods and properties?

// Methods - call(), apply(), bind()
// Properties - name, length, prototype

// we can also set new properties
calculate.newProperty = 'hello';
console.log(calculate.newProperty); // hello

// 7. What is a callback function?
// It is a function passed to a another function as argument, to be called by this higher order function somewhere in the future
// when a certain condition is met or an event happens
// eg. addEventListener

// we pass callback functions to e.g. forEach, map and so on
function helloNum(a, i, arr) {
  console.log('hello' + a + i + arr);
}
[1, 2, 3].forEach(helloNum);

function greet(greeting) {
  return function greetByName(name) {
    console.log(`${greeting} ${name}`);
  };
}

const greetingHey = greet('Hey');
greetingHey('John');
greet('Hi')('Ann');

const greet2 = greeting => name => console.log(`${greeting} ${name}`);

greet2('Hiiiii')('arrow');

// 8. How call and apply method work for functions?

const lufthansa = {
  airline: 'Lufthansa',
  code: 'LH',
  book(passenger, flightNum) {
    console.log(
      `${passenger} booked flight ${this.code}${flightNum} at airline ${this.airline}`
    );
  },
};

lufthansa.book('Anna', 234);

const swiss = {
  airline: 'Swiss',
  code: 'SW',
};

swiss.book = lufthansa.book; // this works just fine
swiss.book('John', 789);

const bookFn = lufthansa.book; // but this won't because it is now a regular function

// bookFn('Jennifer', 234); // Cannot read properties of undefined (reading 'code') - because "this" is undefined in functions

bookFn.call(swiss, 'Jan', 245); // this now works properly

const swissArgs = ['Jan', 245];

bookFn.call(swiss, ...swissArgs); // call takes each arg separately

bookFn.apply(swiss, swissArgs); // apply takes an array or args
