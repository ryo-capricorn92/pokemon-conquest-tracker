// eslint-disable-next-line import/prefer-default-export
export const prettyPrint = str => str
  .split(' ')
  .map(word => `${word[0].toUpperCase()}${word.split('').slice(1).join('')}`)
  .join(' ');
