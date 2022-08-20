'use strict';
import config from '../../../config.json';
const secureToken = config.secureToken;

/* SmtpJS.com - v3.0.0 */
//var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

const form = document.querySelector('.contact-me__form');
const button = document.querySelector('.btn');
button.setAttribute('disabled', 'disabled');
// const tel = document.querySelector('.input-tel');
// const message = document.querySelector('.input-message');

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const toggleModal = () => {
  modal.classList.toggle("show-modal");
}

const windowOnClick = (event) => {
  if (event.target === modal) {
      toggleModal();
  }
}

const formValidate = () => {
  let error = 0;
  const formRequired = document.querySelectorAll('.required');

  formRequired.forEach((elementReq) => {
    removeFormError(elementReq);

    if ((elementReq.getAttribute('type') === 'checkbox' && elementReq.checked === false) || (elementReq.value.trim() === '')) {
      addFormError(elementReq);
      error += 1;
    }
  });
  return error;
};

const addFormError = (input) => {
  input.parentElement.classList.add('error');
  input.classList.add('error');
};

const removeFormError = (input) => {
  input.parentElement.classList.remove('error');
  input.classList.remove('error');
};

const contactMeFormCheck = (e) => {

  const erorr = formValidate();

  const formData = new FormData(form);
    formData.append(e.target.name, e.target.value);
    const data =  [...formData.values()];
    console.log(data);

  if (!erorr) {
    button.removeAttribute('disabled', 'disabled');
  } else {
    button.setAttribute('disabled', 'disabled');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // const formData = new FormData(form);
    // formData.append(e.target.name, e.target.value);
    // const data =  [...formData.values()];
    // console.log(data);

    if (!erorr) {
      modal.classList.remove('show-modal');
    }

    Email.send({
      secureToken,
      To : 'm4stergarden@yandex.ru',
      From : 'arturarzhannikov93@gmail.com',
      Subject : "Contact Me",
      Body : data,
    }).then(
    message => alert(message)
    );
    form.reset();
  })

};

form.addEventListener('input', contactMeFormCheck);
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
// Object.entries(data).map(([key, value]) => `${key} : ${value}`).join(',<br>')
