export function isEven(number) {
  return number > 0 && number % 2 === 0;
}

export function getRandomInt(max) {
  const result = Math.floor(Math.random() * Math.floor(max)) + 1;
  return result;
}

export function square(number) {
  return number * number;
}
