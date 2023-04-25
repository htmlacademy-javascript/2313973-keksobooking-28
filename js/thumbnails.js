import {createAdsArray} from './data.js';

const usersAds = createAdsArray();
const adsCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

function showHousingType (type, typeField) {
  if (type === 'flat') {
    typeField.textContent = 'Квартира';
  }
  if (type === 'bungalow') {
    typeField.textContent = 'Бунгало';
  }
  if (type === 'house') {
    typeField.textContent = 'Дом';
  }
  if (type === 'palace') {
    typeField.textContent = 'Дворец';
  }
  if (type === 'hotel') {
    typeField.textContent = 'Отель';
  }
}

function showFeatures (popupList, features) {
  popupList.forEach((popupListItem) => {
    const isNecessary = features.some((feature) => popupListItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      popupListItem.remove();
    }
  });
}
const adsListFragment = document.createDocumentFragment();

function renderAdsList () {
  usersAds.forEach(({author, offer}) => {
    const adsCard = adsCardTemplate.cloneNode(true);
    adsCard.querySelector('.popup__title').textContent = offer.title;
    adsCard.querySelector('.popup__text--address').textContent = offer.address;
    adsCard.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
    showHousingType(offer.type, adsCard.querySelector('.popup__type'));
    adsCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    adsCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    const featuresContainer = adsCard.querySelector('.popup__features');
    const featureList = featuresContainer.querySelectorAll('.popup__feature');
    showFeatures(featureList, offer.features);
    if (offer.features.length === 0) {
      featuresContainer.classList.add('hidden');
    }
    const popupDescription = adsCard.querySelector('.popup__description');
    popupDescription.textContent = offer.description;
    if (popupDescription.textContent === '') {
      popupDescription.classList.add('hidden');
    }
    const photoContainer = adsCard.querySelector('.popup__photos');
    offer.photos.forEach((photo) => {
      const popupPhotoClone = photoContainer.querySelector('.popup__photo').cloneNode(true);
      popupPhotoClone.src = photo;
      photoContainer.append(popupPhotoClone);
    });
    photoContainer.querySelector('.popup__photo').remove();
    adsCard.querySelector('.popup__avatar').src = author.avatar;
    adsListFragment.appendChild(adsCard);
  });
  mapCanvas.appendChild(adsListFragment);
}

renderAdsList ();
