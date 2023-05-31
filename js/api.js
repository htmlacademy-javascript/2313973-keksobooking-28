import {getData} from './fetch.js';
import {activateFilters} from './activate.js';
import {showAlert} from './messages.js';
import {initAds} from './map.js';

getData()
  .then((ads) => {
    initAds(ads);
    activateFilters();
  }
  ).
  catch (() => {
    showAlert('Ошибка загрузки');
  }
  );
