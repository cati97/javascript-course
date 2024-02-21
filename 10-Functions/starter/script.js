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

// 9. How does the bind method work?

// it returns a new function with changed this context

const newBookFn = bookFn.bind(swiss);
newBookFn('Peter', 789); // Peter booked flight SW789 at airline Swiss

// we can also create a more specific function from a general one - setting always flight number to 123

const newBookFnJan25 = bookFn.bind(swiss, 'Jan', 25); // nothing will be overwritten - it is not default parameters - it is always going to be as set
newBookFnJan25('Peter'); // Jan booked flight SW25 at airline Swiss

const newBookFn123 = bookFn.bind(swiss, null, 123);
console.log(newBookFn123);
newBookFn123('Peter'); // null booked flight SW123 at airline Swiss
// I don't know how to bind only the second argument!!! - seems like a very hard thing to achieve - custom function or lodash

const addTax = (rate, value) => value + value * rate;

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

const addTax2 = rate => value => value + value * rate;

const addVAT2 = addTax2(0.23);
console.log(addVAT2);
console.log(addVAT2(100));

// 10. What is IIFE?

// IIFE stands for Immediately Invoked Function Expression. It's a JavaScript function that runs as soon as it is defined.
// It's typically used to create a separate scope for variables to avoid polluting the global scope and to encapsulate code.

(function () {
  var localVar = 'This is a local variable';
  console.log(localVar);
})();

// we must wrap it in () because otherwise it throws an error that function has no name

// it also works with array functions

(() => console.log('hello from array IIFE'))(); // hello from array IIFE

// 11. What are closures in js?

// In JavaScript, a closure is a combination of a function and the lexical environment within which that function was declared.
// This allows the function to retain access to variables from its surrounding scope even after the outer function has finished executing.

function outerFunction() {
  let outerVariable = 'I am from the outer function';

  function innerFunction() {
    console.log(outerVariable); // innerFunction has access to outerVariable
  }

  return innerFunction;
}

let closure = outerFunction();
closure(); // Output: I am from the outer function
console.dir(closure); // console dir of function shows the Closure as inner property - we cannot access the variable directly
// [[Scopes]] - this double [[]] mean that it is inner property
// Scopes[3]
// Closure (outerFunction) {outerVariable: 'I am from the outer function'}

// 12. What does console.dir() method do?
// console.dir() is a method in JavaScript used to display an interactive list of the properties of the specified JavaScript object in the console.
// It's particularly useful for examining the structure of complex objects, such as arrays or objects with nested properties.
