'use strict';

import config from '../../../config.json';

const SecureToken = config.secureToken;
const To = config.emailTo;
const From = config.emailFrom;

/* SmtpJS.com - v3.0.0 */
//var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

const form = document.querySelector('.contact-me__form');
const button = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal-text');
const closeButton = document.querySelector('.close-button');

const toggleModal = () => {
  modal.classList.toggle('show-modal');
}
const windowOnClick = (event) => {
  if (event.target === modal) {
    toggleModal();
  }
}

const getInputErrCount = () => {
  let error = 0;

  const inputRequired = document.querySelectorAll('.required');

  inputRequired.forEach((elementReq) => {
    elementReq.parentElement.classList.remove('error');
    elementReq.classList.remove('error');

    if ((elementReq.getAttribute('type') === 'checkbox' && elementReq.checked === false) || (elementReq.value.trim() === '')) {
      elementReq.parentElement.classList.add('error');
      elementReq.classList.add('error');

      error += 1;
    }
  });

  return error;
};
const getButtonStatus = () => {

  const inputErr = getInputErrCount();

  if (!inputErr) {
    button.removeAttribute('disabled', 'disabled');
  } else {
    button.setAttribute('disabled', 'disabled');
  }
};

form.addEventListener('input', getButtonStatus);
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append(e.target.name, e.target.value);

  const clientName =  formData.get(('name'));
  const clienTel =  formData.get(('tel'));
  const clientMessage =  formData.get(('message'));

  const data = `мое имя: ${clientName} <br> мой телефон: ${clienTel} <br> мое сообщение: ${clientMessage}`;

  Email.send({
    SecureToken,
    To,
    From,
    Subject : "НОВОЕ СООБЩЕНИЕ ОТ КЛИЕНТА!",
    Body : data,
  }).then(
  message => {
    if (message === 'OK') {
      modalText.innerHTML = 'Ваши данные успешно отправлены.'
      modal.classList.toggle("show-modal");
    } else {
      modalText.innerHTML = `Ошибка отправки данных. Попробуйте снова <br>
      или свяжитесь со мной в <a href="https://wa.me/+79339952283" class="whatsapp__link" target="_blank">Whatsapp</a>, 
      <a href="https://t.me/M4sterGarden" class="telegram__link" target="_blank">Telegram,</a><br>
      либо просто позвоните <a href="tel:+79339952283" class="tel__link">+7 933 995 22-83</a>.`;
      modal.classList.toggle("show-modal"); 
    }
  }
  );
  form.reset();
  button.setAttribute('disabled', 'disabled');
});

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

