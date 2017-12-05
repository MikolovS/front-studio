export default function (array, key, reverse) {
  return array.sort(function (a, b) {
    return reverse ? a[key] - b[key] : b[key] - a[key]
  })
};
