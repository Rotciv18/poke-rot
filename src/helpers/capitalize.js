function replaceAt(string, index, replacement) {
  return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

export default (s) => {
  if (typeof s !== 'string') return '';

  const index = s.indexOf('-');
  if (index >= 0) {
    const newString = replaceAt(s, index + 1, s.charAt(index+1).toUpperCase());

    return newString.charAt(0).toUpperCase() + newString.slice(1);
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};
