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
