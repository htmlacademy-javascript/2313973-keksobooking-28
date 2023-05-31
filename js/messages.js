import {ALERT_SHOW_TIME} from './constants.js';
import {isEscapeKey} from './util.js';
import {onResetAll,changeButtonSubmit} from './form.js';

const succesMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorMessageButton = errorMessage.querySelector('.error__button');

document.body.append(succesMessage);
succesMessage.classList.add('hidden');
document.body.append(errorMessage);
errorMessage.classList.add('hidden');


function onDocumentKeydownSuccess (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseSuccessMessage ();
  }
}

function onDocumentKeydownError (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseErrorMessage ();
  }
}

function onCloseSuccessMessage () {
  succesMessage.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  document.removeEventListener('click',onCloseSuccessMessage);
  onResetAll();
}

function onCloseErrorMessage () {
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydownError);
  document.removeEventListener('click',onCloseErrorMessage);
}

function onShowSuccessMessage () {
  succesMessage.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.addEventListener('click',onCloseSuccessMessage);
}

function onShowErrorMessage () {
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click',onCloseErrorMessage);
  errorMessageButton.addEventListener('click',onCloseErrorMessage);
  changeButtonSubmit(false);
}

const messageContainer = document.createElement('div');
messageContainer.style.zIndex = '100';
messageContainer.style.position = 'absolute';
messageContainer.style.left = '0';
messageContainer.style.top = '0';
messageContainer.style.right = '0';
messageContainer.style.padding = '10px 3px';
messageContainer.style.fontSize = '30px';
messageContainer.style.color = '#ffffff';
messageContainer.style.fontFamily = '"Roboto", "Arial", sans-serif';
messageContainer.style.textAlign = 'center';
messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
messageContainer.classList.add('hidden');
document.body.append(messageContainer);

function showAlert(message) {
  messageContainer.classList.remove('hidden');
  messageContainer.textContent = message;
  setTimeout(() => {
    messageContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {showAlert,onShowSuccessMessage,onShowErrorMessage};
