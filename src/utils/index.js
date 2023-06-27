export function isEven(number) {
  return number > 0 && number % 2 === 0;
}

export function getRandomInt(max) {
  const result = Math.round(Math.random() * Math.floor(max));
  return result;
}

export function getRandomIntInRange(min, max) {
  let result = Math.round(Math.random() * Math.floor(max - min)) + min;
  return result;
}

export function square(number) {
  return number * number;
}
export function getObjectLastKey(obj) {
  const result = Object.keys(obj)[Object.keys(obj).length - 1];
  return result;
}

export function getObjectLastProperty(obj) {
  const result = obj[getObjectLastKey(obj)];
  return result;
}

export function getObjKeyIndex(obj, key) {
  const result = Object.keys(obj).indexOf(key);
  return result;
}

export function getObjKeyFromIndex(obj, index) {
  const result = Object.keys(obj)[index];
  return result;
}

export function getObjPropertiesFromIndex(obj, index) {
  const result = obj[getObjKeyFromIndex(obj, index)];
  return result;
}

export function isLastKey(obj, key) {
  const index = getObjKeyIndex(obj, key);
  const result = index === Object.keys(obj).length - 1;
  return result;
}

export const getRating = (stars) => `★★★☆☆☆`.slice(3 - stars, 6 - stars);
