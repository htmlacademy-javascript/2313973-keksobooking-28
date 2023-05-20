import {activiteWebPage} from './activate.js';
import {getAdPopup} from './thumbnails.js';
import {ads} from './api.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const cityCenter = {
  lat: 35.68948,
  lng: 139.69170,
};
const map = L.map('map-canvas').on('load', () => {
  activiteWebPage();
}).setView(cityCenter, ZOOM);

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

ads.map((ad) =>
  L.marker(ad.location,{icon: pinIcon})
    .bindPopup(getAdPopup(ad))
    .addTo(map)
);

function closePopup () {
  map.closePopup();
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

export {closePopup,resetMarker,resetFieldAddress};

