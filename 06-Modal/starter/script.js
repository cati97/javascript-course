'use strict';

const showModalButtons = document.querySelectorAll('.show-modal');

const modal = document.querySelector('.modal'); // change style to display: block on event click on any of showModalButtons
const closeBtn = document.querySelector('.close-modal'); // add event handler to change style to display hidden again on click
const overlay = document.querySelector('.overlay'); // add event handler to change style to display hidden again on click

const handleOpenModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const handleCloseModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const handleEscapePress = event => {
  if (event.key === 'Escape') {
    handleCloseModal();
  }
};

showModalButtons.forEach(btn => {
  btn.addEventListener('click', handleOpenModal);
});

closeBtn.addEventListener('click', handleCloseModal);

overlay.addEventListener('click', handleCloseModal);

document.addEventListener('keydown', handleEscapePress);
