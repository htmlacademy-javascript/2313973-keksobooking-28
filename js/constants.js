const ALERT_SHOW_TIME = 5000;
const TITLE_MAX_LENGTH = 100;
const TITLE_MIN_LENGTH = 30;
const MAX_PRICE = 100000;
const ERROR_TEXT_TITLE_MAX_LENGTH = 'Слишком длинное название (Не более 100 символов)';
const ERROR_TEXT_TITLE_MIN_LENGTH = 'Слишком короткое название (Не менее 30 символов)';
const ERROR_TEXT_FIRST_LETTER = 'Сообщение должно начинаться с заглавной буквы';
const ERROR_TEXT_MAX_PRICE = `Цена должна быть не более ${MAX_PRICE}`;

const mapHousingTypeToMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const mapAmountRoomsToAmountGuests = {
  1: [1],
  2: [1,2],
  3: [1, 2, 3],
  100:[0]
};

export {TITLE_MAX_LENGTH,TITLE_MIN_LENGTH,
  ERROR_TEXT_TITLE_MAX_LENGTH,ERROR_TEXT_TITLE_MIN_LENGTH,
  mapHousingTypeToMinPrice, mapAmountRoomsToAmountGuests,ERROR_TEXT_FIRST_LETTER,
  MAX_PRICE,ERROR_TEXT_MAX_PRICE,ALERT_SHOW_TIME};
