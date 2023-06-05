
const adsCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const mapHousingTypeToCaption = {
  'flat':'Квартира',
  'bungalow':'Бунгало',
  'house': 'Дом',
  'palace':'Дворец',
  'hotel':'Отель'
};

function showFeatures (popupList, features) {
  popupList.forEach((popupListItem) => {
    const isNecessary = features.some((feature) => popupListItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      popupListItem.classList.add('hidden');
    }
  });
}

function getAdPopup ({author, offer}) {
  const adsCard = adsCardTemplate.cloneNode(true);
  adsCard.querySelector('.popup__title').textContent = offer.title;
  adsCard.querySelector('.popup__text--address').textContent = offer.address;
  adsCard.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
  adsCard.querySelector('.popup__type').textContent = mapHousingTypeToCaption[offer.type];
  adsCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adsCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const featuresContainer = adsCard.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');
  if ('features' in offer) {
    showFeatures(featureList, offer.features);
  } else {
    featuresContainer.classList.add('hidden');
  }
  const popupDescription = adsCard.querySelector('.popup__description');
  if (popupDescription.textContent === '') {
    popupDescription.classList.add('hidden');
  } else {
    popupDescription.textContent = offer.description;
  }
  const photoContainer = adsCard.querySelector('.popup__photos');
  const popupPhotoInit = photoContainer.querySelector('.popup__photo');
  if ('photos' in offer) {
    offer.photos.forEach((photo) => {
      const popupPhotoClone = popupPhotoInit.cloneNode(true);
      popupPhotoClone.src = photo;
      photoContainer.append(popupPhotoClone);
      popupPhotoInit.remove();
    });
  } else {
    popupPhotoInit .classList.add('hidden');
  }
  adsCard.querySelector('.popup__avatar').src = author.avatar.length === 0 ? 'img/avatars/default.png' : author.avatar;
  return adsCard;
}


export {mapHousingTypeToCaption,getAdPopup};
