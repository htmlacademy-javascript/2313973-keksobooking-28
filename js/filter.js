import {filterAds} from './map.js';
import {MAX_PRICE} from './constants.js';
import {mapFilter} from './activate.js';

const housingTypeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const guestsFilter = mapFilter.querySelector('#housing-guests');
const featuresFilter = mapFilter.querySelector('#housing-features');

const priceValueToFilterValue = {
  any: [],
  middle: [10000, 50000],
  low: [0, 10000],
  high:[50000, MAX_PRICE]
};

let activeFeaturesValue = [];

housingTypeFilter.addEventListener('change', (evt) => {
  filterAds('type', evt.target.value);
});

priceFilter.addEventListener('change', (evt) => {
  filterAds('price', priceValueToFilterValue[evt.target.value]);
});

roomsFilter.addEventListener('change', (evt) => {
  filterAds('rooms', evt.target.value);
});

guestsFilter.addEventListener('change', (evt) => {
  filterAds('guests', evt.target.value);
});

featuresFilter.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (activeFeaturesValue.includes(newValue)) {
    activeFeaturesValue = activeFeaturesValue.filter((item) => item !== newValue);
  } else {
    activeFeaturesValue = [...activeFeaturesValue, newValue];
  }
  filterAds('features', activeFeaturesValue);
});

