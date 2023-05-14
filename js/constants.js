const ADS_COUNT = 10;
const MAX_ROOMS = 10;
const MAX_GUESTS = 8;
const MIN_PRISE = 10000;
const MAX_PRISE = 150000;
const MAX_LAT = 35.65000;
const MIN_LAT = 35.70000;
const MAX_LNG = 139.70000;
const MIN_LNG = 139.80000;


const TITLES = ['Уютное гнездышко', 'Комфортное место', 'Удобное жилье', 'Рай для отдыха','Комфортабельные апартаменты','Прекрасный вид','Тихое пристанище',
  'Красивый дом','Новое жилище','Высший класс'];
const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow','hotel'];
const HOURS = ['12:00','13:00','14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Центр города','Прекрасный вид из окна',
  'Рядом парк','Все включено','Для молодых семей', 'Недалеко от пляжа', 'Возле площади',
  'Новый ремонт','Тихие соседи','Удобная парковка'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

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

export {ADS_COUNT,MAX_ROOMS,MAX_GUESTS, MIN_PRISE,MAX_PRISE,
  MAX_LAT, MIN_LAT, MAX_LNG, MIN_LNG,TITLES,
  HOUSING_TYPES,HOURS,FEATURES,DESCRIPTIONS,PHOTOS,TITLE_MAX_LENGTH,TITLE_MIN_LENGTH,
  ERROR_TEXT_TITLE_MAX_LENGTH,ERROR_TEXT_TITLE_MIN_LENGTH,
  mapHousingTypeToMinPrice, mapAmountRoomsToAmountGuests,ERROR_TEXT_FIRST_LETTER,
  MAX_PRICE,ERROR_TEXT_MAX_PRICE};
