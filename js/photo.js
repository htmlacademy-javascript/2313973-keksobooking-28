import {FILE_TYPES} from './constants.js';

const inputAvatar = document.querySelector('.ad-form-header__input[type=file]');
const inputPhotoAds = document.querySelector('.ad-form__input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const previewPhotoAds = document.querySelector('.ad-form__photo');

inputAvatar.addEventListener('change', () => {
  const file = inputAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

inputPhotoAds.addEventListener('change', () => {
  const file = inputPhotoAds.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const newImg = document.createElement('img');
    newImg.src = URL.createObjectURL(file);
    newImg.classList.add('ad-form__photo');
    previewPhotoAds.append(newImg);
  }
});

function resetPhotos () {
  previewAvatar.src = 'img/muffin-grey.svg';
  if (previewPhotoAds.img !== undefined) {
    previewPhotoAds.firstChild.remove();
  }
}

export {resetPhotos};
