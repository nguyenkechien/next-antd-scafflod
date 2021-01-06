// transform the http query & params
export const filterObject = (o, filter) => {
  const r = {};
  Object.keys(o).forEach(k => {
    if (filter(o[k], k)) r[k] = o[k];
  });
  return r;
};

export const isEmpty = value =>
  value === undefined || value === null || value === '';
export const isObject = obj =>
  obj !== undefined &&
  obj !== null &&
  Object.keys(obj).length > 0 &&
  obj.constructor === Object;

export const isEmptyObj = obj =>
  obj === undefined ||
  obj === null ||
  (Object.keys(obj).length === 0 && obj.constructor === Object);

export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

export const objectToArray = obj => Object.keys(obj).map(i => obj[i]);

export const removeProperty = (obj, property) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key !== property) {
      return { ...acc, [key]: obj[key] };
    }
    return acc;
  }, {});
};

export const stringToBoolean = string => {
  if (string === null || string === '') return false;

  switch (string.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(string);
  }
};

export const maskCardNumber = cardNo => {
  return `*** *** *** *** ${cardNo.substr(-4, 4)}`;
};

export * from './Cookie';
export * from './Auth';
