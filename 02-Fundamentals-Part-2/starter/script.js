// const anna = {
//   firstName: "Anna",
//   birthYear: 1992,
//   calcAge: function () {
//     return 2023 - this.birthYear;
//   },
// };

// Cannot do with arrow function - this is undefined
// so 2023 - undefined returns NaN

// const anna = {
//   firstName: "Anna",
//   birthYear: 1992,
//   calcAge: () => {
//     return 2023 - this.birthYear;
//   },
// };

// shorthand method - no colon

// const anna = {
//   firstName: "Anna",
//   birthYear: 1992,
//   calcAge() {
//     return 2023 - this.birthYear;
//   },
// };

// console.log(anna.calcAge());
// console.log(anna["calcAge"]()); // calling a function just like any other property using the brackets notation

// assign to this.age property

const anna = {
  firstName: "Anna",
  birthYear: 1992,
  calcAge() {
    this.age = 2023 - this.birthYear;
    return this.age;
  },
  hasDriversLicense: false,
  getSummary: function () {
    return `${this.firstName} is ${this.calcAge()} old and she has ${
      this.hasDriversLicense ? "a" : "no"
    } driver's license.`;
  },
};

console.log(anna.calcAge());
console.log(anna.age);
console.log(anna.age);
console.log(anna.age);

// Challenge

console.log(
  `${anna.firstName} is ${anna.age} old and she has ${anna.hasDriversLicense ? "a" : "no"} driver's license.`
);
console.log(anna.getSummary());
