import {HOUSE_TYPE_CAPTION_MAP} from './constants.js';

const TITLE_MAX_LENGTH = 100;
const TITLE_MIN_LENGTH = 30;

const ERROR_TEXT_TITLE_MAX_LENGTH = 'Слишком длинное название(Максимум - 100 символов)';
const ERROR_TEXT_TITLE_MIN_LENGTH = 'Слишком короткое название(Минимум - 30 символов)';

const uploadForm = document.querySelector('.ad-form');
const fieldTitile = uploadForm.querySelector('#title');
const fieldPrice = uploadForm.querySelector('#price');
const selectorHousingType = uploadForm.querySelector('#type');
const amountRooms = uploadForm.querySelector('#room_number');
const amountGuests = uploadForm.querySelector('#capacity');
const selectorTimeIn = uploadForm.querySelector('#timein');
const selectorTimeOut = uploadForm.querySelector('#timeout');
const submitAdButton = uploadForm.querySelector('.ad-form__submit');


const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const amountGuestsOption = {
  '1': ['1'],
  '2': ['2','1'],
  '3': ['3', '2', '1'],
  '100':['0']
};

function amountGuestsValidate () {
  return amountGuestsOption[amountRooms.value].includes(amountGuests.value);
}

const pristine = new Pristine (uploadForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

function isTitleLongEnough (string) {
  return string.length >= TITLE_MIN_LENGTH;
}

function isTitleShortEnough (string) {
  return string.length <= TITLE_MAX_LENGTH;
}

function validateMinPrice (value) {
  const typeValue = selectorHousingType.value;
  return value >= minPrice[typeValue];
}

function onMinPriceChange () {
  fieldPrice.placeholder = minPrice[this.value];
  pristine.validate(fieldPrice);
}

function getPriceErrorMessage () {
  const typeValue = selectorHousingType.value;
  return `Минимальная цена типа жилья "${HOUSE_TYPE_CAPTION_MAP[typeValue]}"
  - ${minPrice[typeValue]} за ночь`;
}

function SelectorsValidate () {
  pristine.validate(amountRooms);
  pristine.validate(amountGuests);
}

selectorHousingType.addEventListener('change', onMinPriceChange);
amountRooms.addEventListener('change',SelectorsValidate);
amountGuests.addEventListener('change',SelectorsValidate);
selectorTimeIn.addEventListener('change',(evt) => {
  const newValue = evt.target.value;
  selectorTimeOut.value = newValue;
});
selectorTimeOut.addEventListener('change',(evt) => {
  const newValue = evt.target.value;
  selectorTimeIn.value = newValue;
});

submitAdButton.addEventListener('submit', (evt) =>
  evt.preventDefault(),
pristine.validate()
);

pristine.addValidator(fieldTitile,isTitleLongEnough, ERROR_TEXT_TITLE_MIN_LENGTH);
pristine.addValidator(fieldTitile,isTitleShortEnough, ERROR_TEXT_TITLE_MAX_LENGTH);
pristine.addValidator(fieldPrice,validateMinPrice, getPriceErrorMessage);
pristine.addValidator(amountGuests,amountGuestsValidate,'Неподходящее количество гостей');
