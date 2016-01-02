import sensorsChecker from 'sensors-checker';

const LOCALSTORAGE_PREFIX = '523456789';// to avoid namespace collisions

export const MODE_DEVICEORIENTATION = 'deviceorientation';
export const MODE_MOUSEMOVE = 'mousemove';

/** ******** Simple localStorage abstraction **********/

function storageGetItem(key) {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_PREFIX + key));
}

function storageSetItem(key, value) {
  return localStorage.setItem(LOCALSTORAGE_PREFIX + key, JSON.stringify(value));
}

function storageIsSet(key) {
  return localStorage.getItem(LOCALSTORAGE_PREFIX + key) !== null;
}

/**
 * This will check for accelerometer and return a promise when done, giving you the type of event to use:
 * - deviceorientation (if accelerometer present)
 * - mousemove (if no accelerometer)
 * @returns {Promise|Promise<T>}
 */
export default function init() {
  return new Promise((resolve) => {
    // if check was already done on that device, no need to redo it
    if (storageIsSet('sensorMode')) {
      return resolve(storageGetItem('sensorMode'));
    }
    sensorsChecker.checkDeviceorientation(() => {
      const mode = MODE_DEVICEORIENTATION;
      storageSetItem('sensorMode', mode);
      return resolve(mode);
    }, () => {
      const mode = MODE_MOUSEMOVE;
      storageSetItem('sensorMode', mode);
      return resolve(mode);
    }, {
      userAgentCheck: /(iPad|iPhone|Nexus|Mobile|Tablet)/i
    });
  });
}

/**
 * Returns the what you got in the rsolve of the promise
 * @returns {String}
 */
export function getSensorMode() {
  return storageGetItem('sensorMode');
}

/**
 * This function returns a function that will take an event and return an object with the same shape
 * weather it's a mousemove or a deviceorientation (so that they could be handled the same way by the UI)
 * @param mode
 * @returns {Function}
 */
export function createMapEventFromMode(mode) {
  switch (mode) {
    case MODE_MOUSEMOVE:
      return (e) => ({
        a: e.clientX,
        b: e.clientY
      });
    case MODE_DEVICEORIENTATION:
      return (e) => ({
        a: e.beta,
        b: e.gamma
      });
    default:
      throw new Error('Unhandled mode : ' + mode);
  }
}
