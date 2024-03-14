'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // prevent from jumping as this is default behavior for links
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// NodeList has forEach method!
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.getElementById('section--1')); // no need to add hash # because method already says by Id - id is unique so it select only one element
console.log(document.getElementsByClassName('section')); // without the dot!

// it returns a live HTMLCollection which updates automatically compared to NodeList if we remove or add something

// HTMLCollection(4) [section#section--1.section,
// section#section--2.section, section#section--3.section, section.section.section--sign-up, section--1: section#section--1.section,
// section--2: section#section--2.section, section--3: section#section--3.section]
document.getElementById('section--1').remove();

console.log(document.getElementsByClassName('section')); // after removing it is 3 - but you must console.log again - it doesn't just happen!

const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML = `We are using cookies.<button class='btn btn--close-cookie'>Got it!</button>`;

const header = document.querySelector('.header');
header.append(cookieMessage); // adds as the last child of header
// header.prepend(cookieMessage); // adds as the first child of header
// header.before(cookieMessage); // adds as sibling before header
// header.after(cookieMessage); // adds as sibling after header - overwriting would execute only once the last statement!

// if we actually want in more than one place to add element

// header.before(cookieMessage.cloneNode(true)); // cloning is done on node that needs to be cloned and true means clone with all children

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  cookieMessage.remove(); // new method
  // cookieMessage.parentElement.removeChild(cookieMessage); // this was before new method remove()
});
