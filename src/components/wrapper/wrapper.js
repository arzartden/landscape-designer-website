'use strict';
import header from '../header/header.html';
import main from '../main/main.html';
import footer from '../footer/footer.html';

const wrapper = document.querySelector('.wrapper');
wrapper.innerHTML = header + main + footer;