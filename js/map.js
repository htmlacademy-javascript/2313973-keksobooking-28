import {activiteWebPage} from './activate.js';
import {getAdPopup} from './thumbnails.js';
import {DEBOUNCE_TIMEOUT} from './constants.js';
import {debounce} from './util.js';
import {mapFilter} from './activate.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const cityCenter = {
  lat: 35.68948,
  lng: 139.69170,
};

const ADS_PIN_PANE = 'ads-pins';
const COUNT_AD_ON_MAP = 10;
const ANY_FILTER_VALUE = 'any';

const activeFilters = {
  features: [],
  type: ANY_FILTER_VALUE,
  price: [],
  rooms: ANY_FILTER_VALUE,
  guests: ANY_FILTER_VALUE
};

const map = L.map('map-canvas').on('load', () => {
  activiteWebPage();
}).setView(cityCenter, ZOOM);

map.createPane(ADS_PIN_PANE);

L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26,52],
});

const marker = L.marker(cityCenter, {
  draggable: true,
  icon: mainPinIcon,
  autoPan: true,
  autoPanPadding: L.point([100,100])
});
marker.addTo(map);

const pinIcon = L.icon ({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20,40],
  popupAnchor: [0, -20]
});

let ads = [];

function renderAdsPins (items) {
  items.map((item) =>
    L.marker(item.location,{icon: pinIcon, pane: ADS_PIN_PANE})
      .bindPopup(getAdPopup(item))
      .addTo(map)
  );
}

function initAds (newAds) {
  ads = newAds;
  renderAdsPins(ads.slice(0, COUNT_AD_ON_MAP));
}

const rerenderAds = debounce(() => {
  closePopup();
  const oldPins = map.getPane(ADS_PIN_PANE).querySelectorAll('.leaflet-marker-icon');
  oldPins.forEach((pin) => pin.remove());
  renderAdsPins(ads.filter((ad)=> Object.entries(activeFilters).every(([key,value]) => {
    if (key === 'price') {
      if (value.length === 0) {
        return true;
      }
      return ad.offer.price >= value[0] && ad.offer.price < value[1];
    }
    if (key === 'features') {
      if (value.length === 0) {
        return true;
      }
      if (ad.offer.features === undefined) {
        return false;
      }
      return value.every((feature) => ad.offer.features.includes(feature));
    }
    if (key === 'rooms' || key === 'guests') {
      if (value === ANY_FILTER_VALUE) {
        return true;
      }
      return ad.offer[key] === Number(value);
    }
    if (value === ANY_FILTER_VALUE) {
      return true;
    }
    return ad.offer[key] === value;
  }
  )).slice(0, COUNT_AD_ON_MAP));
},DEBOUNCE_TIMEOUT);

function filterAds (key, value) {
  activeFilters[key] = value;
  rerenderAds();
}

function closePopup () {
  map.closePopup();
}

function resetFilters () {
  mapFilter.reset();
  initAds(ads);
}

const fieldAddress = document.querySelector('#address');

function showLatLnginFieldAddress (evt) {
  const newValue = evt.target.getLatLng();
  const fixedLat = newValue.lat.toFixed(5);
  const fixedLng = newValue.lng.toFixed(5);
  fieldAddress.value = `${fixedLat}, ${fixedLng}`;
}

marker.on('drag', showLatLnginFieldAddress);

function resetMarker () {
  marker.setLatLng(cityCenter);
}

function resetFieldAddress () {
  fieldAddress.value = `${cityCenter.lat}, ${cityCenter.lng}`;
}

export {closePopup,resetMarker,resetFieldAddress,initAds,filterAds,resetFilters};
