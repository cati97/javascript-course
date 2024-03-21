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
const Person = function (firstName, birthYear) {
  // this is empty {} create by the new keyword, then we fill it with values
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(new Date().getFullYear() - this.birthYear);
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

// ES6 Classes

// classes are just functions under the hood so we can also assign them into variables
const PersonClass = class {};

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // this will create a method on the .prototype property not on the object itself!
  // all methods without static keyword are instance methods and will be created in prototype and accessible from every instance
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  }

  // this creates age() function on prototype property and also age property
  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  /**
   * created by vs code
   * @param {string} name
   */

  // setter are not functions - they are created like properties
  // set lastName(name) { // at this point monica.lastName property will be created on the prototype!
  //   console.log('when is this called?');
  //   this.lastName = name; // so we cannot do this - because lastName property already exists on the prototype!
  // }

  set lastName(name) {
    // the convention to add _ to avoid conflict
    this._lastName = name;
  }

  get lastName() {
    return this._lastName;
  }

  static hello() {
    console.log('Hello available only from the constructor');
  }
}

const monica = new PersonCl('Monica', 1997);
monica.calcAge(); // 27

//monica.hello(); // cannot do that - because it is now inherited
PersonCl.hello(); // that is the way to call static method

// this will work exactly like calcAge
PersonCl.prototype.calcAge2 = function () {
  console.log(new Date().getFullYear() - this.birthYear);
};

console.log(monica.age); // since age() is a getter function - we don't call it but use it as a property

// monica.fullName('Davis'); we cannot do this - fullName is not a function - it is also like a property
monica.lastName = 'Davis';
console.log(monica); // now monica object has own property _lastName and on the prototype it has property lastName
// we can access both
console.log(monica._lastName); // own property
console.log(monica.hasOwnProperty('_lastName')); // true
console.log(monica.lastName); // property exists only on the prototype! - we can access it thanks to the getter function get lastName()
console.log(monica.hasOwnProperty('lastName')); // false

// we can also have getters and setters in object literals

// this under the hood does new Object
const account = {
  movements: [1, 2, 3, 4],

  get latest() {
    return this.movements.slice(-1)[0];
  }, // we need a comma here because it is an object literal not a class declaration

  set latest(mov) {
    this.movements.push(mov);
  },
};

account.latest = 50;
console.log(account); // [1, 2, 3, 4, 50]
console.log(account.latest); // 50

// static methods - are used only on constructor itself and are not inherited by every instance
// eg. Number.parseFloat(), Array.from()

// implement in constructor function

Person.hey = function () {
  console.log('Hey static :D');
  console.log(this, ' points to entire constructor function');
};

// now we call it like this

Person.hey();

// in class declaration it is even simpler - just add static keyword before method name

// Object.create() - manually specify a prototype object and link it to the new object
// no new keyword!

const PersonProto = {
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  },

  // this is simulating a constructor - but it is just a regular method on object literal - can be called any name
  init(firstName, birthYear) {
    this.firstName = firstName; // this is linked to a object that is calling this method - in this case to steven
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // now steven empty {} has a new property __proto__ with our manually created prototype
console.log(steven.__proto__ === PersonProto); // true
steven.init('Steven', 1972);
steven.calcAge(); // 52

// how to set up manually inheritance between two constructor functions

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // calling parent "class" constructor - passing down correct this ref
  this.course = course;
};
Student.prototype = Object.create(Person.prototype);

const mike = new Student('Mike', 1997, 'IT');
console.log(mike);

Student.prototype.constructor = Student; // otherwise it would be Person constructor because of Object.create
console.log(Student.prototype.constructor);
mike.calcAge(); // now Student instance inherits calcAge method from the Person prototype

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

class StudentCl extends PersonCl {
  // if we don't add any new properties we don't need a constructor at all
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear); // super must always be called first before setting new properties
    this.course = course;
  }

  introduce() {
    console.log(
      `Hello, my name is ${this.firstName} and I study ${this.course}`
    );
  }

  calcAge() {
    // we can overwrite here the parent function
  }
}

const jonas = new StudentCl('Jonas', 1999, 'Biology');
console.log(jonas);
jonas.calcAge();

// Object.create to inherit from parent

// const PersonProto = {
//   calcAge() {
//     console.log(new Date().getFullYear() - this.birthYear);
//   },

//   // this is simulating a constructor - but it is just a regular method on object literal - can be called any name
//   init(firstName, birthYear) {
//     this.firstName = firstName; // this is linked to a object that is calling this method - in this case to steven
//     this.birthYear = birthYear;
//   },
// };

const StudentProto = Object.create(PersonProto); // link StudentProto to PersonProto
console.log(StudentProto); // empty object linked to person prototype so we can use methods on it from person proto

// this overwrites init method in PersonProto
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

const jay = Object.create(StudentProto); // now we create another empty object but now linked to StudentProto
console.log(jay);
jay.init('Jay', 1997, 'IT');
console.log(jay);
jay.calcAge(); // 27 - it works so it means it is correctly connected to Person prototype

class Account {
  // private properties must be declared outside of the constructor
  #movements = []; // private class field
  locale = navigator.language; // public class field not declared with let not const
  #pin;
  static greeting = 'Hey there!';

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; // we redeclare it here but we cannot declare class field here for the first time
    //this._pin = pin; // imitates private property but is not private really - just a convention before private class fields were introduced
    // this.#movements = [];
    // this.locale = navigator.language; - it can be created as public field - because it will be added to all instances
  }

  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // it makes the method chainable
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  // really private method
  #approveLoan(val) {
    return val < 1000;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      return this;
    }
  }

  static sayHello() {
    console.log(this.greeting); // in static method you have access only to static properties!
    // console.log(this.owner);
  }
}

const acc1 = new Account('James', 'EUR', 1111);
// acc1.movements.push(450); we should not be able to do this
acc1.deposit(450);
acc1.withdraw(200);
console.log(acc1.getMovements()); // [450, -200]
// acc1._movements.push(200); you can still do this but at least you know you shouldn't
// acc1.#movements.push(200); // syntax error - now we have really private field - no access is possible!

acc1.requestLoan(500);
console.log(acc1);

// acc1.#approveLoan syntax error!

acc1.deposit(300).deposit(200).withdraw(80);
console.log(acc1);

Account.sayHello();
