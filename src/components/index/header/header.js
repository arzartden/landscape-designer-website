'use strict';

const burgerMenu = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');
const headerBefore = document.querySelector('.header', ':before');

const burgerMenuHandler = () => {
  burgerMenu.classList.toggle('active');
  headerMenu.classList.toggle('active');
  body.classList.toggle('lock');
};

const fixingHeader = () => {
  if (window.pageYOffset > headerBefore.offsetTop) {
    headerBefore.style.boxShadow = '0px 5px 5px 0px rgba(78,78,78,0.1)';
    headerBefore.style.transition= 'box-shadow 0.3s ease-in-out';
  } else {
    headerBefore.style.boxShadow = 'none';
  }
};

burgerMenu.addEventListener('click', burgerMenuHandler);

window.onscroll = fixingHeader;
