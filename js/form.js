import {mapHousingTypeToCaption} from './thumbnails.js';
import {TITLE_MAX_LENGTH,TITLE_MIN_LENGTH,
  ERROR_TEXT_TITLE_MAX_LENGTH,ERROR_TEXT_TITLE_MIN_LENGTH,ERROR_TEXT_FIRST_LETTER,
  mapHousingTypeToMinPrice, mapAmountRoomsToAmountGuests,MAX_PRICE,ERROR_TEXT_MAX_PRICE} from './constants.js' ;
import {sendData} from './fetch.js';
import {onShowSuccessMessage,onShowErrorMessage} from './messages.js';
import {closePopup,resetMarker,resetFieldAddress,resetFilters} from './map.js';
import {resetPhotos} from './photo.js';

const uploadForm = document.querySelector('.ad-form');
const fieldTitle = uploadForm.querySelector('#title');
const fieldPrice = uploadForm.querySelector('#price');
const selectHousingType = uploadForm.querySelector('#type');
const amountRooms = uploadForm.querySelector('#room_number');
const amountGuests = uploadForm.querySelector('#capacity');
const selectTimeIn = uploadForm.querySelector('#timein');
const selectTimeOut = uploadForm.querySelector('#timeout');
const priceSlider = document.querySelector('.ad-form__slider');
const uploadSubmitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const pristine = new Pristine (uploadForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextClass: 'text-help'
});

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
});

function changeButtonSubmit (boolean) {
  if (boolean) {
    return uploadSubmitButton.setAttribute('disabled','disabled');
  }
  return uploadSubmitButton.removeAttribute('disabled');
}


function isTitleLongEnough (string) {
  return string.length >= TITLE_MIN_LENGTH;
}

function isTitleShortEnough (string) {
  return string.length <= TITLE_MAX_LENGTH;
}

function validateTitleFirstLetter (string) {
  return string.length !== 0 && string[0] === string[0].toUpperCase();
}

function onValidateMaxPrice (value) {
  return value <= MAX_PRICE;
}

function onValidateMinPrice (value) {
  const typeValue = selectHousingType.value;
  return value >= mapHousingTypeToMinPrice[typeValue];
}


function onHousingTypeChange () {
  const newMinPrice = mapHousingTypeToMinPrice[this.value];
  fieldPrice.placeholder = newMinPrice;
  if (fieldPrice.value !== '') {
    pristine.validate(fieldPrice);
  }
  priceSlider.noUiSlider.updateOptions ({
    start:newMinPrice,
  });
}

function getPriceErrorMessage () {
  const typeValue = selectHousingType.value;
  return `Минимальная цена типа жилья "${mapHousingTypeToCaption[typeValue]}"
  - ${mapHousingTypeToMinPrice[typeValue]} за ночь`;
}

function amountGuestsValidate () {
  return mapAmountRoomsToAmountGuests[Number(amountRooms.value)].includes(Number(amountGuests.value));
}


function onSelectorsValidate () {
  pristine.validate(amountRooms);
  pristine.validate(amountGuests);
}

function onChangeTimeOut (evt) {
  const newValue = evt.target.value;
  selectTimeOut.value = newValue;
}

function onChangeTimeIn (evt) {
  const newValue = evt.target.value;
  selectTimeIn.value = newValue;
}


function onUpdatePriceSlider () {
  fieldPrice.value = priceSlider.noUiSlider.get().split('.')[0];
  pristine.validate(fieldPrice);
}

function onChangeSlidersHandlePosition (evt) {
  priceSlider.noUiSlider.set(evt.target.value);
}

function onResetAll () {
  changeButtonSubmit(false);
  uploadForm.reset();
  closePopup();
  resetMarker();
  resetFieldAddress();
  resetPhotos();
  resetFilters();
}

uploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    changeButtonSubmit(true);
    const formData = new FormData(evt.target);
    try {
      await sendData(formData);
      onShowSuccessMessage();
    } catch {
      onShowErrorMessage();
    }
  }
});


selectHousingType.addEventListener('change', onHousingTypeChange);
selectHousingType.addEventListener('change', onValidateMinPrice);
amountRooms.addEventListener('change',onSelectorsValidate);
amountGuests.addEventListener('change',onSelectorsValidate);
selectTimeIn.addEventListener('change', onChangeTimeOut);
selectTimeOut.addEventListener('change', onChangeTimeIn);
fieldPrice.addEventListener('change', onChangeSlidersHandlePosition);
pristine.addValidator(fieldTitle,validateTitleFirstLetter, ERROR_TEXT_FIRST_LETTER, 1, true);
pristine.addValidator(fieldTitle,isTitleLongEnough, ERROR_TEXT_TITLE_MIN_LENGTH);
pristine.addValidator(fieldTitle,isTitleShortEnough, ERROR_TEXT_TITLE_MAX_LENGTH);
pristine.addValidator(fieldPrice,onValidateMinPrice, getPriceErrorMessage);
pristine.addValidator(fieldPrice,onValidateMaxPrice, ERROR_TEXT_MAX_PRICE);
pristine.addValidator(amountGuests,amountGuestsValidate,'Неподходящее количество гостей');
priceSlider.noUiSlider.on('update', (onUpdatePriceSlider));
resetButton.addEventListener('click',onResetAll);


export {onResetAll,changeButtonSubmit};
