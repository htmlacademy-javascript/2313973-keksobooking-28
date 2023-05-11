import {mapHousingTypeToCaption} from './thumbnails.js';

const TITLE_MAX_LENGTH = 100;
const TITLE_MIN_LENGTH = 30;

const ERROR_TEXT_TITLE_MAX_LENGTH = 'Слишком длинное название(Максимум - 100 символов)';
const ERROR_TEXT_TITLE_MIN_LENGTH = 'Слишком короткое название(Минимум - 30 символов)';

const uploadForm = document.querySelector('.ad-form');
const fieldTitile = uploadForm.querySelector('#title');
const fieldPrice = uploadForm.querySelector('#price');
const selectHousingType = uploadForm.querySelector('#type');
const amountRooms = uploadForm.querySelector('#room_number');
const amountGuests = uploadForm.querySelector('#capacity');
const selectTimeIn = uploadForm.querySelector('#timein');
const selectTimeOut = uploadForm.querySelector('#timeout');


const mapTypeToMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const mapCountRoomsToAmountGuests = {
  '1': ['1'],
  '2': ['2','1'],
  '3': ['3', '2', '1'],
  '100':['0']
};

function amountGuestsValidate () {
  return mapCountRoomsToAmountGuests[amountRooms.value].includes(amountGuests.value);
}

const pristine = new Pristine (uploadForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid'
});

function isTitleLongEnough (string) {
  return string.length >= TITLE_MIN_LENGTH;
}

function isTitleShortEnough (string) {
  return string.length <= TITLE_MAX_LENGTH;
}

function validateMinPrice () {
  return fieldPrice.value >= mapTypeToMinPrice[selectHousingType.value];
}

function onHusingTypeChange () {
  fieldPrice.placeholder = mapTypeToMinPrice[this.value];
}

function getPriceErrorMessage () {
  const typeValue = selectHousingType.value;
  return `Минимальная цена типа жилья "${mapHousingTypeToCaption[typeValue]}"
  - ${mapTypeToMinPrice[typeValue]} за ночь`;
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
selectTimeIn.addEventListener('change', onChangeTimeOut);
selectTimeOut.addEventListener('change', onChangeTimeIn);


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
}
);

pristine.addValidator(fieldTitile,isTitleLongEnough, ERROR_TEXT_TITLE_MIN_LENGTH);
pristine.addValidator(fieldTitile,isTitleShortEnough, ERROR_TEXT_TITLE_MAX_LENGTH);
pristine.addValidator(fieldPrice,validateMinPrice, getPriceErrorMessage);
pristine.addValidator(amountGuests,amountGuestsValidate,'Неподходящее количество гостей');
