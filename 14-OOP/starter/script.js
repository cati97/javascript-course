'use strict';

// Objects and Prototypal Inheritance in Javascript

// There is no actual OOP in Javascript - it is simulated with functions under the hood

// Each object has its Prototype - like a blueprint (a class)

// Everything is an object really! - functions, arrays, html elements and so on - the most generic prototype is Object

// Each object has a __proto__ property with its' corresponding prototype

const arr = [1, 4, 3, 4]; // same as call new Array() - behind the scenes new object is created and linked to Array.prototype, so now we can use all the methods defined in the prototype!

// We can even add new methods to Array.prototype and all arrays will be able to use them!!! - not recommended practice of course

Array.prototype.unique = function () {
  return [...new Set(this)];
};

// now we can call this method exactly the same as map, filter, reduce

console.log(arr.unique()); // [1, 4, 3] - it works!

console.log(arr.__proto__); // now we see all array functions and properties defined in Array.prototype but also our new unique method
console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__); // this is the Object.prototype because it is next in the prototype chain
console.log(arr.__proto__.__proto__.__proto__); // one more and it is null because there is nothing higher than Object prototype!

// How to create a "class" in javascript - one way is constructor function
// it is like a regular function but we call it using the new keyword and also naming convention is for uppercase first letter

// I get a warning that this constructor function can be replaced with class declaration!
// Class declaration is a new modern way of creating classes in js since ES6 and under the hood it still uses constructor functions!
const Person = function (firstName, age) {
  // this is empty {} create by the new keyword, then we fill it with values
  this.firstName = firstName;
  this.age = age;
};

const anna = new Person('Anna', 25);
console.log(anna); // Person {firstName: 'Anna', age: 25} we get in the console

// this is after quick fix - converting to class declaration
class Person2 {
  constructor(firstName, age) {
    this.firstName = firstName;
    this.age = age;
  }
}

// how to display a function or html element as an object in the browser console?
console.dir(x => x + 1); // > anonymous() {length ... }

const h1 = document.querySelector('h1');
console.dir(h1); // > h1 {}

// instanceof operator

console.log(Array.prototype.unique instanceof Object); // true - functions are objects
console.log(h1 instanceof HTMLHeadingElement); // true
console.log(h1 instanceof HTMLElement); // true
console.log(h1 instanceof Element); // true
console.log(h1 instanceof Node); // true
console.log(h1 instanceof EventTarget); // true
console.log(h1 instanceof Object); // true - html elements are objects in the end of prototype chain!

console.log(anna instanceof Person); // true
console.log(anna instanceof Object); // true
console.log(anna instanceof Array); // false
