'use strict';
import header from './components/header/header.html';
import main from './components/main/main.html';
import footer from './components/footer/footer.html';
import './index.scss';

const wrapper = document.querySelector('.wrapper');
wrapper.innerHTML = header + main + footer;

const menuBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');

const handler = () => {
  menuBurger.classList.toggle('active');
  headerMenu.classList.toggle('active');
  body.classList.toggle('lock');
};

menuBurger.addEventListener('click', handler);