import {mapHousingTypeToCaption} from './thumbnails.js';
import {TITLE_MAX_LENGTH,TITLE_MIN_LENGTH,
  ERROR_TEXT_TITLE_MAX_LENGTH,ERROR_TEXT_TITLE_MIN_LENGTH,ERROR_TEXT_FIRST_LETTER,
  mapHousingTypeToMinPrice, mapAmountRoomsToAmountGuests,MAX_PRICE,ERROR_TEXT_MAX_PRICE} from './constants.js' ;

const uploadForm = document.querySelector('.ad-form');
const fieldTitle = uploadForm.querySelector('#title');
const fieldPrice = uploadForm.querySelector('#price');
const selectHousingType = uploadForm.querySelector('#type');
const amountRooms = uploadForm.querySelector('#room_number');
const amountGuests = uploadForm.querySelector('#capacity');
const selectTimeIn = uploadForm.querySelector('#timein');
const selectTimeOut = uploadForm.querySelector('#timeout');
const priceSlider = document.querySelector('.ad-form__slider');

const pristine = new Pristine (uploadForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextClass: 'text-help'
});

function isTitleLongEnough (string) {
  return string.length >= TITLE_MIN_LENGTH;
}

function isTitleShortEnough (string) {
  return string.length <= TITLE_MAX_LENGTH;
}

function validateTitleFirstLetter (string) {
  return string.length !== 0 && string[0] === string[0].toUpperCase();
}

function validateMaxPrice (value) {
  return value <= MAX_PRICE;
}

function validateMinPrice (value) {
  const typeValue = selectHousingType.value;
  return value >= mapHousingTypeToMinPrice[typeValue];
}

function onHusingTypeChange () {
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

function SelectorsValidate () {
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

selectHousingType.addEventListener('change', onHusingTypeChange);
selectHousingType.addEventListener('change', validateMinPrice);
amountRooms.addEventListener('change',SelectorsValidate);
amountGuests.addEventListener('change',SelectorsValidate);
selectTimeIn.addEventListener('change', onChangeTimeOut);
selectTimeOut.addEventListener('change', onChangeTimeIn);


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();
  if (isFormValid) {
    uploadForm.submit();
  }
}
);

pristine.addValidator(fieldTitle,validateTitleFirstLetter, ERROR_TEXT_FIRST_LETTER, 1, true);
pristine.addValidator(fieldTitle,isTitleLongEnough, ERROR_TEXT_TITLE_MIN_LENGTH);
pristine.addValidator(fieldTitle,isTitleShortEnough, ERROR_TEXT_TITLE_MAX_LENGTH);

pristine.addValidator(fieldPrice,validateMinPrice, getPriceErrorMessage);
pristine.addValidator(fieldPrice,validateMaxPrice, ERROR_TEXT_MAX_PRICE);

pristine.addValidator(amountGuests,amountGuestsValidate,'Неподходящее количество гостей');

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
});

function onUpdatePriceSlider () {
  fieldPrice.value = priceSlider.noUiSlider.get().split('.')[0];
  pristine.validate(fieldPrice);
}

priceSlider.noUiSlider.on('update', (onUpdatePriceSlider));
