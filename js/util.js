const ESCAPE_KEY = 'Escape';


const isEscapeKey = (evt) => evt.key === ESCAPE_KEY;

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey,debounce};

