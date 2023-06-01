const adForm = document.querySelector('.ad-form');
const interactiveFormElements = adForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const interactiveFiltersElements = mapFilter.querySelectorAll('select ,fieldset');

function activiteWebPage () {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  interactiveFormElements.forEach((formElement) =>
    formElement.removeAttribute('disabled',));
}

function inactivateWebPage () {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  interactiveFormElements.forEach((formElement) =>
    formElement.setAttribute('disabled',true));
  interactiveFiltersElements.forEach((filtersElement) =>
    filtersElement.setAttribute('disabled',true));
}

function activateFilters () {
  interactiveFiltersElements.forEach((filtersElement) =>
    filtersElement.removeAttribute('disabled',));
}

inactivateWebPage();
export {activiteWebPage,inactivateWebPage,activateFilters};
