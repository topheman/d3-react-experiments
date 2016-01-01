import sensorsChecker from 'sensors-checker';

const LOCALSTORAGE_PREFIX = '123456789';// to avoid namespace collisions

function storageGetItem(key) {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_PREFIX + key));
}

function storageSetItem(key, value) {
  return localStorage.setItem(LOCALSTORAGE_PREFIX + key, JSON.stringify(value));
}

function storageIsSet(key) {
  return localStorage.getItem(LOCALSTORAGE_PREFIX + key) !== null;
}

export default function init() {
  return new Promise((resolve) => {
    // if check was already done on that device, no need to redo it
    if (storageIsSet('sensorMode')) {
      return resolve(storageGetItem('sensorMode'));
    }
    sensorsChecker.checkDeviceorientation(() => {
      storageSetItem('sensorMode', {accelerometer: true});
      return resolve({accelerometer: true});
    }, () => {
      storageSetItem('sensorMode', {accelerometer: false});
      return resolve({accelerometer: false});
    }, {
      userAgentCheck: /(iPad|iPhone|Nexus|Mobile|Tablet)/i
    });
  });
}

export function getSensorMode() {
  return storageGetItem('sensorMode');
}
