'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = account => {
  containerMovements.innerHTML = ''; // empty the movements container before start

  account.movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = account => {
  const balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
};

const displaySummary = account => {
  const { movements, interestRate } = account;
  const sumIn = movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${sumIn}€`;

  const sumOut = movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(sumOut)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * interestRate) / 100)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = accountsArr => {
  accountsArr.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const getBalance = account => {
  return account.movements.reduce((acc, curr) => acc + curr, 0);
};

createUsernames(accounts);

const updateUI = account => {
  displayBalance(account);
  displaySummary(account);
  displayMovements(account);
};

const clearInput = inputElement => {
  inputElement.value = '';
  inputElement.blur(); // lose focus
};

const logoutUser = () => {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
};
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault(); // default behavior of a button inside a form element is to reload the page after click
  // any input inside a form on enter press triggers the submit btn
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  // console.log(accounts); // now reload doesn't happens so I can see the result
  currentAccount = accounts.find(acc => acc.username === username);
  if (!currentAccount) {
    alert(`User not found!`);
    logoutUser();
  } else {
    if (currentAccount.pin === pin) {
      labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(' ')[0]
      }!`;
      containerApp.style.opacity = 100; // display main container
      displayBalance(currentAccount);
      displaySummary(currentAccount);
      displayMovements(currentAccount);

      clearInput(inputLoginUsername);
      clearInput(inputLoginPin);
    } else {
      alert(`Wrong password!`);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const transferTo = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === transferTo);

  if (
    amount > 0 &&
    getBalance(currentAccount) >= amount &&
    receiverAccount &&
    receiverAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    alert(`Invalid transfer!`);
  }

  clearInput(inputTransferTo);
  clearInput(inputTransferAmount);
});

const closeAccount = account => {
  const foundAccIndex = accounts.findIndex(
    acc => acc.username === account.username
  );
  accounts.splice(foundAccIndex, 1); // removes/mutates the original array
};

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const confirmUsername = inputCloseUsername.value;
  const confirmPIN = Number(inputClosePin.value);

  if (
    confirmUsername === currentAccount.username &&
    confirmPIN === currentAccount.pin
  ) {
    closeAccount(currentAccount);
    alert('Account closed!');
    logoutUser();
  } else {
    alert('Invalid data!');
  }
  clearInput(inputCloseUsername);
  clearInput(inputClosePin);
});
