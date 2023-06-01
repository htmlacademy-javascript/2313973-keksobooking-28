import {getData} from './fetch.js';
import {activateFilters} from './activate.js';
import {showAlert} from './messages.js';

let ads;

try {
  ads = await getData();
  activateFilters();
} catch {
  showAlert('Не удалось загрузить данные. Попробуйте обновить страницу');
}


export {ads};
