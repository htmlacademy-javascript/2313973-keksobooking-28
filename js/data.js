import {getRandomInteger, getRandomArbitrary,createRandomIdFromRangeGenerator,sortRandomly} from './util.js';

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

const randomAuthorCreate = createRandomIdFromRangeGenerator(1, ADS_COUNT,getRandomInteger);
const randomTitleCreate = createRandomIdFromRangeGenerator(0, TITLES.length - 1,getRandomInteger);
const randomDescriptionCreate = createRandomIdFromRangeGenerator(0, DESCRIPTIONS.length - 1,getRandomInteger);
const randomLatCreate = createRandomIdFromRangeGenerator(MAX_LAT, MIN_LAT,getRandomArbitrary);
const randomLngCreate = createRandomIdFromRangeGenerator(MAX_LNG, MIN_LNG,getRandomArbitrary);

function createAd () {
  const randomTitle = randomTitleCreate();
  const randomDescription = randomDescriptionCreate();
  const randomFeaturesArray = sortRandomly(FEATURES)
    .slice(0,(getRandomInteger(1, FEATURES.length)));
  const randomPhotosArray = sortRandomly(PHOTOS)
    .slice(0,getRandomInteger(1, PHOTOS.length));
  const randomLat = randomLatCreate();
  const randomLng = randomLngCreate();
  return {
    author: {
      avatar:`img/avatars/user0${randomAuthorCreate()}.png`
    },
    offer:{
      title: TITLES[randomTitle],
      address: `${randomLat}, ${randomLng}`,
      price: getRandomInteger(MIN_PRISE, MAX_PRISE),
      type: HOUSING_TYPES[getRandomInteger(0, HOUSING_TYPES.length - 1)],
      rooms: getRandomInteger (1, MAX_ROOMS),
      guests: getRandomInteger (1, MAX_GUESTS),
      checkin:HOURS[getRandomInteger(0, HOURS.length - 1)],
      checkout:HOURS[getRandomInteger(0, HOURS.length - 1)],
      features: randomFeaturesArray,
      description: DESCRIPTIONS[randomDescription],
      photos: randomPhotosArray
    },
    location: {
      lat: randomLat,
      lng: randomLng
    }
  };
}
const createAdsArray = () => Array.from({length: 10}, createAd);

export {createAdsArray};
