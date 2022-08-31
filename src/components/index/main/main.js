'use strict';

import intro from './_intro/intro.html';
import social from './_social/social.html';
import aboutMe from './_about-me/about-me.html';
import services from './_services/services.html';
import portfolio from './_portfolio/portfolio.html';
import contactMe from './_contact-me/contact-me.html';

const main = document.querySelector('.main');
main.innerHTML = intro + social + aboutMe + services + portfolio + contactMe;
