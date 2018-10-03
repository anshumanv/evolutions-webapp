// A helper function that converts to lowercase and trims whitespaces.
export function lower(str) {
  if (str !== '') {
    return str
      .toString()
      .toLowerCase()
      .match(/[^_\s\W]+/g)
      .join('');
  }
}

export function isNum(val) {
  return /^\d+$/.test(val);
}
