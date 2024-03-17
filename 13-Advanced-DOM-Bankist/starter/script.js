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
//document.getElementById('section--1').remove();

console.log(document.getElementsByClassName('section')); // after removing it is 3 - but you must console.log again - it doesn't just happen!

// const cookieMessage = document.createElement('div');
// cookieMessage.classList.add('cookie-message');
// cookieMessage.innerHTML = `We are using cookies for improved functionality and analytics.<button class='btn btn--close-cookie'>Got it!</button>`;

const header = document.querySelector('.header');
//header.append(cookieMessage); // adds as the last child of header
// header.prepend(cookieMessage); // adds as the first child of header
// header.before(cookieMessage); // adds as sibling before header
// header.after(cookieMessage); // adds as sibling after header - overwriting would execute only once the last statement!

// if we actually want in more than one place to add element

// header.before(cookieMessage.cloneNode(true)); // cloning is done on node that needs to be cloned and true means clone with all children

// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   cookieMessage.remove(); // new method
//   // cookieMessage.parentElement.removeChild(cookieMessage); // this was before new method remove()
// });

// cookieMessage.style.backgroundColor = '#37383d';

// we can only access inline styles like this
//console.log(cookieMessage.style.backgroundColor); // rgb(55, 56, 61)

// styles from css we access like this
// console.log(getComputedStyle(cookieMessage).color); // rgb(187, 187, 187)

// getComputedStyle can be also used to access automatically computed styles by the browser - e.g. height

// we need to parseFloat because getComputedStyle .height returns a string like 30px

// cookieMessage.style.height =
//   parseFloat(getComputedStyle(cookieMessage).height) + 30 + 'px';

// document.documentElement - returns the entire HTML as object
console.log(document.documentElement);

// in css

// :root { // means attached to root element - document.documentElement
//   --color-primary: #5ec576;
//   --color-secondary: #ffcb03;

// }
// document.documentElement.style.setProperty('--color-primary', 'blue');

// how to access and modify attributes ?

{
  /* <img
src="img/logo.png"
alt="Bankist logo"
class="nav__logo"
id="logo"
designer="Jonas"
data-testid="logo"
data-release-version="2.3"
/> */
}

const logo = document.getElementById('logo');
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png - this is always absolute path

// how to get the real value of src

console.log(logo.getAttribute('src')); // img/logo.png - this is the actual value set in html

// how to read a custom attribute added to html element?
console.log(logo.designer); // undefined - not like that

console.log(logo.getAttribute('designer')); // Jonas - like that

// how to read data- attributes

console.log(logo.dataset); // DOMStringMap {testid: 'logo', releaseVersion: '2.3'} // in dataset there will be all attributes starting with data-, all in camelCase
console.log(logo.dataset.testid); // logo
console.log(logo.dataset.releaseVersion); // 2.3

// how to get the class attribute - not class but className

console.log(logo.className); //nav__logo
console.log(logo.id); // logo

// how to create new attributes?

logo.setAttribute('size', '1920x1080');

/* <img src="img/logo.png" alt="Bankist logo" class="nav__logo" id="logo" designer="Jonas" data-testid="logo" data-release-version="2.3" size="1920x1080"></img> */

// relative vs absolute path also in href

const link = document.querySelector('.nav__link');
console.log(link.href); // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/index.html#section--1 - absolute
console.log(link.getAttribute('href')); // #section--1 - relative

// classes

logo.classList.add('c'); // we can also add multiple class names .add('c', 'b')
logo.classList.remove('c');
logo.classList.toggle('c'); // if there is a 'c' class remove it, if there is no 'c' class add it
logo.classList.contains('c'); // not includes as in js!

// scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  // deprecated window.pageXOffset, pageYOffset - still works
  console.log(scrollX, scrollY); // at the top 0 0, scrolling down a little bit 0 240
  console.log(document.documentElement.clientWidth); // 2031 - on 100% zoom
  console.log(document.documentElement.clientHeight); // 983 - on 1000% zoom

  // html element coords
  console.log(e.target.getBoundingClientRect());
  console.log(section1.getBoundingClientRect());

  const { left, top } = section1.getBoundingClientRect();

  // modern easy way of scrolling without specifying the coors
  section1.scrollIntoView({ behavior: 'smooth' });

  // old way
  // window.scrollTo({
  //   left: left + scrollX,
  //   top: top + scrollY,
  //   behavior: 'smooth',
  // });
});

// event propagation - event first goes up to the root than is captured as going down to the target element, then the bubbling phase going through all parent elements

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + 1);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log(this); // <a class="nav__link" href="#section--1">Features</a> - we cannot use arrow function because then this points to window object!
//   console.log(e.currentTarget); // <a class="nav__link" href="#section--1">Features</a>
//   console.log(this === e.currentTarget); // true
//   console.log(e.target); // this is the origin of the event - where it was actually clicked first
//   this.style.backgroundColor = randomColor();
//   //e.stopPropagation(); // if we do this the event won't travel up to the parent elements - but it is not advised to do!
// });

// // when I click on nav__link - all its parents are also going to react to this event
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log(e.currentTarget); // <a class="nav__link" href="#section--1">Features</a>
//   console.log(e.target); // this is the origin of the event - where it was actually clicked first
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log(e.currentTarget); // <a class="nav__link" href="#section--1">Features</a>
//   console.log(e.target); // this is the origin of the event - where it was actually clicked first
//   this.style.backgroundColor = randomColor();
// });

// the easy way - add event listener with for each - less performance
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // prevent auto scroll into the element that contains this id
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// do event delegation instead
// select the parent element
// add event listener on e.target - so where exactly the click happened

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // if the origin of the click happened in one of the links - child of nav_links container
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
const h1 = document.querySelector('h1');
console.log(h1.closest('.header'));
console.log(h1.firstElementChild);

// how to get all the siblings ?
// trick to get the children of the parentElement
// but it also includes the element itself
console.log(h1.parentElement.children); // HTMLCollection does not have forEach!

// tab element

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clickedBtn = e.target.closest('button'); // or closest(.operations__tab)
  // Guard Clause - modern way to exist a function early - otherwise keep going
  if (!clickedBtn) return;
  //clickedBtn.classList.toggle('operations__tab--active'); // add active class to the tab just clicked
  // but also remove active class from all the other tabs
  const activeDataId = clickedBtn.dataset.tab;
  // [...this.children]
  //   .filter(el => el.dataset.tab !== activeDataId)
  //   .forEach(sibling => sibling.classList.remove('operations__tab--active'));

  // better way - first remove all active classes from all elements, then just add to one
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedBtn.classList.add('operations__tab--active');

  const clickedTabContent = document.querySelector(
    `.operations__content--${activeDataId}`
  );
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  clickedTabContent.classList.add('operations__content--active');
});

// change opacity on link hover

const nav = document.querySelector('.nav');
console.log(nav);

const handleHoverNavLink = function (e) {
  // this keyword after binding is the 'argument'
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const logo = link.closest('.nav').querySelector('img');
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    logo.style.opacity = this;
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

// nav.addEventListener('mouseover', function (e) {
//   console.log(e.target); // e.target can be many things depending on what exactly we are hovering over
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     // how to get all siblings - go to the common parent and find all links
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     console.log('siblings', siblings);

//     // we want all siblings to have less opacity
//     siblings.forEach(el => {
//       // apply to all siblings not to the element itself
//       if (el !== link) el.style.opacity = 0.5;
//     });

//     // and the logo
//     const logo = link.closest('.nav').querySelector('img');
//     // const logo = document.querySelector('img'); this would be too generic and would affect all img on the page
//     // const logo = nav.querySelector('img'); this would also work
//     // const logo = this.querySelector('img'); this also works as this it bound to nav - the element that the addEventListener was attached to
//     logo.style.opacity = 0.5;
//   }
// });

// this would work but there is a better cleaner solution
// nav.addEventListener('mouseover', e => {
//   handleHoverNavLink(e, 0.5);
// });
// nav.addEventListener('mouseout', e => {
//   handleHoverNavLink(e, 1);
// });

nav.addEventListener('mouseover', handleHoverNavLink.bind(0.5));
nav.addEventListener('mouseout', handleHoverNavLink.bind(1));

// bind returns a new function with the same body but different this reference - what we specify in parameter
// we could also pass an object or an array as this

// sticky navigation

console.log(window.scrollY);
console.log(section1);

const section1Coords = section1.getBoundingClientRect();

// this is not a good practice - affecting performance
// window.addEventListener('scroll', () => {
//   console.log(window.scrollY);
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

const navHeight = nav.getBoundingClientRect().height;

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observerCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(header);
