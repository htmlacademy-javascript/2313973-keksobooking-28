import {getRandomInteger, getRandomArbitrary,createRandomIdFromRangeGenerator,sortRandomly} from './util.js';
import {ADS_COUNT,MAX_ROOMS,MAX_GUESTS, MIN_PRISE,MAX_PRISE,
  MAX_LAT, MIN_LAT, MAX_LNG, MIN_LNG,TITLES,
  HOUSING_TYPES,HOURS,FEATURES,DESCRIPTIONS,PHOTOS } from './constants.js';

const randomAuthorCreate = createRandomIdFromRangeGenerator(1, ADS_COUNT,getRandomInteger);
const randomTitleCreate = createRandomIdFromRangeGenerator(0, TITLES.length - 1,getRandomInteger);

function createAd () {
  const numberAvatar = String(randomAuthorCreate());
  const randomTitle = randomTitleCreate();
  const randomFeaturesArray = sortRandomly(FEATURES)
    .slice(0,(getRandomInteger(1, FEATURES.length)));
  const randomPhotosArray = sortRandomly(PHOTOS)
    .slice(0,getRandomInteger(1, PHOTOS.length));
  const randomLat = getRandomArbitrary(MAX_LAT, MIN_LAT);
  const randomLng = getRandomArbitrary(MAX_LNG, MIN_LNG);
  return {
    author: {
      avatar:`img/avatars/user${numberAvatar.padStart(2, '0')}.png`
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
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
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
