export const prettyPrint = (str) => {
  const strArr = str.split(' ');
  let arr;
  for (let i = 0; i < strArr.length; i++) { // eslint-disable-line
    arr = strArr[i].split('');
    arr[0] = arr[0].toUpperCase();
    strArr[i] = arr.join('');
  }
  return strArr.join(' ');
};

export default {
  prettyPrint,
};
