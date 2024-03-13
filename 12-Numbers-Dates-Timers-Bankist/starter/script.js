'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2024-03-09T23:36:17.929Z',
    '2024-03-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const movementDate = new Date(account.movementsDates[i]);
    const date = formatToLocalDate(movementDate, account.locale); // no options defined means it will just be a date day, month, year
    const daysPassed = calcDaysPassed(
      new Date(),
      new Date(account.movementsDates[i])
    );
    const daysPassedString =
      daysPassed === 0
        ? 'Today'
        : daysPassed === 1
        ? 'Yesterday'
        : daysPassed <= 7
        ? `${daysPassed} days ago`
        : date;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${daysPassedString}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    setCurrentDate();

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer dates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const bigIntNumber = 23566543n;
console.log(typeof bigIntNumber); // bigint

// no mixing

// console.log(23 + 15n); // TypeError: Cannot mix BigInt and other types, use explicit conversions

// no math calculation like sqrt and so on - it is basically designed for storing very big numbers

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 - the maximum safe integer in js

// then big int was created

const huge = 2345674334567876543234567654321234565432n;
console.log(huge); // ok

// convert to bigint

const bigNum = BigInt(23456763333);
// it will be converted to string

console.log(huge + ' is really big'); // 2345674334567876543234567654321234565432 is really big - n is going to be removed

// numeric separator

const million = 1_000_000;
console.log(million); // in js _ is ignored - 1000000

// but converting to number won't work

console.log(Number('1_000_000')); // NaN - should not use as string value - just as number presented in code
console.log(Number(1_000_000)); // 1000000 - this works fine

// remainder operator

const isEven = num => num % 2 === 0;
const isOdd = num => num % 2 !== 0;

// color every third row

// document.querySelector('body').addEventListener('click', () => {
//   const movements = document.querySelectorAll('.movements__row');
//   [...movements].forEach((mov, i) => {
//     if (i % 3 === 0) mov.style.backgroundColor = 'blue';
//   });
// });

// Math rounding

const randomInt = (min, max) =>
  Math.floor(Math.round() * (max - min + 1)) + min;

// better to use Math.floor than Math.trunc - because correct behavior on negative numbers

// Math min and max functions

Math.min(12, 4, 68, 2, 1);
Math.max(...[12, 4, 68, 2, 1]); // if we want to pass an array we need to spread it as single arguments

// toFixed is very cool to always present a number with .00 two decimals for example - it returns a string!

console.log((1.4556666).toFixed(2)); // 1.46 - it also does the natural math rounding
console.log((1).toFixed(2)); // 1.00
console.log((1.8333).toFixed()); // 2 - without arguments it leave just the integer - but rounds of course

// dates

const now = new Date(); // Tue Mar 12 2024 11:10:24 GMT+0100 (czas środkowoeuropejski standardowy)
const nowInMilliseconds = Date.now();
console.log(now);
console.log(nowInMilliseconds); //1710238038959
console.log(new Date(nowInMilliseconds)); // same as now

console.log(new Date(2022, 8, 2)); // months are 0 based! - 8 is actually September - 9th month
console.log(now.getFullYear());
console.log(now.getMonth()); // 2 - although it is march 3 !!!
console.log(now.getDate()); // date is actually day! - returns 12
console.log(now.getDay()); // day is actually the day of the week!
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getSeconds());

console.log(now.toISOString()); // very useful method - international standard of representing and storing dates - 2024-03-12T10:12:24.971Z

// now.setFullYear(2025); //Wed Mar 12 2025 11:13:26 GMT+0100 (czas środkowoeuropejski standardowy)
// console.log(now);

// fake user always logged in
const fakeLogIn = () => {
  currentAccount = account1;
  updateUI(currentAccount);
  containerApp.style.opacity = 100;
  setCurrentDate();
};
fakeLogIn();

function addLeadingZero(date) {
  // return date < 10 ? `0${date}` : date;
  return `${date}`.padStart(2, '0'); // better to use method to padStart always 2 digits
}

function formatDate(date, withTime = false) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${addLeadingZero(day)}/${addLeadingZero(
    month
  )}/${year}`;

  const formattedTime = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;

  return `${formattedDate}${withTime ? `, ${formattedTime}` : ''}`;
}

function formatToLocalDate(date, locale, options) {
  const localDate = new Intl.DateTimeFormat(locale, options).format(date);
  return localDate;
}

function setCurrentDate() {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  labelDate.textContent = formatToLocalDate(
    now,
    currentAccount.locale,
    options
  );
}

// how to get milliseconds from Date object? - simply convert to a Number

console.log(now); // Wed Mar 13 2024 12:48:57 GMT+0100 (czas środkowoeuropejski standardowy)
console.log(Number(now)); // 1710330537381

// we can do math operations on dates without explicitly converting them to numbers so
console.log(new Date() - new Date(2024, 3, 23)); // -3490230634

function calcDaysPassed(date1, date2) {
  return Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
}

console.log(calcDaysPassed(new Date(), new Date(2024, 2, 23))); // 9

const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: '2-digit',
  weekday: 'long', // środa, 13 marca 24 15:47
  // weekday: 'short', // śr., 13 marca 24 15:47
};

const polishDate = new Intl.DateTimeFormat('pl-PL', options).format(new Date()); // środa, 13 marca 24 15:47
console.log(polishDate); // 13.03.2024

const usaDate = new Intl.DateTimeFormat('en-US').format(new Date());
console.log(usaDate); // 3/13/2024

const spanishDate = new Intl.DateTimeFormat('es-ES').format(new Date());
console.log(spanishDate); // 13/3/2024

// Number to be formatted
const number = 1234567.89;

// Format number according to the locale 'en-US' (United States)
const formattedNumberUS = new Intl.NumberFormat('en-US').format(number);
console.log(formattedNumberUS); // Output: "1,234,567.89"

// Format number according to the locale 'fr-FR' (France)
const formattedNumberFR = new Intl.NumberFormat('fr-FR').format(number);
console.log(formattedNumberFR); // Output: "1 234 567,89" (Note: French uses non-breaking space as a separator)

const formattedNumberPL = new Intl.NumberFormat('pl-PL').format(number);
console.log(formattedNumberPL); // Output: 1 234 567,89

// how to get the browser language!

const locale = navigator.language; // same as window.navigator.language
console.log(locale); // pl-PL
