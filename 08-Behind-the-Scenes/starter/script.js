'use strict';

function getFancyName(name) {
  console.log(this);
  return name;
}

console.log(this);
getFancyName('Fancy');

function outerFunction() {
  const getFancyNameArrow = name => {
    console.log(this);
    return name;
  };
  getFancyNameArrow('fancy');
}

outerFunction();

const person = {
  age: 25,
  getAge: () => {
    return this.age;
  },
};

console.log(person.getAge());

function printFirstName() {
  console.log(firstName);

  function printLastName() {
    if (firstName === 'Anna') {
      var lastName = 'Smith';
    }
    console.log(lastName);
  }

  printLastName();
}

const firstName = 'Anna';
printFirstName();
